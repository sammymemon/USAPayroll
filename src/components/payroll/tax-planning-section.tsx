"use client";

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
  PiggyBank,
  GraduationCap,
  Home,
  Heart,
  TreePine,
  Baby,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  Lightbulb,
  ArrowRight,
  DollarSign,
  Target,
  Calculator,
  Users,
  Receipt,
  Star,
  Zap,
  Landmark,
} from "lucide-react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

interface Strategy {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  savings: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  difficultyColor: string;
  description: string;
  howItWorks: string;
  example: string;
  whoShouldUse: string;
  category: string;
}

const STRATEGIES: Strategy[] = [
  {
    id: "401k",
    title: "Max Out Your 401(k)",
    icon: PiggyBank,
    iconColor: "text-emerald-600",
    savings: "Up to $5,980/yr in tax savings",
    difficulty: "Easy",
    difficultyColor: "bg-emerald-100 text-emerald-700",
    description: "Contribute pre-tax dollars to reduce your taxable income. Every dollar you put in reduces your taxable income by a dollar.",
    howItWorks: "Elect to contribute up to $23,000 (2024) of your pre-tax salary. At 22% bracket, each $1,000 contributed saves $220 in federal tax. Your money grows tax-deferred until retirement.",
    example: "Earn $100K, contribute $23K → taxable income drops to $77K. You save ~$5,060 in federal tax + ~$1,035 in FICA. Total: ~$6,095 saved.",
    whoShouldUse: "Anyone with employer-sponsored 401(k), especially high-bracket earners. Even better if employer matches!",
    category: "Retirement",
  },
  {
    id: "hsa",
    title: "Use an HSA (Triple Tax Advantage)",
    icon: ShieldCheck,
    iconColor: "text-teal-600",
    savings: "Tax-free contributions + growth + withdrawals",
    difficulty: "Easy",
    difficultyColor: "bg-emerald-100 text-emerald-700",
    description: "Health Savings Account is the ONLY account with triple tax advantages: tax-deductible contributions, tax-free growth, AND tax-free withdrawals for medical expenses.",
    howItWorks: "Must have a High Deductible Health Plan (HDHP). Contribute up to $4,150 individual / $8,300 family (2024). Invest the balance for long-term growth. In retirement, withdraw for any purpose (pay income tax on non-medical withdrawals, similar to 401k).",
    example: "Contribute $4,150/year for 20 years, invest at 7% = ~$170K balance. If used for medical expenses, ALL of it is tax-free. If used in retirement for non-medical, taxed like a traditional IRA.",
    whoShouldUse: "Anyone with an HDHP. Best financial account in America for those who qualify. Treat it as a stealth retirement account.",
    category: "Healthcare",
  },
  {
    id: "roth",
    title: "Roth IRA Conversions in Low-Income Years",
    icon: TrendingUp,
    iconColor: "text-amber-600",
    savings: "Potentially $100K+ in lifetime tax savings",
    difficulty: "Advanced",
    difficultyColor: "bg-red-100 text-red-700",
    description: "Convert traditional IRA/401(k) to Roth during years when your income (and tax bracket) is temporarily low — between jobs, sabbatical, early retirement, or part-time work.",
    howItWorks: "Pay tax on the converted amount at your current (lower) bracket. The converted money then grows and is withdrawn TAX-FREE in retirement. This is especially powerful if you expect higher rates or higher income in retirement.",
    example: "Between jobs, your income drops to $30K (12% bracket). Convert $50K from traditional to Roth. Tax = $5,868. That $50K grows to $200K in 20 years — all tax-free. vs. leaving it in traditional where withdrawals would be taxed at potentially 22-24%.",
    whoShouldUse: "Those with traditional retirement accounts who expect to be in a higher tax bracket in retirement, or who have a temporarily low-income year.",
    category: "Retirement",
  },
  {
    id: "taxloss",
    title: "Tax-Loss Harvesting",
    icon: Target,
    iconColor: "text-red-600",
    savings: "Up to $3,000/yr offset + carry-forward",
    difficulty: "Medium",
    difficultyColor: "bg-amber-100 text-amber-700",
    description: "Sell investments at a loss to offset capital gains. If losses exceed gains, deduct up to $3,000 from ordinary income and carry forward the rest indefinitely.",
    howItWorks: "Review your taxable investment accounts annually. Sell losing positions to realize the loss. Immediately buy a similar (but not 'substantially identical') investment to stay invested. Net short-term and long-term losses against corresponding gains first.",
    example: "You have $10K in gains and $15K in losses. Net: $5K loss. $3K offsets ordinary income (saves ~$660 at 22%). Remaining $2K carries forward to next year. You also maintained your investment position.",
    whoShouldUse: "Anyone with taxable investment accounts (not IRAs/401ks). Most beneficial for high-income earners with large investment portfolios.",
    category: "Investment",
  },
  {
    id: "charity",
    title: "Strategic Charitable Giving",
    icon: Heart,
    iconColor: "text-rose-600",
    savings: "Deduction value: 22-37% of donation",
    difficulty: "Medium",
    difficultyColor: "bg-amber-100 text-amber-700",
    description: "Donate appreciated stock instead of cash. You get a deduction for the FULL fair market value AND avoid paying capital gains tax on the appreciation.",
    howItWorks: "Instead of selling stock and donating cash, donate the stock directly to a charity. You deduct the current value (not your cost basis). The charity sells it tax-free. You avoid capital gains on the appreciation.",
    example: "Donate $10K worth of stock you bought for $4K. If you sold it, you'd pay $900 in capital gains (15% on $6K gain) and donate $9,100. Instead, donate the stock: you get a $10K deduction (saves $2,200 at 22%) + avoided $900 in capital gains tax = $3,100 total benefit.",
    whoShouldUse: "Itemizers who donate to charity and have appreciated investments. Best for those in higher tax brackets.",
    category: "Deductions",
  },
  {
    id: "qbi",
    title: "Qualified Business Income (QBI) Deduction",
    icon: Briefcase,
    iconColor: "text-blue-600",
    savings: "Up to 20% of business income deduction",
    difficulty: "Medium",
    difficultyColor: "bg-amber-100 text-amber-700",
    description: "If you have self-employment, freelance, or small business income, you may deduct up to 20% of your qualified business income (Section 199A deduction).",
    howItWorks: "Eligible income from pass-through entities (sole prop, LLC, S-corp, partnership). Deduction is up to 20% of QBI, subject to income thresholds and phase-outs. For 2024, full deduction available up to $191,950 (single) / $383,900 (married).",
    example: "Freelancer earns $100K in 1099 income. QBI deduction = 20% × $100K = $20K deduction. This reduces taxable income from $100K to $80K. Tax savings: ~$4,400 at 22% bracket. It's essentially a 4.4% tax cut on business income.",
    whoShouldUse: "Self-employed, freelancers, and small business owners. Especially valuable for service businesses below the income threshold.",
    category: "Business",
  },
  {
    id: "529",
    title: "529 Plan for Education",
    icon: GraduationCap,
    iconColor: "text-indigo-600",
    savings: "Tax-free growth for education",
    difficulty: "Easy",
    difficultyColor: "bg-emerald-100 text-emerald-700",
    description: "Contribute after-tax dollars to a 529 plan. Money grows tax-free AND withdrawals are tax-free when used for qualified education expenses (tuition, books, room, board).",
    howItWorks: "Open a 529 plan in any state (many offer state tax deductions). Contribute up to the gift tax limit ($18K/year per person without filing gift tax). Some states allow front-loading 5 years at once ($90K). Investment grows tax-free.",
    example: "Contribute $300/month for 18 years at 7% return = ~$133K. All earnings (~$69K) are tax-free if used for education. In a taxable account, you'd owe ~$10K in capital gains tax on those earnings.",
    whoShouldUse: "Parents or grandparents planning for children's education. Also useful for adults planning to go back to school.",
    category: "Education",
  },
  {
    id: "fsa",
    title: "Flexible Spending Account (FSA)",
    icon: Receipt,
    iconColor: "text-cyan-600",
    savings: "Up to $1,504 in tax savings",
    difficulty: "Easy",
    difficultyColor: "bg-emerald-100 text-emerald-700",
    description: "Set aside pre-tax dollars for healthcare or dependent care expenses. Reduces your taxable income dollar-for-dollar. But beware: 'use it or lose it' — unused funds are forfeited.",
    howItWorks: "During open enrollment, elect to contribute up to $3,200 (Health Care FSA) or $5,000 (Dependent Care FSA) for 2024. Contributions are deducted pre-tax from each paycheck. Use the funds for eligible expenses during the plan year.",
    example: "Elect $3,200 Health Care FSA. In 22% bracket + 7.65% FICA = 29.65% combined. Tax savings: $3,200 × 29.65% = $949/year. If you also have $5,000 Dependent Care FSA: additional $1,483. Total: ~$2,432 saved.",
    whoShouldUse: "Anyone with predictable medical or childcare expenses. Best for those who know they'll use the full amount.",
    category: "Healthcare",
  },
  {
    id: "mortgage",
    title: "Mortgage Interest & Real Estate Strategy",
    icon: Home,
    iconColor: "text-orange-600",
    savings: "$2,000-$6,000/yr in deductions",
    difficulty: "Medium",
    difficultyColor: "bg-amber-100 text-amber-700",
    description: "Deduct mortgage interest on up to $750K of debt. Plus property taxes (within the $10K SALT cap). Owning a home can provide significant tax benefits.",
    howItWorks: "Interest on your primary residence mortgage is deductible (up to $750K loan). Property taxes are also deductible (but subject to $10K SALT cap with state taxes). Points paid at closing are deductible. Home office deduction available for self-employed.",
    example: "$500K mortgage at 6.5% = $32,500 in first-year interest. In 24% bracket, this saves $7,800 in federal tax. Plus $5,500 property tax (part of $10K SALT cap) saves another ~$1,320. Total: ~$9,120 in tax savings from homeownership.",
    whoShouldUse: "Homeowners with mortgages, especially in early years when interest is highest. Must itemize deductions to benefit.",
    category: "Deductions",
  },
  {
    id: "solar",
    title: "Residential Clean Energy Credit",
    icon: TreePine,
    iconColor: "text-green-600",
    savings: "30% of solar/wind installation cost",
    difficulty: "Easy",
    difficultyColor: "bg-emerald-100 text-emerald-700",
    description: "Install solar panels, solar water heaters, geothermal heat pumps, or small wind turbines and get a 30% tax credit on the total cost — no income limit.",
    howItWorks: "The Inflation Reduction Act extended and enhanced this credit through 2032. 30% of total installation cost is a DIRECT credit (dollar-for-dollar tax reduction). If the credit exceeds your tax liability, it carries forward to future years. Includes labor costs.",
    example: "Install a $25,000 solar system. Tax credit = 30% × $25,000 = $7,500. This directly reduces your tax bill by $7,500. Plus, you save on electricity bills ($1,000-$2,000/year). Payback period: typically 6-9 years.",
    whoShouldUse: "Homeowners considering solar or energy-efficient upgrades. No income limit makes this accessible to all brackets.",
    category: "Green Energy",
  },
];

export default function TaxPlanningSection() {
  const easy = STRATEGIES.filter((s) => s.difficulty === "Easy");
  const medium = STRATEGIES.filter((s) => s.difficulty === "Medium");
  const advanced = STRATEGIES.filter((s) => s.difficulty === "Advanced");

  return (
    <motion.div {...fadeIn} className="space-y-6">
      {/* Overview */}
      <Card className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-600" />
            Tax Planning Strategies That Actually Work
          </CardTitle>
          <CardDescription>
            Smart tax planning can save you thousands every year. These are the most effective, legal strategies used by financial professionals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-center border">
              <Star className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-emerald-700">{easy.length}</div>
              <div className="text-xs text-muted-foreground">Easy Strategies</div>
              <div className="text-[10px] text-emerald-600">Set up once, benefit forever</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-center border">
              <Zap className="h-5 w-5 text-amber-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-amber-700">{medium.length}</div>
              <div className="text-xs text-muted-foreground">Medium Strategies</div>
              <div className="text-[10px] text-amber-600">Requires some planning</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 text-center border">
              <Landmark className="h-5 w-5 text-red-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-red-700">{advanced.length}</div>
              <div className="text-xs text-muted-foreground">Advanced Strategies</div>
              <div className="text-[10px] text-red-600">Consult a tax pro</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Cards */}
      <div className="space-y-8">
        {/* Easy */}
        <div>
          <h3 className="text-sm font-semibold text-emerald-700 flex items-center gap-2 mb-3">
            <Star className="h-4 w-4" /> Easy Wins — Start Here
          </h3>
          <div className="space-y-4">
            {easy.map((s) => (
              <StrategyCard key={s.id} strategy={s} />
            ))}
          </div>
        </div>

        {/* Medium */}
        <div>
          <h3 className="text-sm font-semibold text-amber-700 flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4" /> Medium Effort — High Reward
          </h3>
          <div className="space-y-4">
            {medium.map((s) => (
              <StrategyCard key={s.id} strategy={s} />
            ))}
          </div>
        </div>

        {/* Advanced */}
        <div>
          <h3 className="text-sm font-semibold text-red-700 flex items-center gap-2 mb-3">
            <Landmark className="h-4 w-4" /> Advanced — Maximum Tax Savings
          </h3>
          <div className="space-y-4">
            {advanced.map((s) => (
              <StrategyCard key={s.id} strategy={s} />
            ))}
          </div>
        </div>
      </div>

      {/* Tax Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Key Tax Dates to Remember (2024-2025)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { date: "Jan 15", event: "Q4 Estimated Tax Payment Due", icon: DollarSign },
              { date: "Apr 15", event: "Tax Return Filing Deadline (Form 1040)", icon: Receipt },
              { date: "Apr 15", event: "Q1 Estimated Tax Payment Due", icon: DollarSign },
              { date: "Jun 16", event: "Q2 Estimated Tax Payment Due", icon: DollarSign },
              { date: "Oct 15", event: "Extension Filing Deadline", icon: Receipt },
              { date: "Sep 16", event: "Q3 Estimated Tax Payment Due", icon: DollarSign },
              { date: "Jan 15", event: "Q4 Estimated Tax Payment Due (for prior year)", icon: DollarSign },
              { date: "Apr 1", event: "Open / Reopen HSA for prior year", icon: ShieldCheck },
              { date: "Dec 31", event: "Last day for tax-deductible contributions", icon: Target },
              { date: "Year-round", event: "Review W-4 withholding after life changes", icon: Users },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0 w-16">
                    <div className="text-xs font-bold text-emerald-700">{item.date}</div>
                  </div>
                  <Icon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="text-sm">{item.event}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StrategyCard({ strategy }: { strategy: Strategy }) {
  const Icon = strategy.icon;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-muted/50 ${strategy.iconColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{strategy.title}</CardTitle>
              <CardDescription className="mt-0.5 text-xs">
                {strategy.description}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <Badge className={`${strategy.difficultyColor} border-0 text-[10px]`}>
              {strategy.difficulty}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {strategy.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs font-semibold mb-1 flex items-center gap-1">
              <ArrowRight className="h-3 w-3 text-emerald-600" /> How It Works
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">{strategy.howItWorks}</p>
          </div>
          <div>
            <div className="text-xs font-semibold mb-1 flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-emerald-600" /> Real-World Example
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded p-2 text-xs leading-relaxed font-mono">
              {strategy.example}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-2.5">
          <Users className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <strong>Best for:</strong> {strategy.whoShouldUse}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Potential savings:</div>
          <div className="text-sm font-bold text-emerald-700">{strategy.savings}</div>
        </div>
      </CardContent>
    </Card>
  );
}