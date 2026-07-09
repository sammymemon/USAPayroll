---
Task ID: 1
Agent: main
Task: Fix all errors in USA Payroll Learning App

Work Log:
- Identified TypeScript error in src/lib/tax-engine.ts line 227: `addlMedicareAnnual` shorthand variable didn't match the actual variable name `addlMedAnnual`. Fixed to use explicit `addlMedicareAnnual: addlMedAnnual`.
- Identified TypeScript error in src/app/page.tsx line 132: `payStubResult` was typed as `Record<string, unknown>` but `PayStubView` component expects `CalcResult`. Fixed by importing `CalcResult` type and using client-side `calculatePayroll()` instead of API call (API returns nested format incompatible with PayStubView).
- Discovered Turbopack was crashing after first request due to massive page.tsx (1411 lines). Split into 6 separate component files:
  - fundamentals-tab.tsx (~180 lines)
  - federal-tax-tab.tsx (~160 lines)
  - fica-tab.tsx (~130 lines)
  - state-tax-tab.tsx (~100 lines)
  - paystub-tab.tsx (~75 lines)
  - forms-tab.tsx (~150 lines)
- Created shared src/lib/ref-data.ts with REF_DATA, fmt, fadeIn, and re-exports from tax-engine
- Reduced page.tsx from 1411 lines to ~140 lines
- Implemented lazy loading via dynamic import() in LazyTab component to avoid Turbopack compiling all tabs at once
- Fixed lint errors: removed setState in effect body (React 19 strict mode), removed ref access during render
- Used `bun run dev` instead of `npx next dev` for better stability

Stage Summary:
- All TypeScript errors resolved (0 src/ errors)
- All lint errors resolved (0 errors, 0 warnings)
- Server stable with bun run dev (serves multiple consecutive 200 responses)
- Page renders correctly with proper title "Master USA Payroll — Interactive Learning Guide"
- All 10 tabs load via lazy loading (Fundamentals loads by default, others load on demand)