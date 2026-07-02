"use client";

import { motion } from "framer-motion";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { FileText, Lightbulb, ChevronRight, Clock, Calculator, Landmark, Banknote, Receipt } from "lucide-react";
import { fadeIn } from "@/lib/ref-data";

function FormCard({ formNumber, title, when, purpose, keyFields, tip }: {
  formNumber: string; title: string; when: string; purpose: string; keyFields: string[]; tip: string;
}) {
  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-16 h-16 bg-emerald-600 text-white rounded-lg flex flex-col items-center justify-center">
            <span className="text-xs font-medium opacity-75">IRS</span>
            <span className="text-lg font-bold leading-tight">{formNumber}</span>
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="mt-0.5">{when}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs font-semibold mb-1">Purpose</div>
          <p className="text-sm text-muted-foreground">{purpose}</p>
        </div>
        <div>
          <div className="text-xs font-semibold mb-1.5">Key Sections</div>
          <ul className="space-y-1">
            {keyFields.map((f, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-1.5">
                <ChevronRight className="h-3 w-3 text-emerald-600 mt-1 flex-shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{tip}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FormsTab() {
  return (
    <motion.div {...fadeIn} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />Essential Payroll Forms
          </CardTitle>
          <CardDescription>Key IRS and government forms you&apos;ll encounter as an employee in the USA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormCard formNumber="W-4" title="Employee's Withholding Certificate" when="When you start a new job, or when your tax situation changes" purpose="Tells your employer how much federal income tax to withhold from each paycheck" keyFields={["Step 1: Multiple jobs or spouse works", "Step 2: Claim dependents (children under 17, other dependents)", "Step 3: Other adjustments (other income, deductions)", "Step 4: Extra withholding (optional additional amount)"]} tip="If you consistently get large refunds, reduce your withholding — that's your money you could use throughout the year!" />
          <FormCard formNumber="W-2" title="Wage and Tax Statement" when="Provided by your employer by January 31 each year" purpose="Summarizes your total earnings and all taxes withheld during the year." keyFields={["Box 1: Wages, tips, other compensation (federal taxable)", "Box 2: Federal income tax withheld", "Box 3: Social Security wages", "Box 4: Social Security tax withheld", "Box 5: Medicare wages", "Box 6: Medicare tax withheld", "Box 12: Various codes (401k, HSA, etc.)", "Box 17: State income tax withheld"]} tip="Always verify your W-2 against your last December pay stub's YTD totals." />
          <FormCard formNumber="I-9" title="Employment Eligibility Verification" when="Within 3 days of your start date" purpose="Verifies your identity and authorization to work in the United States" keyFields={["Section 1: Employee information and attestation", "Section 2: Employer reviews documents (passport, driver's license, SSN card)", "Section 3: Reverification (if work authorization expires)"]} tip="You must provide original documents (not copies)." />
          <FormCard formNumber="1099-NEC" title="Nonemployee Compensation" when="Received by January 31 if you earned $600+ as an independent contractor" purpose="Reports income you received as a freelancer, contractor, or self-employed individual" keyFields={["Box 1: Nonemployee compensation", "Box 4: Federal income tax withheld (if any)", "Box 5a/5b: State tax withheld"]} tip="As a 1099 worker, you're responsible for paying both employer and employee FICA taxes (15.3%)." />
          <FormCard formNumber="1040" title="U.S. Individual Income Tax Return" when="Filed annually by April 15 (or October 15 with extension)" purpose="Your annual tax return where you calculate your actual tax liability and reconcile with what was withheld" keyFields={["Income section: Wages (W-2), self-employment (1099), interest, dividends", "Deductions: Standard or itemized (mortgage interest, state taxes, charity)", "Tax credits: Child tax credit, education credits, EV credit", "Payments: Taxes withheld, estimated payments, prior year overpayment", "Result: Refund (if you overpaid) or Amount You Owe"]} tip="The 1040 reconciles what was withheld from your paychecks with what you actually owe." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Payroll Processing Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: "1", title: "Time Tracking", desc: "Hours worked are recorded (time clock, timesheet, or salary tracking)", icon: Clock },
              { step: "2", title: "Payroll Processing", desc: "Employer calculates gross pay, applies deductions, and withholds taxes", icon: Calculator },
              { step: "3", title: "Tax Deposits", desc: "Employer deposits withheld taxes to IRS and state (semi-weekly or monthly)", icon: Landmark },
              { step: "4", title: "Paycheck Issued", desc: "Direct deposit or paper check delivered on pay date", icon: Banknote },
              { step: "5", title: "Quarterly Reporting", desc: "Form 941 filed quarterly with IRS summarizing withheld taxes", icon: FileText },
              { step: "6", title: "Annual Reporting", desc: "W-2 provided to employee, W-3/W-2 summary filed with SSA by January 31", icon: Receipt },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">{item.step}</div>
                <div className="flex-1 pb-4 border-b last:border-0">
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}