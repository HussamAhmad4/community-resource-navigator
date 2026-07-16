// Persist Benefit Checkup answers so chat modes can personalize replies
// without re-asking. Stored locally only — nothing leaves the browser
// except a short plain-English summary sent with chat requests.

const KEY = 'sprindl_profile'

const LABELS = {
  state:      { NY: 'lives in New York State', other: 'lives outside New York' },
  cuny:       { true: 'attends a CUNY school', false: 'does not attend a CUNY school' },
  enrollment: { full: 'is enrolled full-time', part: 'is enrolled part-time', none: 'is not currently enrolled' },
  income:     { under30k: 'household income is under $30k', '30to60k': 'household income is $30k–$60k', '60to125k': 'household income is $60k–$125k', over125k: 'household income is over $125k' },
  age:        { '18to23': 'is 18–23 years old', '24to25': 'is 24–25 years old', '26plus': 'is 26 or older' },
  food:       { often: 'often struggles to afford food', sometimes: 'sometimes struggles to afford food' },
  insurance:  { true: 'has health insurance', false: 'does not have health insurance' },
  commute:    { true: 'regularly rides NYC subways or buses' },
}

export function saveProfile(answers) {
  try { localStorage.setItem(KEY, JSON.stringify(answers)) } catch { /* private mode */ }
}

export function loadProfile() {
  try { return JSON.parse(localStorage.getItem(KEY)) || null } catch { return null }
}

export function profileSummary(answers = loadProfile()) {
  if (!answers || typeof answers !== 'object') return null
  const parts = Object.entries(answers)
    .map(([field, value]) => LABELS[field]?.[String(value)])
    .filter(Boolean)
  return parts.length ? `The user ${parts.join('; ')}.` : null
}
