import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { jobHash } from "./lib/visual-production.mjs";

const root = resolve(import.meta.dirname, "..");
const plan = JSON.parse(await readFile(resolve(root,"content/media-production/visual-rebuild-v2.json"),"utf8"));
const prompts = JSON.parse(await readFile(resolve(root,"content/media-production/visual-prompts-v2.json"),"utf8"));
const canonSources = JSON.parse(await readFile(resolve(root,"content/media-production/canon-visual-sources-v1.json"),"utf8"));
const ledger = JSON.parse(await readFile(resolve(root,"staging/media/visual-v2/ledger.json"),"utf8"));

const jobId = "visual.image.portrait.albina.normal";
const job = plan.imageJobs.find(j=>j.id===jobId);
const promptArr = Object.values(prompts.prompts);
const promptEntry = promptArr.find(e=>e.jobId===jobId);

// Build entry object matching what visual-production.mjs expects for jobHash
const entry = { job, prompt: promptEntry, finalPrompt: JSON.stringify(promptEntry) };

// Get canon source hashes for references
const ref1 = canonSources.sources.find(s=>s.id==="canon.visual.albina.unarmored-standing");
const ref2 = canonSources.sources.find(s=>s.id==="reference.user.albina-style-board");
if(!ref1) { console.log("REF1 NOT FOUND"); process.exit(1); }
if(!ref2) { console.log("REF2 NOT FOUND"); process.exit(1); }

const references = [
  { jobId: "canon.visual.albina.unarmored-standing", sha256: ref1.sha256 },
  { jobId: "reference.user.albina-style-board", sha256: ref2.sha256 },
];

const contractHash = jobHash(entry, references);
console.log("contract_hash:", contractHash);
console.log("ref1_sha256:", ref1.sha256);
console.log("ref2_sha256:", ref2.sha256);
