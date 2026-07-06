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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  DollarSign,
  Landmark,
  FileText,
  Shield,
  Users,
  Home,
  TrendingUp,
  Receipt,
  PiggyBank,
  Heart,
  GraduationCap,
  Briefcase,
  Building2,
  Scale,
  Percent,
  Calculator,
  Banknote,
  BarChart3,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

interface Term {
  term: string;
  short: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const TERMS: Term[] = [
  { term: "Gross Pay", short: "Total earnings before any deductions", detail: "Your total compensation before taxes, benefits, or any other deductions are taken out. Includes base salary, overtime, bonuses, commissions, and other taxable income.", icon: DollarSign, category: "Earnings" },
  { term: "Net Pay", short: "Take-home pay after all deductions", detail: "The amount that actually lands in your bank account. Calculated as: Gross Pay − Federal Tax − State Tax − FICA − Pre-tax Deductions − Post-tax Deductions.", icon: Banknote, category: "Earnings" },
  { term: "W-2 (Wage and Tax Statement)", short: "Annual summary of your earnings and taxes withheld", detail: "Issued by your employer by January 31 each year. Shows total wages, federal/state tax withheld, Social Security and Medicare taxes, and retirement contributions. Essential for filing your tax return.", icon: FileText, category: "Forms" },
  { term: "W-4 (Employee's Withholding Certificate)", short: "Tells employer how much federal tax to withhold", detail: "Filled out when you start a job. Determines federal income tax withholding based on filing status, dependents, and other adjustments. Update it when your tax situation changes (marriage, child, home purchase).", icon: FileText, category: "Forms" },
  { term: "FICA (Federal Insurance Contributions Act)", short: "Social Security + Medicare taxes", detail: "Mandatory payroll taxes: 6.2% for Social Security (up to $177,000) + 1.45% for Medicare (no cap) = 7.65% total. Your employer matches this amount. Self-employed pay 15.3% (both halves).", icon: Shield, category: "Taxes" },
  { term: "Social Security (OASDI)", short: "Retirement/disability/survivor insurance tax", detail: "6.2% of wages up to the wage base ($177,000 in 2026). Funds retirement benefits, disability insurance, and survivor benefits. Your employer pays a matching 6.2%.", icon: Shield, category: "Taxes" },
  { term: "Medicare", short: "Health insurance tax for seniors", detail: "1.45% of all wages (no cap). Funds hospital insurance (Part A), medical insurance (Part B), and prescription drug coverage. Additional 0.9% tax on income over $200,000.", icon: Heart, category: "Taxes" },
  { term: "Federal Income Tax", short: "Progressive tax on your income", detail: "The US uses progressive brackets (10%-37%). Only income within each bracket is taxed at that rate. Applied after deductions (standard or itemized). Withheld from each paycheck based on your W-4.", icon: Landmark, category: "Taxes" },
  { term: "Marginal Tax Rate", short: "Tax rate on your last dollar earned", detail: "The highest bracket your income reaches. Only income ABOVE the bracket threshold is taxed at this rate. Important for evaluating the impact of raises, bonuses, or additional income.", icon: Percent, category: "Taxes" },
  { term: "Effective Tax Rate", short: "Average rate across ALL your income", detail: "Total tax paid ÷ Total income. Always lower than your marginal rate. A $75K earner in the 22% bracket might have an effective rate of only ~11%.", icon: Percent, category: "Taxes" },
  { term: "Standard Deduction", short: "Fixed amount reducing your taxable income", detail: "2026: $15,000 (single), $30,000 (married), $22,500 (head of household). No receipts needed. Used by ~90% of taxpayers since the TCJA of 2017 nearly doubled it.", icon: Receipt, category: "Deductions" },
  { term: "Itemized Deductions", short: "Specific expenses you can deduct", detail: "Choose this when it exceeds your standard deduction. Includes: mortgage interest, SALT (capped at $10K), charitable donations, medical expenses over 7.5% AGI, casualty losses. File Schedule A.", icon: Receipt, category: "Deductions" },
  { term: "401(k)", short: "Employer-sponsored retirement plan", detail: "Contribute pre-tax money (reduces taxable income). 2026 limit: $23,500 ($31,000 if 50+). Employer may match (free money!). Withdrawals taxed as ordinary income in retirement.", icon: PiggyBank, category: "Benefits" },
  { term: "Roth 401(k) / Roth IRA", short: "Retirement account with tax-free withdrawals", detail: "Contributions are NOT tax-deductible, but growth AND withdrawals are completely tax-free in retirement. Best if you expect higher taxes in retirement.", icon: PiggyBank, category: "Benefits" },
  { term: "HSA (Health Savings Account)", short: "Triple tax-advantaged healthcare account", detail: "Contributions are tax-deductible, growth is tax-free, medical withdrawals are tax-free. 2026 limits: $4,300 individual / $8,550 family. Must have a High Deductible Health Plan (HDHP).", icon: Heart, category: "Benefits" },
  { term: "FSA (Flexible Spending Account)", short: "Pre-tax account for healthcare costs", detail: "Contribute pre-tax money for medical, dental, vision expenses. 2026 limit: $3,300. Use-it-or-lose-it (some plans allow $660 rollover). Can also have Dependent Care FSA.", icon: Heart, category: "Benefits" },
  { term: "Tax Credit", short: "Directly reduces your tax bill dollar-for-dollar", detail: "More valuable than deductions. $1,000 credit = $1,000 less tax. Refundable credits can give you money back even if you owe no tax. Examples: Child Tax Credit, EITC, education credits.", icon: Lightbulb, category: "Tax Planning" },
  { term: "Tax Deduction", short: "Reduces your taxable income", detail: "Value depends on your tax bracket. $1,000 deduction at 24% bracket = $240 savings. Less valuable than credits for most people, but still important.", icon: Receipt, category: "Tax Planning" },
  { term: "Capital Gains Tax", short: "Tax on profit from selling investments", detail: "Short-term (held ≤1 year): taxed at ordinary rates (10%-37%). Long-term (held >1 year): preferential rates of 0%, 15%, or 20%. Holding investments longer saves significant taxes.", icon: TrendingUp, category: "Tax Planning" },
  { term: "AGI (Adjusted Gross Income)", short: "Income after above-the-line deductions", detail: "Total income minus adjustments like 401(k), HSA, student loan interest, educator expenses. AGI determines eligibility for many deductions and credits.", icon: BarChart3, category: "Concepts" },
  { term: "MAGI (Modified AGI)", short: "AGI with some deductions added back", detail: "Used to determine eligibility for IRA contributions, premium tax credits, and other benefits. Adds back student loan interest, excluded foreign income, and half of self-employment tax.", icon: BarChart3, category: "Concepts" },
  { term: "SALT Deduction", short: "State and Local Tax deduction (capped at $10K)", detail: "Deducts state income tax, local income tax, and property taxes. Capped at $10,000 total ($5,000 married filing separately) since 2018 TCJA.", icon: Building2, category: "Deductions" },
  { term: "Wage Garnishment", short: "Court-ordered deduction from your paycheck", detail: "For child support, alimony, student loans, tax debts, or creditor judgments. Subject to federal limits (typically 25% of disposable earnings, or the amount exceeding 30x federal minimum wage).", icon: Scale, category: "Deductions" },
  { term: "Pay Period", short: "How often you get paid", detail: "Weekly (52/yr), Bi-weekly (26/yr), Semi-monthly (24/yr on 1st & 15th), Monthly (12/yr). Your annual salary is the same regardless of pay frequency, but per-check amounts differ.", icon: Calculator, category: "Concepts" },
  { term: "Overtime", short: "Extra pay for hours over 40/week", detail: "Non-exempt employees get 1.5x regular rate for hours 41-40 in a week. Some states require double-time after 8-12 hours/day. Exempt (salaried) employees generally don't get overtime.", icon: Briefcase, category: "Earnings" },
  { term: "Supplemental Wage Rate", short: "Flat 22% federal withholding on bonuses/commissions", detail: "Employers can withhold a flat 22% for supplemental pay under $1M (37% above $1M). You can also choose to have supplemental pay added to regular wages for withholding.", icon: DollarSign, category: "Earnings" },
  { term: "Exempt vs Non-Exempt", short: "FLSA classification for overtime eligibility", detail: "Exempt employees (salary, professional/managerial duties) are NOT eligible for overtime. Non-exempt (hourly, or salary below threshold) get 1.5x overtime. Misclassification is a common wage violation.", icon: Users, category: "Concepts" },
  { term: "EITC (Earned Income Tax Credit)", short: "Refundable credit for low-to-moderate income workers", detail: "Up to $7,890 (2026, 3+ children). Must have earned income. ~25% of eligible people don't claim it! Even if you owe no tax, you can get a refund check.", icon: Heart, category: "Tax Planning" },
  { term: "Wash Sale Rule", short: "Can't claim a loss if you buy the same security within 30 days", detail: "If you sell a stock at a loss and buy a substantially identical security within 30 days before or after the sale, the loss is disallowed for tax purposes.", icon: TrendingUp, category: "Tax Planning" },
  { term: "Cost of Living Adjustment (COLA)", short: "Annual increase to benefits based on inflation", detail: "Social Security benefits are adjusted annually for inflation. 2026 COLA was 2.5%. Also applies to some tax brackets, standard deductions, and contribution limits.", icon: Percent, category: "Concepts" },
  { term: "Tax Bracket (Tax Rate Schedule)", short: "Income ranges taxed at specific rates", detail: "2026 single brackets: 10% ($0-$11,925), 12% ($11,926-$48,475), 22% ($48,476-$103,350), 24% ($103,351-$197,300), 32% ($197,301-$250,525), 35% ($250,526-$626,350), 37% (over $626,350).", icon: Landmark, category: "Taxes" },
  { term: "Withholding", short: "Tax money held back from your paycheck", detail: "Your employer withholds estimated taxes based on your W-4. If too much is withheld, you get a refund. If too little, you owe money and may face penalties.", icon: Building2, category: "Concepts" },
  { term: "Estimated Tax Payment", short: "Quarterly tax payments for 1099/self-employed", detail: "If you expect to owe $1,000+ in taxes and don't have enough withholding, you must make quarterly payments (April 15, June 15, Sep 15, Jan 15). Underpayment incurs penalties.", icon: Calculator, category: "Tax Planning" },
  { term: "AMT (Alternative Minimum Tax)", short: "Parallel tax system ensuring minimum tax payment", detail: "Calculated separately with fewer deductions. If AMT tax > regular tax, you pay AMT. Primarily affects high-income taxpayers with large SALT deductions, ISO exercises, or many dependents.", icon: Landmark, category: "Taxes" },
  { term: "Dependent", short: "A person you financially support who qualifies for tax benefits", detail: "Qualifying child: under 19 (24 if student), lived with you 6+ months, didn't provide half their support. Qualifying relative: various relationship/income tests. Each dependent can unlock credits/deductions.", icon: Users, category: "Concepts" },
  { term: "Tax Return (Form 1040)", short: "Annual filing reconciling taxes withheld vs. owed", detail: "Filed by April 15 (or Oct 15 with extension). You report all income, claim deductions/credits, and calculate if you get a refund or owe more. E-filing is the standard method.", icon: FileText, category: "Forms" },
  { term: "Property Tax", short: "Annual tax on real estate ownership", detail: "Based on assessed value (not market value). Rates range from 0.3% to 2.5% depending on county. Deductible on Schedule A (subject to SALT $10K cap). Paid to county/tax collector.", icon: Home, category: "Taxes" },
  { term: "Marriage Penalty/Bonus", short: "Tax impact of filing jointly vs. separately", detail: "Penalty: Combined tax > sum of individual taxes (common when incomes are similar). Bonus: Combined tax < sum (common when one spouse earns much less). Standard deduction doubles for married filing jointly.", icon: Users, category: "Concepts" },
  { term: "Tax-Loss Harvesting", short: "Selling losing investments to offset gains", detail: "Sell investments at a loss to offset capital gains dollar-for-dollar. Excess losses can deduct $3,000/year against ordinary income. Losses carry forward indefinitely.", icon: TrendingUp, category: "Tax Planning" },
  { term: "Backdoor Roth IRA", short: "Strategy for high earners to fund a Roth IRA", detail: "Contribute to a traditional IRA (no income limit), then convert to Roth. Works best if you have no other pre-tax IRA balances (the pro-rata rule). Allowed since income limits on Roth contributions.", icon: PiggyBank, category: "Tax Planning" },
  { term: "Qualified Business Income (QBI) Deduction", short: "20% deduction on pass-through business income", detail: "For LLCs, S-Corps, partnerships, sole proprietorships. Up to 20% deduction on qualified business income. Phase-out at $191,950 (single) / $383,900 (married). Service businesses face additional limits.", icon: Briefcase, category: "Tax Planning" },
  { term: "Progressive Tax System", short: "Higher income = higher tax rates on additional income", detail: "The US uses marginal rates — each dollar is taxed at the rate of the bracket it falls into. Your first dollars are taxed at 10%, later dollars at potentially 37%. The system is designed to be equitable.", icon: BarChart3, category: "Concepts" },
  { term: "Net Investment Income Tax (NIIT)", short: "Additional 3.8% tax on investment income", detail: "Applies to individuals with MAGI over $200K (single) / $250K (married). Covers capital gains, dividends, rental income, interest. Combined with capital gains rate (e.g., 15% + 3.8% = 18.8%).", icon: Percent, category: "Taxes" },
  { term: "1099-NEC", short: "Reports non-employee compensation (freelance/contract work)", detail: "Issued by clients who paid you $600+ as an independent contractor. You're responsible for paying both employer and employee FICA (15.3%) and making quarterly estimated tax payments.", icon: FileText, category: "Forms" },
  { term: "529 Plan", short: "Tax-advantaged education savings account", detail: "Contributions grow tax-free. Withdrawals for qualified education expenses (tuition, room, board, books) are tax-free. Many states offer a state income tax deduction for contributions.", icon: GraduationCap, category: "Benefits" },
  { term: "ISO (Incentive Stock Option)", short: "Employee stock option with tax advantages", detail: "No tax at exercise if holding requirements are met. Qualifying disposition (hold 2yr from grant + 1yr from exercise): entire gain is long-term capital gains. Can trigger AMT at exercise.", icon: TrendingUp, category: "Benefits" },
];

const CATEGORIES = ["All", "Earnings", "Taxes", "Deductions", "Benefits", "Forms", "Tax Planning", "Concepts"];

export default function GlossarySection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = TERMS.filter((t) => {
    const matchSearch =
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.short.toLowerCase().includes(search.toLowerCase()) ||
      t.detail.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || t.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <motion.div {...fadeIn} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            Payroll & Tax Glossary
          </CardTitle>
          <CardDescription>
            {TERMS.length} essential terms explained in plain English — from AGI to Wash Sale Rule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search terms (e.g., '401k', 'FICA', 'capital gains')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                className="cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-xs"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1 opacity-60">
                    ({TERMS.filter((t) => t.category === cat).length})
                  </span>
                )}
              </Badge>
            ))}
          </div>

          {/* Terms List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No terms found matching &quot;{search}&quot; in {activeCategory}
              </div>
            ) : (
              filtered.map((t) => (
                <TermCard key={t.term} term={t} />
              ))
            )}
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2">
            Showing {filtered.length} of {TERMS.length} terms
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TermCard({ term }: { term: Term }) {
  const Icon = term.icon;
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 mt-0.5">
            <Icon className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm">{term.term}</h4>
              <Badge variant="secondary" className="text-[10px]">{term.category}</Badge>
            </div>
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mt-0.5">{term.short}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{term.detail}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}