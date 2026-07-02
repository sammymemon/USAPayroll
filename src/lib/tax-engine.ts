// 2024 USA Tax Calculation Engine — Pure Client-Side

export const FED_BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

export const FED_BRACKETS_MFJ = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

export const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 14600,
  married: 29200,
  head_of_household: 21900,
};

export const SS_WAGE_BASE = 168600;
export const SS_RATE = 0.062;
export const MEDICARE_RATE = 0.0145;
export const ADDL_MEDICARE_RATE = 0.009;
export const ADDL_MEDICARE_THRESHOLD = 200000;

export interface StateInfo {
  code: string;
  name: string;
  noTax: boolean;
  flat: boolean;
  brackets: { min: number; max: number; rate: number }[];
}

export const STATES: StateInfo[] = [
  { code: "TX", name: "Texas", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "FL", name: "Florida", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "WA", name: "Washington", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "NV", name: "Nevada", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "WY", name: "Wyoming", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "AK", name: "Alaska", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "SD", name: "South Dakota", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "TN", name: "Tennessee", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "NH", name: "New Hampshire", noTax: true, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  { code: "IL", name: "Illinois", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0495 }] },
  { code: "IN", name: "Indiana", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0305 }] },
  { code: "PA", name: "Pennsylvania", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0307 }] },
  { code: "MI", name: "Michigan", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0425 }] },
  { code: "CO", name: "Colorado", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.044 }] },
  { code: "NC", name: "North Carolina", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.045 }] },
  { code: "AZ", name: "Arizona", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.025 }] },
  { code: "GA", name: "Georgia", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0549 }] },
  { code: "MA", name: "Massachusetts", noTax: false, flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.05 }] },
  { code: "CA", name: "California", noTax: false, flat: false, brackets: [
    { min: 0, max: 10412, rate: 0.01 }, { min: 10412, max: 24684, rate: 0.02 },
    { min: 24684, max: 38959, rate: 0.04 }, { min: 38959, max: 54081, rate: 0.06 },
    { min: 54081, max: 68350, rate: 0.08 }, { min: 68350, max: 349137, rate: 0.093 },
    { min: 349137, max: 418961, rate: 0.103 }, { min: 418961, max: 698271, rate: 0.113 },
    { min: 698271, max: Infinity, rate: 0.123 },
  ]},
  { code: "NY", name: "New York", noTax: false, flat: false, brackets: [
    { min: 0, max: 8500, rate: 0.04 }, { min: 8500, max: 11700, rate: 0.045 },
    { min: 11700, max: 13900, rate: 0.0525 }, { min: 13900, max: 80650, rate: 0.055 },
    { min: 80650, max: 215400, rate: 0.06 }, { min: 215400, max: 1077550, rate: 0.0685 },
    { min: 1077550, max: 5000000, rate: 0.0965 }, { min: 5000000, max: 25000000, rate: 0.103 },
    { min: 25000000, max: Infinity, rate: 0.109 },
  ]},
  { code: "NJ", name: "New Jersey", noTax: false, flat: false, brackets: [
    { min: 0, max: 20000, rate: 0.014 }, { min: 20000, max: 35000, rate: 0.0175 },
    { min: 35000, max: 40000, rate: 0.0245 }, { min: 40000, max: 50000, rate: 0.035 },
    { min: 50000, max: 70000, rate: 0.05525 }, { min: 70000, max: 80000, rate: 0.0637 },
    { min: 80000, max: 150000, rate: 0.0897 }, { min: 150000, max: 500000, rate: 0.10375 },
    { min: 500000, max: Infinity, rate: 0.1075 },
  ]},
  { code: "OR", name: "Oregon", noTax: false, flat: false, brackets: [
    { min: 0, max: 3650, rate: 0.0475 }, { min: 3650, max: 9200, rate: 0.0675 },
    { min: 9200, max: 125000, rate: 0.0875 }, { min: 125000, max: Infinity, rate: 0.099 },
  ]},
  { code: "HI", name: "Hawaii", noTax: false, flat: false, brackets: [
    { min: 0, max: 2400, rate: 0.014 }, { min: 2400, max: 4800, rate: 0.032 },
    { min: 4800, max: 9600, rate: 0.055 }, { min: 9600, max: 14400, rate: 0.064 },
    { min: 14400, max: 19200, rate: 0.068 }, { min: 19200, max: 32000, rate: 0.072 },
    { min: 32000, max: 64000, rate: 0.076 }, { min: 64000, max: 160000, rate: 0.079 },
    { min: 160000, max: 320000, rate: 0.0825 }, { min: 320000, max: 400000, rate: 0.09 },
    { min: 400000, max: Infinity, rate: 0.11 },
  ]},
  { code: "CT", name: "Connecticut", noTax: false, flat: false, brackets: [
    { min: 0, max: 10000, rate: 0.03 }, { min: 10000, max: 50000, rate: 0.05 },
    { min: 50000, max: 100000, rate: 0.055 }, { min: 100000, max: 200000, rate: 0.06 },
    { min: 200000, max: 250000, rate: 0.065 }, { min: 250000, max: 500000, rate: 0.069 },
    { min: 500000, max: Infinity, rate: 0.0699 },
  ]},
  { code: "OH", name: "Ohio", noTax: false, flat: false, brackets: [
    { min: 0, max: 26550, rate: 0.0 }, { min: 26550, max: 53150, rate: 0.0269 },
    { min: 53150, max: 79700, rate: 0.0322 }, { min: 79700, max: 106050, rate: 0.037 },
    { min: 106050, max: Infinity, rate: 0.0399 },
  ]},
  { code: "VA", name: "Virginia", noTax: false, flat: false, brackets: [
    { min: 0, max: 3000, rate: 0.02 }, { min: 3000, max: 5000, rate: 0.03 },
    { min: 5000, max: 17000, rate: 0.05 }, { min: 17000, max: Infinity, rate: 0.0575 },
  ]},
  { code: "MD", name: "Maryland", noTax: false, flat: false, brackets: [
    { min: 0, max: 1000, rate: 0.02 }, { min: 1000, max: 2000, rate: 0.03 },
    { min: 2000, max: 3000, rate: 0.04 }, { min: 3000, max: 100000, rate: 0.0475 },
    { min: 100000, max: 125000, rate: 0.05 }, { min: 125000, max: 150000, rate: 0.0525 },
    { min: 150000, max: 250000, rate: 0.055 }, { min: 250000, max: Infinity, rate: 0.0575 },
  ]},
  { code: "MN", name: "Minnesota", noTax: false, flat: false, brackets: [
    { min: 0, max: 30870, rate: 0.0535 }, { min: 30870, max: 103530, rate: 0.068 },
    { min: 103530, max: 183340, rate: 0.0785 }, { min: 183340, max: Infinity, rate: 0.0985 },
  ]},
];

export interface CalcInput {
  annualSalary: number;
  payFrequency: "annual" | "semi_monthly" | "biweekly" | "monthly" | "weekly";
  filingStatus: "single" | "married";
  stateCode: string;
  preTax401k: number;
  preTaxHealthInsurance: number;
  preTaxHSA: number;
  postTaxDeductions: number;
}

export interface BracketBreakdown {
  min: number; max: number | null; rate: number;
  taxableAmount: number; taxAmount: number;
}

export interface CalcResult {
  grossAnnual: number; grossPerPeriod: number;
  federalTaxAnnual: number; federalTaxPerPeriod: number;
  federalTaxableIncome: number; standardDeduction: number;
  federalEffectiveRate: number; federalMarginalRate: number;
  bracketBreakdown: BracketBreakdown[];
  ssAnnual: number; ssPerPeriod: number;
  medicareAnnual: number; medicarePerPeriod: number;
  addlMedicareAnnual: number; addlMedicarePerPeriod: number;
  ficaTotalAnnual: number; ficaTotalPerPeriod: number; ficaEffectiveRate: number;
  stateTaxAnnual: number; stateTaxPerPeriod: number; stateEffectiveRate: number;
  stateName: string;
  preTaxTotalAnnual: number; preTaxTotalPerPeriod: number;
  postTaxPerPeriod: number;
  totalDeductionsPerPeriod: number; totalDeductionsAnnual: number;
  netPerPeriod: number; netAnnual: number;
  numPeriods: number;
  totalEffectiveRate: number;
  takeHomePercent: number;
}

const PERIODS: Record<string, number> = {
  annual: 1, semi_monthly: 24, biweekly: 26, monthly: 12, weekly: 52,
};

function calcBracketTax(income: number, brackets: { min: number; max: number; rate: number }[]): number {
  let tax = 0;
  for (const b of brackets) {
    if (income <= b.min) break;
    tax += (Math.min(income, b.max) - b.min) * b.rate;
  }
  return tax;
}

function getMarginalRate(income: number, filingStatus: string): number {
  const brackets = filingStatus === "married" ? FED_BRACKETS_MFJ : FED_BRACKETS_SINGLE;
  let rate = 0;
  for (const b of brackets) { if (income > b.min) rate = b.rate; else break; }
  return rate * 100;
}

function getBracketBreakdown(income: number, filingStatus: string): BracketBreakdown[] {
  const brackets = filingStatus === "married" ? FED_BRACKETS_MFJ : FED_BRACKETS_SINGLE;
  return brackets.map(b => {
    const amt = Math.max(0, Math.min(income, b.max) - b.min);
    return { min: b.min, max: b.max === Infinity ? null : b.max, rate: b.rate * 100, taxableAmount: amt, taxAmount: amt * b.rate };
  });
}

export function calculatePayroll(input: CalcInput): CalcResult {
  const numPeriods = PERIODS[input.payFrequency];
  const preTaxTotal = input.preTax401k + input.preTaxHealthInsurance + input.preTaxHSA;
  const adjustedIncome = Math.max(0, input.annualSalary - preTaxTotal);
  const stdDeduction = STANDARD_DEDUCTIONS[input.filingStatus] || STANDARD_DEDUCTIONS.single;
  const federalTaxableIncome = Math.max(0, adjustedIncome - stdDeduction);

  const brackets = input.filingStatus === "married" ? FED_BRACKETS_MFJ : FED_BRACKETS_SINGLE;
  const fedTaxAnnual = calcBracketTax(federalTaxableIncome, brackets);

  const ssTaxable = Math.min(input.annualSalary, SS_WAGE_BASE);
  const ssAnnual = ssTaxable * SS_RATE;
  const medAnnual = input.annualSalary * MEDICARE_RATE;
  let addlMedAnnual = 0;
  if (input.annualSalary > ADDL_MEDICARE_THRESHOLD) {
    addlMedAnnual = (input.annualSalary - ADDL_MEDICARE_THRESHOLD) * ADDL_MEDICARE_RATE;
  }
  const ficaAnnual = ssAnnual + medAnnual + addlMedAnnual;

  const stateInfo = STATES.find(s => s.code === input.stateCode) || STATES[0];
  const stateTaxAnnual = calcBracketTax(adjustedIncome, stateInfo.brackets);

  const postTaxPerPeriod = input.postTaxDeductions / numPeriods;
  const totalDedAnnual = preTaxTotal + fedTaxAnnual + ficaAnnual + stateTaxAnnual + input.postTaxDeductions;
  const totalDedPerPeriod = totalDedAnnual / numPeriods;
  const netAnnual = input.annualSalary - totalDedAnnual;
  const netPerPeriod = input.annualSalary / numPeriods - totalDedPerPeriod;

  return {
    grossAnnual: input.annualSalary,
    grossPerPeriod: input.annualSalary / numPeriods,
    federalTaxAnnual: fedTaxAnnual,
    federalTaxPerPeriod: fedTaxAnnual / numPeriods,
    federalTaxableIncome,
    standardDeduction: stdDeduction,
    federalEffectiveRate: (fedTaxAnnual / input.annualSalary) * 100,
    federalMarginalRate: getMarginalRate(federalTaxableIncome, input.filingStatus),
    bracketBreakdown: getBracketBreakdown(federalTaxableIncome, input.filingStatus),
    ssAnnual, ssPerPeriod: ssAnnual / numPeriods,
    medicareAnnual: medAnnual, medicarePerPeriod: medAnnual / numPeriods,
    addlMedicareAnnual: addlMedAnnual, addlMedicarePerPeriod: addlMedAnnual / numPeriods,
    ficaTotalAnnual: ficaAnnual, ficaTotalPerPeriod: ficaAnnual / numPeriods,
    ficaEffectiveRate: (ficaAnnual / input.annualSalary) * 100,
    stateTaxAnnual, stateTaxPerPeriod: stateTaxAnnual / numPeriods,
    stateEffectiveRate: (stateTaxAnnual / input.annualSalary) * 100,
    stateName: stateInfo.name,
    preTaxTotalAnnual: preTaxTotal, preTaxTotalPerPeriod: preTaxTotal / numPeriods,
    postTaxPerPeriod,
    totalDeductionsPerPeriod: totalDedPerPeriod,
    totalDeductionsAnnual: totalDedAnnual,
    netPerPeriod, netAnnual,
    numPeriods,
    totalEffectiveRate: (totalDedAnnual / input.annualSalary) * 100,
    takeHomePercent: (netAnnual / input.annualSalary) * 100,
  };
}

export const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

export const fmtShort = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);