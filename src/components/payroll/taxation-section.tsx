"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Landmark,
  TrendingUp,
  Receipt,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Percent,
  FileText,
  PiggyBank,
  Home,
  Heart,
  GraduationCap,
  Car,
  Baby,
  Zap,
  BarChart3,
  Scale,
  Shield,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export default function TaxationSection() {
  const [activeTopic, setActiveTopic] = useState<string | null>("overview");

  return (
    <motion.div {...fadeIn} className="space-y-6">
      {/* Overview: Types of US Taxes */}
      <Card className="border-2 border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-emerald-600" />
            Types of US Taxes — Complete Picture
          </CardTitle>
          <CardDescription>
            The US tax system is multi-layered. Here&apos;s every tax you might encounter as an individual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TaxTypeCard
              icon={DollarSign}
              title="Federal Income Tax"
              rate="10% – 37%"
              description="Progressive tax on your earnings. Applied after deductions. Covers the majority of federal revenue."
              whoPays="Most workers (W-2 and 1099)"
              color="red"
            />
            <TaxTypeCard
              icon={Shield}
              title="Payroll Tax (FICA)"
              rate="7.65% + 0.9%"
              description="Social Security (6.2%) + Medicare (1.45%) + Additional Medicare (0.9% over $200K). Flat rate, shared with employer."
              whoPays="All W-2 employees"
              color="orange"
            />
            <TaxTypeCard
              icon={TrendingUp}
              title="Capital Gains Tax"
              rate="0% – 37%"
              description="Tax on profit from selling investments. Long-term (held 1yr+) gets preferential rates: 0%, 15%, or 20%."
              whoPays="Investors, home sellers"
              color="emerald"
            />
            <TaxTypeCard
              icon={Receipt}
              title="State & Local Tax (SALT)"
              rate="0% – 13.3%"
              description="State income tax + local/city taxes. 9 states have no income tax. Capped at $10K deduction for federal."
              whoPays="Residents of most states"
              color="purple"
            />
            <TaxTypeCard
              icon={Home}
              title="Property Tax"
              rate="0.3% – 2.5%"
              description="Annual tax on real estate based on assessed value. Varies wildly by county. Deductible on Schedule A."
              whoPays="Homeowners"
              color="teal"
            />
            <TaxTypeCard
              icon={Car}
              title="Sales Tax"
              rate="0% – 10.25%"
              description="Consumption tax on purchases. 5 states have no sales tax. Not deductible (after 2018 TCJA)."
              whoPays="All consumers"
              color="amber"
            />
          </div>
        </CardContent>
      </Card>

      {/* Capital Gains Tax */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Capital Gains Tax — Detailed Guide
          </CardTitle>
          <CardDescription>
            How investments are taxed differently from ordinary income — one of the biggest tax advantages in the US
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Short vs Long Term */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <h4 className="font-semibold text-sm">Short-Term Capital Gains</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Assets held <strong>1 year or less</strong>. Taxed at your <strong>ordinary income tax rate</strong> (10%–37%).
                  No preferential treatment.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 space-y-1.5">
                  <div className="text-xs font-semibold text-muted-foreground mb-1">Example: Stock sold after 8 months</div>
                  <div className="flex justify-between text-sm">
                    <span>Purchase price</span>
                    <span className="font-mono">$10,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sell price</span>
                    <span className="font-mono">$15,000</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-1">
                    <span>Gain</span>
                    <span className="text-red-600">$5,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax at 24% (e.g.)</span>
                    <span className="text-red-600 font-semibold">-$1,200</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <h4 className="font-semibold text-sm">Long-Term Capital Gains</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Assets held <strong>more than 1 year</strong>. Get preferential rates: <strong>0%, 15%, or 20%</strong>.
                  This is a massive tax advantage for investors.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 space-y-1.5">
                  <div className="text-xs font-semibold text-muted-foreground mb-1">Example: Same stock, held 13 months</div>
                  <div className="flex justify-between text-sm">
                    <span>Purchase price</span>
                    <span className="font-mono">$10,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sell price</span>
                    <span className="font-mono">$15,000</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-1">
                    <span>Gain</span>
                    <span className="text-emerald-700">$5,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax at 15% (LTCG)</span>
                    <span className="text-red-600 font-semibold">-$750</span>
                  </div>
                </div>
                <div className="mt-2 bg-emerald-100 dark:bg-emerald-900/40 rounded px-2 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200 text-center">
                  You save $450 by holding 5 months longer!
                </div>
              </CardContent>
            </Card>
          </div>

          {/* LTCG Rate Table */}
          <div>
            <h4 className="text-sm font-semibold mb-3">2026 Long-Term Capital Gains Rates</h4>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Filing Status</TableHead>
                    <TableHead className="text-right">0% Rate</TableHead>
                    <TableHead className="text-right">15% Rate</TableHead>
                    <TableHead className="text-right">20% Rate</TableHead>
                    <TableHead className="text-right">NIIT (3.8%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Single</TableCell>
                    <TableCell className="text-right font-mono text-xs">Up to $48,350</TableCell>
                    <TableCell className="text-right font-mono text-xs">$48,351 – $533,400</TableCell>
                    <TableCell className="text-right font-mono text-xs">Over $533,400</TableCell>
                    <TableCell className="text-right font-mono text-xs">Over $200,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Married Filing Jointly</TableCell>
                    <TableCell className="text-right font-mono text-xs">Up to $96,700</TableCell>
                    <TableCell className="text-right font-mono text-xs">$96,701 – $600,050</TableCell>
                    <TableCell className="text-right font-mono text-xs">Over $600,050</TableCell>
                    <TableCell className="text-right font-mono text-xs">Over $250,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="mt-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-2.5 text-xs text-muted-foreground">
              <strong>NIIT:</strong> Net Investment Income Tax — additional 3.8% on investment income if your MAGI exceeds $200K (single) or $250K (married). 
              <strong>High-income exception:</strong> Additional 5% rate applies to income over ~$500K+ (varies by filing status).
            </div>
          </div>

          {/* Capital Losses */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Tax-Loss Harvesting</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>
                If you sell investments at a loss, you can use those losses to offset capital gains. If losses exceed gains, 
                you can deduct up to <strong>$3,000/year</strong> against ordinary income and carry forward unlimited losses to future years.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-white dark:bg-gray-900 rounded p-2.5">
                  <div className="text-xs font-semibold mb-1">Example: Harvesting Losses</div>
                  <div className="text-xs">Stock A gain: <strong className="text-emerald-700">+$8,000</strong></div>
                  <div className="text-xs">Stock B loss: <strong className="text-red-600">-$8,000</strong></div>
                  <div className="text-xs mt-1 font-semibold">Net taxable gain: <span className="text-emerald-700">$0</span></div>
                  <div className="text-xs">You owe $0 in capital gains tax!</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded p-2.5">
                  <div className="flex items-start gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs">
                      <strong>Wash Sale Rule:</strong> If you sell at a loss and buy the same (or substantially identical) 
                      security within 30 days, the loss is disallowed. Buy a different fund/stock instead.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Deductions vs Credits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-emerald-600" />
            Tax Deductions vs Tax Credits — Critical Difference
          </CardTitle>
          <CardDescription>
            Understanding this difference is key to reducing your tax bill effectively
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardContent className="pt-4">
                <div className="text-center mb-3">
                  <Percent className="h-8 w-8 text-orange-600 mx-auto mb-1" />
                  <h4 className="font-bold text-lg">Tax Deduction</h4>
                  <p className="text-xs text-muted-foreground">Reduces taxable income</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-3 mb-3">
                  <div className="text-sm text-center">
                    <div className="text-xs text-muted-foreground">$10,000 deduction at 24% bracket</div>
                    <div className="text-xl font-bold text-orange-700 mt-1">Saves $2,400</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  A deduction reduces your <em>taxable income</em>. The actual savings depend on your tax bracket.
                  Higher earners benefit more from deductions.
                </p>
                <div className="mt-3 space-y-1">
                  <div className="text-xs font-semibold">Common Deductions:</div>
                  <DeductionItem name="Standard Deduction" detail="$14,600 (single) / $29,200 (married)" />
                  <DeductionItem name="Mortgage Interest" detail="Up to $750K loan" />
                  <DeductionItem name="State & Local Taxes (SALT)" detail="Capped at $10,000" />
                  <DeductionItem name="Charitable Donations" detail="Cash: 60% of AGI; Stock: 30% of AGI" />
                  <DeductionItem name="Medical Expenses" detail="Over 7.5% of AGI" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-emerald-200 dark:border-emerald-800">
              <CardContent className="pt-4">
                <div className="text-center mb-3">
                  <Zap className="h-8 w-8 text-emerald-600 mx-auto mb-1" />
                  <h4 className="font-bold text-lg">Tax Credit</h4>
                  <p className="text-xs text-muted-foreground">Directly reduces tax owed</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3 mb-3">
                  <div className="text-sm text-center">
                    <div className="text-xs text-muted-foreground">$2,000 credit regardless of bracket</div>
                    <div className="text-xl font-bold text-emerald-700 mt-1">Saves $2,000</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  A credit reduces your <em>actual tax bill</em> dollar-for-dollar. <strong>Refundable</strong> credits can even give you money back.
                  Credits are generally more valuable than deductions.
                </p>
                <div className="mt-3 space-y-1">
                  <div className="text-xs font-semibold">Valuable Tax Credits:</div>
                  <DeductionItem name="Child Tax Credit" detail="$2,000/child (refundable up to $1,700)" />
                  <DeductionItem name="Earned Income Credit (EITC)" detail="Up to $7,430 (refundable)" />
                  <DeductionItem name="American Opportunity Credit" detail="$2,500/student (40% refundable)" />
                  <DeductionItem name="Saver's Credit" detail="Up to $1,000 (50% of contribution)" />
                  <DeductionItem name="EV Tax Credit" detail="Up to $7,500 (new EVs)" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Itemized vs Standard */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Standard vs Itemized Deduction — Which to Choose?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white dark:bg-gray-900 border-2 border-emerald-200 dark:border-emerald-800">
                  <h5 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Choose Standard When...
                  </h5>
                  <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                    <li>• Your itemized deductions &lt; standard deduction</li>
                    <li>• You rent (no mortgage interest)</li>
                    <li>• You don&apos;t have large medical expenses</li>
                    <li>• SALT cap ($10K) limits your state tax deduction</li>
                    <li>• ~90% of taxpayers use the standard deduction</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-gray-900 border-2 border-orange-200 dark:border-orange-800">
                  <h5 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                    <Receipt className="h-4 w-4 text-orange-600" />
                    Choose Itemized When...
                  </h5>
                  <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                    <li>• You have a large mortgage ($750K+ loan)</li>
                    <li>• You pay high state/local taxes (but capped at $10K)</li>
                    <li>• You make significant charitable donations</li>
                    <li>• You have large medical expenses (&gt;7.5% AGI)</li>
                    <li>• You had casualty/theft losses (federally declared disaster)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Major Tax Credits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            Major Tax Credits Worth Knowing
          </CardTitle>
          <CardDescription>
            These credits can save you thousands — make sure you claim everything you qualify for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <CreditCard
              icon={Baby}
              title="Child Tax Credit"
              amount="$2,000 per qualifying child"
              refundable="Yes, up to $1,700 per child"
              incomeLimit="Phase-out begins at $200K (single) / $400K (married)"
              description="Children under 17 who lived with you for 6+ months. Must have SSN. The refundable portion means you can get money back even if you owe no tax."
              example="2 kids = $4,000 credit. If you owe $3,000 in tax, your bill drops to $0 and you get $1,000+ refund."
            />
            <CreditCard
              icon={Heart}
              title="Earned Income Tax Credit (EITC)"
              amount="Up to $7,890 (2026, 3+ children)"
              refundable="Fully refundable"
              incomeLimit="Up to $63,398 (married, 3+ children)"
              description="For low-to-moderate income working individuals and families. One of the most impactful anti-poverty programs in the US. ~25% of eligible taxpayers don't claim it!"
              example="Single parent, 1 child, earning $25,000 → could receive ~$3,995 as a refund check."
            />
            <CreditCard
              icon={GraduationCap}
              title="American Opportunity Tax Credit (AOTC)"
              amount="Up to $2,500 per student"
              refundable="40% refundable ($1,000 max)"
              incomeLimit="Phase-out $80K-$90K (single) / $160K-$180K (married)"
              description="For first 4 years of college. Covers tuition, fees, books, supplies. 100% of first $2,000 + 25% of next $2,000. Can only claim for 4 years per student."
              example="$4,000 in qualified expenses → $2,500 credit. If you owe $0 tax, you get $1,000 refund."
            />
            <CreditCard
              icon={Car}
              title="Clean Vehicle (EV) Tax Credit"
              amount="Up to $7,500"
              refundable="Non-refundable (but can carry forward)"
              incomeLimit="New: $150K single / $300K married. Used: $75K/$150K"
              description="For new EVs assembled in North America meeting battery/critical mineral requirements. The credit is applied at the dealership (point-of-sale)."
              example="Buy a Tesla Model Y for $45,000 → $7,500 discount at dealer → effective price $37,500. Used EV: up to $4,000."
            />
            <CreditCard
              icon={PiggyBank}
              title="Saver's Credit (Retirement Savings Contributions Credit)"
              amount="Up to $1,000 ($2,000 married)"
              refundable="Non-refundable"
              incomeLimit="Up to $38,500 (single) / $76,500 (married)"
              description="Credit for contributions to 401(k), IRA, or similar retirement accounts. 50% credit on first $2,000 contributed (for lowest income bracket). Often overlooked!"
              example="Earn $20,000 and contribute $2,000 to a Roth IRA → $1,000 credit reduces your tax bill."
            />
          </div>
        </CardContent>
      </Card>

      {/* AMT */}
      <Card className="border-2 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Alternative Minimum Tax (AMT)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3 text-muted-foreground">
          <p>
            The AMT is a <strong>parallel tax system</strong> designed to ensure high-income taxpayers pay at least a minimum 
            amount of tax. You must calculate your taxes under both the regular system and AMT, and pay whichever is higher.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded p-3">
              <div className="text-xs font-semibold mb-1">AMT Exemption (2026)</div>
              <div className="text-xs">Single: <strong>$81,300</strong></div>
              <div className="text-xs">Married: <strong>$126,500</strong></div>
              <div className="text-xs mt-1 text-amber-700">Phase-out begins at $609,350 (single) / $1,218,700 (married)</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded p-3">
              <div className="text-xs font-semibold mb-1">AMT Tax Rates</div>
              <div className="text-xs">26% on first <strong>$232,600</strong></div>
              <div className="text-xs">28% on income above <strong>$232,600</strong></div>
              <div className="text-xs mt-1 text-amber-700">Fewer deductions allowed under AMT (no SALT, limited misc.)</div>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs">
                <strong>Who gets hit?</strong> Taxpayers with high SALT deductions, many dependents, ISO exercises, 
                or large miscellaneous deductions. Tax software handles AMT calculation automatically.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Filing Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            Tax Filing Guide — Step by Step
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <TimelineStep
              step="1"
              title="Gather Documents (Jan – Feb)"
              items={["W-2 from each employer (by Jan 31)", "1099-NEC/1099-MISC for contract/freelance income", "1099-INT for interest, 1099-DIV for dividends", "1099-B for investment sales (capital gains)", "1098 for mortgage interest paid", "Charitable donation receipts", "Health insurance forms (1095-A/B/C)"]}
            />
            <TimelineStep
              step="2"
              title="Choose How to File"
              items={["Free: IRS Free File (income under $84,000)", "Free: FreeTaxUSA, Credit Karma Tax", "Paid: TurboTax, H&R Block, TaxAct ($30-$120+)", "Best for complex situations: CPA/Enrolled Agent ($200-$500+)", "Deadline: April 15 (or next business day)"]}
            />
            <TimelineStep
              step="3"
              title="Calculate Your Tax"
              items={["Enter all income (W-2s, 1099s, other)", "Choose: Standard deduction OR Itemize deductions", "Apply tax credits you qualify for", "Calculate: Total Tax − Payments = Refund/Owed", "Double-check all numbers before filing!"]}
            />
            <TimelineStep
              step="4"
              title="File and Pay"
              items={["E-file is faster and more accurate", "Choose direct deposit for fastest refund (2-3 weeks)", "If you owe: pay by April 15 to avoid penalties", "Can request 6-month extension (Oct 15), but still must pay by April 15", "Keep records for 3-7 years (3 years minimum, 7 for some cases)"]}
            />
          </div>

          <Separator className="my-4" />

          {/* Important Deadlines */}
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Key Tax Deadlines (2027 filing for 2026 tax year)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <DeadlineItem date="Jan 15" desc="Q4 2026 estimated tax payment" />
              <DeadlineItem date="Jan 31" desc="W-2, 1099s must be sent to you" />
              <DeadlineItem date="Apr 15" desc="Individual tax returns due" highlight />
              <DeadlineItem date="Apr 15" desc="Q1 2027 estimated tax payment" />
              <DeadlineItem date="Jun 16" desc="Q2 2027 estimated tax payment" />
              <DeadlineItem date="Oct 15" desc="Extended returns due" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Planning Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-600" />
            Tax Planning Strategies That Actually Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StrategyCard
              number="1"
              title="Max Out Tax-Advantaged Accounts"
              items={[
                "401(k): $23,000 ($30,500 if 50+)",
                "IRA: $7,000 ($8,000 if 50+)",
                "HSA: $4,150 individual / $8,300 family",
                "529 Plan: State tax deduction + tax-free growth",
              ]}
              savings="Can save $2,000-$7,000+ per year in taxes"
            />
            <StrategyCard
              number="2"
              title="Roth vs Traditional Strategy"
              items={[
                "Traditional: Deduct contributions now, pay tax on withdrawal",
                "Roth: No deduction now, but tax-free withdrawal",
                "Rule of thumb: Traditional if current bracket > retirement bracket",
                "Roth if you expect higher income/taxes in retirement",
              ]}
              savings="Strategic Roth conversion in low-income years"
            />
            <StrategyCard
              number="3"
              title="Harvest Capital Losses Annually"
              items={[
                "Sell losing positions before Dec 31 to realize losses",
                "Offset gains first, then deduct $3K ordinary income",
                "Carry forward remaining losses indefinitely",
                "Watch the wash sale rule (30-day waiting period)",
              ]}
              savings="Can save $3,000+ per year in taxable income"
            />
            <StrategyCard
              number="4"
              title="Time Income and Deductions"
              items={[
                "Defer bonuses/commissions to next year if expecting lower income",
                "Bunch charitable donations into one year (donor-advised fund)",
                "Accelerate deductions into high-income years",
                "Consider Roth conversions in low-income years (gap year, sabbatical)",
              ]}
              savings="Smooths out tax brackets across years"
            />
            <StrategyCard
              number="5"
              title="Use the Qualified Business Income Deduction"
              items={[
                "20% deduction on qualified business income (QBI)",
                "For freelancers, LLC owners, S-Corp shareholders",
                "Phase-out at $191,950 (single) / $383,900 (married)",
                "Some service businesses (consulting, law) face limits",
              ]}
              savings="Up to 20% off your business income"
            />
            <StrategyCard
              number="6"
              title="Health Savings Account (HSA) Triple Tax Advantage"
              items={[
                "Contributions are tax-deductible",
                "Growth is tax-free",
                "Withdrawals for medical expenses are tax-free",
                "After 65: can use like a traditional IRA for any purpose",
              ]}
              savings="The only account with triple tax advantage"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tax Brackets Comparison Visual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            Effective Tax Rate by Income Level
          </CardTitle>
          <CardDescription>
            See how the effective tax rate increases with income — it&apos;s not as scary as the marginal rates suggest
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full">
            <ResponsiveContainer>
              <BarChart
                data={[
                  { income: "$30K", federal: 5.5, fica: 7.7, total: 13.2 },
                  { income: "$50K", federal: 8.3, fica: 7.7, total: 16.0 },
                  { income: "$75K", federal: 11.1, fica: 7.7, total: 18.8 },
                  { income: "$100K", federal: 14.0, fica: 7.7, total: 21.7 },
                  { income: "$150K", federal: 18.3, fica: 7.5, total: 25.8 },
                  { income: "$200K", federal: 22.0, fica: 7.5, total: 29.5 },
                  { income: "$300K", federal: 26.5, fica: 5.9, total: 32.4 },
                  { income: "$500K", federal: 30.8, fluoride: 3.4, total: 34.2 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="income" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} unit="%" />
                <RTooltip formatter={(value: number) => [`${value}%`, ""]} />
                <Legend />
                <Bar dataKey="fica" name="FICA (SS + Medicare)" stackId="a" fill="#f97316" />
                <Bar dataKey="federal" name="Federal Income Tax" stackId="a" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            *Effective rates shown for single filer in a no-tax state. State tax would add 0%–13% on top. Includes standard deduction.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TaxTypeCard({
  icon: Icon,
  title,
  rate,
  description,
  whoPays,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  rate: string;
  description: string;
  whoPays: string;
  color: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${color === "emerald" ? "bg-emerald-100 dark:bg-emerald-900/50" : color === "red" ? "bg-red-100 dark:bg-red-900/50" : color === "orange" ? "bg-orange-100 dark:bg-orange-900/50" : color === "purple" ? "bg-purple-100 dark:bg-purple-900/50" : color === "teal" ? "bg-teal-100 dark:bg-teal-900/50" : "bg-amber-100 dark:bg-amber-900/50"}`}>
            <Icon className={`h-4 w-4 ${color === "emerald" ? "text-emerald-600" : color === "red" ? "text-red-600" : color === "orange" ? "text-orange-600" : color === "purple" ? "text-purple-600" : color === "teal" ? "text-teal-600" : "text-amber-600"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">{title}</h4>
              <Badge variant="secondary" className="text-[10px] flex-shrink-0 ml-2">{rate}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            <div className="text-[10px] text-muted-foreground mt-1.5">
              <span className="font-medium">Who pays:</span> {whoPays}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DeductionItem({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="flex items-center justify-between text-xs py-0.5">
      <span className="font-medium">{name}</span>
      <span className="text-muted-foreground text-right ml-2">{detail}</span>
    </div>
  );
}

function CreditCard({
  icon: Icon,
  title,
  amount,
  refundable,
  incomeLimit,
  description,
  example,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  amount: string;
  refundable: string;
  incomeLimit: string;
  description: string;
  example: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{title}</h4>
            <div className="text-lg font-bold text-emerald-700">{amount}</div>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground mt-1">
              <span><strong>Refundable:</strong> {refundable}</span>
              <span><strong>Income Limit:</strong> {incomeLimit}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded px-2.5 py-1.5 mt-2 text-xs">
              <strong>Example:</strong> {example}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TimelineStep({
  step,
  title,
  items,
}: {
  step: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
        {step}
      </div>
      <div className="flex-1 pb-3 border-b last:border-0">
        <h4 className="font-semibold text-sm mb-1.5">{title}</h4>
        <ul className="space-y-0.5">
          {items.map((item, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <ArrowRight className="h-3 w-3 text-emerald-600 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DeadlineItem({
  date,
  desc,
  highlight,
}: {
  date: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${highlight ? "font-semibold" : ""}`}>
      <Badge variant={highlight ? "destructive" : "outline"} className="text-[10px] w-16 justify-center flex-shrink-0">
        {date}
      </Badge>
      <span className="text-xs">{desc}</span>
    </div>
  );
}

function StrategyCard({
  number,
  title,
  items,
  savings,
}: {
  number: string;
  title: string;
  items: string[];
  savings: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-4">
        <div className="flex items-start gap-2 mb-2">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
            {number}
          </div>
          <h4 className="font-semibold text-sm">{title}</h4>
        </div>
        <ul className="space-y-0.5 ml-8 mb-2">
          {items.map((item, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="ml-8 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 rounded px-2 py-1 inline-block">
          {savings}
        </div>
      </CardContent>
    </Card>
  );
}