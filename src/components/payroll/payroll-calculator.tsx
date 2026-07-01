"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calculator,
  DollarSign,
  TrendingDown,
  Info,
  Receipt,
  PieChart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

interface PayrollResult {
  summary: {
    grossPayPerPeriod: number;
    netPayPerPeriod: number;
    grossPayAnnual: number;
    netPayAnnual: number;
    totalDeductionsPerPeriod: number;
    totalDeductionsAnnual: number;
  };
  federalTax: {
    taxableIncome: number;
    standardDeduction: number;
    taxAnnual: number;
    taxPerPeriod: number;
    effectiveRate: number;
    marginalRate: number;
    brackets: {
      min: number;
      max: number | null;
      rate: number;
      taxableAmount: number;
      taxAmount: number;
    }[];
  };
  fica: {
    socialSecurity: { annual: number; perPeriod: number; wageBase: number; rate: number };
    medicare: { annual: number; perPeriod: number; rate: number };
    additionalMedicare: { annual: number; perPeriod: number; threshold: number; rate: number };
    totalAnnual: number;
    totalPerPeriod: number;
    effectiveRate: number;
  };
  stateTax: {
    stateCode: string;
    stateName: string;
    taxAnnual: number;
    taxPerPeriod: number;
    effectiveRate: number;
    hasStateTax: boolean;
  };
  deductions: {
    preTax401kPerPeriod: number;
    preTaxHealthInsurancePerPeriod: number;
    preTaxHSAPerPeriod: number;
    otherPreTaxPerPeriod: number;
    postTaxPerPeriod: number;
    totalPreTaxPerPeriod: number;
    totalPreTaxAnnual: number;
  };
  effectiveRates: {
    federal: number;
    fica: number;
    state: number;
    total: number;
  };
  payFrequency: string;
  numPeriods: number;
  filingStatus: string;
}

const COLORS = ["#059669", "#dc2626", "#7c3aed", "#ea580c", "#ca8a04", "#0891b2"];

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

export default function PayrollCalculator() {
  const [annualSalary, setAnnualSalary] = useState(75000);
  const [payFrequency, setPayFrequency] = useState("biweekly");
  const [filingStatus, setFilingStatus] = useState("single");
  const [stateCode, setStateCode] = useState("CA");
  const [preTax401k, setPreTax401k] = useState(0);
  const [preTaxHealth, setPreTaxHealth] = useState(0);
  const [preTaxHSA, setPreTaxHSA] = useState(0);
  const [postTaxDeductions, setPostTaxDeductions] = useState(0);
  const [showBracketDetail, setShowBracketDetail] = useState(false);

  // Hardcoded state list for stability
  const states = [
    { code: "TX", name: "Texas", noTax: true },
    { code: "FL", name: "Florida", noTax: true },
    { code: "WA", name: "Washington", noTax: true },
    { code: "NV", name: "Nevada", noTax: true },
    { code: "WY", name: "Wyoming", noTax: true },
    { code: "AK", name: "Alaska", noTax: true },
    { code: "SD", name: "South Dakota", noTax: true },
    { code: "TN", name: "Tennessee", noTax: true },
    { code: "NH", name: "New Hampshire", noTax: true },
    { code: "IL", name: "Illinois", noTax: false },
    { code: "IN", name: "Indiana", noTax: false },
    { code: "PA", name: "Pennsylvania", noTax: false },
    { code: "MI", name: "Michigan", noTax: false },
    { code: "CO", name: "Colorado", noTax: false },
    { code: "NC", name: "North Carolina", noTax: false },
    { code: "AZ", name: "Arizona", noTax: false },
    { code: "GA", name: "Georgia", noTax: false },
    { code: "MA", name: "Massachusetts", noTax: false },
    { code: "CA", name: "California", noTax: false },
    { code: "NY", name: "New York", noTax: false },
    { code: "NJ", name: "New Jersey", noTax: false },
    { code: "OR", name: "Oregon", noTax: false },
    { code: "HI", name: "Hawaii", noTax: false },
    { code: "CT", name: "Connecticut", noTax: false },
    { code: "OH", name: "Ohio", noTax: false },
    { code: "VA", name: "Virginia", noTax: false },
    { code: "MD", name: "Maryland", noTax: false },
    { code: "MN", name: "Minnesota", noTax: false },
  ];

  const [result, setResult] = useState<PayrollResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = useCallback(async () => {
    setIsCalculating(true);
    try {
      const res = await fetch("/api/payroll/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          annualSalary,
          payFrequency,
          filingStatus,
          stateCode,
          preTax401k,
          preTaxHealthInsurance: preTaxHealth,
          preTaxHSA,
          otherPreTax: 0,
          postTaxDeductions,
        }),
      });
      if (!res.ok) throw new Error("Calculation failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  }, [annualSalary, payFrequency, filingStatus, stateCode, preTax401k, preTaxHealth, preTaxHSA, postTaxDeductions]);

  const pieData = result
    ? [
        { name: "Federal Income Tax", value: result.federalTax.taxPerPeriod },
        { name: "Social Security", value: result.fica.socialSecurity.perPeriod },
        { name: "Medicare", value: result.fica.medicare.perPeriod + result.fica.additionalMedicare.perPeriod },
        { name: "State Tax", value: result.stateTax.taxPerPeriod },
        { name: "Pre-tax Deductions", value: result.deductions.totalPreTaxPerPeriod },
        { name: "Post-tax Deductions", value: result.deductions.postTaxPerPeriod },
      ].filter((d) => d.value > 0)
    : [];

  const netPayColor = "#059669";
  const deductionsColor = "#dc2626";

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="border-2 border-emerald-100 dark:border-emerald-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Payroll Calculator
          </CardTitle>
          <CardDescription>
            Enter your salary details to see a complete breakdown of your paycheck
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Annual Salary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="salary" className="text-sm font-medium">
                Annual Salary
              </Label>
              <span className="text-sm font-semibold text-emerald-700">
                {fmt(annualSalary)}
              </span>
            </div>
            <Slider
              value={[annualSalary]}
              onValueChange={(v) => setAnnualSalary(v[0])}
              min={10000}
              max={500000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$10,000</span>
              <span>$500,000</span>
            </div>
            <Input
              id="salary"
              type="number"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value) || 0)}
              className="max-w-[200px]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Pay Frequency */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Pay Frequency</Label>
              <Select value={payFrequency} onValueChange={setPayFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly (52/yr)</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly (26/yr)</SelectItem>
                  <SelectItem value="semi_monthly">Semi-monthly (24/yr)</SelectItem>
                  <SelectItem value="monthly">Monthly (12/yr)</SelectItem>
                  <SelectItem value="annual">Annual (1/yr)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filing Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Filing Status</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">State</Label>
              <Select value={stateCode} onValueChange={setStateCode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.code} value={s.code}>
                      {s.name} {s.noTax ? "(No Income Tax)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Pre-tax Deductions */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              Pre-Tax Deductions (Annual)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    Pre-tax deductions reduce your taxable income, lowering both federal and state taxes.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">401(k) Contribution</Label>
                <Input
                  type="number"
                  value={preTax401k}
                  onChange={(e) => setPreTax401k(Number(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Health Insurance</Label>
                <Input
                  type="number"
                  value={preTaxHealth}
                  onChange={(e) => setPreTaxHealth(Number(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">HSA Contribution</Label>
                <Input
                  type="number"
                  value={preTaxHSA}
                  onChange={(e) => setPreTaxHSA(Number(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Post-Tax Deductions</Label>
                <Input
                  type="number"
                  value={postTaxDeductions}
                  onChange={(e) => setPostTaxDeductions(Number(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
            disabled={isCalculating}
          >
            <Calculator className="mr-2 h-4 w-4" />
            {isCalculating ? "Calculating..." : "Calculate My Paycheck"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Gross Pay (per period)</div>
                  <div className="text-2xl font-bold text-emerald-700">{fmt(result.summary.grossPayPerPeriod)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {fmt(result.summary.grossPayAnnual)} / year
                  </div>
                </CardContent>
              </Card>
              <Card className="border-red-200 dark:border-red-800">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Total Deductions (per period)</div>
                  <div className="text-2xl font-bold text-red-600">{fmt(result.summary.totalDeductionsPerPeriod)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.effectiveRates.total.toFixed(1)}% effective rate
                  </div>
                </CardContent>
              </Card>
              <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Net Pay (per period)</div>
                  <div className="text-2xl font-bold text-emerald-700">{fmt(result.summary.netPayPerPeriod)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {fmt(result.summary.netPayAnnual)} / year
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Breakdown + Chart */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Deduction Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Receipt className="h-4 w-4" />
                    Deduction Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <DeductionRow
                    label="Federal Income Tax"
                    amount={result.federalTax.taxPerPeriod}
                    annual={result.federalTax.taxAnnual}
                    rate={result.effectiveRates.federal}
                    color="text-red-600"
                  />
                  <DeductionRow
                    label="Social Security (OASDI)"
                    amount={result.fica.socialSecurity.perPeriod}
                    annual={result.fica.socialSecurity.annual}
                    rate={result.fica.socialSecurity.rate * 100}
                    color="text-orange-600"
                  />
                  <DeductionRow
                    label="Medicare"
                    amount={result.fica.medicare.perPeriod}
                    annual={result.fica.medicare.annual}
                    rate={result.fica.medicare.rate * 100}
                    color="text-orange-600"
                  />
                  {result.fica.additionalMedicare.perPeriod > 0 && (
                    <DeductionRow
                      label="Additional Medicare"
                      amount={result.fica.additionalMedicare.perPeriod}
                      annual={result.fica.additionalMedicare.annual}
                      rate={result.fica.additionalMedicare.rate * 100}
                      color="text-orange-600"
                    />
                  )}
                  <DeductionRow
                    label={`${result.stateTax.stateName} State Tax`}
                    amount={result.stateTax.taxPerPeriod}
                    annual={result.stateTax.taxAnnual}
                    rate={result.effectiveRates.state}
                    color="text-purple-600"
                  />
                  {result.deductions.preTax401kPerPeriod > 0 && (
                    <DeductionRow
                      label="401(k)"
                      amount={result.deductions.preTax401kPerPeriod}
                      annual={result.deductions.preTax401kPerPeriod * result.numPeriods}
                      color="text-blue-600"
                    />
                  )}
                  {result.deductions.preTaxHealthInsurancePerPeriod > 0 && (
                    <DeductionRow
                      label="Health Insurance"
                      amount={result.deductions.preTaxHealthInsurancePerPeriod}
                      annual={result.deductions.preTaxHealthInsurancePerPeriod * result.numPeriods}
                      color="text-blue-600"
                    />
                  )}
                  {result.deductions.preTaxHSAPerPeriod > 0 && (
                    <DeductionRow
                      label="HSA"
                      amount={result.deductions.preTaxHSAPerPeriod}
                      annual={result.deductions.preTaxHSAPerPeriod * result.numPeriods}
                      color="text-blue-600"
                    />
                  )}
                  {result.deductions.postTaxPerPeriod > 0 && (
                    <DeductionRow
                      label="Post-Tax Deductions"
                      amount={result.deductions.postTaxPerPeriod}
                      annual={result.deductions.postTaxPerPeriod * result.numPeriods}
                      color="text-gray-600"
                    />
                  )}
                  <Separator />
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Deductions</span>
                    <span className="text-red-600">{fmt(result.summary.totalDeductionsPerPeriod)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Net Pay</span>
                    <span className="text-emerald-700">{fmt(result.summary.netPayPerPeriod)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Where Your Money Goes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value: number) => fmt(value)}
                        />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {pieData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-2 text-xs">
                        <div
                          className="h-3 w-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="truncate">{entry.name}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <div className="h-3 w-3 rounded-full flex-shrink-0 bg-emerald-500" />
                      <span>Net Pay (Take-Home)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tax Bracket Breakdown */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Federal Tax Bracket Breakdown
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Taxable Income: <strong>{fmt(result.federalTax.taxableIncome)}</strong> (after ${fmt(result.federalTax.standardDeduction)} standard deduction)
                      {" | "}
                      Marginal Rate: <Badge variant="outline">{result.federalTax.marginalRate}%</Badge>
                      {" | "}
                      Effective Rate: <Badge variant="secondary">{result.effectiveRates.federal.toFixed(2)}%</Badge>
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBracketDetail(!showBracketDetail)}
                  >
                    {showBracketDetail ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {showBracketDetail && (
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4">Rate</th>
                          <th className="text-right py-2 pr-4">Income in Bracket</th>
                          <th className="text-right py-2">Tax in Bracket</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.federalTax.brackets.map((b, i) => (
                          <tr
                            key={i}
                            className={
                              b.taxableAmount > 0
                                ? "bg-emerald-50 dark:bg-emerald-950/30 font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            <td className="py-2 pr-4">
                              <Badge variant={b.taxableAmount > 0 ? "default" : "outline"}>
                                {b.rate}%
                              </Badge>
                            </td>
                            <td className="text-right py-2 pr-4">
                              {b.taxableAmount > 0 ? fmt(b.taxableAmount) : "—"}
                            </td>
                            <td className="text-right py-2 text-red-600">
                              {b.taxableAmount > 0 ? fmt(b.taxAmount) : "—"}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t font-bold">
                          <td className="py-2 pr-4" colSpan={2}>
                            Total Federal Tax
                          </td>
                          <td className="text-right py-2 text-red-600">
                            {fmt(result.federalTax.taxAnnual)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* FICA Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">FICA Tax Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                    <div className="text-xs text-muted-foreground">Social Security</div>
                    <div className="text-lg font-bold">{fmt(result.fica.socialSecurity.annual)}/yr</div>
                    <div className="text-xs text-muted-foreground">
                      {result.fica.socialSecurity.rate * 100}% up to {fmt(result.fica.socialSecurity.wageBase)}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                    <div className="text-xs text-muted-foreground">Medicare</div>
                    <div className="text-lg font-bold">{fmt(result.fica.medicare.annual)}/yr</div>
                    <div className="text-xs text-muted-foreground">
                      {result.fica.medicare.rate * 100}% (no cap)
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                    <div className="text-xs text-muted-foreground">Total FICA</div>
                    <div className="text-lg font-bold">{fmt(result.fica.totalAnnual)}/yr</div>
                    <div className="text-xs text-muted-foreground">
                      {result.effectiveRates.fica.toFixed(2)}% effective rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeductionRow({
  label,
  amount,
  annual,
  rate,
  color,
}: {
  label: string;
  amount: number;
  annual?: number;
  rate?: number;
  color: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm">{label}</span>
        {rate !== undefined && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {rate.toFixed(2)}%
          </Badge>
        )}
      </div>
      <div className="text-right">
        <div className={`text-sm font-medium ${color}`}>{fmt(amount)}</div>
        {annual !== undefined && (
          <div className="text-[10px] text-muted-foreground">{fmt(annual)}/yr</div>
        )}
      </div>
    </div>
  );
}