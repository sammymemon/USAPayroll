"use client";

import { motion } from "framer-motion";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Shield, AlertTriangle, Users, CheckCircle2 } from "lucide-react";
import { fadeIn } from "@/lib/ref-data";

function FICACard({ title, rate, wageBase, employerMatch, description, benefits, color }: {
  title: string; rate: string; wageBase: string; employerMatch: string;
  description: string; benefits: string[]; color: string;
}) {
  return (
    <Card className={`border-2 ${color === "emerald" ? "border-emerald-200 dark:border-emerald-800" : "border-teal-200 dark:border-teal-800"}`}>
      <CardHeader className="pb-2"><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-2 text-center">
            <div className="text-xs text-muted-foreground">Employee Rate</div>
            <div className="font-bold text-lg">{rate}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-2 text-center">
            <div className="text-xs text-muted-foreground">Employer Match</div>
            <div className="font-bold text-lg">{employerMatch}</div>
          </div>
        </div>
        <div className="text-sm"><span className="text-muted-foreground">Wage Base: </span><span className="font-semibold">{wageBase}</span></div>
        <div>
          <div className="text-xs font-semibold mb-1.5">What It Funds:</div>
          <ul className="space-y-1">
            {benefits.map((b, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 flex-shrink-0" />{b}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FicaTab() {
  return (
    <motion.div {...fadeIn} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />What is FICA?
          </CardTitle>
          <CardDescription>FICA (Federal Insurance Contributions Act) funds Social Security and Medicare — two of the largest social safety net programs in the US.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">FICA taxes are <strong>mandatory</strong> for both employees and employers. They are flat-rate taxes (not progressive), and you cannot opt out. Both you and your employer each pay half.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FICACard title="Social Security (OASDI)" rate="6.2%" wageBase="$168,600" employerMatch="6.2%" description="Provides retirement, disability, and survivor benefits. The tax applies only to earnings up to the wage base limit." benefits={["Retirement benefits (at full retirement age)", "Disability benefits", "Survivor benefits for dependents", "Medicare eligibility (at 65)"]} color="emerald" />
            <FICACard title="Medicare" rate="1.45%" wageBase="No Limit" employerMatch="1.45%" description="Provides health insurance for Americans aged 65+ and some younger people with disabilities. No wage base cap." benefits={["Hospital insurance (Part A)", "Medical insurance (Part B)", "Prescription drug coverage (Part D)", "Medicare Advantage plans (Part C)"]} color="teal" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />Additional Medicare Tax (High Earners)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3 text-muted-foreground">
          <p>If your earnings exceed <strong>$200,000</strong> (single) or <strong>$250,000</strong> (married filing jointly), an <strong>additional 0.9% Medicare tax</strong> applies to income above the threshold.</p>
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div><div className="text-xs text-muted-foreground">Threshold (Single)</div><div className="text-lg font-bold">$200,000</div></div>
              <div><div className="text-xs text-muted-foreground">Threshold (Married)</div><div className="text-lg font-bold">$250,000</div></div>
              <div><div className="text-xs text-muted-foreground">Additional Rate</div><div className="text-lg font-bold text-red-600">0.9%</div></div>
            </div>
          </div>
          <p><strong>Example:</strong> If you earn $250,000, you pay 1.45% on all $250,000 + 0.9% on the $50,000 above $200,000. Unlike the regular Medicare tax, the <strong>employer does NOT match</strong> the additional Medicare tax.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4 text-emerald-600" />Self-Employment Tax (SECA)</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3 text-muted-foreground">
          <p>Self-employed individuals pay <strong>both the employee and employer portions</strong> of FICA, totaling <strong>15.3%</strong> (12.4% SS + 2.9% Medicare). However, you can deduct half of this as a business expense.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="font-semibold text-sm mb-1">Employee (W-2)</div>
              <div className="text-xs">Pays 7.65% (6.2% + 1.45%)</div>
              <div className="text-xs text-muted-foreground">Employer matches the other 7.65%</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-3">
              <div className="font-semibold text-sm mb-1">Self-Employed (1099)</div>
              <div className="text-xs">Pays 15.3% total (12.4% + 2.9%)</div>
              <div className="text-xs text-muted-foreground">Can deduct 50% (7.65%) as business expense</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />Worked Example: FICA on $85,000
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Tax</TableHead><TableHead className="text-right">Rate</TableHead><TableHead className="text-right">Wages Subject To</TableHead><TableHead className="text-right">Annual Tax</TableHead><TableHead className="text-right">Per Paycheck (26)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>Social Security</TableCell><TableCell className="text-right">6.2%</TableCell><TableCell className="text-right font-mono">$85,000</TableCell><TableCell className="text-right font-semibold text-red-600">$5,270.00</TableCell><TableCell className="text-right font-mono">$202.69</TableCell></TableRow>
                <TableRow><TableCell>Medicare</TableCell><TableCell className="text-right">1.45%</TableCell><TableCell className="text-right font-mono">$85,000</TableCell><TableCell className="text-right font-semibold text-red-600">$1,232.50</TableCell><TableCell className="text-right font-mono">$47.40</TableCell></TableRow>
                <TableRow className="bg-emerald-50 dark:bg-emerald-950/30 font-bold"><TableCell>Total FICA</TableCell><TableCell className="text-right">7.65%</TableCell><TableCell /><TableCell className="text-right text-red-600">$6,502.50</TableCell><TableCell className="text-right">$250.10</TableCell></TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}