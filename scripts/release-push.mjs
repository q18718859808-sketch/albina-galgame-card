import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildCurrentReleaseStatus } from './release-status.mjs';
import { buildReleaseCommands, hasPublishableWorktreeChanges } from './lib/release-gate.mjs';

const run = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '..');

async function git(args, options = {}) {
  const { trim = true, ...execOptions } = options;
  const result = await run('git', args, { cwd: projectRoot, maxBuffer: 4 * 1024 * 1024, ...execOptions });
  return trim ? result.stdout.trim() : result.stdout.replace(/(?:\r?\n)+$/u, '');
}

async function optionalGit(args) {
  try { return await git(args); } catch { return null; }
}

async function repositoryState(remote, channel) {
  const [porcelain, branch, head, localFinalTagCommit] = await Promise.all([
    git(['status', '--porcelain=v1', '--untracked-files=all'], { trim: false }),
    optionalGit(['symbolic-ref', '--quiet', '--short', 'HEAD']),
    optionalGit(['rev-parse', 'HEAD']),
    optionalGit(['rev-parse', 'refs/tags/v2.0.0^{commit}']),
  ]);
  const remoteTags = channel === 'final'
    ? await git(['ls-remote', '--tags', remote, 'refs/tags/v2.0.0', 'refs/tags/v2.0.0^{}'])
    : '';
  return {
    workingTreeClean: !hasPublishableWorktreeChanges(porcelain),
    branch,
    head,
    localFinalTagCommit,
    remoteFinalTagExists: Boolean(remoteTags),
  };
}

function parseArgs(argv) {
  const args = [...argv];
  const channelIndex = args.indexOf('--channel');
  const channel = channelIndex >= 0 ? args[channelIndex + 1] : null;
  const remoteIndex = args.indexOf('--remote');
  const remote = remoteIndex >= 0 ? args[remoteIndex + 1] : 'origin';
  return { channel, remote, execute: args.includes('--execute') };
}

export async function planReleasePush({ channel, remote = 'origin' }) {
  const status = await buildCurrentReleaseStatus();
  const repository = await repositoryState(remote, channel);
  const gate = buildReleaseCommands({ channel, status, repository, remote });
  return { status, repository, gate };
}

const options = parseArgs(process.argv.slice(2));
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!['rc', 'final'].includes(options.channel)) throw new Error('Usage: node scripts/release-push.mjs --channel rc|final [--execute]');
  const plan = await planReleasePush(options);
  console.log(JSON.stringify({
    channel: options.channel,
    allowed: plan.gate.allowed,
    incomplete: plan.gate.incomplete,
    blockers: plan.gate.blockers,
    commands: plan.gate.commands,
  }, null, 2));
  if (!plan.gate.allowed) process.exitCode = 1;
  else if (options.execute) {
    for (const command of plan.gate.commands) await git(command);
  }
}
