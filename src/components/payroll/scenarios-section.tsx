"use client";

import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  MapPin,
  Heart,
  Baby,
  Briefcase,
  TrendingUp,
  ArrowRight,
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

interface ScenarioResult {
  summary: {
    grossPayPerPeriod: number;
    netPayPerPeriod: number;
    grossPayAnnual: number;
    netPayAnnual: number;
    totalDeductionsPerPeriod: number;
    totalDeductionsAnnual: number;
  };
  federalTax: { taxAnnual: number; effectiveRate: number; marginalRate: number };
  fica: { totalAnnual: number; effectiveRate: number };
  stateTax: { stateName: string; taxAnnual: number; effectiveRate: number; hasStateTax: boolean };
  effectiveRates: { federal: number; fica: number; state: number; total: number };
  numPeriods: number;
}

interface Scenario {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  description: string;
  params: {
    annualSalary: number;
    payFrequency: string;
    filingStatus: string;
    stateCode: string;
    preTax401k: number;
    preTaxHealthInsurance: number;
    preTaxHSA: number;
    otherPreTax: number;
    postTaxDeductions: number;
  };
  keyInsight: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "entry-level",
    title: "Entry-Level Professional",
    icon: Briefcase,
    iconColor: "text-emerald-600",
    description: "A 22-year-old recent graduate earning $50,000/year in Texas, single, starting 401(k).",
    params: {
      annualSalary: 50000,
      payFrequency: "biweekly",
      filingStatus: "single",
      stateCode: "TX",
      preTax401k: 2000,
      preTaxHealthInsurance: 1800,
      preTaxHSA: 0,
      otherPreTax: 0,
      postTaxDeductions: 0,
    },
    keyInsight: "Texas has no state income tax, so this employee saves significantly compared to similar-earners in high-tax states like California or New York.",
  },
  {
    id: "mid-career-ca",
    title: "Mid-Career in California",
    icon: Users,
    iconColor: "text-orange-600",
    description: "A 35-year-old software engineer earning $150,000/year in San Francisco, married with 2 kids, maxing 401(k).",
    params: {
      annualSalary: 150000,
      payFrequency: "biweekly",
      filingStatus: "married",
      stateCode: "CA",
      preTax401k: 23000,
      preTaxHealthInsurance: 3600,
      preTaxHSA: 0,
      otherPreTax: 0,
      postTaxDeductions: 0,
    },
    keyInsight: "California's progressive state tax (up to 13.3%) significantly impacts take-home pay. The 401(k) contribution reduces taxable income by $23,000, saving thousands in taxes.",
  },
  {
    id: "high-earner-ny",
    title: "High Earner in New York",
    icon: TrendingUp,
    iconColor: "text-purple-600",
    description: "A 42-year-old director earning $250,000/year in NYC, single, contributing to 401(k) and HSA.",
    params: {
      annualSalary: 250000,
      payFrequency: "biweekly",
      filingStatus: "single",
      stateCode: "NY",
      preTax401k: 23000,
      preTaxHealthInsurance: 4200,
      preTaxHSA: 4150,
      otherPreTax: 0,
      postTaxDeductions: 0,
    },
    keyInsight: "At $250K, this earner hits the additional 0.9% Medicare tax on income over $200,000. Combined federal + FICA + NY state tax can exceed 40% of gross income.",
  },
  {
    id: "dual-income-nj",
    title: "Dual-Income Family in New Jersey",
    icon: Heart,
    iconColor: "text-rose-600",
    description: "Married couple, combined $180,000 (one earner $120K, one $60K), NJ, with health insurance and 401(k).",
    params: {
      annualSalary: 180000,
      payFrequency: "biweekly",
      filingStatus: "married",
      stateCode: "NJ",
      preTax401k: 15000,
      preTaxHealthInsurance: 5400,
      preTaxHSA: 0,
      otherPreTax: 0,
      postTaxDeductions: 0,
    },
    keyInsight: "Married filing jointly has doubled standard deduction ($29,200) and wider tax brackets. This couple benefits from the lower effective rate compared to filing separately.",
  },
  {
    id: "no-tax-state",
    title: "Same Salary, Different States",
    icon: MapPin,
    iconColor: "text-teal-600",
    description: "How does the same $100,000 salary look in Texas (no tax) vs California (high tax) vs Florida (no tax)?",
    params: {
      annualSalary: 100000,
      payFrequency: "biweekly",
      filingStatus: "single",
      stateCode: "TX",
      preTax401k: 5000,
      preTaxHealthInsurance: 2400,
      preTaxHSA: 0,
      otherPreTax: 0,
      postTaxDeductions: 0,
    },
    keyInsight: "This scenario is compared side-by-side with CA and FL. The difference can be $6,000-$9,000/year in state taxes alone — a major factor in career location decisions.",
  },
  {
    id: "new-parent",
    title: "New Parent with Benefits",
    icon: Baby,
    iconColor: "text-pink-600",
    description: "A 30-year-old earning $85,000/year in Illinois, using HSA and FSA for new baby expenses.",
    params: {
      annualSalary: 85000,
      payFrequency: "biweekly",
      filingStatus: "married",
      stateCode: "IL",
      preTax401k: 8000,
      preTaxHealthInsurance: 4800,
      preTaxHSA: 4150,
      otherPreTax: 3200,
      postTaxDeductions: 0,
    },
    keyInsight: "Pre-tax deductions (401k + health insurance + HSA + FSA) total $20,150 — reducing taxable income from $85,000 to $64,850, saving thousands in taxes while funding retirement and healthcare.",
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export default function ScenariosSection() {
  const [results, setResults] = useState<Map<string, ScenarioResult>>(new Map());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);

  interface ComparisonData {
    state: string;
    netPay: number;
    stateTax: number;
    totalTax: number;
    effectiveRate: number;
  }

  useEffect(() => {
    const fetchAll = async () => {
      // Fetch scenarios sequentially with delays to avoid overwhelming the server
      for (const s of SCENARIOS) {
        try {
          const res = await fetch("/api/payroll/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(s.params),
          });
          if (!res.ok) continue;
          const data: ScenarioResult = await res.json();
          setResults((prev) => new Map(prev).set(s.id, data));
        } catch {
          // Skip failed scenarios
        }
      }

      // Fetch comparison data sequentially
      const compStates = [
        { code: "TX", name: "Texas" },
        { code: "CA", name: "California" },
        { code: "FL", name: "Florida" },
        { code: "NY", name: "New York" },
        { code: "WA", name: "Washington" },
        { code: "IL", name: "Illinois" },
        { code: "PA", name: "Pennsylvania" },
        { code: "OH", name: "Ohio" },
        { code: "NC", name: "N. Carolina" },
      ];
      const baseParams = SCENARIOS[4].params;
      for (const st of compStates) {
        try {
          const res = await fetch("/api/payroll/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...baseParams, stateCode: st.code }),
          });
          if (!res.ok) continue;
          const data: ScenarioResult = await res.json();
          setComparisonData((prev) => [
            ...prev,
            {
              state: st.code,
              netPay: data.summary.netPayAnnual,
              stateTax: data.stateTax.taxAnnual,
              totalTax: data.summary.totalDeductionsAnnual,
              effectiveRate: data.effectiveRates.total,
            },
          ]);
        } catch {
          // Skip failed requests
        }
      }
    };
    fetchAll();
  }, []);

  const expandedScenario = SCENARIOS.find((s) => s.id === expandedId);
  const expandedResult = expandedId ? results.get(expandedId) : null;

  return (
    <div className="space-y-6">
      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCENARIOS.map((scenario, idx) => {
          const result = results.get(scenario.id);
          const Icon = scenario.icon;
          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  expandedId === scenario.id ? "ring-2 ring-emerald-500" : ""
                }`}
                onClick={() => setExpandedId(expandedId === scenario.id ? null : scenario.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-muted/50 ${scenario.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm">{scenario.title}</CardTitle>
                      <CardDescription className="text-xs mt-0.5 line-clamp-2">
                        {scenario.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {result && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-[10px] text-muted-foreground">Gross</div>
                        <div className="text-xs font-semibold">
                          {fmt(result.summary.grossPayAnnual).replace(".00", "")}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground">Taxes</div>
                        <div className="text-xs font-semibold text-red-600">
                          −{fmt(result.summary.totalDeductionsAnnual).replace(".00", "")}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground">Net Pay</div>
                        <div className="text-xs font-semibold text-emerald-700">
                          {fmt(result.summary.netPayAnnual).replace(".00", "")}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] text-muted-foreground text-right">
                      {result.effectiveRates.total.toFixed(1)}% total effective rate
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Scenario Detail */}
      {expandedScenario && expandedResult && (
        <motion.div {...fadeIn}>
          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <expandedScenario.icon className={`h-5 w-5 ${expandedScenario.iconColor}`} />
                {expandedScenario.title} — Detailed Breakdown
              </CardTitle>
              <CardDescription>{expandedScenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <StatBox label="Gross Annual" value={fmt(expandedResult.summary.grossPayAnnual)} color="text-foreground" />
                <StatBox label="Federal Tax" value={fmt(expandedResult.federalTax.taxAnnual)} color="text-red-600" />
                <StatBox label="FICA Tax" value={fmt(expandedResult.fica.totalAnnual)} color="text-orange-600" />
                <StatBox
                  label={`${expandedResult.stateTax.stateName} Tax`}
                  value={fmt(expandedResult.stateTax.taxAnnual)}
                  color="text-purple-600"
                />
              </div>

              <Separator />

              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-sm">Category</TableHead>
                      <TableHead className="text-right text-sm">Annual</TableHead>
                      <TableHead className="text-right text-sm">Per Paycheck</TableHead>
                      <TableHead className="text-right text-sm">Effective Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Federal Income Tax</TableCell>
                      <TableCell className="text-right font-mono text-sm text-red-600">
                        −{fmt(expandedResult.federalTax.taxAnnual)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-red-600">
                        −{fmt(expandedResult.federalTax.taxAnnual / expandedResult.numPeriods)}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {expandedResult.effectiveRates.federal.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">FICA (SS + Medicare)</TableCell>
                      <TableCell className="text-right font-mono text-sm text-orange-600">
                        −{fmt(expandedResult.fica.totalAnnual)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-orange-600">
                        −{fmt(expandedResult.fica.totalAnnual / expandedResult.numPeriods)}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {expandedResult.effectiveRates.fica.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        {expandedResult.stateTax.stateName} State Tax
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-purple-600">
                        −{fmt(expandedResult.stateTax.taxAnnual)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-purple-600">
                        −{fmt(expandedResult.stateTax.taxAnnual / expandedResult.numPeriods)}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {expandedResult.effectiveRates.state.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-emerald-50 dark:bg-emerald-950/30 font-bold">
                      <TableCell>Total Deductions</TableCell>
                      <TableCell className="text-right text-red-600">
                        −{fmt(expandedResult.summary.totalDeductionsAnnual)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        −{fmt(expandedResult.summary.totalDeductionsPerPeriod)}
                      </TableCell>
                      <TableCell className="text-right">
                        {expandedResult.effectiveRates.total.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-emerald-50 dark:bg-emerald-950/30 font-bold">
                      <TableCell className="text-emerald-800 dark:text-emerald-200">Net Pay</TableCell>
                      <TableCell className="text-right text-emerald-700">
                        {fmt(expandedResult.summary.netPayAnnual)}
                      </TableCell>
                      <TableCell className="text-right text-emerald-700">
                        {fmt(expandedResult.summary.netPayPerPeriod)}
                      </TableCell>
                      <TableCell className="text-right text-emerald-700">
                        {((expandedResult.summary.netPayAnnual / expandedResult.summary.grossPayAnnual) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{expandedScenario.keyInsight}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* State Comparison Chart */}
      {comparisonData.length > 0 && (
        <Card className="border-2 border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-teal-600" />
              State Tax Impact: $100,000 Salary Comparison
            </CardTitle>
            <CardDescription>
              How much state tax saves (or costs) you at the same $100,000 salary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <RTooltip
                    formatter={(value: number, name: string) => [
                      fmt(value),
                      name === "netPay" ? "Net Pay" : name === "stateTax" ? "State Tax" : "Total Deductions",
                    ]}
                  />
                  <Legend
                    formatter={(value) =>
                      value === "netPay" ? "Net Pay" : value === "stateTax" ? "State Tax" : "Total Deductions"
                    }
                  />
                  <Bar dataKey="netPay" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="stateTax" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              <strong>Key Takeaway:</strong> Living in Texas or Florida (no state income tax) saves you
              approximately {fmt(comparisonData.find((d) => d.state === "CA")!.stateTax - comparisonData.find((d) => d.state === "TX")!.stateTax)}
              /year in state taxes compared to California on a $100,000 salary. However, consider the full cost of
              living — housing, property taxes, and sales tax may offset the income tax savings.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-muted/50 rounded-lg p-3 text-center">
      <div className="text-[10px] text-muted-foreground mb-0.5">{label}</div>
      <div className={`text-sm font-bold ${color}`}>{value}</div>
    </div>
  );
}