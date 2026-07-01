"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Building2, User, Calendar } from "lucide-react";

interface PayStubProps {
  result: {
    summary: {
      grossPayPerPeriod: number;
      netPayPerPeriod: number;
      totalDeductionsPerPeriod: number;
      grossPayAnnual: number;
    };
    federalTax: { taxPerPeriod: number; effectiveRate: number };
    fica: {
      socialSecurity: { perPeriod: number };
      medicare: { perPeriod: number };
      additionalMedicare: { perPeriod: number };
    };
    stateTax: { stateName: string; taxPerPeriod: number };
    deductions: {
      preTax401kPerPeriod: number;
      preTaxHealthInsurancePerPeriod: number;
      preTaxHSAPerPeriod: number;
      postTaxPerPeriod: number;
    };
    payFrequency: string;
    numPeriods: number;
    filingStatus: string;
  };
  employeeName?: string;
  employeeId?: string;
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

const payFrequencyLabel: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Bi-Weekly",
  semi_monthly: "Semi-Monthly",
  monthly: "Monthly",
  annual: "Annual",
};

export default function PayStubView({
  result,
  employeeName = "John A. Doe",
  employeeId = "EMP-2024-0042",
}: PayStubProps) {
  const today = new Date();
  const payDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const periodStart = new Date(today.getTime() - 14 * 86400000);
  const periodEnd = new Date(today.getTime() - 1 * 86400000);
  const periodStr = `${periodStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${periodEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  const grossYtd = result.summary.grossPayAnnual;
  const currentNet = result.summary.netPayPerPeriod;
  const totalDeductions = result.summary.totalDeductionsPerPeriod;

  return (
    <Card className="overflow-hidden border-2">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-bold flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              ACME Corporation
            </div>
            <div className="text-emerald-100 text-xs mt-1">
              123 Business Ave, Suite 400, San Francisco, CA 94105
            </div>
            <div className="text-emerald-100 text-xs">EIN: 12-3456789</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">EARNINGS STATEMENT</div>
            <div className="text-emerald-100 text-xs">{payDate}</div>
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        {/* Employee Info */}
        <div className="grid grid-cols-2 gap-0 divide-x divide-y bg-gray-50 dark:bg-gray-900 text-sm">
          <div className="p-3 flex items-start gap-2">
            <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Employee</div>
              <div className="font-medium">{employeeName}</div>
              <div className="text-xs text-muted-foreground">ID: {employeeId}</div>
            </div>
          </div>
          <div className="p-3 flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Pay Period</div>
              <div className="font-medium">{periodStr}</div>
              <div className="text-xs text-muted-foreground">
                {payFrequencyLabel[result.payFrequency]} | Filing: {result.filingStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Earnings & Deductions Table */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-0 text-sm border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 font-semibold text-center border-b border-r">
              EARNINGS
            </div>
            <div className="p-2.5 bg-red-50 dark:bg-red-950/30 font-semibold text-center border-b border-r">
              TAXES & DEDUCTIONS
            </div>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 font-semibold text-center border-b">
              CURRENT
            </div>

            {/* Row 1: Gross / Federal Tax */}
            <div className="p-2.5 border-b border-r">
              <div className="text-xs text-muted-foreground">Gross Pay</div>
              <div className="font-medium text-emerald-700">{fmt(result.summary.grossPayPerPeriod)}</div>
            </div>
            <div className="p-2.5 border-b border-r">
              <div className="text-xs text-muted-foreground">Federal Income Tax</div>
              <div className="font-medium text-red-600">
                -{fmt(result.federalTax.taxPerPeriod)}
              </div>
            </div>
            <div className="p-2.5 border-b text-center">
              <div className="text-xs text-muted-foreground">After Federal</div>
              <div className="font-medium">
                {fmt(result.summary.grossPayPerPeriod - result.federalTax.taxPerPeriod)}
              </div>
            </div>

            {/* Row 2: blank / Social Security */}
            <div className="p-2.5 border-b border-r bg-muted/30" />
            <div className="p-2.5 border-b border-r">
              <div className="text-xs text-muted-foreground">Social Security (6.2%)</div>
              <div className="font-medium text-red-600">
                -{fmt(result.fica.socialSecurity.perPeriod)}
              </div>
            </div>
            <div className="p-2.5 border-b text-center bg-muted/30" />

            {/* Row 3: blank / Medicare */}
            <div className="p-2.5 border-b border-r" />
            <div className="p-2.5 border-b border-r">
              <div className="text-xs text-muted-foreground">Medicare (1.45%)</div>
              <div className="font-medium text-red-600">
                -{fmt(result.fica.medicare.perPeriod + result.fica.additionalMedicare.perPeriod)}
              </div>
            </div>
            <div className="p-2.5 border-b text-center" />

            {/* Row 4: blank / State Tax */}
            <div className="p-2.5 border-b border-r bg-muted/30" />
            <div className="p-2.5 border-b border-r">
              <div className="text-xs text-muted-foreground">
                {result.stateTax.stateName} State Tax
              </div>
              <div className="font-medium text-red-600">
                -{fmt(result.stateTax.taxPerPeriod)}
              </div>
            </div>
            <div className="p-2.5 border-b text-center bg-muted/30" />

            {/* Row 5: blank / 401k */}
            {result.deductions.preTax401kPerPeriod > 0 && (
              <>
                <div className="p-2.5 border-b border-r" />
                <div className="p-2.5 border-b border-r">
                  <div className="text-xs text-muted-foreground">401(k) Pre-Tax</div>
                  <div className="font-medium text-red-600">
                    -{fmt(result.deductions.preTax401kPerPeriod)}
                  </div>
                </div>
                <div className="p-2.5 border-b text-center" />
              </>
            )}

            {/* Row 6: blank / Health */}
            {result.deductions.preTaxHealthInsurancePerPeriod > 0 && (
              <>
                <div className="p-2.5 border-b border-r bg-muted/30" />
                <div className="p-2.5 border-b border-r">
                  <div className="text-xs text-muted-foreground">Health Insurance</div>
                  <div className="font-medium text-red-600">
                    -{fmt(result.deductions.preTaxHealthInsurancePerPeriod)}
                  </div>
                </div>
                <div className="p-2.5 border-b text-center bg-muted/30" />
              </>
            )}

            {/* Row 7: blank / HSA */}
            {result.deductions.preTaxHSAPerPeriod > 0 && (
              <>
                <div className="p-2.5 border-b border-r" />
                <div className="p-2.5 border-b border-r">
                  <div className="text-xs text-muted-foreground">HSA</div>
                  <div className="font-medium text-red-600">
                    -{fmt(result.deductions.preTaxHSAPerPeriod)}
                  </div>
                </div>
                <div className="p-2.5 border-b text-center" />
              </>
            )}

            {/* Totals */}
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border-r font-bold text-emerald-700">
              {fmt(result.summary.grossPayPerPeriod)}
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border-r font-bold text-red-600">
              -{fmt(totalDeductions)}
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 font-bold text-emerald-800 dark:text-emerald-200 text-center">
              {fmt(currentNet)}
            </div>
          </div>
        </div>

        <Separator />

        {/* Summary Footer */}
        <div className="p-4">
          <div className="flex flex-wrap justify-between gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-muted-foreground">Net Pay: </span>
                <span className="text-lg font-bold text-emerald-700">{fmt(currentNet)}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                <FileText className="mr-1 h-3 w-3" />
                {payFrequencyLabel[result.payFrequency]}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <div>YTD Gross: {fmt(grossYtd)}</div>
              <div>
                Take-Home Rate:{" "}
                <span className="font-medium text-emerald-700">
                  {((currentNet / result.summary.grossPayPerPeriod) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}