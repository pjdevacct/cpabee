"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type TaskInputState = { [taskId: string]: { [fieldId: string]: string } }
type TaskGraded    = { [taskId: string]: { [fieldId: string]: boolean | null } }
type RevealedKeys  = { [taskId: string]: boolean }

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function parseNum(s: string): number {
  return parseFloat(s.replace(/,/g, "").replace(/\$/g, "").trim()) || 0
}

function withinTolerance(input: string, correct: number, pct = 0.01): boolean {
  const v = parseNum(input)
  if (correct === 0) return Math.abs(v) < 1
  return Math.abs((v - correct) / correct) <= pct
}

// ─────────────────────────────────────────────────────────────────────────────
// STABLE SHARED COMPONENTS
// Defined at MODULE LEVEL — never inside another component.
// This is the fix for the focus-loss bug: React was treating NumInput as a
// brand-new component type on every render because it was redefined inline,
// causing it to unmount/remount (and lose focus) on every keystroke.
// ─────────────────────────────────────────────────────────────────────────────

interface NumInputProps {
  task: string
  field: string
  graded: TaskGraded
  inputs: TaskInputState
  onChange: (task: string, field: string, val: string) => void
}

function NumInput({ task, field, graded, inputs, onChange }: NumInputProps) {
  const g = graded[task]?.[field]

  const border =
    g === true  ? "border-green-400 bg-green-50" :
    g === false ? "border-red-400 bg-red-50" :
                  "border-gray-300 bg-white"

  // ⭐ NEW: local state to prevent re-renders from kicking you out
  const [localValue, setLocalValue] = React.useState(inputs[task]?.[field] ?? "")

  // ⭐ Sync parent → local when parent changes (e.g., reset, grading)
  React.useEffect(() => {
    setLocalValue(inputs[task]?.[field] ?? "")
  }, [inputs, task, field])

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-gray-400 text-sm pointer-events-none">$</span>

      <input
        type="text"
        inputMode="decimal"
        className={`pl-6 pr-3 py-2 border rounded-md w-full ${border}`}
        
        // ⭐ Local typing — no parent re-render
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}

        // ⭐ Save to parent ONLY when user leaves the field
        onBlur={() => onChange(task, field, localValue)}
      />
    </div>
  )
}


interface GradeBtnProps {
  taskId: string
  revealed: RevealedKeys
  onGrade: (taskId: string) => void
  onReset: (taskId: string) => void
  onToggleKey: (taskId: string) => void
}

function GradeBtn({ taskId, revealed, onGrade, onReset, onToggleKey }: GradeBtnProps) {
  return (
    <div className="flex gap-2 flex-wrap mt-5">
      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        onClick={() => onGrade(taskId)}>
        Check My Answers
      </Button>
      <Button size="sm" variant="outline" onClick={() => onReset(taskId)}
        className="text-gray-500 border-gray-300 hover:bg-gray-50">
        <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
      </Button>
      <Button size="sm" variant="ghost" onClick={() => onToggleKey(taskId)}
        className="text-blue-600 hover:text-blue-700">
        {revealed[taskId]
          ? <><ChevronUp   className="h-3.5 w-3.5 mr-1" />Hide Answer Key</>
          : <><ChevronDown className="h-3.5 w-3.5 mr-1" />Show Answer Key</>}
      </Button>
    </div>
  )
}

interface ScoreBarProps {
  taskId: string
  graded: TaskGraded
}

function ScoreBar({ taskId, graded }: ScoreBarProps) {
  const g = graded[taskId]
  if (!g) return null
  const vals    = Object.values(g).filter(v => v !== null)
  const correct = vals.filter(Boolean).length
  const pct     = Math.round((correct / vals.length) * 100)
  return (
    <div className={`mt-3 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
      pct === 100 ? "bg-green-50 text-green-700" :
      pct >= 50   ? "bg-yellow-50 text-yellow-700" :
                    "bg-red-50 text-red-700"}`}>
      {pct === 100
        ? <><CheckCircle2  className="h-4 w-4 shrink-0" /> All correct — excellent work!</>
        : <><AlertTriangle className="h-4 w-4 shrink-0" /> {correct}/{vals.length} correct ({pct}%) — review the answer key below.</>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SIM 1 — ASC 842 LEASE ACCOUNTING
// ─────────────────────────────────────────────────────────────────────────────

const SIM1_CORRECT: { [taskId: string]: { [fieldId: string]: number } } = {
  t1: { present_value: 232_736.54, classification: 1 },
  t2: { rou_asset: 232_736.54, lease_liability: 232_736.54 },
  t3: { interest_exp_y1: 13_964.19, amort_exp_y1: 46_547.31, ending_liability: 186_700.73 },
  t4: {
    je_dr_rou: 232_736.54, je_cr_ll: 232_736.54,
    je_dr_interest: 13_964.19, je_dr_amort: 46_547.31,
    je_cr_cash: 60_000.00, je_cr_accum: 46_547.31,
  },
}

function Sim1() {
  const [inputs,   setInputs]   = useState<TaskInputState>({})
  const [graded,   setGraded]   = useState<TaskGraded>({})
  const [revealed, setRevealed] = useState<RevealedKeys>({})
  const [radio,    setRadio]    = useState<{ [k: string]: string }>({})

  const handleChange = useCallback((task: string, field: string, val: string) => {
    setInputs(p => ({ ...p, [task]: { ...(p[task] || {}), [field]: val } }))
  }, [])

  const gradeTask = useCallback((taskId: string) => {
    const correct = SIM1_CORRECT[taskId]
    const result: { [f: string]: boolean | null } = {}
    for (const [field, answer] of Object.entries(correct)) {
      if (field === "classification") {
        result[field] = radio[field] !== undefined ? parseInt(radio[field]) === answer : false
      } else {
        const userVal = inputs[taskId]?.[field] || ""
        result[field] = userVal === "" ? null : withinTolerance(userVal, answer)
      }
    }
    setGraded(p => ({ ...p, [taskId]: result }))
  }, [inputs, radio])

  const resetTask = useCallback((taskId: string) => {
    setInputs(p => { const n = { ...p }; delete n[taskId]; return n })
    setGraded(p => { const n = { ...p }; delete n[taskId]; return n })
    setRevealed(p => { const n = { ...p }; delete n[taskId]; return n })
    if (taskId === "t1") setRadio({})
  }, [])

  const toggleKey = useCallback((taskId: string) => {
    setRevealed(p => ({ ...p, [taskId]: !p[taskId] }))
  }, [])

  // Local shorthand wrappers — pass all state down as props (no inline component definitions)
  const NI = (p: { task: string; field: string }) =>
    <NumInput {...p} graded={graded} inputs={inputs} onChange={handleChange} />
  const GB = (p: { taskId: string }) =>
    <GradeBtn {...p} revealed={revealed} onGrade={gradeTask} onReset={resetTask} onToggleKey={toggleKey} />
  const SB = (p: { taskId: string }) =>
    <ScoreBar {...p} graded={graded} />

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Scenario */}
      <Card className="p-4 md:p-6 border-l-4 border-yellow-400 bg-yellow-50/40">
        <p className="text-xs font-bold uppercase tracking-widest text-yellow-700 mb-2">Scenario — FAR SIM #1</p>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Lease Accounting — ASC 842</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Meridian Manufacturing Co. ("Meridian"), a calendar-year public company, enters into a lease agreement
          with Industrial Properties LLC on January 1, 20X1 for specialized production equipment. Meridian has
          adopted ASC 842 and uses the effective-interest method for lease liabilities and straight-line
          amortization for ROU assets on finance leases.
        </p>
      </Card>

      {/* Exhibit A */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit A — Lease Terms</p>
        <Card className="p-0 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[300px]">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Term</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Lease commencement",                 "January 1, 20X1"],
                ["Lease term",                         "5 years (non-cancelable)"],
                ["Annual lease payments",              "$60,000 (paid at end of each year)"],
                ["Residual value guarantee by lessee", "None"],
                ["Purchase option",                    "None"],
                ["Useful life of equipment",           "5 years"],
                ["Incremental borrowing rate (IBR)",   "6.0% per annum"],
                ["Implicit rate in lease",             "Not determinable by lessee"],
                ["Initial direct costs",               "None"],
                ["Lease incentives received",          "None"],
              ].map(([t, d]) => (
                <tr key={t} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-600 align-top">{t}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-900">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Exhibit B */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit B — PV Factor Table (6%)</p>
        <Card className="p-0 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[260px]">
            <thead className="bg-gray-100 border-b">
              <tr>
                {["Period (n)", "PV of $1 (6%)", "PV Annuity of $1 (6%)"].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold text-gray-700 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {[[1,"0.94340","0.94340"],[2,"0.89000","1.83339"],[3,"0.83962","2.67301"],[4,"0.79209","3.46511"],[5,"0.74726","4.21237"]].map(([n,pv1,pva]) => (
                <tr key={String(n)} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-700">{n}</td>
                  <td className="px-4 py-2.5 text-gray-900">{pv1}</td>
                  <td className="px-4 py-2.5 text-gray-900">{pva}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Exhibit C */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit C — Balance Sheet Excerpt (Pre-Lease, Jan 1, 20X1)</p>
        <Card className="p-0 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[240px]">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Account</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[["Total assets","$4,850,000"],["Total liabilities","$2,100,000"],["Stockholders' equity","$2,750,000"]].map(([a,b]) => (
                <tr key={a} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-600">{a}</td>
                  <td className="px-4 py-2.5 text-gray-900 text-right font-mono">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* TASK 1 */}
      <Card className="p-4 md:p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Task 1 of 4</p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Lease Classification & Present Value</h3>
        <p className="text-sm text-gray-500 mb-5">
          Determine whether this lease is a finance or operating lease under ASC 842, and calculate
          the present value of the lease payments at commencement.
        </p>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">1a. This lease should be classified as a:</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {[["1", "Finance Lease"], ["0", "Operating Lease"]].map(([val, label]) => (
                <label key={val}
                  className="flex items-center gap-3 cursor-pointer text-sm p-3 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
                  <input type="radio" name="s1_classification" value={val}
                    checked={radio["classification"] === val}
                    onChange={() => setRadio(p => ({ ...p, classification: val }))}
                    className="accent-yellow-500 h-4 w-4 shrink-0" />
                  <span className={radio["classification"] === val ? "font-semibold text-gray-900" : "text-gray-600"}>{label}</span>
                  {graded["t1"]?.["classification"] !== undefined && radio["classification"] === val && (
                    graded["t1"]["classification"]
                      ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      : <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                  )}
                </label>
              ))}
            </div>
          </div>
          <div className="max-w-xs">
            <p className="text-sm font-semibold text-gray-700 mb-2">1b. Present value of lease payments (Jan 1, 20X1):</p>
            <div className="pr-6"><NI task="t1" field="present_value" /></div>
          </div>
        </div>

        <GB taskId="t1" />
        <SB taskId="t1" />

        {revealed["t1"] && (
          <div className="mt-4 p-4 md:p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
            <p className="font-bold text-blue-800">Answer Key — Task 1</p>
            <div>
              <p className="font-semibold text-gray-800">1a. Finance Lease ✓</p>
              <p className="text-gray-600 mt-1 text-xs leading-relaxed">
                Under ASC 842-20-25-2, a lease is classified as finance if any one of five criteria is met.
                Here the lease term (5 yrs) equals 100% of the asset's remaining useful life — well above the
                commonly used 75% "major part" threshold. Finance lease classification is triggered.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">1b. PV = <span className="text-green-700">${fmt(232_736.54)}</span></p>
              <div className="bg-white border border-blue-100 rounded p-3 mt-2 font-mono text-xs space-y-1 overflow-x-auto">
                <p>PV = PMT × [(1 − (1+r)^−n) / r]</p>
                <p>PV = $60,000 × [(1 − 1.06^−5) / 0.06]</p>
                <p>PV = $60,000 × 4.21236</p>
                <p className="font-bold text-green-700">PV = $232,736.54 ✓</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* TASK 2 */}
      <Card className="p-4 md:p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Task 2 of 4</p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Initial Recognition — Entry Amounts</h3>
        <p className="text-sm text-gray-500 mb-5">
          Determine the amounts Meridian records for the ROU asset and lease liability at commencement.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[300px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold text-gray-700">Account</th>
                <th className="text-left py-2 pr-8 font-semibold text-gray-700 w-36">Debit</th>
                <th className="text-left py-2 font-semibold text-gray-700 w-36">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 pr-4 text-gray-700">Right-of-Use Asset</td>
                <td className="py-3 pr-8"><div className="pr-6"><NI task="t2" field="rou_asset" /></div></td>
                <td className="py-3 text-gray-400 text-center">—</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-700 pl-4">Lease Liability</td>
                <td className="py-3 text-gray-400 text-center">—</td>
                <td className="py-3"><div className="pr-6"><NI task="t2" field="lease_liability" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <GB taskId="t2" />
        <SB taskId="t2" />
        {revealed["t2"] && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-2">
            <p className="font-bold text-blue-800">Answer Key — Task 2</p>
            <p className="text-gray-700 text-xs">Both are measured at the PV of lease payments — <strong>${fmt(232_736.54)}</strong> each. With no IDC, prepayments, or incentives, ROU asset = lease liability at commencement.</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs overflow-x-auto">
              <p>Dr. Right-of-Use Asset .... $232,736.54</p>
              <p>{"   "}Cr. Lease Liability ......... $232,736.54</p>
            </div>
          </div>
        )}
      </Card>

      {/* TASK 3 */}
      <Card className="p-4 md:p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Task 3 of 4</p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Year 1 Expense & Liability Balance</h3>
        <p className="text-sm text-gray-500 mb-5">
          Calculate Year 1 (20X1) income statement amounts and the lease liability balance at Dec 31, 20X1.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Interest expense for Year 1:",           field: "interest_exp_y1" },
            { label: "Amortization expense for Year 1:",       field: "amort_exp_y1" },
            { label: "Lease liability balance, Dec 31, 20X1:", field: "ending_liability" },
          ].map(({ label, field }) => (
            <div key={field}>
              <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
              <div className="pr-6"><NI task="t3" field={field} /></div>
            </div>
          ))}
        </div>
        <GB taskId="t3" />
        <SB taskId="t3" />
        {revealed["t3"] && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-4">
            <p className="font-bold text-blue-800">Answer Key — Task 3</p>
            {[
              { label: "Interest Expense", answer: fmt(13_964.19), lines: ["$232,736.54 × 6% = $13,964.19 ✓"] },
              { label: "Amortization Expense", answer: fmt(46_547.31), lines: ["$232,736.54 ÷ 5 years = $46,547.31/yr ✓"] },
              { label: "Ending Lease Liability", answer: fmt(186_700.73), lines: [
                "Opening:         $232,736.54",
                "+ Interest:      $  13,964.19",
                "− Cash payment:  $(60,000.00)",
                "Ending:          $186,700.73 ✓",
              ], note: "$60k payment: $13,964.19 interest + $46,035.81 principal reduction." },
            ].map(({ label, answer, lines, note }) => (
              <div key={label}>
                <p className="font-semibold text-gray-800">{label} = <span className="text-green-700">${answer}</span></p>
                <div className="bg-white border border-blue-100 rounded p-3 mt-1 font-mono text-xs space-y-0.5 overflow-x-auto">
                  {lines.map(l => <p key={l}>{l}</p>)}
                </div>
                {note && <p className="text-gray-500 text-xs mt-1">{note}</p>}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* TASK 4 */}
      <Card className="p-4 md:p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Task 4 of 4</p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Year 1 Journal Entries</h3>
        <p className="text-sm text-gray-500 mb-5">
          Prepare (A) the commencement entry and (B) the year-end entry for the first payment + amortization.
        </p>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Entry A — Lease Commencement (Jan 1, 20X1):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[320px]">
                <thead><tr className="border-b">
                  <th className="text-left py-2 pr-4 text-gray-600 font-medium">Account</th>
                  <th className="text-left py-2 pr-8 text-gray-600 font-medium w-36">Debit</th>
                  <th className="text-left py-2 text-gray-600 font-medium w-36">Credit</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700">Right-of-Use Asset</td>
                    <td className="py-2.5 pr-8"><div className="pr-6"><NI task="t4" field="je_dr_rou" /></div></td>
                    <td className="py-2.5 text-gray-400 text-center">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700 pl-4">Lease Liability</td>
                    <td className="py-2.5 text-gray-400 text-center">—</td>
                    <td className="py-2.5"><div className="pr-6"><NI task="t4" field="je_cr_ll" /></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Entry B — Dec 31, 20X1 (Payment + Amortization):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[320px]">
                <thead><tr className="border-b">
                  <th className="text-left py-2 pr-4 text-gray-600 font-medium">Account</th>
                  <th className="text-left py-2 pr-8 text-gray-600 font-medium w-36">Debit</th>
                  <th className="text-left py-2 text-gray-600 font-medium w-36">Credit</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700">Interest Expense</td>
                    <td className="py-2.5 pr-8"><div className="pr-6"><NI task="t4" field="je_dr_interest" /></div></td>
                    <td className="py-2.5 text-gray-400 text-center">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700">Lease Liability (principal)</td>
                    <td className="py-2.5 text-gray-400 text-center">—</td>
                    <td className="py-2.5 text-gray-400 text-center">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700 pl-4">Cash</td>
                    <td className="py-2.5 text-gray-400 text-center">—</td>
                    <td className="py-2.5"><div className="pr-6"><NI task="t4" field="je_cr_cash" /></div></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700">Amortization Expense — ROU</td>
                    <td className="py-2.5 pr-8"><div className="pr-6"><NI task="t4" field="je_dr_amort" /></div></td>
                    <td className="py-2.5 text-gray-400 text-center">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700 pl-4">Accumulated Amort. — ROU</td>
                    <td className="py-2.5 text-gray-400 text-center">—</td>
                    <td className="py-2.5"><div className="pr-6"><NI task="t4" field="je_cr_accum" /></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <GB taskId="t4" />
        <SB taskId="t4" />
        {revealed["t4"] && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
            <p className="font-bold text-blue-800">Answer Key — Task 4</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs space-y-1 overflow-x-auto">
              <p className="font-bold">Entry A — Jan 1, 20X1</p>
              <p>Dr. Right-of-Use Asset .... $232,736.54</p>
              <p>{"   "}Cr. Lease Liability ......... $232,736.54</p>
              <div className="border-t mt-2 pt-2">
                <p className="font-bold">Entry B — Dec 31, 20X1</p>
                <p>Dr. Interest Expense ........ $ 13,964.19</p>
                <p>Dr. Lease Liability ......... $ 46,035.81</p>
                <p>{"   "}Cr. Cash .................... $ 60,000.00</p>
                <p className="mt-1">Dr. Amortization Exp—ROU .. $ 46,547.31</p>
                <p>{"   "}Cr. Accum. Amort.—ROU .... $ 46,547.31</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs">
              <strong>Key point:</strong> The $60k payment covers interest ($13,964.19) first; remainder
              ($46,035.81) reduces principal. Amortization is a separate entry — two distinct income
              statement lines for a finance lease.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SIM 2 — ASC 606 REVENUE RECOGNITION
// ─────────────────────────────────────────────────────────────────────────────

const SIM2_CORRECT: { [taskId: string]: { [fieldId: string]: number } } = {
  t1: { ssa_saas: 480_000, ssa_support: 120_000, ssa_training: 60_000, total_ssp: 660_000 },
  t2: { alloc_saas: 436_363.64, alloc_support: 109_090.91, alloc_training: 54_545.45, total_alloc: 600_000 },
  t3: { rev_y1_saas: 218_181.82, rev_y1_support: 54_545.46, rev_y1_training: 54_545.45, total_rev_y1: 327_272.73 },
  t4: { contract_asset: 218_181.82, deferred_rev: 54_545.45 },
}

function Sim2() {
  const [inputs,   setInputs]   = useState<TaskInputState>({})
  const [graded,   setGraded]   = useState<TaskGraded>({})
  const [revealed, setRevealed] = useState<RevealedKeys>({})

  const handleChange = useCallback((task: string, field: string, val: string) => {
    setInputs(p => ({ ...p, [task]: { ...(p[task] || {}), [field]: val } }))
  }, [])

  const gradeTask = useCallback((taskId: string) => {
    const correct = SIM2_CORRECT[taskId]
    const result: { [f: string]: boolean | null } = {}
    for (const [field, answer] of Object.entries(correct)) {
      const userVal = inputs[taskId]?.[field] || ""
      result[field] = userVal === "" ? null : withinTolerance(userVal, answer)
    }
    setGraded(p => ({ ...p, [taskId]: result }))
  }, [inputs])

  const resetTask = useCallback((taskId: string) => {
    setInputs(p => { const n = { ...p }; delete n[taskId]; return n })
    setGraded(p => { const n = { ...p }; delete n[taskId]; return n })
    setRevealed(p => { const n = { ...p }; delete n[taskId]; return n })
  }, [])

  const toggleKey = useCallback((taskId: string) => {
    setRevealed(p => ({ ...p, [taskId]: !p[taskId] }))
  }, [])

  const NI = (p: { task: string; field: string }) =>
    <NumInput {...p} graded={graded} inputs={inputs} onChange={handleChange} />
  const GB = (p: { taskId: string }) =>
    <GradeBtn {...p} revealed={revealed} onGrade={gradeTask} onReset={resetTask} onToggleKey={toggleKey} />
  const SB = (p: { taskId: string }) =>
    <ScoreBar {...p} graded={graded} />

  const poRows = [
    { label: "SaaS License",            sField: "ssa_saas",     aField: "alloc_saas" },
    { label: "Customer Support",        sField: "ssa_support",  aField: "alloc_support" },
    { label: "Implementation Training", sField: "ssa_training", aField: "alloc_training" },
  ]

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Scenario */}
      <Card className="p-4 md:p-6 border-l-4 border-teal-400 bg-teal-50/40">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">Scenario — FAR SIM #2</p>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Revenue Recognition — ASC 606</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Apex Software Solutions Inc. ("Apex"), a calendar-year public company, enters into a contract with
          Crestwood Corp. on January 1, 20X1 for a bundled software arrangement governed by ASC 606. Apex
          has identified three performance obligations and must allocate the transaction price on a relative
          standalone selling price (SSP) basis.
        </p>
      </Card>

      {/* Exhibit A */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit A — Contract Terms</p>
        <Card className="p-0 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[280px]">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Item</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Contract date",           "January 1, 20X1"],
                ["Transaction price",       "$600,000 (fixed)"],
                ["Payment terms",           "$300,000 due Jan 1, 20X1; $300,000 due Jan 1, 20X2"],
                ["Contract term",           "2 years"],
                ["Performance obligations", "3 — SaaS License, Customer Support, Implementation Training"],
              ].map(([t,d]) => (
                <tr key={t} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-600 align-top">{t}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-900">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Exhibit B */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit B — Performance Obligations & Delivery</p>
        <Card className="p-0 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[320px]">
            <thead className="bg-gray-100 border-b">
              <tr>{["Performance Obligation","Delivery Pattern","Duration"].map(h=>(
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-700">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS License","Over time (ratable)","2 years"],
                ["Customer Support (24/7)","Over time (ratable)","2 years"],
                ["Implementation Training","Point in time","Completed Jan 1, 20X1"],
              ].map(([po,dp,dur]) => (
                <tr key={po} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-medium text-gray-900">{po}</td>
                  <td className="px-4 py-2.5 text-gray-600">{dp}</td>
                  <td className="px-4 py-2.5 text-gray-600">{dur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Exhibit C */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit C — Standalone Selling Price Schedule</p>
        <Card className="p-0 overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[320px]">
            <thead className="bg-gray-100 border-b">
              <tr>{["Performance Obligation","Annual SSP","Total SSP"].map(h=>(
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-700">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS License","$240,000/yr","$480,000"],
                ["Customer Support","$ 60,000/yr","$120,000"],
                ["Implementation Training","N/A (one-time)","$ 60,000"],
              ].map(([po,ann,tot]) => (
                <tr key={po} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-800">{po}</td>
                  <td className="px-4 py-2.5 font-mono text-gray-700">{ann}</td>
                  <td className="px-4 py-2.5 font-mono font-semibold text-gray-900">{tot}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-2.5 text-gray-900">Total SSP</td>
                <td className="px-4 py-2.5"></td>
                <td className="px-4 py-2.5 font-mono text-gray-900">$660,000</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* TASK 1 */}
      <Card className="p-4 md:p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Task 1 of 4</p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Confirm Standalone Selling Prices</h3>
        <p className="text-sm text-gray-500 mb-5">Using Exhibit C, confirm total SSP for each performance obligation over the full contract term.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[280px]">
            <thead><tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Performance Obligation</th>
              <th className="text-left py-2 font-semibold text-gray-700 w-40">Total SSP</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {poRows.map(({ label, sField }) => (
                <tr key={sField}>
                  <td className="py-3 pr-4 text-gray-700">{label}</td>
                  <td className="py-3"><div className="pr-6"><NI task="t1" field={sField} /></div></td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300">
                <td className="py-3 pr-4 font-bold text-gray-900">Total SSP</td>
                <td className="py-3"><div className="pr-6"><NI task="t1" field="total_ssp" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <GB taskId="t1" />
        <SB taskId="t1" />
        {revealed["t1"] && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-2">
            <p className="font-bold text-blue-800">Answer Key — Task 1</p>
            <p className="text-gray-600 text-xs">Read directly from Exhibit C. Total SSP ($660k) exceeds TP ($600k) — this discount requires relative SSP allocation in Task 2.</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs overflow-x-auto">
              <p>SaaS License:            $480,000</p>
              <p>Customer Support:        $120,000</p>
              <p>Implementation Training: $ 60,000</p>
              <p className="font-bold border-t pt-1 mt-1">Total SSP: $660,000</p>
            </div>
          </div>
        )}
      </Card>

      {/* TASK 2 */}
      <Card className="p-4 md:p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Task 2 of 4</p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Allocate the Transaction Price</h3>
        <p className="text-sm text-gray-500 mb-5">Allocate the $600,000 transaction price to each PO using relative SSP (ASC 606-10-32-31).</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[280px]">
            <thead><tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Performance Obligation</th>
              <th className="text-left py-2 font-semibold text-gray-700 w-40">Allocated Amount</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {poRows.map(({ label, aField }) => (
                <tr key={aField}>
                  <td className="py-3 pr-4 text-gray-700">{label}</td>
                  <td className="py-3"><div className="pr-6"><NI task="t2" field={aField} /></div></td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300">
                <td className="py-3 pr-4 font-bold text-gray-900">Total Allocated</td>
                <td className="py-3"><div className="pr-6"><NI task="t2" field="total_alloc" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <GB taskId="t2" />
        <SB taskId="t2" />
        {revealed["t2"] && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-2">
            <p className="font-bold text-blue-800">Answer Key — Task 2</p>
            <p className="text-gray-600 text-xs">Formula: (PO SSP ÷ Total SSP) × Transaction Price</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs overflow-x-auto">
              <p>SaaS:     ($480k÷$660k)×$600k = <span className="font-bold text-green-700">$436,363.64</span></p>
              <p>Support:  ($120k÷$660k)×$600k = <span className="font-bold text-green-700">$109,090.91</span></p>
              <p>Training: ($ 60k÷$660k)×$600k = <span className="font-bold text-green-700">$ 54,545.45</span></p>
              <p className="font-bold border-t pt-1 mt-1">Total: $600,000 ✓ (must equal TP)</p>
            </div>
          </div>
        )}
      </Card>

      {/* TASK 3 */}
      <Card className="p-4 md:p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Task 3 of 4</p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Year 1 Revenue (20X1)</h3>
        <p className="text-sm text-gray-500 mb-5">Calculate revenue recognized per PO for the year ended December 31, 20X1.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[280px]">
            <thead><tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Performance Obligation</th>
              <th className="text-left py-2 font-semibold text-gray-700 w-40">20X1 Revenue</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { label: "SaaS License (Year 1 of 2)",               field: "rev_y1_saas" },
                { label: "Customer Support (Year 1 of 2)",           field: "rev_y1_support" },
                { label: "Implementation Training (completed Jan 1)", field: "rev_y1_training" },
              ].map(({ label, field }) => (
                <tr key={field}>
                  <td className="py-3 pr-4 text-gray-700">{label}</td>
                  <td className="py-3"><div className="pr-6"><NI task="t3" field={field} /></div></td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300">
                <td className="py-3 pr-4 font-bold text-gray-900">Total 20X1 Revenue</td>
                <td className="py-3"><div className="pr-6"><NI task="t3" field="total_rev_y1" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <GB taskId="t3" />
        <SB taskId="t3" />
        {revealed["t3"] && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-2">
            <p className="font-bold text-blue-800">Answer Key — Task 3</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs overflow-x-auto">
              <p>SaaS (÷2 yrs):     $436,363.64÷2 = <span className="font-bold text-green-700">$218,181.82</span></p>
              <p>Support (÷2 yrs):  $109,090.91÷2 = <span className="font-bold text-green-700">$ 54,545.46</span></p>
              <p>Training (pt-in-time): 100% Y1   = <span className="font-bold text-green-700">$ 54,545.45</span></p>
              <p className="font-bold border-t pt-1 mt-1">Total 20X1: $327,272.73</p>
            </div>
            <p className="text-gray-600 text-xs">SaaS and Support recognized over time (straight-line). Training completed on Day 1 → 100% recognized immediately.</p>
          </div>
        )}
      </Card>

      {/* TASK 4 */}
      <Card className="p-4 md:p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Task 4 of 4</p>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Balance Sheet — Dec 31, 20X1</h3>
        <p className="text-sm text-gray-500 mb-3">Apex collected $300,000 in Year 1. Determine the balance sheet presentation at Dec 31, 20X1.</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5 text-xs text-amber-800">
          <strong>Hint:</strong> Earned more than billed → Contract Asset. Billed more than earned → Deferred Revenue.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Contract Asset:</p>
            <p className="text-xs text-gray-400 mb-2">Earned but not yet billed/collected</p>
            <div className="pr-6"><NI task="t4" field="contract_asset" /></div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Deferred Revenue:</p>
            <p className="text-xs text-gray-400 mb-2">Collected but not yet earned</p>
            <div className="pr-6"><NI task="t4" field="deferred_rev" /></div>
          </div>
        </div>
        <GB taskId="t4" />
        <SB taskId="t4" />
        {revealed["t4"] && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
            <p className="font-bold text-blue-800">Answer Key — Task 4</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs overflow-x-auto">
              <p>Contract Asset:   <span className="text-green-700 font-bold">$218,181.82</span></p>
              <p className="text-gray-400">(SaaS Y1 earned, not yet billed — Y2 cash covers Y2 SaaS)</p>
              <p className="mt-1">Deferred Revenue: <span className="text-green-700 font-bold">$54,545.45</span></p>
              <p className="text-gray-400">(Support cash collected for Y2, not yet earned)</p>
            </div>
            <p className="text-gray-500 text-xs">
              Both can exist on the same contract simultaneously. Contract assets (ASC 606-10-45-3) arise when
              performance precedes billing rights; contract liabilities when cash precedes performance.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE SHELL
// ─────────────────────────────────────────────────────────────────────────────

export default function PracticeSimsPage() {
  const [activeSim, setActiveSim] = useState<1 | 2>(1)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden shrink-0">
              <Image src="/images/cpabee-logo.png" alt="CPABee Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight">CPABee</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#features"     className="text-sm font-medium hover:text-yellow-600 transition-colors">Reports</Link>
            <Link href="/study-plan"    className="text-sm font-medium hover:text-yellow-600 transition-colors">Study Plan</Link>
            <Link href="/practice-sims" className="text-sm font-medium text-yellow-600 border-b-2 border-yellow-400 pb-0.5">Practice SIMs</Link>
            <Link href="/#pricing"      className="text-sm font-medium hover:text-yellow-600 transition-colors">Pricing</Link>
          </nav>
          <Link href="/#pricing">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs md:text-sm px-3 md:px-4">
              Free Sample
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-10 md:py-16">
          <div className="container max-w-4xl text-center space-y-4 px-4">
            <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Free Practice Resource
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">FAR Task-Based Simulations</h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
              Exam-realistic SIMs with live grading and step-by-step answer keys.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-1 text-xs md:text-sm">
              {["📋 Realistic scenarios","✏️ Interactive inputs","✅ Instant grading","📖 Full answer keys"].map(f => (
                <span key={f} className="bg-white/10 px-3 py-1 rounded-full text-slate-200">{f}</span>
              ))}
            </div>
          </div>
        </section>

        {/* SIM Selector */}
        <div className="bg-white border-b sticky top-16 z-30">
          <div className="container max-w-4xl px-0">
            <div className="flex">
              {([
                { id: 1 as const, label: "SIM #1", topic: "ASC 842 — Leases",        color: "yellow" },
                { id: 2 as const, label: "SIM #2", topic: "ASC 606 — Revenue Rec.",  color: "teal"   },
              ]).map(({ id, label, topic, color }) => (
                <button key={id} onClick={() => setActiveSim(id)}
                  className={`flex-1 py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm font-semibold border-b-2 transition-colors text-left ${
                    activeSim === id
                      ? color === "yellow"
                        ? "border-yellow-500 text-yellow-700 bg-yellow-50/50"
                        : "border-teal-500 text-teal-700 bg-teal-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}>
                  <span className="font-bold block">{label}</span>
                  <span className="text-xs font-normal opacity-80 hidden sm:block">{topic}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SIM Content */}
        <div className="container max-w-4xl py-6 md:py-10 px-4 md:px-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 mb-6 md:mb-8 flex gap-3">
            <BookOpen className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-800 mb-1 text-sm">How to use these SIMs</p>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Read the scenario and exhibits, then fill in each answer field. Tap{" "}
                <strong>Check My Answers</strong> to grade (1% rounding tolerance). Tap{" "}
                <strong>Show Answer Key</strong> for full step-by-step workings.
              </p>
            </div>
          </div>
          {activeSim === 1 ? <Sim1 /> : <Sim2 />}
        </div>

        {/* CTA */}
        <section className="py-8 md:py-10 bg-white border-t">
          <div className="container max-w-3xl px-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Know what's actually tested</p>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">SIMs test the same content as MCQs.</h3>
                <p className="text-sm text-gray-600">
                  Leases and revenue recognition are among the most discussed FAR topics. CPABee reports give
                  you the full ranked list so you know exactly where to focus.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
                <Link href="/#pricing">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full md:w-auto whitespace-nowrap">
                    Get FAR Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#pricing">
                  <Button variant="outline" className="border-amber-400 text-amber-800 hover:bg-amber-50 w-full md:w-auto text-sm whitespace-nowrap">
                    Get Free Sample First
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden">
                <Image src="/images/cpabee-logo.png" alt="CPABee Logo" width={24} height={24} className="object-contain" />
              </div>
              <span className="text-sm font-semibold">CPABee</span>
            </Link>
            <div className="flex gap-4 text-sm flex-wrap justify-center">
              <Link href="/terms-of-service" className="text-gray-500 hover:text-yellow-600">Terms</Link>
              <Link href="/privacy-policy"   className="text-gray-500 hover:text-yellow-600">Privacy</Link>
              <Link href="/study-plan"       className="text-gray-500 hover:text-yellow-600">Study Plan</Link>
              <Link href="/practice-sims"    className="text-gray-500 hover:text-yellow-600">Practice SIMs</Link>
            </div>
            <div className="text-sm text-gray-500 text-center md:text-right">
              <p>Contact: <a href="mailto:info@cpabee.com" className="text-teal-700 hover:text-teal-600 underline">info@cpabee.com</a></p>
              <p>© {new Date().getFullYear()} CPABee. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
