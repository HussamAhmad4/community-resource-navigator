// Unit tests for the eligibility engine. Run: npm run test:checkup
import assert from 'node:assert/strict'
import { evaluate, checkCriterion } from '../src/checkup/engine.js'
import { RULES } from '../src/checkup/rules.js'

// --- criterion-level ---
assert.equal(checkCriterion({ field: 'x', op: 'eq', value: 1 }, { x: 1 }), 'pass')
assert.equal(checkCriterion({ field: 'x', op: 'eq', value: 1 }, { x: 2 }), 'fail')
assert.equal(checkCriterion({ field: 'x', op: 'eq', value: 1 }, {}), 'unknown')
assert.equal(checkCriterion({ field: 'x', op: 'eq', value: 1 }, { x: 'unsure' }), 'unknown')
assert.equal(checkCriterion({ field: 'x', op: 'in', value: ['a', 'b'] }, { x: 'b' }), 'pass')

// --- persona: low-income full-time CUNY student in NYC ---
const lowIncomeCuny = evaluate({
  state: 'NY', cuny: true, enrollment: 'full', income: 'under30k',
  age: '18to23', food: 'sometimes', insurance: false, commute: true,
}, RULES)
const ids = (list) => list.map((r) => r.id)
assert.ok(ids(lowIncomeCuny.eligible).includes('pell-grant'), 'Pell should be eligible')
assert.ok(ids(lowIncomeCuny.eligible).includes('ny-tap'), 'TAP should be eligible')
assert.ok(ids(lowIncomeCuny.eligible).includes('fair-fares'), 'Fair Fares should be eligible')
assert.ok(ids(lowIncomeCuny.eligible).includes('single-stop'), 'Single Stop should be eligible')
assert.ok(lowIncomeCuny.totals.eligibleMax > 15000, 'low-income total should exceed $15k')
assert.ok(!ids(lowIncomeCuny.eligible).includes('cuny-reconnect'), 'Reconnect requires not enrolled')

// --- persona: high-income out-of-state student ---
const highIncome = evaluate({
  state: 'other', cuny: false, enrollment: 'full', income: 'over125k',
  age: '18to23', food: 'rarely', insurance: true, commute: false,
}, RULES)
assert.ok(!ids(highIncome.eligible).includes('pell-grant'), 'no Pell over 125k')
assert.ok(!ids(highIncome.eligible).includes('ny-tap'), 'no TAP outside NY')
assert.equal(highIncome.totals.eligibleMax, 0, 'no cash benefits expected')
assert.ok(ids(highIncome.eligible).includes('github-student-pack'), 'still gets GitHub pack')

// --- persona: unsure income → programs land in maybe, not eligible ---
const unsure = evaluate({
  state: 'NY', cuny: true, enrollment: 'full', income: 'unsure',
  age: '18to23', food: 'rarely', insurance: true, commute: true,
}, RULES)
assert.ok(ids(unsure.maybe).includes('pell-grant'), 'unknown income → Pell is maybe')
assert.ok(!ids(unsure.eligible).includes('pell-grant'), 'unknown income → Pell not confirmed')

// --- persona: 26+ adult in NY, not enrolled → Reconnect ---
const returner = evaluate({
  state: 'NY', cuny: false, enrollment: 'none', income: '30to60k',
  age: '26plus', food: 'rarely', insurance: true, commute: true,
}, RULES)
assert.ok(ids(returner.eligible).includes('cuny-reconnect'), 'Reconnect for 26+ not enrolled in NY')
assert.ok(!ids(returner.eligible).includes('pell-grant'), 'no Pell when not enrolled')

console.log('All eligibility engine tests passed ✔')
