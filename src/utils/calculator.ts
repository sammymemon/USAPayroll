

// 2026 Federal Income Tax Brackets - Single
const FEDERAL_BRACKETS_SINGLE = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11925, max: 48475, rate: 0.12 },
  { min: 48475, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250525, rate: 0.32 },
  { min: 250525, max: 626350, rate: 0.35 },
  { min: 626350, max: Infinity, rate: 0.37 },
];

// 2026 Federal Income Tax Brackets - Married Filing Jointly
const FEDERAL_BRACKETS_MFJ = [
  { min: 0, max: 23850, rate: 0.10 },
  { min: 23850, max: 96950, rate: 0.12 },
  { min: 96950, max: 206700, rate: 0.22 },
  { min: 206700, max: 394600, rate: 0.24 },
  { min: 394600, max: 501050, rate: 0.32 },
  { min: 501050, max: 751600, rate: 0.35 },
  { min: 751600, max: Infinity, rate: 0.37 },
];

// 2026 Standard Deductions (post-OBBBA)
const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 16100,
  married: 32200,
  head_of_household: 24150,
};

// 2026 Social Security Wage Base
const SS_WAGE_BASE = 184500;
const SS_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;

// State income tax data (representative sample)
const STATE_TAX_DATA: Record<string, { name: string; flat: boolean; brackets: { min: number; max: number; rate: number }[] }> = {
  TX: { name: "Texas", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  FL: { name: "Florida", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  WA: { name: "Washington", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  NV: { name: "Nevada", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  WY: { name: "Wyoming", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  AK: { name: "Alaska", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  SD: { name: "South Dakota", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  TN: { name: "Tennessee", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  NH: { name: "New Hampshire", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0 }] },
  IL: { name: "Illinois", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0495 }] },
  IN: { name: "Indiana", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0305 }] },
  PA: { name: "Pennsylvania", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0307 }] },
  MI: { name: "Michigan", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0425 }] },
  CO: { name: "Colorado", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.044 }] },
  NC: { name: "North Carolina", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.045 }] },
  AZ: { name: "Arizona", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.025 }] },
  GA: { name: "Georgia", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.0549 }] },
  MA: { name: "Massachusetts", flat: true, brackets: [{ min: 0, max: Infinity, rate: 0.05 }] },
  CA: {
    name: "California",
    flat: false,
    brackets: [
      { min: 0, max: 10412, rate: 0.01 },
      { min: 10412, max: 24684, rate: 0.02 },
      { min: 24684, max: 38959, rate: 0.04 },
      { min: 38959, max: 54081, rate: 0.06 },
      { min: 54081, max: 68350, rate: 0.08 },
      { min: 68350, max: 349137, rate: 0.093 },
      { min: 349137, max: 418961, rate: 0.103 },
      { min: 418961, max: 698271, rate: 0.113 },
      { min: 698271, max: Infinity, rate: 0.123 },
    ],
  },
  NY: {
    name: "New York",
    flat: false,
    brackets: [
      { min: 0, max: 8500, rate: 0.04 },
      { min: 8500, max: 11700, rate: 0.045 },
      { min: 11700, max: 13900, rate: 0.0525 },
      { min: 13900, max: 80650, rate: 0.055 },
      { min: 80650, max: 215400, rate: 0.06 },
      { min: 215400, max: 1077550, rate: 0.0685 },
      { min: 1077550, max: 5000000, rate: 0.0965 },
      { min: 5000000, max: 25000000, rate: 0.103 },
      { min: 25000000, max: Infinity, rate: 0.109 },
    ],
  },
  NJ: {
    name: "New Jersey",
    flat: false,
    brackets: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20000, max: 35000, rate: 0.0175 },
      { min: 35000, max: 40000, rate: 0.0245 },
      { min: 40000, max: 50000, rate: 0.035 },
      { min: 50000, max: 70000, rate: 0.05525 },
      { min: 70000, max: 80000, rate: 0.0637 },
      { min: 80000, max: 150000, rate: 0.0897 },
      { min: 150000, max: 500000, rate: 0.10375 },
      { min: 500000, max: 5000000, rate: 0.1075 },
      { min: 5000000, max: Infinity, rate: 0.1075 },
    ],
  },
  OR: {
    name: "Oregon",
    flat: false,
    brackets: [
      { min: 0, max: 3650, rate: 0.0475 },
      { min: 3650, max: 9200, rate: 0.0675 },
      { min: 9200, max: 125000, rate: 0.0875 },
      { min: 125000, max: 250000, rate: 0.099 },
      { min: 250000, max: Infinity, rate: 0.099 },
    ],
  },
  HI: {
    name: "Hawaii",
    flat: false,
    brackets: [
      { min: 0, max: 2400, rate: 0.014 },
      { min: 2400, max: 4800, rate: 0.032 },
      { min: 4800, max: 9600, rate: 0.055 },
      { min: 9600, max: 14400, rate: 0.064 },
      { min: 14400, max: 19200, rate: 0.068 },
      { min: 19200, max: 32000, rate: 0.072 },
      { min: 32000, max: 64000, rate: 0.076 },
      { min: 64000, max: 160000, rate: 0.079 },
      { min: 160000, max: 320000, rate: 0.0825 },
      { min: 320000, max: 400000, rate: 0.09 },
      { min: 400000, max: Infinity, rate: 0.11 },
    ],
  },
  CT: {
    name: "Connecticut",
    flat: false,
    brackets: [
      { min: 0, max: 10000, rate: 0.03 },
      { min: 10000, max: 50000, rate: 0.05 },
      { min: 50000, max: 100000, rate: 0.055 },
      { min: 100000, max: 200000, rate: 0.06 },
      { min: 200000, max: 250000, rate: 0.065 },
      { min: 250000, max: 500000, rate: 0.069 },
      { min: 500000, max: Infinity, rate: 0.0699 },
    ],
  },
  OH: {
    name: "Ohio",
    flat: false,
    brackets: [
      { min: 0, max: 26550, rate: 0.0 },
      { min: 26550, max: 53150, rate: 0.0269 },
      { min: 53150, max: 79700, rate: 0.0322 },
      { min: 79700, max: 106050, rate: 0.037 },
      { min: 106050, max: Infinity, rate: 0.0399 },
    ],
  },
  VA: {
    name: "Virginia",
    flat: false,
    brackets: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3000, max: 5000, rate: 0.03 },
      { min: 5000, max: 17000, rate: 0.05 },
      { min: 17000, max: Infinity, rate: 0.0575 },
    ],
  },
  MD: {
    name: "Maryland",
    flat: false,
    brackets: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 2000, rate: 0.03 },
      { min: 2000, max: 3000, rate: 0.04 },
      { min: 3000, max: 100000, rate: 0.0475 },
      { min: 100000, max: 125000, rate: 0.05 },
      { min: 125000, max: 150000, rate: 0.0525 },
      { min: 150000, max: 250000, rate: 0.055 },
      { min: 250000, max: Infinity, rate: 0.0575 },
    ],
  },
  MN: {
    name: "Minnesota",
    flat: false,
    brackets: [
      { min: 0, max: 30870, rate: 0.0535 },
      { min: 30870, max: 103530, rate: 0.068 },
      { min: 103530, max: 183340, rate: 0.0785 },
      { min: 183340, max: Infinity, rate: 0.0985 },
    ],
  },
};

function calculateBracketTax(
  income: number,
  brackets: { min: number; max: number; rate: number }[]
): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }
  return tax;
}

function calculateFederalTax(annualIncome: number, filingStatus: string): number {
  const brackets =
    filingStatus === "married" ? FEDERAL_BRACKETS_MFJ : FEDERAL_BRACKETS_SINGLE;
  return calculateBracketTax(annualIncome, brackets);
}

function calculateStateTax(annualIncome: number, stateCode: string): number {
  const stateData = STATE_TAX_DATA[stateCode];
  if (!stateData) return 0;
  return calculateBracketTax(annualIncome, stateData.brackets);
}

function getMarginalRate(taxableIncome: number, filingStatus: string): number {
  const brackets =
    filingStatus === "married" ? FEDERAL_BRACKETS_MFJ : FEDERAL_BRACKETS_SINGLE;
  let marginalRate = 0;
  for (const bracket of brackets) {
    if (taxableIncome > bracket.min) {
      marginalRate = bracket.rate;
    } else {
      break;
    }
  }
  return marginalRate * 100;
}

function getBracketBreakdown(taxableIncome: number, filingStatus: string) {
  const brackets =
    filingStatus === "married" ? FEDERAL_BRACKETS_MFJ : FEDERAL_BRACKETS_SINGLE;
  return brackets.map((b) => {
    const incomeInBracket = Math.max(0, Math.min(taxableIncome, b.max) - b.min);
    const taxInBracket = incomeInBracket * b.rate;
    return {
      min: b.min,
      max: b.max === Infinity ? null : b.max,
      rate: b.rate * 100,
      taxableAmount: incomeInBracket,
      taxAmount: taxInBracket,
    };
  });
}

export function calculatePayroll(body: any) {
  try {
    
    const {
      annualSalary,
      payFrequency,
      filingStatus = "single",
      stateCode = "CA",
      preTax401k = 0,
      preTaxHealthInsurance = 0,
      preTaxHSA = 0,
      otherPreTax = 0,
      postTaxDeductions = 0,
    } = body;

    if (!annualSalary || annualSalary <= 0) {
      return { error: "Annual salary must be positive" };
    }

    const validFrequencies = ["annual", "semi_monthly", "biweekly", "monthly", "weekly"];
    if (!payFrequency || !validFrequencies.includes(payFrequency)) {
      return { error: "Invalid pay frequency" };
    }

    const periodsPerYear: Record<string, number> = {
      annual: 1,
      semi_monthly: 24,
      biweekly: 26,
      monthly: 12,
      weekly: 52,
    };
    const numPeriods = periodsPerYear[payFrequency];

    // Pre-tax deductions (annual)
    const totalPreTaxDeductions =
      (preTax401k || 0) +
      (preTaxHealthInsurance || 0) +
      (preTaxHSA || 0) +
      (otherPreTax || 0);

    const adjustedIncome = Math.max(0, annualSalary - totalPreTaxDeductions);
    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus] || STANDARD_DEDUCTIONS.single;
    const federalTaxableIncome = Math.max(0, adjustedIncome - standardDeduction);

    // Federal income tax
    const federalTaxAnnual = calculateFederalTax(federalTaxableIncome, filingStatus);
    const federalTaxPerPeriod = federalTaxAnnual / numPeriods;

    // FICA taxes (Section 125 Health and HSA are exempt from FICA, but 401k is NOT exempt)
    const section125Deductions = (preTaxHealthInsurance || 0) + (preTaxHSA || 0);
    const ficaTaxableWages = Math.max(0, annualSalary - section125Deductions);
    
    const ssTaxableWages = Math.min(ficaTaxableWages, SS_WAGE_BASE);
    const socialSecurityAnnual = ssTaxableWages * SS_RATE;
    const socialSecurityPerPeriod = socialSecurityAnnual / numPeriods;

    const medicareAnnual = ficaTaxableWages * MEDICARE_RATE;
    const medicarePerPeriod = medicareAnnual / numPeriods;

    let additionalMedicareAnnual = 0;
    let additionalMedicarePerPeriod = 0;
    if (ficaTaxableWages > ADDITIONAL_MEDICARE_THRESHOLD) {
      additionalMedicareAnnual =
        (ficaTaxableWages - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE;
      additionalMedicarePerPeriod = additionalMedicareAnnual / numPeriods;
    }

    const totalFicaAnnual =
      socialSecurityAnnual + medicareAnnual + additionalMedicareAnnual;
    const totalFicaPerPeriod =
      socialSecurityPerPeriod + medicarePerPeriod + additionalMedicarePerPeriod;

    // State tax
    const stateTaxAnnual = calculateStateTax(adjustedIncome, stateCode);
    const stateTaxPerPeriod = stateTaxAnnual / numPeriods;

    // Per-period calculations
    const preTaxDeductionsPerPeriod = totalPreTaxDeductions / numPeriods;
    const postTaxDeductionsPerPeriod = (postTaxDeductions || 0) / numPeriods;

    const totalDeductionsPerPeriod =
      preTaxDeductionsPerPeriod +
      federalTaxPerPeriod +
      totalFicaPerPeriod +
      stateTaxPerPeriod +
      postTaxDeductionsPerPeriod;

    const grossPayPerPeriod = annualSalary / numPeriods;
    const netPayPerPeriod = grossPayPerPeriod - totalDeductionsPerPeriod;

    // Annual totals
    const totalDeductionsAnnual =
      totalPreTaxDeductions +
      federalTaxAnnual +
      totalFicaAnnual +
      stateTaxAnnual +
      (postTaxDeductions || 0);

    const netPayAnnual = annualSalary - totalDeductionsAnnual;

    // Effective tax rates
    const effectiveFederalRate =
      annualSalary > 0 ? (federalTaxAnnual / annualSalary) * 100 : 0;
    const effectiveFicaRate =
      annualSalary > 0 ? (totalFicaAnnual / annualSalary) * 100 : 0;
    const effectiveStateRate =
      annualSalary > 0 ? (stateTaxAnnual / annualSalary) * 100 : 0;
    const totalEffectiveRate =
      annualSalary > 0 ? (totalDeductionsAnnual / annualSalary) * 100 : 0;
    const marginalFederalRate = getMarginalRate(federalTaxableIncome, filingStatus);

    return {
      summary: {
        grossPayPerPeriod,
        netPayPerPeriod,
        grossPayAnnual: annualSalary,
        netPayAnnual,
        totalDeductionsPerPeriod,
        totalDeductionsAnnual,
      },
      federalTax: {
        taxableIncome: federalTaxableIncome,
        standardDeduction,
        taxAnnual: federalTaxAnnual,
        taxPerPeriod: federalTaxPerPeriod,
        effectiveRate: effectiveFederalRate,
        marginalRate: marginalFederalRate,
        brackets: getBracketBreakdown(federalTaxableIncome, filingStatus),
      },
      fica: {
        socialSecurity: {
          annual: socialSecurityAnnual,
          perPeriod: socialSecurityPerPeriod,
          wageBase: SS_WAGE_BASE,
          rate: SS_RATE,
        },
        medicare: {
          annual: medicareAnnual,
          perPeriod: medicarePerPeriod,
          rate: MEDICARE_RATE,
        },
        additionalMedicare: {
          annual: additionalMedicareAnnual,
          perPeriod: additionalMedicarePerPeriod,
          threshold: ADDITIONAL_MEDICARE_THRESHOLD,
          rate: ADDITIONAL_MEDICARE_RATE,
        },
        totalAnnual: totalFicaAnnual,
        totalPerPeriod: totalFicaPerPeriod,
        effectiveRate: effectiveFicaRate,
      },
      stateTax: {
        stateCode,
        stateName: STATE_TAX_DATA[stateCode]?.name || "Unknown",
        taxAnnual: stateTaxAnnual,
        taxPerPeriod: stateTaxPerPeriod,
        effectiveRate: effectiveStateRate,
        hasStateTax: stateTaxAnnual > 0,
      },
      deductions: {
        preTax401kPerPeriod: (preTax401k || 0) / numPeriods,
        preTaxHealthInsurancePerPeriod: (preTaxHealthInsurance || 0) / numPeriods,
        preTaxHSAPerPeriod: (preTaxHSA || 0) / numPeriods,
        otherPreTaxPerPeriod: (otherPreTax || 0) / numPeriods,
        postTaxPerPeriod: postTaxDeductionsPerPeriod,
        totalPreTaxPerPeriod: preTaxDeductionsPerPeriod,
        totalPreTaxAnnual: totalPreTaxDeductions,
      },
      effectiveRates: {
        federal: effectiveFederalRate,
        fica: effectiveFicaRate,
        state: effectiveStateRate,
        total: totalEffectiveRate,
      },
      payFrequency,
      numPeriods,
      filingStatus,
    };
  } catch {
    return { error: "Invalid request body" };
  }
}

// GET: Return tax reference data
export function getTaxReferenceData() {
  return {
    federalBracketsSingle: FEDERAL_BRACKETS_SINGLE.map((b) => ({
      min: b.min,
      max: b.max === Infinity ? null : b.max,
      rate: b.rate * 100,
    })),
    federalBracketsMarried: FEDERAL_BRACKETS_MFJ.map((b) => ({
      min: b.min,
      max: b.max === Infinity ? null : b.max,
      rate: b.rate * 100,
    })),
    standardDeductions: STANDARD_DEDUCTIONS,
    fica: {
      socialSecurityRate: SS_RATE * 100,
      socialSecurityWageBase: SS_WAGE_BASE,
      medicareRate: MEDICARE_RATE * 100,
      additionalMedicareRate: ADDITIONAL_MEDICARE_RATE * 100,
      additionalMedicareThreshold: ADDITIONAL_MEDICARE_THRESHOLD,
    },
    states: Object.entries(STATE_TAX_DATA).map(([code, data]) => ({
      code,
      name: data.name,
      hasIncomeTax: data.brackets.some((b) => b.rate > 0),
      flatTax: data.flat,
      topRate: Math.max(...data.brackets.map((b) => b.rate)) * 100,
    })),
  };
}
