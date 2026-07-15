// Deterministic eligibility engine — no AI involved.
// Rules are plain data (rules.js); this evaluates them against wizard answers.
// A rule is ELIGIBLE when every criterion passes, MAYBE when none fail but
// some can't be evaluated (unanswered / "unsure"), and excluded on any fail.

export function checkCriterion(criterion, answers) {
  const v = answers[criterion.field]
  if (v === undefined || v === null || v === 'unsure') return 'unknown'
  switch (criterion.op) {
    case 'eq':    return v === criterion.value ? 'pass' : 'fail'
    case 'neq':   return v !== criterion.value ? 'pass' : 'fail'
    case 'in':    return criterion.value.includes(v) ? 'pass' : 'fail'
    case 'notIn': return criterion.value.includes(v) ? 'fail' : 'pass'
    default:      return 'unknown'
  }
}

export function evaluate(answers, rules) {
  const eligible = []
  const maybe = []

  for (const rule of rules) {
    let failed = false
    const missing = []
    for (const c of rule.criteria) {
      const result = checkCriterion(c, answers)
      if (result === 'fail') { failed = true; break }
      if (result === 'unknown') missing.push(c.label || c.field)
    }
    if (failed) continue
    if (missing.length === 0) eligible.push(rule)
    else maybe.push({ ...rule, missingInfo: [...new Set(missing)] })
  }

  // Only rules flagged cash:true count toward the headline dollar totals,
  // so the number stays defensible (tools/services are listed but not summed).
  const sum = (list, key) =>
    list.filter((r) => r.cash).reduce((t, r) => t + (r.estimatedValue?.[key] ?? 0), 0)

  return {
    eligible,
    maybe,
    totals: {
      eligibleMin: sum(eligible, 'min'),
      eligibleMax: sum(eligible, 'max'),
      potentialMax: sum(eligible, 'max') + sum(maybe, 'max'),
    },
  }
}

export const fmtUSD = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
