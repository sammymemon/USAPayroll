export type Category = string;

export interface Question {
  id: string;
  category: Category;
  domain: string;
  q: string;
  a: string;
}

export const interviewQuestions: Question[] = [
  {
    "id": "1",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What is federal income tax withholding?",
    "a": "It is the amount of federal income tax an employer deducts from an employee's paycheck and remits to the IRS on the employee's behalf."
  },
  {
    "id": "2",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Who is responsible for federal tax withholding?",
    "a": "The employer is responsible for calculating, withholding, and remitting federal income taxes from employee wages."
  },
  {
    "id": "3",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "How is the amount of federal withholding determined?",
    "a": "It is based on the employee's Form W-4, filing status, income level, and the IRS withholding tables (Publication 15-T)."
  },
  {
    "id": "4",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What happens if an employee claims \"exempt\" on Form W-4?",
    "a": "No federal income tax is withheld from their wages, but they must meet specific criteria and submit a new W-4 each year by February 15."
  },
  {
    "id": "5",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Can an employer require all employees to claim a specific number of allowances?",
    "a": "No. Employees have the right to fill out Form W-4 according to their own situation."
  },
  {
    "id": "6",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What is the penalty for not withholding enough federal tax?",
    "a": "The employer may face penalties for under-withholding or late deposits, but the employee is generally responsible for paying any underpaid tax when filing their return."
  },
  {
    "id": "7",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Are bonuses and supplemental wages taxed differently?",
    "a": "Yes. Supplemental wages can be withheld at a flat 22% federal rate (or aggregated with regular wages) if over $1 million, a 37% flat rate applies."
  },
  {
    "id": "8",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What are the current federal income tax brackets?",
    "a": "They range from 10% to 37% for 2026, depending on taxable income and filing status. (Check IRS Rev. Proc. for annual updates.)"
  },
  {
    "id": "9",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Is federal withholding required on every paycheck?",
    "a": "Yes, for each pay period in which wages are paid."
  },
  {
    "id": "10",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What is backup withholding?",
    "a": "A 24% withholding rate applied to certain payments (like 1099 income) when a payee fails to provide a correct TIN or underreports income."
  },
  {
    "id": "11",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Are fringe benefits subject to federal withholding?",
    "a": "Many are, including cash bonuses, gift cards, and non-cash prizes. Some benefits like health insurance premiums are pre-tax and exempt."
  },
  {
    "id": "12",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What is the \"lock-in letter\" from the IRS?",
    "a": "A notice directing an employer to withhold federal income tax at a specific rate because the employee's prior withholding was insufficient."
  },
  {
    "id": "13",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Can an employee change their W-4 mid-year?",
    "a": "Yes, employees can submit a new W-4 anytime to adjust withholding."
  },
  {
    "id": "14",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What if an employee does not submit a W-4?",
    "a": "The employer must withhold as if the employee is single with no adjustments (similar to Step 2(c) checkbox unchecked)."
  },
  {
    "id": "15",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Are tips subject to federal income tax withholding?",
    "a": "Yes. Employees must report tips to employers, and both income tax and FICA taxes apply."
  },
  {
    "id": "16",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What is the Additional Medicare Tax?",
    "a": "A 0.9% tax on wages exceeding $200,000 (single) or $250,000 (married filing jointly), withheld only by the employer once the threshold is crossed."
  },
  {
    "id": "17",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Is severance pay subject to federal withholding?",
    "a": "Yes, severance pay is treated as wages and subject to standard withholding."
  },
  {
    "id": "18",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What is the difference between withholding allowances and the 2020 W-4 redesign?",
    "a": "The 2020 redesign eliminated allowances and replaced them with dollar amounts for other income, deductions, and dependents."
  },
  {
    "id": "19",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "Are moving expense reimbursements taxable?",
    "a": "For most employees, yes—moving expense reimbursements are taxable wages subject to withholding (except active-duty military)."
  },
  {
    "id": "20",
    "domain": "Payroll",
    "category": "Federal Income Tax Withholding (1–20)",
    "q": "What IRS publication contains the withholding tables?",
    "a": "Publication 15 (Circular E) and Publication 15-T contain the federal income tax withholding methods and tables."
  },
  {
    "id": "21",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "What does FICA stand for?",
    "a": "Federal Insurance Contributions Act."
  },
  {
    "id": "22",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "What is the total FICA tax rate?",
    "a": "15.3% of wages—12.4% for Social Security and 2.9% for Medicare, split equally between employer and employee (7.65% each)."
  },
  {
    "id": "23",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "What is the Social Security wage base limit for 2026?",
    "a": "$176,100 (subject to annual adjustment for inflation)."
  },
  {
    "id": "24",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "Is there a wage base limit for Medicare tax?",
    "a": "No. Medicare tax applies to all covered wages with no cap."
  },
  {
    "id": "25",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "What wages are subject to FICA?",
    "a": "Most cash wages, salaries, bonuses, commissions, and taxable fringe benefits."
  },
  {
    "id": "26",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "Are tips subject to FICA?",
    "a": "Yes. Both the employee and employer portions of FICA apply to reported tips."
  },
  {
    "id": "27",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "Who pays the employer's share of FICA?",
    "a": "The employer pays 7.65% (6.2% Social Security + 1.45% Medicare) on top of the employee's wages."
  },
  {
    "id": "28",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "Can an employee opt out of FICA?",
    "a": "Generally no, except for certain religious exemptions (Form 4029) or nonresident aliens under specific visa types."
  },
  {
    "id": "29",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "What is the FICA tip credit?",
    "a": "A tax credit available to food and beverage businesses for the employer's share of FICA taxes paid on employee tips."
  },
  {
    "id": "30",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "Are 1099 independent contractors subject to FICA?",
    "a": "No. They pay self-employment tax (SECA) instead, which is equivalent to both employer and employee FICA."
  },
  {
    "id": "31",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "What happens if an employer overpays FICA?",
    "a": "The employer can file Form 941-X to claim a refund or apply it to future liabilities."
  },
  {
    "id": "32",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "Is the employer's FICA contribution deductible?",
    "a": "Yes, as a business expense on the employer's tax return."
  },
  {
    "id": "33",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "Do non-cash fringe benefits count for FICA?",
    "a": "Many do, but some (like employer-paid health insurance) are exempt from FICA."
  },
  {
    "id": "34",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "What is the Student FICA Exemption?",
    "a": "Students working for the school they attend may be exempt from FICA under certain conditions."
  },
  {
    "id": "35",
    "domain": "Payroll",
    "category": "FICA — Social Security & Medicare (21–35)",
    "q": "When are FICA taxes deposited?",
    "a": "Based on the lookback period—either monthly or semi-weekly schedules, reported on Form 941."
  },
  {
    "id": "36",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "What is FUTA?",
    "a": "Federal Unemployment Tax Act—a tax paid only by employers to fund federal unemployment programs."
  },
  {
    "id": "37",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "What is the FUTA tax rate?",
    "a": "6.0% on the first $7,000 of each employee's wages, but a credit of up to 5.4% is available for state unemployment tax paid, reducing the net rate to 0.6%."
  },
  {
    "id": "38",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "Who pays FUTA?",
    "a": "Only employers. It is not deducted from employee wages."
  },
  {
    "id": "39",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "What is Form 940?",
    "a": "The annual Federal Unemployment (FUTA) Tax Return."
  },
  {
    "id": "40",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "What is a \"credit reduction state\"?",
    "a": "A state that has borrowed from the federal unemployment fund and not repaid it, causing employers in that state to lose part of the 5.4% FUTA credit."
  },
  {
    "id": "41",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "Are 1099 contractors subject to FUTA?",
    "a": "No. Only employees are subject to FUTA."
  },
  {
    "id": "42",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "What is the FUTA wage base?",
    "a": "$7,000 per employee per year."
  },
  {
    "id": "43",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "When is Form 940 due?",
    "a": "January 31 of the following year, though if all deposits were made on time, the deadline extends to February 10."
  },
  {
    "id": "44",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "Do churches and religious organizations pay FUTA?",
    "a": "Generally, no. Most tax-exempt 501(c)(3) organizations are exempt from FUTA."
  },
  {
    "id": "45",
    "domain": "Payroll",
    "category": "FUTA — Federal Unemployment Tax (36–45)",
    "q": "What happens if FUTA deposits are late?",
    "a": "The IRS imposes failure-to-deposit penalties and interest on unpaid amounts."
  },
  {
    "id": "46",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "Do all states have a state income tax?",
    "a": "No. States like Texas, Florida, Nevada, Washington, Wyoming, South Dakota, Alaska, and Tennessee have no state income tax on wages."
  },
  {
    "id": "47",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "How many states have a state unemployment tax (SUTA)?",
    "a": "All states, plus DC, Puerto Rico, and the US Virgin Islands, have their own unemployment insurance programs."
  },
  {
    "id": "48",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "What is SUTA dumping?",
    "a": "A practice where employers manipulate their workforce or business structure to get a lower unemployment tax rate—it's illegal."
  },
  {
    "id": "49",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "Are state income tax withholding rules the same as federal?",
    "a": "No. Each state has its own forms, tables, rates, and withholding thresholds."
  },
  {
    "id": "50",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "What is a reciprocal agreement between states?",
    "a": "An agreement allowing employees who live in one state but work in another to be taxed only in their state of residence."
  },
  {
    "id": "51",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "Do local taxes apply to payroll?",
    "a": "Yes. Cities like New York City, Philadelphia, and many Ohio and Pennsylvania localities impose local income or occupational taxes."
  },
  {
    "id": "52",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "What is PA Act 32?",
    "a": "Pennsylvania's law requiring uniform collection of local earned income taxes by local tax collectors."
  },
  {
    "id": "53",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "Do remote workers create state tax nexus?",
    "a": "Potentially yes. Having remote employees in a state may create income tax nexus and withholding obligations for the employer."
  },
  {
    "id": "54",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "What is the state disability insurance (SDI) tax?",
    "a": "A mandatory employee-paid tax in states like California, New York, New Jersey, Hawaii, and Rhode Island for short-term disability benefits."
  },
  {
    "id": "55",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "Are state income tax deposits due at the same time as federal?",
    "a": "Not always. Each state sets its own deposit schedule (monthly, quarterly, etc.)."
  },
  {
    "id": "56",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "What is a state withholding exemption certificate?",
    "a": "The state equivalent of Form W-4 (e.g., DE-4 for California, IT-2104 for New York)."
  },
  {
    "id": "57",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "Do states require annual reconciliation returns?",
    "a": "Yes. Most states require an annual reconciliation (like Form W-2 transmittals) to match withholding reported to wages paid."
  },
  {
    "id": "58",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "What is the New York Paid Family Leave tax?",
    "a": "A mandatory employee-paid payroll tax funding New York's Paid Family Leave program."
  },
  {
    "id": "59",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "Is there a California Employment Training Tax (ETT)?",
    "a": "Yes, a 0.1% employer-paid tax on the first $7,000 of wages, credited to the employer's UI reserve account."
  },
  {
    "id": "60",
    "domain": "Payroll",
    "category": "State & Local Payroll Taxes (46–60)",
    "q": "What is Colorado's Family and Medical Leave Insurance (FAMLI)?",
    "a": "A program funded by employer and employee payroll contributions providing paid family and medical leave."
  },
  {
    "id": "61",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "What is Form W-4 used for?",
    "a": "To determine the correct amount of federal income tax to withhold from an employee's pay."
  },
  {
    "id": "62",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "When did the W-4 change significantly?",
    "a": "The major redesign took effect in 2020, eliminating withholding allowances."
  },
  {
    "id": "63",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "What are the five steps on the 2020 W-4?",
    "a": "Step 1: Personal info; Step 2: Multiple jobs or spouse works; Step 3: Dependents; Step 4: Other adjustments; Step 5: Signature."
  },
  {
    "id": "64",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "Can an employee write \"exempt\" on the current W-4?",
    "a": "Yes, by writing \"Exempt\" under Step 4(c) and completing Steps 1 and 5."
  },
  {
    "id": "65",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "How long is an exempt W-4 valid?",
    "a": "Only until February 15 of the following year. A new W-4 must be submitted to continue exempt status."
  },
  {
    "id": "66",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "What if an employee claims too many exemptions?",
    "a": "The IRS may issue a lock-in letter, but employers should not refuse to accept a W-4 unless it is invalid (e.g., not signed)."
  },
  {
    "id": "67",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "Do employers need to submit W-4s to the IRS?",
    "a": "No, unless specifically requested by the IRS. Employers keep them on file."
  },
  {
    "id": "68",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "How long must W-4s be retained?",
    "a": "At least four years after the date the tax becomes due or is paid, whichever is later."
  },
  {
    "id": "69",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "Can an employer use an old W-4 form?",
    "a": "No. Only the current version of Form W-4 should be used for new hires. Existing employees with old W-4s do not need to fill out a new one unless they want to change withholding."
  },
  {
    "id": "70",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "What if an employee's W-4 seems incorrect?",
    "a": "The employer should accept it as submitted but may advise the employee to use the IRS Tax Withholding Estimator. The IRS may follow up directly."
  },
  {
    "id": "71",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "Does the W-4 affect state withholding?",
    "a": "No. States have their own withholding forms."
  },
  {
    "id": "72",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "Can an employee request extra withholding?",
    "a": "Yes, by entering an additional amount on Step 4(c)."
  },
  {
    "id": "73",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "What is the Two-Earners/Multiple Jobs Worksheet?",
    "a": "It was part of the pre-2020 W-4. The current W-4 uses the IRS online estimator or checkboxes in Step 2 instead."
  },
  {
    "id": "74",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "Are nonresident aliens required to use a special W-4 procedure?",
    "a": "Yes. Nonresident aliens must follow Notice 1392 and check the box in Step 2(c) and enter specific adjustments."
  },
  {
    "id": "75",
    "domain": "Payroll",
    "category": "Form W-4 — Employee's Withholding Certificate (61–75)",
    "q": "Can an employer be penalized for following an employee's W-4?",
    "a": "Generally no, unless the employer has actual knowledge that the W-4 is false."
  },
  {
    "id": "76",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is Form W-2?",
    "a": "A form reporting an employee's annual wages and the taxes withheld, sent to the employee and the Social Security Administration (SSA)."
  },
  {
    "id": "77",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "When must W-2s be furnished to employees?",
    "a": "By January 31 of the following year."
  },
  {
    "id": "78",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "When must W-2s be filed with the SSA?",
    "a": "January 31 (both paper and electronic filers)."
  },
  {
    "id": "79",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is the penalty for late W-2 filing?",
    "a": "Penalties range from $60 to $630 per form depending on how late the filing is and whether the failure was intentional."
  },
  {
    "id": "80",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "How many W-2 copies are there?",
    "a": "Six copies: Copy B (employee federal), C (employee records), 1 (state/local), 2 (state/local), D (employer), and A (SSA)."
  },
  {
    "id": "81",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is Box 1 on the W-2?",
    "a": "Wages, tips, other compensation (federal taxable wages)."
  },
  {
    "id": "82",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is Box 12?",
    "a": "A box for coded entries such as 401(k) contributions (Code D), non-taxable sick pay (Code J), or adoption benefits (Code T)."
  },
  {
    "id": "83",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is Box 14 used for?",
    "a": "Other information such as state disability insurance premiums, union dues, or educational assistance."
  },
  {
    "id": "84",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is the difference between Box 1 and Box 3?",
    "a": "Box 1 is federal taxable wages; Box 3 is Social Security wages, which may differ due to pre-tax deductions or the wage base limit."
  },
  {
    "id": "85",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "Can W-2s be furnished electronically?",
    "a": "Yes, if the employee consents electronically and the employer meets IRS disclosure requirements."
  },
  {
    "id": "86",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is a W-2c?",
    "a": "A corrected W-2 used to fix errors on a previously filed W-2."
  },
  {
    "id": "87",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is the W-3 transmittal form?",
    "a": "A summary form accompanying paper-filed W-2s. It is not required for electronic filing through the SSA's BSO portal."
  },
  {
    "id": "88",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is the ACA Box on the W-2?",
    "a": "Box 12, Code DD reports the cost of employer-sponsored health coverage (for informational purposes only, not taxable)."
  },
  {
    "id": "89",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "Are deceased employees' W-2s handled differently?",
    "a": "The final W-2 must still be issued. If wages are paid after death to a beneficiary, they may be reported on a 1099-NEC instead."
  },
  {
    "id": "90",
    "domain": "Payroll",
    "category": "Form W-2 — Wage and Tax Statement (76–90)",
    "q": "What is the Business Services Online (BSO) portal?",
    "a": "The SSA's online system for employers to file W-2s electronically and verify Social Security numbers."
  },
  {
    "id": "91",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is Form 1099-NEC?",
    "a": "Used to report payments of $600 or more to non-employees (independent contractors) for services."
  },
  {
    "id": "92",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "When is a 1099-NEC required?",
    "a": "When you pay $600 or more in a calendar year to a non-corporate independent contractor for business services."
  },
  {
    "id": "93",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is Form W-9?",
    "a": "A request for a taxpayer's TIN and certification, used to collect information before issuing a 1099."
  },
  {
    "id": "94",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "Are corporations exempt from 1099 reporting?",
    "a": "Generally yes, with exceptions for medical/healthcare payments and attorney fees."
  },
  {
    "id": "95",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is the difference between 1099-NEC and 1099-MISC?",
    "a": "1099-NEC is for non-employee compensation. 1099-MISC covers rents, prizes, royalties, and other payments."
  },
  {
    "id": "96",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "When are 1099s due to recipients?",
    "a": "January 31."
  },
  {
    "id": "97",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "When are 1099s due to the IRS?",
    "a": "January 31 for 1099-NEC; February 28 (paper) or March 31 (e-file) for 1099-MISC."
  },
  {
    "id": "98",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is the penalty for not filing 1099s?",
    "a": "$60 to $630 per form depending on lateness and whether the failure was intentional."
  },
  {
    "id": "99",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is the \"ABC Test\" for independent contractors?",
    "a": "A strict test used in some states (like California under AB5) requiring contractors to be free from control, outside usual business, and independently established."
  },
  {
    "id": "100",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is the IRS 20-factor test?",
    "a": "An older common-law test evaluating behavioral control, financial control, and relationship type to determine worker status."
  },
  {
    "id": "101",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "Can an independent contractor be paid on a W-2 and 1099 in the same year?",
    "a": "Yes, if they performed both employee and independent contractor services for the same payer."
  },
  {
    "id": "102",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is backup withholding on 1099s?",
    "a": "24% withholding required if a contractor fails to provide a TIN or underreports income."
  },
  {
    "id": "103",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "Do I issue a 1099 to an LLC?",
    "a": "Only if the LLC is taxed as a sole proprietorship or partnership. LLCs taxed as corporations generally do not receive 1099s for services."
  },
  {
    "id": "104",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is the de minimis exception for 1099s?",
    "a": "There is no de minimis exception for 1099-NEC; the $600 threshold is strict."
  },
  {
    "id": "105",
    "domain": "Payroll",
    "category": "1099s & Independent Contractors (91–105)",
    "q": "What is Form 1099-INT?",
    "a": "Used to report interest income of $10 or more paid in the course of a trade or business."
  },
  {
    "id": "106",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the Fair Labor Standards Act (FLSA)?",
    "a": "The federal law establishing minimum wage, overtime pay, recordkeeping, and child labor standards."
  },
  {
    "id": "107",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the difference between exempt and non-exempt employees?",
    "a": "Non-exempt employees are entitled to minimum wage and overtime; exempt employees are not, based on specific criteria."
  },
  {
    "id": "108",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What are the three tests for exemption?",
    "a": "Salary basis test, salary level test, and duties test."
  },
  {
    "id": "109",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the current minimum salary for exempt status?",
    "a": "$1,128 per week ($58,656 annually) effective January 1, 2025, under the 2024 DOL final rule."
  },
  {
    "id": "110",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What are the white-collar exemptions?",
    "a": "Executive, administrative, professional, computer, and outside sales exemptions."
  },
  {
    "id": "111",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the duties test for the executive exemption?",
    "a": "Primary duty managing the enterprise, directing at least two full-time employees, and authority to hire/fire (or recommendations given weight)."
  },
  {
    "id": "112",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the duties test for the administrative exemption?",
    "a": "Office/non-manual work related to management policies or general business operations, exercising discretion and independent judgment."
  },
  {
    "id": "113",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the learned professional exemption?",
    "a": "Requires advanced knowledge in a field of science or learning, acquired by prolonged specialized instruction."
  },
  {
    "id": "114",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the computer employee exemption?",
    "a": "Applies to computer systems analysts, programmers, software engineers, or similarly skilled workers paid at least $1,128/week or $27.63/hour."
  },
  {
    "id": "115",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "Are outside salespeople subject to the salary basis test?",
    "a": "No. There is no minimum salary requirement for the outside sales exemption."
  },
  {
    "id": "116",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the highly compensated employee (HCE) exemption?",
    "a": "Employees earning at least $151,164 annually (as of 2025) who perform office/non-manual work and customarily perform at least one exempt duty."
  },
  {
    "id": "117",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "Can an employer dock an exempt employee's pay?",
    "a": "Only in limited circumstances (e.g., full-day absences for personal reasons, unpaid disciplinary suspensions for violations of safety rules)."
  },
  {
    "id": "118",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What happens if an exempt employee is improperly classified?",
    "a": "The employer may owe back overtime, liquidated damages, and attorney fees."
  },
  {
    "id": "119",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "Are hourly-paid employees ever exempt?",
    "a": "Yes, certain professionals (like doctors, lawyers, teachers) and computer employees can be exempt even if paid hourly."
  },
  {
    "id": "120",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the salary basis test?",
    "a": "The employee must receive a predetermined amount constituting all or part of compensation, not subject to reduction based on quality/quantity of work."
  },
  {
    "id": "121",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "Can bonuses count toward the salary threshold?",
    "a": "Yes, nondiscretionary bonuses and incentive payments can count for up to 10% of the standard salary level."
  },
  {
    "id": "122",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the \"safe harbor\" rule for improper deductions?",
    "a": "If an employer has a clearly communicated policy and reimburses employees, it may not lose the exemption for isolated improper deductions."
  },
  {
    "id": "123",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "Are interns exempt from FLSA?",
    "a": "Most interns must be paid unless they meet the \"primary beneficiary\" test for unpaid internships."
  },
  {
    "id": "124",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "What is the \"7(i)\" exemption?",
    "a": "A retail/service establishment exemption from overtime for commission-based employees if more than half of earnings are commissions."
  },
  {
    "id": "125",
    "domain": "Payroll",
    "category": "FLSA — Exempt vs. Non-Exempt (106–125)",
    "q": "Do state exemption rules override federal rules?",
    "a": "States can have stricter rules. For example, California has its own duties tests and salary thresholds that are higher than federal."
  },
  {
    "id": "126",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "What is the federal overtime rate?",
    "a": "One and one-half times (1.5x) the regular rate for hours worked over 40 in a workweek."
  },
  {
    "id": "127",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "Is daily overtime required under federal law?",
    "a": "No, but some states (like California) require daily overtime over 8 hours."
  },
  {
    "id": "128",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "What is a \"workweek\"?",
    "a": "A fixed, regularly recurring period of 168 hours (7 consecutive 24-hour periods), established by the employer."
  },
  {
    "id": "129",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "Can an employer average hours over two weeks to avoid overtime?",
    "a": "No. Overtime is calculated on a per-workweek basis under federal law."
  },
  {
    "id": "130",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "What is the regular rate of pay?",
    "a": "Total remuneration divided by total hours worked, used to calculate the overtime premium."
  },
  {
    "id": "131",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "Are bonuses included in the regular rate?",
    "a": "Non-discretionary bonuses must be included; discretionary bonuses generally are excluded."
  },
  {
    "id": "132",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "What is \"Chinese overtime\" or the fluctuating workweek method?",
    "a": "A method where a salaried non-exempt employee's regular rate fluctuates based on hours worked, resulting in a half-time overtime premium."
  },
  {
    "id": "133",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "Can an employer require overtime?",
    "a": "Yes. The FLSA does not limit the number of hours employees aged 16+ may work."
  },
  {
    "id": "134",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "Is \"comp time\" legal for private sector non-exempt employees?",
    "a": "No. Private employers must pay overtime in cash; comp time is generally only for public sector employees."
  },
  {
    "id": "135",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "What is the minimum wage under federal law?",
    "a": "$7.25 per hour (as of 2026; unchanged since 2009)."
  },
  {
    "id": "136",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "Do states have higher minimum wages?",
    "a": "Yes. Many states and cities have minimum wages significantly higher than federal (e.g., California, Washington, New York)."
  },
  {
    "id": "137",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "What is the tipped minimum wage?",
    "a": "$2.13 per hour under federal law, provided tips bring the employee to at least $7.25/hour (the tip credit cannot exceed $5.12/hour)."
  },
  {
    "id": "138",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "What is a tip credit?",
    "a": "The amount an employer can count from tips toward meeting the minimum wage obligation."
  },
  {
    "id": "139",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "Are meal breaks required by federal law?",
    "a": "No. The FLSA does not require meal or rest breaks, but short breaks (5-20 minutes) must be paid."
  },
  {
    "id": "140",
    "domain": "Payroll",
    "category": "Overtime & Wage/Hour (126–140)",
    "q": "What is the Portal-to-Portal Act?",
    "a": "Limits FLSA compensation to activities that are integral and indispensable to principal activities."
  },
  {
    "id": "141",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is a wage garnishment?",
    "a": "A legal order requiring an employer to withhold a portion of an employee's wages to pay a debt."
  },
  {
    "id": "142",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is the maximum amount that can be garnished under federal law?",
    "a": "The lesser of 25% of disposable earnings or the amount by which disposable earnings exceed 30 times the federal minimum wage."
  },
  {
    "id": "143",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is disposable earnings?",
    "a": "Gross pay minus legally required deductions (federal, state, and local taxes; Social Security; Medicare; state unemployment)."
  },
  {
    "id": "144",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "Can an employer fire an employee for having one garnishment?",
    "a": "No. Federal law (Title III of the CCPA) prohibits termination for a single garnishment."
  },
  {
    "id": "145",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is a child support garnishment?",
    "a": "An order to withhold wages for child support, which can take up to 50-65% of disposable earnings depending on circumstances."
  },
  {
    "id": "146",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is an IRS wage levy?",
    "a": "A seizure of wages by the IRS for unpaid taxes, which takes precedence over most other garnishments."
  },
  {
    "id": "147",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "Are voluntary deductions like 401(k) included in garnishment limits?",
    "a": "Generally no. Garnishment limits apply to disposable earnings after mandatory deductions, not voluntary ones."
  },
  {
    "id": "148",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is a uniform deduction?",
    "a": "Deductions for uniforms are permissible only if they do not reduce wages below minimum wage or overtime compensation."
  },
  {
    "id": "149",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "Can an employer deduct for cash register shortages?",
    "a": "Only if the deduction does not bring pay below minimum wage or cut into overtime, and the employee consents in some states."
  },
  {
    "id": "150",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is the Consumer Credit Protection Act (CCPA)?",
    "a": "Federal law limiting garnishment amounts and protecting employees from termination due to garnishment."
  },
  {
    "id": "151",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "Do state garnishment laws override federal limits?",
    "a": "States can impose stricter limits (lower percentages) but cannot allow more than federal law permits."
  },
  {
    "id": "152",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is a \"garnishment priority\"?",
    "a": "The order in which multiple garnishments are satisfied—typically child support first, then tax levies, then creditor garnishments."
  },
  {
    "id": "153",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "Can an employer charge a fee for processing garnishments?",
    "a": "Some states allow a small administrative fee, often capped (e.g., $1-$10 per garnishment)."
  },
  {
    "id": "154",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "What is a student loan garnishment?",
    "a": "Up to 15% of disposable earnings can be garnished for federal student loan default."
  },
  {
    "id": "155",
    "domain": "Payroll",
    "category": "Payroll Deductions & Garnishments (141–155)",
    "q": "Are bankruptcy orders treated differently?",
    "a": "Yes. Bankruptcy court orders may have different priority rules and withholding requirements."
  },
  {
    "id": "156",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "What are common payroll frequencies?",
    "a": "Weekly, biweekly, semimonthly, and monthly."
  },
  {
    "id": "157",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "Is there a federal requirement for pay frequency?",
    "a": "No federal mandate, but most states have specific requirements for how frequently employees must be paid."
  },
  {
    "id": "158",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "What is a pay period?",
    "a": "The recurring length of time for which an employee is paid."
  },
  {
    "id": "159",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "What is a pay date?",
    "a": "The actual date on which wages are made available to the employee."
  },
  {
    "id": "160",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "Can an employer change the pay schedule?",
    "a": "Yes, but generally must notify employees in advance and comply with state law timing requirements."
  },
  {
    "id": "161",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "What is a lag payroll?",
    "a": "A system where the pay period ends before the pay date, allowing time for payroll processing."
  },
  {
    "id": "162",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "What is the difference between biweekly and semimonthly?",
    "a": "Biweekly = 26 pay periods/year (every two weeks). Semimonthly = 24 pay periods/year (twice a month)."
  },
  {
    "id": "163",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "Are there extra pay periods in some years for biweekly payroll?",
    "a": "Yes, in some years there are 27 biweekly pay periods instead of 26."
  },
  {
    "id": "164",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "What is an off-cycle payroll?",
    "a": "A special payroll run outside the normal schedule for corrections, terminations, or bonuses."
  },
  {
    "id": "165",
    "domain": "Payroll",
    "category": "Payroll Schedules & Timing (156–165)",
    "q": "Do states require final pay immediately upon termination?",
    "a": "Some states (like California) require final pay immediately; others allow until the next regular payday."
  },
  {
    "id": "166",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "Can an employer require direct deposit?",
    "a": "Under federal law, yes, but some states require employees to have the option of receiving a paper check."
  },
  {
    "id": "167",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "What is the Electronic Fund Transfer Act (EFTA)?",
    "a": "Federal law governing electronic transfers, including direct deposit of wages."
  },
  {
    "id": "168",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "Can an employer require direct deposit to a specific bank?",
    "a": "No. Employees must be able to choose their financial institution."
  },
  {
    "id": "169",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "What is a paycard?",
    "a": "A prepaid debit card onto which wages are loaded, offered as an alternative to direct deposit or checks."
  },
  {
    "id": "170",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "Are paycard fees regulated?",
    "a": "Yes. Federal and state laws require disclosure and limit certain fees."
  },
  {
    "id": "171",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "Can an employer charge for direct deposit?",
    "a": "Generally no. Employers typically bear the cost of direct deposit."
  },
  {
    "id": "172",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "What is same-day ACH?",
    "a": "An ACH network capability allowing payroll funds to be available on the same day they are transmitted."
  },
  {
    "id": "173",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "Is a pay stub required?",
    "a": "Federal law does not require it, but most states mandate itemized pay statements."
  },
  {
    "id": "174",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "What information must a pay stub include?",
    "a": "Typically: gross wages, deductions, net pay, pay period dates, hours worked, and employer info (varies by state)."
  },
  {
    "id": "175",
    "domain": "Payroll",
    "category": "Direct Deposit & Pay Delivery (166–175)",
    "q": "Can an employer pay in cash?",
    "a": "Yes, but it must still comply with tax withholding, reporting, and recordkeeping requirements."
  },
  {
    "id": "176",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "How long must payroll records be kept under FLSA?",
    "a": "At least three years."
  },
  {
    "id": "177",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "What records must be kept for each non-exempt employee?",
    "a": "Personal info, hours worked daily/weekly, basis of pay, regular hourly rate, daily/weekly earnings, overtime earnings, deductions, and net wages."
  },
  {
    "id": "178",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "How long must FICA tax records be kept?",
    "a": "At least four years after the tax becomes due or is paid, whichever is later."
  },
  {
    "id": "179",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "How long must Form 941 be retained?",
    "a": "At least four years."
  },
  {
    "id": "180",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "What is the penalty for not keeping payroll records?",
    "a": "Fines and potential criminal penalties; inability to defend against wage claims."
  },
  {
    "id": "181",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "Are electronic payroll records acceptable?",
    "a": "Yes, if they meet IRS and DOL requirements for integrity, accuracy, and accessibility."
  },
  {
    "id": "182",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "What is the \"trust fund recovery penalty\"?",
    "a": "A penalty assessed personally against responsible individuals who willfully fail to withhold or pay over trust fund taxes (income tax, FICA)."
  },
  {
    "id": "183",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "Can the IRS hold a business owner personally liable for unpaid payroll taxes?",
    "a": "Yes, under the Trust Fund Recovery Penalty (TFRP), responsible persons can be held personally liable."
  },
  {
    "id": "184",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "What is a \"responsible person\" for TFRP purposes?",
    "a": "Someone with the duty to collect, account for, and pay over trust fund taxes who willfully fails to do so."
  },
  {
    "id": "185",
    "domain": "Payroll",
    "category": "Payroll Records & Retention (176–185)",
    "q": "How long should timekeeping records be kept?",
    "a": "Best practice is at least three years, though some states require longer retention."
  },
  {
    "id": "186",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is the Affordable Care Act (ACA) employer mandate?",
    "a": "Applicable Large Employers (ALEs) with 50+ full-time equivalent employees must offer affordable, minimum value coverage or face penalties."
  },
  {
    "id": "187",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is an Applicable Large Employer (ALE)?",
    "a": "An employer with an average of 50 or more full-time equivalent employees during the prior calendar year."
  },
  {
    "id": "188",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is a full-time employee under ACA?",
    "a": "An employee working an average of at least 30 hours per week or 130 hours per month."
  },
  {
    "id": "189",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is Form 1095-C?",
    "a": "A statement provided to full-time employees showing health coverage offered by an ALE."
  },
  {
    "id": "190",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is Form 1094-C?",
    "a": "A transmittal form summarizing 1095-C information filed with the IRS by ALEs."
  },
  {
    "id": "191",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "When are 1095-Cs due to employees?",
    "a": "By January 31 (or March 2 if extended)."
  },
  {
    "id": "192",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is the ACA \"pay or play\" penalty?",
    "a": "Penalty under IRC 4980H for ALEs that fail to offer coverage (Part A: ~$2,900/employee) or offer unaffordable coverage (Part B: ~$4,500/employee, indexed annually)."
  },
  {
    "id": "193",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is minimum essential coverage (MEC)?",
    "a": "The type of coverage that satisfies the ACA individual mandate (though the federal penalty is zero, some states have mandates)."
  },
  {
    "id": "194",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is the affordability safe harbor?",
    "a": "Methods (W-2, rate of pay, federal poverty line) ALEs can use to determine if coverage is affordable."
  },
  {
    "id": "195",
    "domain": "Payroll",
    "category": "ACA & Benefits Reporting (186–195)",
    "q": "What is COBRA?",
    "a": "A law requiring employers with 20+ employees to offer continuation of group health coverage after qualifying events."
  },
  {
    "id": "196",
    "domain": "Payroll",
    "category": "State-Specific & Miscellaneous (196–200)",
    "q": "What is California's overtime rule?",
    "a": "Overtime after 8 hours in a day or 40 in a week; double time after 12 hours in a day or 8 hours on the seventh consecutive day."
  },
  {
    "id": "197",
    "domain": "Payroll",
    "category": "State-Specific & Miscellaneous (196–200)",
    "q": "What is New York's \"Spread of Hours\" pay?",
    "a": "An extra hour at minimum wage if a non-exempt employee's workday spans more than 10 hours."
  },
  {
    "id": "198",
    "domain": "Payroll",
    "category": "State-Specific & Miscellaneous (196–200)",
    "q": "What is Texas's final paycheck rule?",
    "a": "Final pay is due on the next regular payday after termination or resignation."
  },
  {
    "id": "199",
    "domain": "Payroll",
    "category": "State-Specific & Miscellaneous (196–200)",
    "q": "What is Washington state's paid sick leave law?",
    "a": "Employees accrue at least 1 hour of paid sick leave for every 40 hours worked."
  },
  {
    "id": "200",
    "domain": "Payroll",
    "category": "State-Specific & Miscellaneous (196–200)",
    "q": "What is the most common payroll compliance mistake?",
    "a": "Misclassifying employees as independent contractors, which leads to failure to withhold taxes, pay unemployment tax, and provide benefits—resulting in significant penalties, back taxes, and interest."
  }
  ,
  {
    "id": "BK1",
    "domain": "Bookkeeping",
    "category": "General Bookkeeping",
    "q": "What is double-entry bookkeeping?",
    "a": "Double-entry bookkeeping is an accounting system where every transaction affects at least two accounts, keeping the accounting equation balanced (Assets = Liabilities + Equity)."
  },
  {
    "id": "BK2",
    "domain": "Bookkeeping",
    "category": "Accounts Payable",
    "q": "What is Accounts Payable (AP)?",
    "a": "Accounts Payable represents the money a company owes to its creditors or suppliers for goods and services purchased on credit."
  },
  {
    "id": "TX1",
    "domain": "Taxation",
    "category": "Corporate Tax",
    "q": "What is the federal corporate income tax rate in the USA as of 2026?",
    "a": "Under current law (TCJA), the federal corporate income tax rate is a flat 21%."
  },
  {
    "id": "TX2",
    "domain": "Taxation",
    "category": "Sales Tax",
    "q": "Is there a federal sales tax in the USA?",
    "a": "No, there is no federal sales tax. Sales taxes are imposed at the state and local levels, leading to thousands of different tax jurisdictions."
  }

];
