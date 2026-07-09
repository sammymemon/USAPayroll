"use client";

import { motion } from "framer-motion";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Receipt } from "lucide-react";
import { calculatePayroll, fadeIn } from "@/lib/ref-data";
import PayStubView from "./pay-stub-view";

const PAY_STUB_RESULT = calculatePayroll({
  annualSalary: 85000, payFrequency: "biweekly", filingStatus: "single",
  stateCode: "CA", preTax401k: 4000, preTaxHealthInsurance: 2400,
  preTaxHSA: 0, postTaxDeductions: 0,
});

export default function PayStubTab() {

  return (
    <motion.div {...fadeIn} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-emerald-600" />Understanding Your Pay Stub
          </CardTitle>
          <CardDescription>A real-world example of a typical pay stub. Hover over each section to understand what it means.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>Your pay stub (also called an earnings statement or paycheck stub) is a document from your employer showing your earnings and deductions for a specific pay period. Understanding each line is essential for verifying you&apos;re being paid correctly.</p>
        </CardContent>
      </Card>

      {<PayStubView result={PAY_STUB_RESULT} />}

      <Card>
        <CardHeader><CardTitle className="text-base">Key Pay Stub Sections Explained</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="header">
              <AccordionTrigger className="text-sm font-medium">Company & Employee Information</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">The header shows the employer&apos;s name, address, and EIN (Employer Identification Number). It also shows your name, employee ID, pay period dates, and pay date.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="earnings">
              <AccordionTrigger className="text-sm font-medium">Gross Earnings Section</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">This shows your total earnings before deductions. It includes regular pay, overtime, bonuses, commissions, and other compensation. The &quot;Rate&quot; column shows your hourly rate or salary per period, and &quot;Hours&quot; shows hours worked (for hourly employees). YTD (Year-To-Date) totals help you track cumulative earnings.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="taxes">
              <AccordionTrigger className="text-sm font-medium">Taxes & Withholdings</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">This section lists all tax deductions: Federal Income Tax (based on your W-4), Social Security (6.2%), Medicare (1.45%), and State Income Tax. Some pay stubs also show local/city taxes.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="deductions">
              <AccordionTrigger className="text-sm font-medium">Pre-Tax & Post-Tax Deductions</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">Pre-tax deductions (401k, health insurance, HSA, FSA) reduce your taxable income. Post-tax deductions (Roth 401k, garnishments, union dues) are taken after taxes.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="netpay">
              <AccordionTrigger className="text-sm font-medium">Net Pay</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">This is your take-home pay — the amount deposited into your bank account. It&apos;s calculated as Gross Pay minus all deductions.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}