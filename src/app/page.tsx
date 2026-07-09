"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign, Receipt, FileText, Calculator, GraduationCap, BookOpen,
  Lightbulb, TrendingUp, Shield, Users, MapPin, Scale, Brain, Bot, Settings, type LucideIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const tabs: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "fundamentals", label: "Fundamentals", icon: BookOpen },
  { id: "federal", label: "Federal Tax", icon: Shield },
  { id: "taxation", label: "Taxation", icon: Scale },
  { id: "fica", label: "FICA", icon: Shield },
  { id: "state", label: "State Tax", icon: MapPin },
  { id: "calculator", label: "Calculator", icon: Calculator },
  { id: "paystub", label: "Pay Stub", icon: Receipt },
  { id: "scenarios", label: "Scenarios", icon: Users },
  { id: "glossary", label: "Glossary", icon: BookOpen },
  { id: "forms", label: "Forms", icon: FileText },
  { id: "interview", label: "Interview Prep", icon: Brain },
  { id: "ai-tutor", label: "AI Tutor", icon: Bot },
];

const loaders: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  fundamentals: () => import("@/components/payroll/fundamentals-tab"),
  federal: () => import("@/components/payroll/federal-tax-tab"),
  taxation: () => import("@/components/payroll/taxation-section"),
  fica: () => import("@/components/payroll/fica-tab"),
  state: () => import("@/components/payroll/state-tax-tab"),
  calculator: () => import("@/components/payroll/payroll-calculator"),
  paystub: () => import("@/components/payroll/paystub-tab"),
  scenarios: () => import("@/components/payroll/scenarios-section"),
  glossary: () => import("@/components/payroll/glossary-section"),
  forms: () => import("@/components/payroll/forms-tab"),
  interview: () => import("@/components/payroll/interview-mode"),
  "ai-tutor": () => import("@/components/payroll/ai-tutor-mode"),
};

function LazyTab({ tabId }: { tabId: string }) {
  const [Comp, setComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = loaders[tabId];
    if (loader) {
      loader().then((m) => {
        if (!cancelled) setComp(() => m.default);
      });
    }
    return () => { cancelled = true; };
  }, [tabId]);

  if (!Comp) return <Skeleton className="h-[500px] w-full rounded-lg" />;
  return <Comp />;
}

function ApiSettings() {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    setApiKey(localStorage.getItem("user_ai_api_key") || "");
  }, [open]);

  const saveKey = () => {
    localStorage.setItem("user_ai_api_key", apiKey.trim());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors text-white z-20" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md text-foreground">
        <DialogHeader>
          <DialogTitle>AI Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <label className="text-sm font-medium mb-2 block">
            API Key (NVIDIA, Groq, or Gemini)
          </label>
          <Input 
            type="password" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} 
            placeholder="Enter your API key..."
          />
          <p className="text-xs text-muted-foreground mt-2">
            Your key is saved locally in your browser. It is only sent directly to the AI provider.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={saveKey}>Save Key</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("fundamentals");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white overflow-hidden">
        <ApiSettings />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
                <GraduationCap className="h-8 w-8" />
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">2026 Tax Year</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">
              Master USA Payroll
              <span className="block text-emerald-200 text-2xl sm:text-3xl font-normal mt-1">& Taxation</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mb-6">
              A comprehensive, interactive guide to understanding American payroll and taxes — from gross pay to net pay,
              capital gains to tax credits, with real-world examples, calculators, and visual breakdowns.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3"><DollarSign className="mr-1.5 h-3.5 w-3.5" />Tax Brackets</Badge>
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3"><Calculator className="mr-1.5 h-3.5 w-3.5" />Interactive Calculator</Badge>
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3"><Receipt className="mr-1.5 h-3.5 w-3.5" />Pay Stub Analysis</Badge>
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3"><MapPin className="mr-1.5 h-3.5 w-3.5" />28 State Tax Rates</Badge>
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3"><TrendingUp className="mr-1.5 h-3.5 w-3.5" />Capital Gains</Badge>
              <Badge className="bg-white/20 text-white border-0 py-1.5 px-3"><Lightbulb className="mr-1.5 h-3.5 w-3.5" />45+ Term Glossary</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { val: "10", label: "Learning Sections" },
                { val: "7", label: "Federal Tax Brackets" },
                { val: "28", label: "States Covered" },
                { val: "6", label: "Real-World Scenarios" },
                { val: "60+", label: "Interview Questions" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-bold">{s.val}</div>
                  <div className="text-xs text-emerald-200">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="mb-8 overflow-x-auto -mx-4 px-4">
          <div className="inline-flex gap-1 bg-muted/80 p-1.5 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-md transition-colors ${
                  activeTab === tab.id ? "bg-emerald-600 text-white" : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        <LazyTab key={activeTab} tabId={activeTab} />
      </main>

      <footer className="bg-gray-50 dark:bg-gray-900 border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>USA Payroll Learning Guide — 2026 Tax Year</span>
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