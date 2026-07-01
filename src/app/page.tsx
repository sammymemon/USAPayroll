"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DollarSign,
  Receipt,
  Building2,
  FileText,
  Calculator,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Shield,
  Users,
  MapPin,
  ChevronRight,
  Banknote,
  Landmark,
  Briefcase,
  Clock,
  TrendingDown,
  Calendar,
} from "lucide-react";
import PayrollCalculator from "@/components/payroll/payroll-calculator";
import PayStubView from "@/components/payroll/pay-stub-view";
import ScenariosSection from "@/components/payroll/scenarios-section";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
} from "recharts";

const REF_DATA = {
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

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("fundamentals");
  const [payStubResult, setPayStubResult] = useState<Record<string, unknown> | null>(null);

  const refData = REF_DATA;

  // Pay stub is shown with a pre-computed example (fetched lazily when tab is active)
  const payStubFetchedRef = useRef(false);

  useEffect(() => {
    if (activeTab === "paystub" && !payStubFetchedRef.current && !payStubResult) {
      payStubFetchedRef.current = true;
      fetch("/api/payroll/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          annualSalary: 85000,
          payFrequency: "biweekly",
          filingStatus: "single",
          stateCode: "CA",
          preTax401k: 4000,
          preTaxHealthInsurance: 2400,
          preTaxHSA: 0,
          otherPreTax: 0,
          postTaxDeductions: 0,
        }),
      })
        .then((r) => r.json())
        .then(setPayStubResult)
        .catch(() => {});
    }
  }, [activeTab, payStubResult]);

  const tabs = [
    { id: "fundamentals", label: "Fundamentals", icon: BookOpen },
    { id: "federal", label: "Federal Tax", icon: Landmark },
    { id: "fica", label: "FICA", icon: Shield },
    { id: "state", label: "State Tax", icon: MapPin },
    { id: "calculator", label: "Calculator", icon: Calculator },
    { id: "paystub", label: "Pay Stub", icon: Receipt },
    { id: "scenarios", label: "Scenarios", icon: Users },
    { id: "forms", label: "Forms", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
                <GraduationCap className="h-8 w-8" />
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                2024 Tax Year
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Master USA Payroll
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mb-6">
              A comprehensive, interactive guide to understanding American payroll — from gross pay to net
              pay, with real-world examples, calculators, and visual breakdowns.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3">
                <DollarSign className="mr-1.5 h-3.5 w-3.5" /> Tax Brackets
              </Badge>
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3">
                <Calculator className="mr-1.5 h-3.5 w-3.5" /> Interactive Calculator
              </Badge>
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3">
                <Receipt className="mr-1.5 h-3.5 w-3.5" /> Pay Stub Analysis
              </Badge>
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3">
                <MapPin className="mr-1.5 h-3.5 w-3.5" /> 26 State Tax Rates
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Navigation */}
          <div className="mb-8 overflow-x-auto -mx-4 px-4">
            <TabsList className="inline-flex h-auto gap-1 bg-muted/80 p-1.5 flex-wrap">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-xs sm:text-sm px-3 py-2"
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ===== FUNDAMENTALS ===== */}
          <TabsContent value="fundamentals">
            <motion.div {...fadeIn} className="space-y-6">
              {/* What is Payroll */}
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
                    <InfoCard
                      icon={DollarSign}
                      title="Gross Pay"
                      description="Total earnings before any deductions — base salary, overtime, bonuses, commissions."
                      color="emerald"
                    />
                    <InfoCard
                      icon={TrendingDown}
                      title="Deductions"
                      description="Amounts subtracted from gross pay: federal/state taxes, FICA, insurance, retirement contributions."
                      color="red"
                    />
                    <InfoCard
                      icon={Banknote}
                      title="Net Pay"
                      description="The 'take-home pay' — what actually lands in your bank account after all deductions."
                      color="emerald"
                    />
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

              {/* Pay Periods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    Pay Periods in the USA
                  </CardTitle>
                  <CardDescription>
                    How often you get paid affects your per-check amount but not your annual total
                  </CardDescription>
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

              {/* Types of Earnings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    Types of Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EarningCard
                      title="Salary (Exempt)"
                      description="Fixed annual amount divided by pay periods. Not eligible for overtime under FLSA. Common for professional, managerial, and administrative roles."
                      example="$85,000/year → $3,269.23/bi-weekly"
                    />
                    <EarningCard
                      title="Hourly (Non-Exempt)"
                      description="Paid by the hour with overtime at 1.5x for hours over 40/week. Protected by the Fair Labor Standards Act (FLSA)."
                      example="$40/hr × 40hrs = $1,600/week (OT: $60/hr)"
                    />
                    <EarningCard
                      title="Commission"
                      description="Percentage of sales revenue. May be combined with base salary. Taxed as ordinary income, but employers may withhold at a flat 22% supplemental rate."
                      example="3% of $50,000 in sales = $1,500 commission"
                    />
                    <EarningCard
                      title="Bonuses"
                      description="Discretionary or performance-based payments. Can be taxed at flat 22% supplemental rate (under $1M) or at 37% (over $1M)."
                      example="$5,000 bonus → 22% withheld = $3,900 net"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pre-tax vs Post-tax */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-emerald-600" />
                    Pre-Tax vs Post-Tax Deductions
                  </CardTitle>
                  <CardDescription>
                    Understanding the order of deductions is crucial for accurate payroll
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4" /> Step 1: Pre-Tax Deductions (reduce taxable income)
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        These are subtracted <strong>before</strong> taxes are calculated, lowering your overall tax burden.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <DeductionItem name="401(k) Contributions" limit="$23,000 (2024), $30,500 if 50+" />
                        <DeductionItem name="Health Insurance Premiums" limit="No federal limit" />
                        <DeductionItem name="HSA Contributions" limit="$4,150 individual / $8,300 family" />
                        <DeductionItem name="FSA Contributions" limit="$3,200 (2024)" />
                        <DeductionItem name="Commuter Benefits" limit="$315 transit + $315 parking" />
                        <DeductionItem name="Section 125 Cafeteria Plan" limit="Varies by plan" />
                      </div>
                    </div>

                    <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto" />

                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-2">
                        <Landmark className="h-4 w-4" /> Step 2: Tax Withholdings (federal, state, FICA)
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Taxes are calculated on the remaining income after pre-tax deductions. See the Federal Tax and FICA tabs for details.
                      </p>
                    </div>

                    <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto" />

                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Receipt className="h-4 w-4" /> Step 3: Post-Tax Deductions (after taxes)
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        These are subtracted <strong>after</strong> all taxes. They don&apos;t reduce your tax burden.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <DeductionItem name="Roth 401(k)" limit="Same as traditional 401(k)" />
                        <DeductionItem name="Roth IRA" limit="$7,000 (2024), $8,000 if 50+" />
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
          </TabsContent>

          {/* ===== FEDERAL TAX ===== */}
          <TabsContent value="federal">
            <motion.div {...fadeIn} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-emerald-600" />
                    Federal Income Tax — How It Works
                  </CardTitle>
                  <CardDescription>
                    The US uses a <strong>progressive tax system</strong> — higher income is taxed at higher rates, but only on the amount within each bracket.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progressive Tax Explained */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm space-y-2">
                        <p>
                          <strong>Key Concept: Progressive Tax Brackets</strong> — Your income is not taxed at a single flat rate.
                          Instead, it&apos;s divided into portions (&quot;brackets&quot;), and each portion is taxed at its own rate.
                        </p>
                        <p>
                          <strong>Example:</strong> If you earn $60,000 (single filer), only the amount <em>above</em> $47,150 is taxed at 22%.
                          The first $11,600 is taxed at 10%, and $11,601–$47,150 at 12%.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Standard Deduction */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-emerald-600" />
                      Standard Deduction (2024)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      The standard deduction reduces your taxable income. Most employees use this instead of itemizing deductions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {refData?.standardDeductions &&
                        Object.entries(refData.standardDeductions).map(([key, val]) => (
                          <Card key={key} className="border-2 border-emerald-100 dark:border-emerald-900">
                            <CardContent className="pt-4 text-center">
                              <div className="text-sm text-muted-foreground capitalize">
                                {key.replace("_", " ")}
                              </div>
                              <div className="text-2xl font-bold text-emerald-700">{fmt(val)}</div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>

                  {/* Tax Brackets Table */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">2024 Federal Tax Brackets</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-center mb-2">Single Filers</h4>
                        <div className="rounded-lg border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead>Rate</TableHead>
                                <TableHead className="text-right">Income Range</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {refData?.federalBracketsSingle.map((b, i) => (
                                <TableRow key={i}>
                                  <TableCell>
                                    <Badge variant={i < 2 ? "secondary" : "default"}>{b.rate}%</Badge>
                                  </TableCell>
                                  <TableCell className="text-right font-mono text-sm">
                                    {fmt(b.min)} {b.max ? `– ${fmt(b.max)}` : "+"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-center mb-2">Married Filing Jointly</h4>
                        <div className="rounded-lg border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead>Rate</TableHead>
                                <TableHead className="text-right">Income Range</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {refData?.federalBracketsMarried.map((b, i) => (
                                <TableRow key={i}>
                                  <TableCell>
                                    <Badge variant={i < 2 ? "secondary" : "default"}>{b.rate}%</Badge>
                                  </TableCell>
                                  <TableCell className="text-right font-mono text-sm">
                                    {fmt(b.min)} {b.max ? `– ${fmt(b.max)}` : "+"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Worked Example */}
                  <Card className="border-2 border-emerald-200 dark:border-emerald-800">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Worked Example: $75,000 Single Filer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                          <div className="bg-gray-50 dark:bg-gray-900 rounded p-3">
                            <div className="text-xs text-muted-foreground">Gross Income</div>
                            <div className="font-bold text-lg">$75,000</div>
                          </div>
                          <div className="bg-red-50 dark:bg-red-950/30 rounded p-3">
                            <div className="text-xs text-muted-foreground">Standard Deduction</div>
                            <div className="font-bold text-lg text-red-600">− $14,600</div>
                          </div>
                          <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded p-3">
                            <div className="text-xs text-muted-foreground">Taxable Income</div>
                            <div className="font-bold text-lg text-emerald-700">$60,400</div>
                          </div>
                        </div>
                        <div className="rounded-lg border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead>Bracket</TableHead>
                                <TableHead className="text-right">Taxable Amount</TableHead>
                                <TableHead className="text-right">Rate</TableHead>
                                <TableHead className="text-right">Tax</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>$0 – $11,600</TableCell>
                                <TableCell className="text-right font-mono">$11,600</TableCell>
                                <TableCell className="text-right">10%</TableCell>
                                <TableCell className="text-right font-semibold text-red-600">$1,160.00</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>$11,601 – $47,150</TableCell>
                                <TableCell className="text-right font-mono">$35,550</TableCell>
                                <TableCell className="text-right">12%</TableCell>
                                <TableCell className="text-right font-semibold text-red-600">$4,266.00</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>$47,151 – $60,400</TableCell>
                                <TableCell className="text-right font-mono">$13,250</TableCell>
                                <TableCell className="text-right">22%</TableCell>
                                <TableCell className="text-right font-semibold text-red-600">$2,915.00</TableCell>
                              </TableRow>
                              <TableRow className="bg-emerald-50 dark:bg-emerald-950/30 font-bold">
                                <TableCell colSpan={3}>Total Federal Income Tax</TableCell>
                                <TableCell className="text-right text-red-600">$8,341.00</TableCell>
                              </TableRow>
                              <TableRow className="bg-emerald-50 dark:bg-emerald-950/30">
                                <TableCell colSpan={3}>Effective Tax Rate</TableCell>
                                <TableCell className="text-right text-emerald-700">11.12%</TableCell>
                              </TableRow>
                              <TableRow className="bg-emerald-50 dark:bg-emerald-950/30">
                                <TableCell colSpan={3}>Marginal Tax Rate</TableCell>
                                <TableCell className="text-right">
                                  <Badge>22%</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mt-3">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong>Note:</strong> The marginal rate (22%) only applies to income <em>above</em> $47,150.
                              Your effective rate (11.12%) is much lower because most income is taxed in lower brackets.
                              This is a common misconception — earning more doesn&apos;t mean ALL your income is taxed at the higher rate!
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Marginal vs Effective */}
                  <Card>
                <CardHeader>
                  <CardTitle className="text-base">Marginal vs Effective Tax Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                        Marginal Rate
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The tax rate on your <strong>last dollar earned</strong>. If you&apos;re in the 22% bracket,
                        only income above the 22% threshold is taxed at 22%. Important for evaluating the tax impact of a raise.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        Effective Rate
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The <strong>average rate</strong> across all your income. Calculated as total tax ÷ total income.
                        This tells you what percentage of your income actually goes to federal tax.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* W-4 Withholding */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Form W-4 & Tax Withholding</CardTitle>
                  <CardDescription>
                    The W-4 form tells your employer how much federal income tax to withhold from each paycheck
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-muted-foreground">
                  <p>
                    When you start a new job, you fill out IRS Form W-4. This determines how much federal tax
                    your employer withholds. Key factors:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 ml-2">
                    <li><strong>Step 1:</strong> Multiple jobs or working spouse — adjust for accurate withholding</li>
                    <li><strong>Step 2:</strong> Claim dependents — each qualifying child under 17 reduces withholding by ~$2,000</li>
                    <li><strong>Step 3:</strong> Other adjustments — other income, deductions, extra withholding</li>
                    <li><strong>Step 4:</strong> You can also specify an exact extra amount to withhold per pay period</li>
                  </ul>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Tip:</strong> If you got a large refund last year, your withholding is too high (you&apos;re giving the
                        government an interest-free loan). If you owed taxes, increase your withholding.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            </Card>
            </motion.div>
          </TabsContent>

          {/* ===== FICA ===== */}
          <TabsContent value="fica">
            <motion.div {...fadeIn} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    What is FICA?
                  </CardTitle>
                  <CardDescription>
                    FICA (Federal Insurance Contributions Act) funds Social Security and Medicare — two of the largest social safety net programs in the US.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    FICA taxes are <strong>mandatory</strong> for both employees and employers. They are flat-rate taxes
                    (not progressive), and you cannot opt out. Both you and your employer each pay half.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FICACard
                      title="Social Security (OASDI)"
                      rate="6.2%"
                      wageBase="$168,600"
                      employerMatch="6.2%"
                      description="Provides retirement, disability, and survivor benefits. The tax applies only to earnings up to the wage base limit."
                      benefits={["Retirement benefits (at full retirement age)", "Disability benefits", "Survivor benefits for dependents", "Medicare eligibility (at 65)"]}
                      color="emerald"
                    />
                    <FICACard
                      title="Medicare"
                      rate="1.45%"
                      wageBase="No Limit"
                      employerMatch="1.45%"
                      description="Provides health insurance for Americans aged 65+ and some younger people with disabilities. No wage base cap."
                      benefits={["Hospital insurance (Part A)", "Medical insurance (Part B)", "Prescription drug coverage (Part D)", "Medicare Advantage plans (Part C)"]}
                      color="teal"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Additional Medicare */}
              <Card className="border-2 border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    Additional Medicare Tax (High Earners)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-muted-foreground">
                  <p>
                    If your earnings exceed <strong>$200,000</strong> (single) or <strong>$250,000</strong> (married filing jointly),
                    an <strong>additional 0.9% Medicare tax</strong> applies to income above the threshold.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground">Threshold (Single)</div>
                        <div className="text-lg font-bold">$200,000</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Threshold (Married)</div>
                        <div className="text-lg font-bold">$250,000</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Additional Rate</div>
                        <div className="text-lg font-bold text-red-600">0.9%</div>
                      </div>
                    </div>
                  </div>
                  <p>
                    <strong>Example:</strong> If you earn $250,000, you pay 1.45% on all $250,000 + 0.9% on the $50,000 above $200,000.
                    Unlike the regular Medicare tax, the <strong>employer does NOT match</strong> the additional Medicare tax.
                  </p>
                </CardContent>
              </Card>

              {/* Self-Employment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-emerald-600" />
                    Self-Employment Tax (SECA)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-muted-foreground">
                  <p>
                    Self-employed individuals pay <strong>both the employee and employer portions</strong> of FICA,
                    totaling <strong>15.3%</strong> (12.4% SS + 2.9% Medicare). However, you can deduct half of this
                    as a business expense.
                  </p>
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

              {/* FICA Example */}
              <Card className="border-2 border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Worked Example: FICA on $85,000
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Tax</TableHead>
                          <TableHead className="text-right">Rate</TableHead>
                          <TableHead className="text-right">Wages Subject To</TableHead>
                          <TableHead className="text-right">Annual Tax</TableHead>
                          <TableHead className="text-right">Per Paycheck (26)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Social Security</TableCell>
                          <TableCell className="text-right">6.2%</TableCell>
                          <TableCell className="text-right font-mono">$85,000</TableCell>
                          <TableCell className="text-right font-semibold text-red-600">$5,270.00</TableCell>
                          <TableCell className="text-right font-mono">$202.69</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Medicare</TableCell>
                          <TableCell className="text-right">1.45%</TableCell>
                          <TableCell className="text-right font-mono">$85,000</TableCell>
                          <TableCell className="text-right font-semibold text-red-600">$1,232.50</TableCell>
                          <TableCell className="text-right font-mono">$47.40</TableCell>
                        </TableRow>
                        <TableRow className="bg-emerald-50 dark:bg-emerald-950/30 font-bold">
                          <TableCell>Total FICA</TableCell>
                          <TableCell className="text-right">7.65%</TableCell>
                          <TableCell />
                          <TableCell className="text-right text-red-600">$6,502.50</TableCell>
                          <TableCell className="text-right">$250.10</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== STATE TAX ===== */}
          <TabsContent value="state">
            <motion.div {...fadeIn} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    State Income Tax Overview
                  </CardTitle>
                  <CardDescription>
                    41 states plus DC levy income tax. 9 states have no income tax. Rates and structures vary widely.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* No-Tax States */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      States With NO Income Tax
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Alaska", "Florida", "Nevada", "New Hampshire", "South Dakota", "Tennessee", "Texas", "Washington", "Wyoming"].map(
                        (s) => (
                          <Badge key={s} variant="outline" className="text-emerald-700 border-emerald-300 dark:border-emerald-700 py-1.5 px-3">
                            {s}
                          </Badge>
                        )
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      New Hampshire only taxes interest and dividend income (phasing out by 2025).
                    </p>
                  </div>

                  <Separator />

                  {/* State Tax Chart */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3">State Tax Comparison (Top Rates)</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer>
                        <BarChart data={refData?.states.filter((s) => s.hasIncomeTax).sort((a, b) => b.topRate - a.topRate).slice(0, 15) || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="code" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} unit="%" />
                          <RTooltip formatter={(value: number) => [`${value}%`, "Top Rate"]} />
                          <Bar dataKey="topRate" fill="#059669" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <Separator />

                  {/* State Table */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Full State Tax Reference</h3>
                    <div className="max-h-[400px] overflow-y-auto rounded-lg border">
                      <Table>
                        <TableHeader className="sticky top-0 bg-muted z-10">
                          <TableRow>
                            <TableHead>State</TableHead>
                            <TableHead className="text-center">Code</TableHead>
                            <TableHead className="text-center">Has Tax?</TableHead>
                            <TableHead className="text-center">Flat/Progressive</TableHead>
                            <TableHead className="text-right">Top Rate</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {refData?.states
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((s) => (
                              <TableRow key={s.code}>
                                <TableCell className="font-medium">{s.name}</TableCell>
                                <TableCell className="text-center font-mono text-xs">{s.code}</TableCell>
                                <TableCell className="text-center">
                                  {s.hasIncomeTax ? (
                                    <Badge variant="default" className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Yes</Badge>
                                  ) : (
                                    <Badge variant="secondary" className="text-emerald-700 text-xs">No</Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                  {s.hasIncomeTax ? (s.flatTax ? "Flat" : "Progressive") : "—"}
                                </TableCell>
                                <TableCell className="text-right font-mono text-sm">
                                  {s.topRate > 0 ? `${s.topRate}%` : "0%"}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Local Taxes */}
                  <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Additional Local Taxes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p>Some cities and counties impose additional income taxes:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>New York City:</strong> 3.078% – 3.876% (on top of NYS tax)</li>
                        <li><strong>Yonkers, NY:</strong> ~1.6% (varies by income)</li>
                        <li><strong>Baltimore, MD:</strong> 3.05% (city income tax)</li>
                        <li><strong>Detroit, MI:</strong> 2.4% (resident rate)</li>
                        <li><strong>Ohio cities:</strong> Many have municipal income taxes (Columbus, Cincinnati, Cleveland)</li>
                        <li><strong>Kentucky:</strong> All cities impose occupational license fees (0.5% – 2.5%)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== CALCULATOR ===== */}
          <TabsContent value="calculator">
            <motion.div {...fadeIn}>
              <PayrollCalculator />
            </motion.div>
          </TabsContent>

          {/* ===== PAY STUB ===== */}
          <TabsContent value="paystub">
            <motion.div {...fadeIn} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-emerald-600" />
                    Understanding Your Pay Stub
                  </CardTitle>
                  <CardDescription>
                    A real-world example of a typical pay stub. Hover over each section to understand what it means.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Your pay stub (also called an earnings statement or paycheck stub) is a document from your employer
                    showing your earnings and deductions for a specific pay period. Understanding each line is essential
                    for verifying you&apos;re being paid correctly.
                  </p>
                </CardContent>
              </Card>

              {payStubResult && <PayStubView result={payStubResult} />}

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key Pay Stub Sections Explained</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="header">
                      <AccordionTrigger className="text-sm font-medium">Company & Employee Information</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        The header shows the employer&apos;s name, address, and EIN (Employer Identification Number).
                        It also shows your name, employee ID, pay period dates, and pay date. Verify this information
                        is correct, especially after a name change or address update.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="earnings">
                      <AccordionTrigger className="text-sm font-medium">Gross Earnings Section</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        This shows your total earnings before deductions. It includes regular pay, overtime, bonuses,
                        commissions, and other compensation. The &quot;Rate&quot; column shows your hourly rate or salary per period,
                        and &quot;Hours&quot; shows hours worked (for hourly employees). YTD (Year-To-Date) totals help you
                        track cumulative earnings.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="taxes">
                      <AccordionTrigger className="text-sm font-medium">Taxes & Withholdings</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        This section lists all tax deductions: Federal Income Tax (based on your W-4), Social Security (6.2%),
                        Medicare (1.45%), and State Income Tax. Some pay stubs also show local/city taxes. The amounts
                        withheld are estimates — actual tax liability is calculated when you file your tax return.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="deductions">
                      <AccordionTrigger className="text-sm font-medium">Pre-Tax & Post-Tax Deductions</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        Pre-tax deductions (401k, health insurance, HSA, FSA) reduce your taxable income. Post-tax
                        deductions (Roth 401k, garnishments, union dues) are taken after taxes. Pre-tax deductions
                        save you money on taxes, making them more valuable than equivalent post-tax deductions.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="netpay">
                      <AccordionTrigger className="text-sm font-medium">Net Pay</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        This is your take-home pay — the amount deposited into your bank account. It&apos;s calculated as
                        Gross Pay minus all deductions. Your net pay should match the deposit amount. If it doesn&apos;t,
                        contact your payroll department immediately.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== SCENARIOS ===== */}
          <TabsContent value="scenarios">
            <motion.div {...fadeIn} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    Practical Real-World Scenarios
                  </CardTitle>
                  <CardDescription>
                    See how payroll works for different income levels, locations, and life situations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScenariosSection />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== FORMS ===== */}
          <TabsContent value="forms">
            <motion.div {...fadeIn} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-600" />
                    Essential Payroll Forms
                  </CardTitle>
                  <CardDescription>
                    Key IRS and government forms you&apos;ll encounter as an employee in the USA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* W-4 */}
                  <FormCard
                    formNumber="W-4"
                    title="Employee's Withholding Certificate"
                    when="When you start a new job, or when your tax situation changes (marriage, child, home purchase)"
                    purpose="Tells your employer how much federal income tax to withhold from each paycheck"
                    keyFields={[
                      "Step 1: Multiple jobs or spouse works",
                      "Step 2: Claim dependents (children under 17, other dependents)",
                      "Step 3: Other adjustments (other income, deductions)",
                      "Step 4: Extra withholding (optional additional amount)",
                    ]}
                    tip="If you consistently get large refunds, reduce your withholding — that's your money you could use throughout the year!"
                  />

                  {/* W-2 */}
                  <FormCard
                    formNumber="W-2"
                    title="Wage and Tax Statement"
                    when="Provided by your employer by January 31 each year"
                    purpose="Summarizes your total earnings and all taxes withheld during the year. Essential for filing your tax return."
                    keyFields={[
                      "Box 1: Wages, tips, other compensation (federal taxable)",
                      "Box 2: Federal income tax withheld",
                      "Box 3: Social Security wages",
                      "Box 4: Social Security tax withheld",
                      "Box 5: Medicare wages",
                      "Box 6: Medicare tax withheld",
                      "Box 12: Various codes (401k, HSA, etc.)",
                      "Box 17: State income tax withheld",
                    ]}
                    tip="Always verify your W-2 against your last December pay stub's YTD totals. Discrepancies should be reported to payroll immediately."
                  />

                  {/* I-9 */}
                  <FormCard
                    formNumber="I-9"
                    title="Employment Eligibility Verification"
                    when="Within 3 days of your start date"
                    purpose="Verifies your identity and authorization to work in the United States"
                    keyFields={[
                      "Section 1: Employee information and attestation",
                      "Section 2: Employer reviews documents (passport, driver's license, SSN card, etc.)",
                      "Section 3: Reverification (if work authorization expires)",
                    ]}
                    tip="You must provide original documents (not copies). Common combinations: Passport alone, or Driver's License + SSN Card."
                  />

                  {/* 1099 */}
                  <FormCard
                    formNumber="1099-NEC"
                    title="Nonemployee Compensation"
                    when="Received by January 31 if you earned $600+ as an independent contractor"
                    purpose="Reports income you received as a freelancer, contractor, or self-employed individual"
                    keyFields={[
                      "Box 1: Nonemployee compensation",
                      "Box 4: Federal income tax withheld (if any)",
                      "Box 5a/5b: State tax withheld",
                    ]}
                    tip="As a 1099 worker, you're responsible for paying both employer and employee FICA taxes (15.3%) and making quarterly estimated tax payments."
                  />

                  {/* 1040 */}
                  <FormCard
                    formNumber="1040"
                    title="U.S. Individual Income Tax Return"
                    when="Filed annually by April 15 (or October 15 with extension)"
                    purpose="Your annual tax return where you calculate your actual tax liability and reconcile with what was withheld"
                    keyFields={[
                      "Income section: Wages (W-2), self-employment (1099), interest, dividends",
                      "Deductions: Standard or itemized (mortgage interest, state taxes, charity)",
                      "Tax credits: Child tax credit, education credits, EV credit",
                      "Payments: Taxes withheld, estimated payments, prior year overpayment",
                      "Result: Refund (if you overpaid) or Amount You Owe",
                    ]}
                    tip="The 1040 reconciles what was withheld from your paychecks with what you actually owe. If you had too much withheld, you get a refund."
                  />
                </CardContent>
              </Card>

              {/* Payroll Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payroll Processing Timeline</CardTitle>
                </CardHeader>
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
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
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
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>USA Payroll Learning Guide — 2024 Tax Year</span>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              For educational purposes only. Tax laws change frequently. Consult a tax professional for personal advice.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===== Sub-components =====

function InfoCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
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

function FICACard({
  title,
  rate,
  wageBase,
  employerMatch,
  description,
  benefits,
  color,
}: {
  title: string;
  rate: string;
  wageBase: string;
  employerMatch: string;
  description: string;
  benefits: string[];
  color: string;
}) {
  return (
    <Card className={`border-2 ${color === "emerald" ? "border-emerald-200 dark:border-emerald-800" : "border-teal-200 dark:border-teal-800"}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
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
        <div className="text-sm">
          <span className="text-muted-foreground">Wage Base: </span>
          <span className="font-semibold">{wageBase}</span>
        </div>
        <div>
          <div className="text-xs font-semibold mb-1.5">What It Funds:</div>
          <ul className="space-y-1">
            {benefits.map((b, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function FormCard({
  formNumber,
  title,
  when,
  purpose,
  keyFields,
  tip,
}: {
  formNumber: string;
  title: string;
  when: string;
  purpose: string;
  keyFields: string[];
  tip: string;
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
                <ChevronRight className="h-3 w-3 text-emerald-600 mt-1 flex-shrink-0" />
                {f}
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

