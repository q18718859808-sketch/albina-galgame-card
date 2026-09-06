import { reviewVisualArtifacts } from './lib/visual-production.mjs';

const options = parseArguments(process.argv.slice(2));
const results = await reviewVisualArtifacts(options);
for (const result of results) console.log(`${result.status}: ${result.id}`);

function parseArguments(arguments_) {
  const valueFlags = ['--ids', '--reviewer', '--notes', '--criteria-evidence', '--plan-variant'];
  const booleanFlags = ['--approve', '--reject', '--recover-stale-lock', '--allow-unreviewed-references'];
  for (let index = 0; index < arguments_.length; index += 1) {
    const value = arguments_[index];
    if (![...valueFlags, ...booleanFlags].includes(value) && !valueFlags.includes(arguments_[index - 1])) {
      throw new Error(`Unexpected visual review argument: ${value}`);
    }
  }
  for (const name of [...valueFlags, ...booleanFlags]) {
    if (arguments_.filter((value) => value === name).length > 1) throw new Error(`${name} may be provided only once`);
  }
  const approved = arguments_.includes('--approve');
  const rejected = arguments_.includes('--reject');
  if (approved === rejected) throw new Error('Choose exactly one of --approve or --reject');
  const ids = requiredValue(arguments_, '--ids').split(',').map((value) => value.trim()).filter(Boolean);
  const reviewer = requiredValue(arguments_, '--reviewer');
  const notes = valueAfter(arguments_, '--notes');
  const criteriaEvidence = approved ? parseCriteriaEvidence(requiredValue(arguments_, '--criteria-evidence')) : undefined;
  const planVariant = valueAfter(arguments_, '--plan-variant');
  if (planVariant !== undefined && !['frozen', 'latent', 'migration'].includes(planVariant)) {
    throw new Error('--plan-variant must be one of frozen, latent, migration');
  }
  return {
    ids, reviewer, notes, criteriaEvidence,
    decision: approved ? 'approved' : 'rejected', recoverStaleLock: arguments_.includes('--recover-stale-lock'),
    ...(planVariant === undefined ? {} : { planVariant }),
    allowUnreviewedReferences: arguments_.includes('--allow-unreviewed-references'),
  };
}

function parseCriteriaEvidence(value) {
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    return parsed;
  } catch {
    throw new Error('--criteria-evidence requires a JSON object keyed by job id, with { criterion, note, evidence } arrays');
  }
}

function requiredValue(arguments_, name) {
  const value = valueAfter(arguments_, name);
  if (!value) throw new Error(`${name} requires a value`);
  return value;
}

function valueAfter(arguments_, name) {
  const index = arguments_.indexOf(name);
  if (index === -1) return undefined;
  const value = arguments_[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}
