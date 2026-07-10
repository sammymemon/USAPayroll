"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AITutorMode = dynamic(() => import("@/components/payroll/ai-tutor-mode"), {
  ssr: false,
});

export default function AITutorPage() {
  return (
    <div className="h-[100dvh] w-full overflow-hidden flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-shrink-0 p-2 sm:p-4 border-b bg-white dark:bg-gray-900 flex items-center shadow-sm z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
      <div className="flex-1 p-0 sm:p-4 flex flex-col overflow-hidden">
        <AITutorMode />
      </div>
    </div>
  );
}
