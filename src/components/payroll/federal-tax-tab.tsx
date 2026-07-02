"use client";

import { motion } from "framer-motion";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Landmark, FileText, Lightbulb, AlertTriangle, CheckCircle2, TrendingUp,
} from "lucide-react";
import { REF_DATA, fmt, fadeIn } from "@/lib/ref-data";

export default function FederalTaxTab() {
  const refData = REF_DATA;
  return (
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
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm space-y-2">
                <p><strong>Key Concept: Progressive Tax Brackets</strong> — Your income is not taxed at a single flat rate. Instead, it&apos;s divided into portions (&quot;brackets&quot;), and each portion is taxed at its own rate.</p>
                <p><strong>Example:</strong> If you earn $60,000 (single filer), only the amount <em>above</em> $47,150 is taxed at 22%. The first $11,600 is taxed at 10%, and $11,601–$47,150 at 12%.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              Standard Deduction (2024)
            </h3>
            <p className="text-sm text-muted-foreground mb-3">The standard deduction reduces your taxable income. Most employees use this instead of itemizing deductions.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(refData.standardDeductions).map(([key, val]) => (
                <Card key={key} className="border-2 border-emerald-100 dark:border-emerald-900">
                  <CardContent className="pt-4 text-center">
                    <div className="text-sm text-muted-foreground capitalize">{key.replace("_", " ")}</div>
                    <div className="text-2xl font-bold text-emerald-700">{fmt(val)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">2024 Federal Tax Brackets</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-center mb-2">Single Filers</h4>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader><TableRow className="bg-muted/50"><TableHead>Rate</TableHead><TableHead className="text-right">Income Range</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {refData.federalBracketsSingle.map((b, i) => (
                        <TableRow key={i}>
                          <TableCell><Badge variant={i < 2 ? "secondary" : "default"}>{b.rate}%</Badge></TableCell>
                          <TableCell className="text-right font-mono text-sm">{fmt(b.min)} {b.max ? `– ${fmt(b.max)}` : "+"}</TableCell>
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
                    <TableHeader><TableRow className="bg-muted/50"><TableHead>Rate</TableHead><TableHead className="text-right">Income Range</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {refData.federalBracketsMarried.map((b, i) => (
                        <TableRow key={i}>
                          <TableCell><Badge variant={i < 2 ? "secondary" : "default"}>{b.rate}%</Badge></TableCell>
                          <TableCell className="text-right font-mono text-sm">{fmt(b.min)} {b.max ? `– ${fmt(b.max)}` : "+"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

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
                  <div className="bg-gray-50 dark:bg-gray-900 rounded p-3"><div className="text-xs text-muted-foreground">Gross Income</div><div className="font-bold text-lg">$75,000</div></div>
                  <div className="bg-red-50 dark:bg-red-950/30 rounded p-3"><div className="text-xs text-muted-foreground">Standard Deduction</div><div className="font-bold text-lg text-red-600">− $14,600</div></div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded p-3"><div className="text-xs text-muted-foreground">Taxable Income</div><div className="font-bold text-lg text-emerald-700">$60,400</div></div>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader><TableRow className="bg-muted/50"><TableHead>Bracket</TableHead><TableHead className="text-right">Taxable Amount</TableHead><TableHead className="text-right">Rate</TableHead><TableHead className="text-right">Tax</TableHead></TableRow></TableHeader>
                    <TableBody>
                      <TableRow><TableCell>$0 – $11,600</TableCell><TableCell className="text-right font-mono">$11,600</TableCell><TableCell className="text-right">10%</TableCell><TableCell className="text-right font-semibold text-red-600">$1,160.00</TableCell></TableRow>
                      <TableRow><TableCell>$11,601 – $47,150</TableCell><TableCell className="text-right font-mono">$35,550</TableCell><TableCell className="text-right">12%</TableCell><TableCell className="text-right font-semibold text-red-600">$4,266.00</TableCell></TableRow>
                      <TableRow><TableCell>$47,151 – $60,400</TableCell><TableCell className="text-right font-mono">$13,250</TableCell><TableCell className="text-right">22%</TableCell><TableCell className="text-right font-semibold text-red-600">$2,915.00</TableCell></TableRow>
                      <TableRow className="bg-emerald-50 dark:bg-emerald-950/30 font-bold"><TableCell colSpan={3}>Total Federal Income Tax</TableCell><TableCell className="text-right text-red-600">$8,341.00</TableCell></TableRow>
                      <TableRow className="bg-emerald-50 dark:bg-emerald-950/30"><TableCell colSpan={3}>Effective Tax Rate</TableCell><TableCell className="text-right text-emerald-700">11.12%</TableCell></TableRow>
                      <TableRow className="bg-emerald-50 dark:bg-emerald-950/30"><TableCell colSpan={3}>Marginal Tax Rate</TableCell><TableCell className="text-right"><Badge>22%</Badge></TableCell></TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mt-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Note:</strong> The marginal rate (22%) only applies to income <em>above</em> $47,150. Your effective rate (11.12%) is much lower because most income is taxed in lower brackets.</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Marginal vs Effective Tax Rate</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                  <h4 className="font-semibold flex items-center gap-2 mb-2"><TrendingUp className="h-4 w-4 text-orange-600" />Marginal Rate</h4>
                  <p className="text-sm text-muted-foreground">The tax rate on your <strong>last dollar earned</strong>. If you&apos;re in the 22% bracket, only income above the 22% threshold is taxed at 22%.</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                  <h4 className="font-semibold flex items-center gap-2 mb-2"><TrendingUp className="h-4 w-4 text-emerald-600" />Effective Rate</h4>
                  <p className="text-sm text-muted-foreground">The <strong>average rate</strong> across all your income. Calculated as total tax ÷ total income. Always lower than your marginal rate.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Form W-4 & Tax Withholding</CardTitle>
              <CardDescription>The W-4 form tells your employer how much federal income tax to withhold from each paycheck</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-muted-foreground">
              <p>When you start a new job, you fill out IRS Form W-4. This determines how much federal tax your employer withholds. Key factors:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong>Step 1:</strong> Multiple jobs or working spouse — adjust for accurate withholding</li>
                <li><strong>Step 2:</strong> Claim dependents — each qualifying child under 17 reduces withholding by ~$2,000</li>
                <li><strong>Step 3:</strong> Other adjustments — other income, deductions, extra withholding</li>
                <li><strong>Step 4:</strong> You can also specify an exact extra amount to withhold per pay period</li>
              </ul>
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Tip:</strong> If you got a large refund last year, your withholding is too high (you&apos;re giving the government an interest-free loan). If you owed taxes, increase your withholding.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </motion.div>
  );
}