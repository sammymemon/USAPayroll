"use client";

import { motion } from "framer-motion";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { MapPin, CheckCircle2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RTooltip, ResponsiveContainer,
} from "recharts";
import { REF_DATA, fadeIn } from "@/lib/ref-data";

export default function StateTaxTab() {
  const refData = REF_DATA;
  return (
    <motion.div {...fadeIn} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-600" />State Income Tax Overview
          </CardTitle>
          <CardDescription>41 states plus DC levy income tax. 9 states have no income tax. Rates and structures vary widely.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />States With NO Income Tax
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Alaska", "Florida", "Nevada", "New Hampshire", "South Dakota", "Tennessee", "Texas", "Washington", "Wyoming"].map((s) => (
                <Badge key={s} variant="outline" className="text-emerald-700 border-emerald-300 dark:border-emerald-700 py-1.5 px-3">{s}</Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">New Hampshire only taxes interest and dividend income (phasing out by 2025).</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-3">State Tax Comparison (Top Rates)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={refData.states.filter((s) => s.hasIncomeTax).sort((a, b) => b.topRate - a.topRate).slice(0, 15)}>
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

          <div>
            <h3 className="text-sm font-semibold mb-3">Full State Tax Reference</h3>
            <div className="max-h-[400px] overflow-y-auto rounded-lg border">
              <Table>
                <TableHeader className="sticky top-0 bg-muted z-10">
                  <TableRow>
                    <TableHead>State</TableHead><TableHead className="text-center">Code</TableHead><TableHead className="text-center">Has Tax?</TableHead><TableHead className="text-center">Flat/Progressive</TableHead><TableHead className="text-right">Top Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refData.states.sort((a, b) => a.name.localeCompare(b.name)).map((s) => (
                    <TableRow key={s.code}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-center font-mono text-xs">{s.code}</TableCell>
                      <TableCell className="text-center">
                        {s.hasIncomeTax ? <Badge variant="default" className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Yes</Badge> : <Badge variant="secondary" className="text-emerald-700 text-xs">No</Badge>}
                      </TableCell>
                      <TableCell className="text-center text-sm">{s.hasIncomeTax ? (s.flatTax ? "Flat" : "Progressive") : "—"}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{s.topRate > 0 ? `${s.topRate}%` : "0%"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Additional Local Taxes</CardTitle></CardHeader>
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
  );
}