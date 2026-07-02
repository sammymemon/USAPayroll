export { calculatePayroll, type CalcResult } from "./tax-engine";

export const REF_DATA = {
  federalBracketsSingle: [
    { min: 0, max: 11600, rate: 10 },
    { min: 11600, max: 47150, rate: 12 },
    { min: 47150, max: 100525, rate: 22 },
    { min: 100525, max: 191950, rate: 24 },
    { min: 191950, max: 243725, rate: 32 },
    { min: 243725, max: 609350, rate: 35 },
    { min: 609350, max: null, rate: 37 },
  ],
  federalBracketsMarried: [
    { min: 0, max: 23200, rate: 10 },
    { min: 23200, max: 94300, rate: 12 },
    { min: 94300, max: 201050, rate: 22 },
    { min: 201050, max: 383900, rate: 24 },
    { min: 383900, max: 487450, rate: 32 },
    { min: 487450, max: 731200, rate: 35 },
    { min: 731200, max: null, rate: 37 },
  ],
  standardDeductions: { single: 14600, married: 29200, head_of_household: 21900 } as Record<string, number>,
  states: [
    { code: "TX", name: "Texas", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "FL", name: "Florida", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "WA", name: "Washington", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "NV", name: "Nevada", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "WY", name: "Wyoming", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "AK", name: "Alaska", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "SD", name: "South Dakota", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "TN", name: "Tennessee", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "NH", name: "New Hampshire", hasIncomeTax: false, flatTax: true, topRate: 0 },
    { code: "IL", name: "Illinois", hasIncomeTax: true, flatTax: true, topRate: 4.95 },
    { code: "IN", name: "Indiana", hasIncomeTax: true, flatTax: true, topRate: 3.05 },
    { code: "PA", name: "Pennsylvania", hasIncomeTax: true, flatTax: true, topRate: 3.07 },
    { code: "MI", name: "Michigan", hasIncomeTax: true, flatTax: true, topRate: 4.25 },
    { code: "CO", name: "Colorado", hasIncomeTax: true, flatTax: true, topRate: 4.4 },
    { code: "NC", name: "North Carolina", hasIncomeTax: true, flatTax: true, topRate: 4.5 },
    { code: "AZ", name: "Arizona", hasIncomeTax: true, flatTax: true, topRate: 2.5 },
    { code: "GA", name: "Georgia", hasIncomeTax: true, flatTax: true, topRate: 5.49 },
    { code: "MA", name: "Massachusetts", hasIncomeTax: true, flatTax: true, topRate: 5 },
    { code: "CA", name: "California", hasIncomeTax: true, flatTax: false, topRate: 12.3 },
    { code: "NY", name: "New York", hasIncomeTax: true, flatTax: false, topRate: 10.9 },
    { code: "NJ", name: "New Jersey", hasIncomeTax: true, flatTax: false, topRate: 10.75 },
    { code: "OR", name: "Oregon", hasIncomeTax: true, flatTax: false, topRate: 9.9 },
    { code: "HI", name: "Hawaii", hasIncomeTax: true, flatTax: false, topRate: 11 },
    { code: "CT", name: "Connecticut", hasIncomeTax: true, flatTax: false, topRate: 6.99 },
    { code: "OH", name: "Ohio", hasIncomeTax: true, flatTax: false, topRate: 3.99 },
    { code: "VA", name: "Virginia", hasIncomeTax: true, flatTax: false, topRate: 5.75 },
    { code: "MD", name: "Maryland", hasIncomeTax: true, flatTax: false, topRate: 5.75 },
    { code: "MN", name: "Minnesota", hasIncomeTax: true, flatTax: false, topRate: 9.85 },
  ],
};

export const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

export const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};