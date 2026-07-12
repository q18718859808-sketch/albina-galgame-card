#!/usr/bin/env node
import { copyFile, mkdir, readdir, rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { MediaGenerator, type MediaClient, validateJobArtifact } from './generator.js';
import { contentHashJobId } from './hash.js';
import { loadJob } from './job.js';
import { Ledger } from './ledger.js';
import { PieClient } from './pie-client.js';
import { prepareProduction } from './production.js';

interface CliDependencies {
  stdout?: (line: string) => void;
  stderr?: (line: string) => void;
  env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
  client?: MediaClient;
  cwd?: string;
}

export async function runCli(args: string[], dependencies: CliDependencies = {}): Promise<number> {
  const command = args[0];
  const cwd = dependencies.cwd ?? process.cwd();
  const stdout = dependencies.stdout ?? console.log;
  const ledgerPath = option(args, '--ledger') ?? resolve(cwd, 'tools/media/jobs/.ledger.json');
  if (command === 'inventory') return inventory(args, ledgerPath, cwd, stdout);
  if (command === 'generate') return generate(args, ledgerPath, dependencies, stdout);
  if (command === 'validate') return validate(args, stdout);
  if (command === 'promote') return promote(args, stdout);
  if (command === 'prepare-production') {
    const destination = option(args, '--to') ?? resolve(cwd, 'tools/media/production/jobs');
    stdout(JSON.stringify(await prepareProduction(cwd, destination)));
    return 0;
  }
  throw new Error('Usage: media <inventory|generate|validate|promote>');
}

async function inventory(args: string[], ledgerPath: string, cwd: string, stdout: (line: string) => void): Promise<number> {
  const jobsDirectory = option(args, '--jobs') ?? resolve(cwd, 'tools/media/jobs');
  const files = (await readdir(jobsDirectory)).filter((file) => file.endsWith('.json') && !file.startsWith('.')).sort();
  const state = await new Ledger(ledgerPath).read();
  const rows = [];
  for (const file of files) {
    const path = resolve(jobsDirectory, file);
    let job;
    try {
      job = await loadJob(path);
    } catch (error) {
      rows.push({ file: path, status: 'skipped', reason: error instanceof Error ? error.message : String(error) });
      continue;
    }
    const id = contentHashJobId(job);
    rows.push({ id, file: path, kind: job.kind, status: state.jobs[id]?.status ?? 'new', output: job.output });
  }
  stdout(JSON.stringify(rows, null, 2));
  return 0;
}

async function generate(
  args: string[],
  ledgerPath: string,
  dependencies: CliDependencies,
  stdout: (line: string) => void,
): Promise<number> {
  const paths = positionals(args.slice(1), new Set(['--ledger']));
  if (paths.length === 0) throw new Error('media generate requires at least one job file');
  const jobs = await Promise.all(paths.map(loadJob));
  const client = dependencies.client ?? createDefaultClient(dependencies.env);
  await new MediaGenerator({ client, ledger: new Ledger(ledgerPath) }).generate(jobs);
  stdout(JSON.stringify(jobs.map((job) => ({ id: contentHashJobId(job), output: job.output }))));
  return 0;
}

async function validate(args: string[], stdout: (line: string) => void): Promise<number> {
  const path = args[1];
  if (!path) throw new Error('media validate requires a job file');
  const result = await validateJobArtifact(await loadJob(path));
  stdout(JSON.stringify(result));
  return 0;
}

async function promote(args: string[], stdout: (line: string) => void): Promise<number> {
  const path = args[1];
  const destination = option(args, '--to');
  if (!path || !destination) throw new Error('media promote requires a job file and --to destination');
  const job = await loadJob(path);
  await validateJobArtifact(job);
  await mkdir(dirname(destination), { recursive: true });
  const temporary = `${destination}.${process.pid}.tmp`;
  await copyFile(job.output, temporary);
  await rename(temporary, destination);
  stdout(JSON.stringify({ promoted: destination, id: contentHashJobId(job) }));
  return 0;
}

function option(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function positionals(args: string[], valuedOptions: Set<string>): string[] {
  const result: string[] = [];
  for (let index = 0; index < args.length; index += 1) {
    if (valuedOptions.has(args[index] ?? '')) index += 1;
    else if (!args[index]?.startsWith('--')) result.push(args[index] as string);
  }
  return result;
}

function createDefaultClient(env?: NodeJS.ProcessEnv | Record<string, string | undefined>): MediaClient {
  return env === undefined ? new PieClient() : new PieClient({ env });
}

const isEntrypoint = process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isEntrypoint) {
  runCli(process.argv.slice(2)).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
