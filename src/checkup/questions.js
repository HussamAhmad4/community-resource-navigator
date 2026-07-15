// The 8 wizard questions. Every `field` is referenced by rules.js criteria.
// "unsure"-style answers are treated as unknown → programs land in "worth checking".

export const QUESTIONS = [
  {
    field: 'state',
    question: 'Where do you live?',
    options: [
      { value: 'NY', label: 'New York State' },
      { value: 'other', label: 'Another state' },
    ],
  },
  {
    field: 'cuny',
    question: 'Do you attend a CUNY school?',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
  },
  {
    field: 'enrollment',
    question: 'What is your enrollment status?',
    options: [
      { value: 'full', label: 'Full-time student' },
      { value: 'part', label: 'Part-time student' },
      { value: 'none', label: 'Not currently enrolled' },
    ],
  },
  {
    field: 'income',
    question: "Roughly, what is your household's yearly income?",
    options: [
      { value: 'under30k', label: 'Under $30,000' },
      { value: '30to60k', label: '$30,000 – $60,000' },
      { value: '60to125k', label: '$60,000 – $125,000' },
      { value: 'over125k', label: 'Over $125,000' },
      { value: 'unsure', label: "I'm not sure" },
    ],
  },
  {
    field: 'age',
    question: 'How old are you?',
    options: [
      { value: '18to23', label: '18 – 23' },
      { value: '24to25', label: '24 – 25' },
      { value: '26plus', label: '26 or older' },
    ],
  },
  {
    field: 'food',
    question: 'Do you ever struggle to afford food?',
    options: [
      { value: 'often', label: 'Yes, often' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'rarely', label: 'Rarely or never' },
    ],
  },
  {
    field: 'insurance',
    question: 'Do you have health insurance?',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
      { value: 'unsure', label: "I'm not sure" },
    ],
  },
  {
    field: 'commute',
    question: 'Do you regularly ride NYC subways or buses?',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No / not in NYC' },
    ],
  },
]
