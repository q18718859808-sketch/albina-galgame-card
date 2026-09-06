import { adoptVisualReviewContract } from './lib/visual-production.mjs';

const options = parseArguments(process.argv.slice(2));
const results = await adoptVisualReviewContract({
  ...options,
  decision: 'approved',
});
for (const result of results) console.log(`${result.status}: ${result.id} (${result.currentJobHash})`);

function parseArguments(arguments_) {
  const valueFlags = ['--ids', '--reviewer', '--reason', '--notes', '--criteria-evidence', '--plan-variant'];
  const booleanFlags = ['--approve', '--recover-stale-lock', '--allow-unreviewed-references'];
  for (let index = 0; index < arguments_.length; index += 1) {
    const value = arguments_[index];
    if (![...valueFlags, ...booleanFlags].includes(value) && !valueFlags.includes(arguments_[index - 1])) {
      throw new Error(`Unexpected review-contract adoption argument: ${value}`);
    }
  }
  for (const name of [...valueFlags, ...booleanFlags]) {
    if (arguments_.filter((value) => value === name).length > 1) throw new Error(`${name} may be provided only once`);
  }
  if (!arguments_.includes('--approve')) throw new Error('Review-contract adoption requires --approve');
  const ids = requiredValue(arguments_, '--ids').split(',').map((value) => value.trim()).filter(Boolean);
  if (ids.length === 0) throw new Error('--ids requires at least one job id');
  if (new Set(ids).size !== ids.length) throw new Error('--ids must not repeat a job id');
  const planVariant = optionalValue(arguments_, '--plan-variant');
  if (planVariant !== undefined && !['frozen', 'latent', 'migration'].includes(planVariant)) {
    throw new Error('--plan-variant must be one of frozen, latent, migration');
  }
  return {
    ids,
    reviewer: requiredValue(arguments_, '--reviewer'),
    reason: requiredValue(arguments_, '--reason'),
    notes: requiredValue(arguments_, '--notes'),
    criteriaEvidence: parseCriteriaEvidence(requiredValue(arguments_, '--criteria-evidence'), ids),
    recoverStaleLock: arguments_.includes('--recover-stale-lock'),
    ...(planVariant === undefined ? {} : { planVariant }),
    allowUnreviewedReferences: arguments_.includes('--allow-unreviewed-references'),
  };
}

function optionalValue(values, name) {
  const index = values.indexOf(name);
  if (index === -1) return undefined;
  const value = values[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}

function parseCriteriaEvidence(value, ids) {
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    const suppliedIds = Object.keys(parsed);
    if (suppliedIds.some((id) => !ids.includes(id))) throw new Error('unexpected job id');
    for (const id of ids) {
      if (!Object.hasOwn(parsed, id)) throw new Error('missing job id');
      if (!Array.isArray(parsed[id])) throw new Error('not an evidence array');
    }
    return parsed;
  } catch {
    throw new Error('--criteria-evidence requires a JSON object keyed by every --ids job id, with each value an evidence array');
  }
}

function requiredValue(values, name) {
  const index = values.indexOf(name);
  const value = index === -1 ? undefined : values[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}
