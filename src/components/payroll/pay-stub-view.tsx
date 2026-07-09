"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Building2, User, Calendar } from "lucide-react";
import { type CalcResult, fmt } from "@/lib/tax-engine";

const FREQ_LABEL: Record<string, string> = { weekly: "Weekly", biweekly: "Bi-Weekly", semi_monthly: "Semi-Monthly", monthly: "Monthly", annual: "Annual" };

export default function PayStubView({ result, employeeName = "John A. Doe", employeeId = "EMP-2026-0042" }: { result: CalcResult; employeeName?: string; employeeId?: string }) {
  const today = new Date();
  const payDate = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const ps = new Date(today.getTime() - 14 * 86400000);
  const pe = new Date(today.getTime() - 86400000);
  const periodStr = `${ps.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${pe.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  const freqLabel = FREQ_LABEL[result.numPeriods === 52 ? "weekly" : result.numPeriods === 26 ? "biweekly" : result.numPeriods === 24 ? "semi_monthly" : result.numPeriods === 12 ? "monthly" : "annual"] || "Bi-Weekly";

  return (
    <Card className="overflow-hidden border-2">
      <div className="bg-emerald-600 text-white p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-bold flex items-center gap-2"><Building2 className="h-5 w-5" />ACME Corporation</div>
            <div className="text-emerald-100 text-xs mt-1">123 Business Ave, Suite 400, San Francisco, CA 94105</div>
            <div className="text-emerald-100 text-xs">EIN: 12-3456789</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">EARNINGS STATEMENT</div>
            <div className="text-emerald-100 text-xs">{payDate}</div>
          </div>
        </div>
      </div>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x divide-y bg-gray-50 dark:bg-gray-900 text-sm">
          <div className="p-3 flex items-start gap-2"><User className="h-4 w-4 mt-0.5 text-muted-foreground" /><div><div className="text-xs text-muted-foreground">Employee</div><div className="font-medium">{employeeName}</div><div className="text-xs text-muted-foreground">ID: {employeeId}</div></div></div>
          <div className="p-3 flex items-start gap-2"><Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" /><div><div className="text-xs text-muted-foreground">Pay Period</div><div className="font-medium">{periodStr}</div><div className="text-xs text-muted-foreground">{freqLabel}</div></div></div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-0 text-sm border rounded-lg overflow-hidden">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 font-semibold text-center border-b border-r">EARNINGS</div>
            <div className="p-2.5 bg-red-50 dark:bg-red-950/30 font-semibold text-center border-b border-r">DEDUCTIONS</div>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 font-semibold text-center border-b">CURRENT</div>
            <div className="p-2.5 border-b border-r"><div className="text-xs text-muted-foreground">Gross Pay</div><div className="font-medium text-emerald-700">{fmt(result.grossPerPeriod)}</div></div>
            <div className="p-2.5 border-b border-r"><div className="text-xs text-muted-foreground">Federal Income Tax</div><div className="font-medium text-red-600">-{fmt(result.federalTaxPerPeriod)}</div></div>
            <div className="p-2.5 border-b text-center"><div className="text-xs text-muted-foreground">After Federal</div><div className="font-medium">{fmt(result.grossPerPeriod - result.federalTaxPerPeriod)}</div></div>
            <div className="p-2.5 border-b border-r" />
            <div className="p-2.5 border-b border-r"><div className="text-xs text-muted-foreground">Social Security (6.2%)</div><div className="font-medium text-red-600">-{fmt(result.ssPerPeriod)}</div></div>
            <div className="p-2.5 border-b text-center" />
            <div className="p-2.5 border-b border-r" />
            <div className="p-2.5 border-b border-r"><div className="text-xs text-muted-foreground">Medicare (1.45%)</div><div className="font-medium text-red-600">-{fmt(result.medicarePerPeriod + result.addlMedicarePerPeriod)}</div></div>
            <div className="p-2.5 border-b text-center" />
            <div className="p-2.5 border-b border-r bg-muted/30" />
            <div className="p-2.5 border-b border-r"><div className="text-xs text-muted-foreground">{result.stateName} State Tax</div><div className="font-medium text-red-600">-{fmt(result.stateTaxPerPeriod)}</div></div>
            <div className="p-2.5 border-b text-center bg-muted/30" />
            {result.preTaxTotalPerPeriod > 0 && <><div className="p-2.5 border-b border-r" /><div className="p-2.5 border-b border-r"><div className="text-xs text-muted-foreground">Pre-Tax Benefits</div><div className="font-medium text-red-600">-{fmt(result.preTaxTotalPerPeriod)}</div></div><div className="p-2.5 border-b text-center" /></>}
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border-r font-bold text-emerald-700">{fmt(result.grossPerPeriod)}</div>
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border-r font-bold text-red-600">-{fmt(result.totalDeductionsPerPeriod)}</div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 font-bold text-emerald-800 dark:text-emerald-200 text-center">{fmt(result.netPerPeriod)}</div>
          </div>
        </div>
        <Separator />
        <div className="p-4">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div><span className="text-muted-foreground">Net Pay: </span><span className="text-lg font-bold text-emerald-700">{fmt(result.netPerPeriod)}</span></div>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded font-medium">{freqLabel}</span>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <div>Take-Home Rate: <span className="font-medium text-emerald-700">{result.takeHomePercent.toFixed(1)}%</span></div>
              <div>Annual Net: {fmt(result.netAnnual)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}