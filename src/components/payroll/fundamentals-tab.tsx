"use client";

import { motion } from "framer-motion";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase, DollarSign, TrendingDown, Banknote, Calendar,
  Lightbulb, AlertTriangle, CheckCircle2, ArrowRight, Receipt, Landmark,
} from "lucide-react";
import { fadeIn } from "@/lib/ref-data";

function InfoCard({ icon: Icon, title, description, color }: {
  icon: React.ComponentType<{ className?: string }>; title: string; description: string; color: string;
}) {
  return (
    <Card className={`${color === "emerald" ? "border-emerald-200 dark:border-emerald-800" : "border-red-200 dark:border-red-800"}`}>
      <CardContent className="pt-4">
        <Icon className={`h-5 w-5 ${color === "emerald" ? "text-emerald-600" : "text-red-600"} mb-2`} />
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      </CardContent>
    </Card>
  );
}

function DeductionItem({ name, limit }: { name: string; limit: string }) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded px-2.5 py-1.5">
      <span className="font-medium text-xs">{name}</span>
      <span className="text-xs text-muted-foreground">{limit}</span>
    </div>
  );
}

function EarningCard({ title, description, example }: { title: string; description: string; example: string }) {
  return (
    <Card>
      <CardContent className="pt-4">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        <div className="font-mono text-xs bg-emerald-50 dark:bg-emerald-950/30 rounded px-2 py-1 text-emerald-700 dark:text-emerald-300">
          {example}
        </div>
      </CardContent>
    </Card>
  );
}

export default function FundamentalsTab() {
  return (
    <motion.div {...fadeIn} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-emerald-600" />
            What is Payroll?
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <strong>Payroll</strong> is the process by which employers pay employees for their work.
            It encompasses calculating earnings, withholding the correct amounts for taxes and benefits,
            and distributing the net pay to employees. In the United States, payroll is a complex system
            governed by federal, state, and local regulations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            <InfoCard icon={DollarSign} title="Gross Pay" description="Total earnings before any deductions — base salary, overtime, bonuses, commissions." color="emerald" />
            <InfoCard icon={TrendingDown} title="Deductions" description="Amounts subtracted from gross pay: federal/state taxes, FICA, insurance, retirement contributions." color="red" />
            <InfoCard icon={Banknote} title="Net Pay" description="The 'take-home pay' — what actually lands in your bank account after all deductions." color="emerald" />
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-emerald-800 dark:text-emerald-200">Key Formula:</strong>
                <div className="mt-1 font-mono bg-white dark:bg-gray-900 rounded px-3 py-2 text-sm inline-block">
                  Net Pay = Gross Pay − (Federal Tax + State Tax + FICA + Pre-tax Deductions + Post-tax Deductions)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-600" />
            Pay Periods in the USA
          </CardTitle>
          <CardDescription>How often you get paid affects your per-check amount but not your annual total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { freq: "Weekly", periods: 52, example: "$80,000 ÷ 52 = $1,538.46" },
              { freq: "Bi-Weekly", periods: 26, example: "$80,000 ÷ 26 = $3,076.92" },
              { freq: "Semi-Monthly", periods: 24, example: "$80,000 ÷ 24 = $3,333.33" },
              { freq: "Monthly", periods: 12, example: "$80,000 ÷ 12 = $6,666.67" },
            ].map((p) => (
              <Card key={p.freq} className="border">
                <CardContent className="pt-4">
                  <div className="text-sm font-semibold text-emerald-700">{p.freq}</div>
                  <div className="text-2xl font-bold mt-1">{p.periods}</div>
                  <div className="text-xs text-muted-foreground">checks per year</div>
                  <Separator className="my-2" />
                  <div className="text-xs font-mono text-muted-foreground">{p.example}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Bi-Weekly vs Semi-Monthly:</strong> Bi-weekly (every 2 weeks = 26 checks) is
                different from semi-monthly (twice a month on specific dates = 24 checks). With bi-weekly,
                you get 2 &quot;extra&quot; paychecks in 2 months of the year.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            Types of Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EarningCard title="Salary (Exempt)" description="Fixed annual amount divided by pay periods. Not eligible for overtime under FLSA. Common for professional, managerial, and administrative roles." example="$85,000/year → $3,269.23/bi-weekly" />
            <EarningCard title="Hourly (Non-Exempt)" description="Paid by the hour with overtime at 1.5x for hours over 40/week. Protected by the Fair Labor Standards Act (FLSA)." example="$40/hr × 40hrs = $1,600/week (OT: $60/hr)" />
            <EarningCard title="Commission" description="Percentage of sales revenue. May be combined with base salary. Taxed as ordinary income, but employers may withhold at a flat 22% supplemental rate." example="3% of $50,000 in sales = $1,500 commission" />
            <EarningCard title="Bonuses" description="Discretionary or performance-based payments. Can be taxed at flat 22% supplemental rate (under $1M) or at 37% (over $1M)." example="$5,000 bonus → 22% withheld = $3,900 net" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-emerald-600" />
            Pre-Tax vs Post-Tax Deductions
          </CardTitle>
          <CardDescription>Understanding the order of deductions is crucial for accurate payroll</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4" /> Step 1: Pre-Tax Deductions (reduce taxable income)
              </h4>
              <p className="text-sm text-muted-foreground mb-3">These are subtracted <strong>before</strong> taxes are calculated, lowering your overall tax burden.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <DeductionItem name="401(k) Contributions" limit="$23,500 (2026), $31,000 if 50+" />
                <DeductionItem name="Health Insurance Premiums" limit="No federal limit" />
                <DeductionItem name="HSA Contributions" limit="$4,300 individual / $8,550 family" />
                <DeductionItem name="FSA Contributions" limit="$3,300 (2026)" />
                <DeductionItem name="Commuter Benefits" limit="$315 transit + $315 parking" />
                <DeductionItem name="Section 125 Cafeteria Plan" limit="Varies by plan" />
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto" />
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-2">
                <Landmark className="h-4 w-4" /> Step 2: Tax Withholdings (federal, state, FICA)
              </h4>
              <p className="text-sm text-muted-foreground">Taxes are calculated on the remaining income after pre-tax deductions. See the Federal Tax and FICA tabs for details.</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto" />
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Receipt className="h-4 w-4" /> Step 3: Post-Tax Deductions (after taxes)
              </h4>
              <p className="text-sm text-muted-foreground mb-3">These are subtracted <strong>after</strong> all taxes. They don&apos;t reduce your tax burden.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <DeductionItem name="Roth 401(k)" limit="Same as traditional 401(k)" />
                <DeductionItem name="Roth IRA" limit="$7,000 (2026), $8,000 if 50+" />
                <DeductionItem name="Wage Garnishments" limit="Per court order" />
                <DeductionItem name="Union Dues" limit="Varies by agreement" />
                <DeductionItem name="Charitable Donations" limit="No payroll limit" />
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto" />
            <div className="bg-emerald-100 dark:bg-emerald-900/40 border-2 border-emerald-300 dark:border-emerald-700 rounded-lg p-4 text-center">
              <Banknote className="h-6 w-6 text-emerald-700 mx-auto mb-2" />
              <div className="text-lg font-bold text-emerald-800 dark:text-emerald-200">= Net Pay (Take-Home)</div>
              <div className="text-sm text-muted-foreground">Deposited to your bank account via direct deposit</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}