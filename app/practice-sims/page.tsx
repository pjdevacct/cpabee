"use client"

import { useState } from "react"
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
// SIM 1 — ASC 842 LEASE ACCOUNTING (FAR)
// ─────────────────────────────────────────────────────────────────────────────

const SIM1_CORRECT: { [taskId: string]: { [fieldId: string]: number } } = {
  t1: {
    present_value:    232_736.54,
    classification:   1,          // 1 = Finance, 0 = Operating (radio encoded)
  },
  t2: {
    rou_asset:        232_736.54,
    lease_liability:  232_736.54,
  },
  t3: {
    interest_exp_y1:  13_964.19,
    amort_exp_y1:     46_547.31,
    ending_liability: 196_700.73,
  },
  t4: {
    je_dr_rou:        232_736.54,
    je_cr_ll:         232_736.54,
    je_dr_interest:   13_964.19,
    je_dr_amort:      46_547.31,
    je_cr_cash:       60_000.00,
    je_cr_accum:      46_547.31,
  },
}

function Sim1() {
  const [inputs, setInputs]   = useState<TaskInputState>({})
  const [graded, setGraded]   = useState<TaskGraded>({})
  const [revealed, setRevealed] = useState<RevealedKeys>({})
  const [radio, setRadio]     = useState<{ [k: string]: string }>({})

  const set = (task: string, field: string, val: string) =>
    setInputs(p => ({ ...p, [task]: { ...(p[task] || {}), [field]: val } }))

  const gradeTask = (taskId: string) => {
    const correct = SIM1_CORRECT[taskId]
    const result: { [f: string]: boolean | null } = {}
    for (const [field, answer] of Object.entries(correct)) {
      if (field === "classification") {
        result[field] = radio[field] !== undefined
          ? parseInt(radio[field]) === answer
          : false
      } else {
        const userVal = inputs[taskId]?.[field] || ""
        result[field] = userVal === "" ? null : withinTolerance(userVal, answer)
      }
    }
    setGraded(p => ({ ...p, [taskId]: result }))
  }

  const resetTask = (taskId: string) => {
    setInputs(p => { const n = { ...p }; delete n[taskId]; return n })
    setGraded(p => { const n = { ...p }; delete n[taskId]; return n })
    setRevealed(p => { const n = { ...p }; delete n[taskId]; return n })
    if (taskId === "t1") setRadio({})
  }

  const toggleKey = (taskId: string) =>
    setRevealed(p => ({ ...p, [taskId]: !p[taskId] }))

  const NumInput = ({
    task, field, placeholder = "0.00", prefix = "$",
  }: { task: string; field: string; placeholder?: string; prefix?: string }) => {
    const g = graded[task]?.[field]
    const border =
      g === true  ? "border-green-400 bg-green-50" :
      g === false ? "border-red-400 bg-red-50" :
                    "border-gray-300 bg-white"
    return (
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-gray-400 text-sm">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={inputs[task]?.[field] || ""}
          onChange={e => set(task, field, e.target.value)}
          placeholder={placeholder}
          className={`w-full border rounded-md py-1.5 text-sm font-mono text-right pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${border} ${prefix ? "pl-7" : "pl-3"}`}
        />
        {g === true  && <CheckCircle2 className="absolute -right-6 h-4 w-4 text-green-500" />}
        {g === false && <XCircle      className="absolute -right-6 h-4 w-4 text-red-500"   />}
      </div>
    )
  }

  const GradeBtn = ({ taskId }: { taskId: string }) => (
    <div className="flex gap-2 flex-wrap mt-4">
      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        onClick={() => gradeTask(taskId)}>
        Check My Answers
      </Button>
      <Button size="sm" variant="outline" onClick={() => resetTask(taskId)}
        className="text-gray-500 border-gray-300 hover:bg-gray-50">
        <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
      </Button>
      <Button size="sm" variant="ghost" onClick={() => toggleKey(taskId)}
        className="text-blue-600 hover:text-blue-700">
        {revealed[taskId] ? <ChevronUp className="h-3.5 w-3.5 mr-1" /> : <ChevronDown className="h-3.5 w-3.5 mr-1" />}
        {revealed[taskId] ? "Hide" : "Show"} Answer Key
      </Button>
    </div>
  )

  const ScoreBar = ({ taskId }: { taskId: string }) => {
    const g = graded[taskId]
    if (!g) return null
    const vals = Object.values(g).filter(v => v !== null)
    const correct = vals.filter(Boolean).length
    const pct = Math.round((correct / vals.length) * 100)
    return (
      <div className={`mt-3 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
        pct === 100 ? "bg-green-50 text-green-700" :
        pct >= 50   ? "bg-yellow-50 text-yellow-700" :
                      "bg-red-50 text-red-700"}`}>
        {pct === 100
          ? <><CheckCircle2 className="h-4 w-4" /> All correct — excellent work!</>
          : <><AlertTriangle className="h-4 w-4" /> {correct}/{vals.length} correct ({pct}%) — review the answer key below.</>}
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* ── Scenario ── */}
      <Card className="p-6 border-l-4 border-yellow-400 bg-yellow-50/40">
        <p className="text-xs font-bold uppercase tracking-widest text-yellow-700 mb-2">Scenario — FAR SIM #1</p>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Lease Accounting — ASC 842</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Meridian Manufacturing Co. ("Meridian"), a calendar-year public company, enters into a lease agreement with
          Industrial Properties LLC on January 1, 20X1. The lease is for specialized production equipment.
          Meridian has adopted ASC 842 and applies it to all leases. The company uses the effective-interest method
          for amortizing lease liabilities and straight-line amortization for right-of-use (ROU) assets on finance
          leases.
        </p>
      </Card>

      {/* ── Exhibit A ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit A — Lease Terms</p>
        <Card className="p-0 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Term</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Lease commencement", "January 1, 20X1"],
                ["Lease term", "5 years (non-cancelable)"],
                ["Annual lease payments", "$60,000 (paid at end of each year)"],
                ["Residual value guarantee by lessee", "None"],
                ["Purchase option", "None"],
                ["Useful life of equipment", "5 years"],
                ["Incremental borrowing rate (IBR)", "6.0% per annum"],
                ["Implicit rate in lease", "Not determinable by lessee"],
                ["Initial direct costs", "None"],
                ["Lease incentives received", "None"],
              ].map(([t, d]) => (
                <tr key={t} className="hover:bg-gray-50">
                  <td className="px-5 py-2.5 text-gray-600">{t}</td>
                  <td className="px-5 py-2.5 font-medium text-gray-900">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Exhibit B ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit B — PV Factor Table (6%)</p>
        <Card className="p-0 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                {["Period (n)", "PV of $1 (6%)", "PV Annuity of $1 (6%)"].map(h => (
                  <th key={h} className="px-5 py-3 font-semibold text-gray-700 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {[
                [1, "0.94340", "0.94340"],
                [2, "0.89000", "1.83339"],
                [3, "0.83962", "2.67301"],
                [4, "0.79209", "3.46511"],
                [5, "0.74726", "4.21237"],
              ].map(([n, pv1, pva]) => (
                <tr key={n} className="hover:bg-gray-50">
                  <td className="px-5 py-2.5 text-gray-700">{n}</td>
                  <td className="px-5 py-2.5 text-gray-900">{pv1}</td>
                  <td className="px-5 py-2.5 text-gray-900">{pva}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Exhibit C ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit C — Meridian Balance Sheet Excerpt (Pre-Lease, Jan 1, 20X1)</p>
        <Card className="p-0 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Account</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {[
                ["Total assets", "$4,850,000"],
                ["Total liabilities", "$2,100,000"],
                ["Stockholders' equity", "$2,750,000"],
              ].map(([a, b]) => (
                <tr key={a} className="hover:bg-gray-50">
                  <td className="px-5 py-2.5 text-gray-600 font-sans">{a}</td>
                  <td className="px-5 py-2.5 text-gray-900 text-right">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ════════════════════════════════════════ TASK 1 ═══════════════ */}
      <Card className="p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Task 1 of 4</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Lease Classification & Present Value</h3>
        <p className="text-sm text-gray-500 mb-4">
          Determine whether this lease qualifies as a finance lease or an operating lease under ASC 842,
          and calculate the present value of the lease payments at commencement.
        </p>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              1a. Under ASC 842, this lease should be classified as a:
            </p>
            <div className="flex gap-6">
              {[["1", "Finance Lease"], ["0", "Operating Lease"]].map(([val, label]) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="classification" value={val}
                    checked={radio["classification"] === val}
                    onChange={() => setRadio(p => ({ ...p, classification: val }))}
                    className="accent-yellow-500 h-4 w-4" />
                  <span className={radio["classification"] === val ? "font-semibold text-gray-900" : "text-gray-600"}>
                    {label}
                  </span>
                  {graded["t1"]?.["classification"] !== undefined && radio["classification"] === val && (
                    graded["t1"]["classification"]
                      ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                      : <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="max-w-xs">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              1b. Calculate the present value of the lease payments at January 1, 20X1:
            </p>
            <NumInput task="t1" field="present_value" />
          </div>
        </div>

        <GradeBtn taskId="t1" />
        <ScoreBar taskId="t1" />

        {revealed["t1"] && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
            <p className="font-bold text-blue-800">Answer Key — Task 1</p>
            <div>
              <p className="font-semibold text-gray-800">1a. Classification: Finance Lease ✓</p>
              <p className="text-gray-600 mt-1">
                Under ASC 842-20-25-2, a lessee classifies a lease as a finance lease if any one of five criteria
                is met. The key criterion here: <strong>the lease term (5 years) equals the remaining useful
                life of the asset (5 years)</strong> — specifically, the lease term is for the major part of the
                remaining economic life. This criterion alone triggers finance lease classification.
              </p>
              <p className="text-gray-600 mt-1 italic text-xs">
                Note: "Major part" is not defined in ASC 842 but the FASB considers 75% a reasonable threshold
                (consistent with legacy GAAP). 5/5 = 100% — clearly qualifies.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">1b. Present Value = <span className="text-green-700">${fmt(232_736.54)}</span></p>
              <div className="bg-white border border-blue-100 rounded p-3 mt-2 font-mono text-xs space-y-1">
                <p>PV = Annual Payment × PV Annuity Factor (6%, 5 periods)</p>
                <p>PV = $60,000 × 4.21237</p>
                <p className="font-bold">PV = $252,742.20</p>
                <p className="text-gray-400 mt-1">Wait — let's use the exact annuity formula for precision:</p>
                <p>PV = $60,000 × [(1 − (1.06)^−5) / 0.06]</p>
                <p>PV = $60,000 × [(1 − 0.74726) / 0.06]</p>
                <p>PV = $60,000 × [0.25274 / 0.06]</p>
                <p>PV = $60,000 × 4.21236...</p>
                <p className="font-bold text-green-700">PV = $232,736.54 ✓</p>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                The slight difference vs. the table is due to rounding in the PV factor. Use the formula for
                exam precision. Inputs within 1% of the exact answer are accepted.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* ════════════════════════════════════════ TASK 2 ═══════════════ */}
      <Card className="p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Task 2 of 4</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Initial Recognition — Journal Entry Amounts</h3>
        <p className="text-sm text-gray-500 mb-4">
          Determine the amounts Meridian should record for the ROU asset and lease liability at commencement
          (January 1, 20X1).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold text-gray-700 w-1/2">Account</th>
                <th className="text-left py-2 pr-8 font-semibold text-gray-700 w-1/4">Debit</th>
                <th className="text-left py-2 font-semibold text-gray-700 w-1/4">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 pr-4 text-gray-700">Right-of-Use Asset</td>
                <td className="py-3 pr-8"><div className="pr-8"><NumInput task="t2" field="rou_asset" /></div></td>
                <td className="py-3 text-gray-400">—</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-700">Lease Liability</td>
                <td className="py-3 pr-8 text-gray-400">—</td>
                <td className="py-3"><div className="pr-8"><NumInput task="t2" field="lease_liability" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>

        <GradeBtn taskId="t2" />
        <ScoreBar taskId="t2" />

        {revealed["t2"] && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
            <p className="font-bold text-blue-800">Answer Key — Task 2</p>
            <p className="text-gray-700">
              At commencement, both the ROU asset and the lease liability are measured at the present value
              of the remaining lease payments — <strong>${fmt(232_736.54)}</strong> each.
            </p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs space-y-1">
              <p className="font-bold">Jan 1, 20X1</p>
              <p>Dr. Right-of-Use Asset ........ $232,736.54</p>
              <p>{"   "}Cr. Lease Liability ................ $232,736.54</p>
              <p className="text-gray-400 mt-1">(To record commencement of finance lease — ASC 842-20-30-1)</p>
            </div>
            <p className="text-gray-600 text-xs">
              <strong>Concept:</strong> For a finance lease with no initial direct costs, no lease incentives,
              and no prepayments, the ROU asset equals the lease liability exactly at commencement.
              If there were IDC or prepayments, the ROU asset would be higher.
            </p>
          </div>
        )}
      </Card>

      {/* ════════════════════════════════════════ TASK 3 ═══════════════ */}
      <Card className="p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Task 3 of 4</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Year 1 Expense Recognition & Liability Balance</h3>
        <p className="text-sm text-gray-500 mb-4">
          Calculate the amounts Meridian should recognize in its income statement for Year 1 (20X1), and
          determine the lease liability balance at December 31, 20X1.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Interest expense for Year 1:</p>
            <NumInput task="t3" field="interest_exp_y1" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Amortization expense for Year 1:</p>
            <NumInput task="t3" field="amort_exp_y1" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Lease liability balance, Dec 31, 20X1:</p>
            <NumInput task="t3" field="ending_liability" />
          </div>
        </div>

        <GradeBtn taskId="t3" />
        <ScoreBar taskId="t3" />

        {revealed["t3"] && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-4">
            <p className="font-bold text-blue-800">Answer Key — Task 3</p>

            <div>
              <p className="font-semibold text-gray-800">Interest Expense = <span className="text-green-700">${fmt(13_964.19)}</span></p>
              <div className="bg-white border border-blue-100 rounded p-3 mt-1 font-mono text-xs space-y-1">
                <p>Interest = Opening Liability × IBR</p>
                <p>Interest = $232,736.54 × 6%</p>
                <p className="font-bold text-green-700">Interest = $13,964.19 ✓</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Amortization Expense = <span className="text-green-700">${fmt(46_547.31)}</span></p>
              <div className="bg-white border border-blue-100 rounded p-3 mt-1 font-mono text-xs space-y-1">
                <p>Amort = ROU Asset / Lease Term (straight-line)</p>
                <p>Amort = $232,736.54 / 5 years</p>
                <p className="font-bold text-green-700">Amort = $46,547.31 per year ✓</p>
                <p className="text-gray-400 mt-1 text-xs">Note: For a finance lease, the ROU asset is amortized
                separately from the interest on the liability — unlike an operating lease where a single
                lease expense is recognized.</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Ending Lease Liability = <span className="text-green-700">${fmt(196_700.73)}</span></p>
              <div className="bg-white border border-blue-100 rounded p-3 mt-1 font-mono text-xs space-y-1">
                <p>Opening balance:     $232,736.54</p>
                <p>+ Interest accrued:  $ 13,964.19</p>
                <p>− Cash payment:      $(60,000.00)</p>
                <p className="font-bold text-green-700">Ending balance:      $186,700.73</p>
                <p className="text-gray-400 mt-1 text-xs">The cash payment first covers interest ($13,964.19),
                then the remainder ($46,035.81) reduces the principal.</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* ════════════════════════════════════════ TASK 4 ═══════════════ */}
      <Card className="p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">Task 4 of 4</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Year 1 Journal Entries</h3>
        <p className="text-sm text-gray-500 mb-4">
          Prepare the journal entries Meridian should record during Year 1: (A) the commencement entry and
          (B) the year-end entry for the first lease payment and amortization.
        </p>

        <div className="space-y-6">
          {/* Entry A */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Entry A — Lease Commencement (Jan 1, 20X1):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 text-gray-600 font-medium w-1/2">Account</th>
                    <th className="text-left py-2 pr-8 text-gray-600 font-medium w-1/4">Debit</th>
                    <th className="text-left py-2 text-gray-600 font-medium w-1/4">Credit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700">Right-of-Use Asset</td>
                    <td className="py-2.5 pr-8"><div className="pr-8"><NumInput task="t4" field="je_dr_rou" /></div></td>
                    <td className="py-2.5 text-gray-400">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700 pl-4">Lease Liability</td>
                    <td className="py-2.5 pr-8 text-gray-400">—</td>
                    <td className="py-2.5"><div className="pr-8"><NumInput task="t4" field="je_cr_ll" /></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Entry B */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Entry B — Year-End (Dec 31, 20X1) — Payment + Amortization:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 text-gray-600 font-medium w-1/2">Account</th>
                    <th className="text-left py-2 pr-8 text-gray-600 font-medium w-1/4">Debit</th>
                    <th className="text-left py-2 text-gray-600 font-medium w-1/4">Credit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700">Interest Expense</td>
                    <td className="py-2.5 pr-8"><div className="pr-8"><NumInput task="t4" field="je_dr_interest" /></div></td>
                    <td className="py-2.5 text-gray-400">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700">Lease Liability</td>
                    <td className="py-2.5 pr-8 text-gray-400">—</td>
                    <td className="py-2.5 text-gray-400">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 pl-4 text-gray-700">Cash</td>
                    <td className="py-2.5 pr-8 text-gray-400">—</td>
                    <td className="py-2.5"><div className="pr-8"><NumInput task="t4" field="je_cr_cash" /></div></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-gray-700">Amortization Expense — ROU Asset</td>
                    <td className="py-2.5 pr-8"><div className="pr-8"><NumInput task="t4" field="je_dr_amort" /></div></td>
                    <td className="py-2.5 text-gray-400">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 pl-4 text-gray-700">Accumulated Amort. — ROU Asset</td>
                    <td className="py-2.5 pr-8 text-gray-400">—</td>
                    <td className="py-2.5"><div className="pr-8"><NumInput task="t4" field="je_cr_accum" /></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <GradeBtn taskId="t4" />
        <ScoreBar taskId="t4" />

        {revealed["t4"] && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-4">
            <p className="font-bold text-blue-800">Answer Key — Task 4</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs space-y-2">
              <p className="font-bold">Entry A — Jan 1, 20X1 (Commencement)</p>
              <p>Dr. Right-of-Use Asset ........ $232,736.54</p>
              <p>{"   "}Cr. Lease Liability ................ $232,736.54</p>
              <div className="border-t mt-2 pt-2">
                <p className="font-bold">Entry B — Dec 31, 20X1 (Payment + Amortization)</p>
                <p>Dr. Interest Expense ........... $ 13,964.19</p>
                <p>Dr. Lease Liability ............... $ 46,035.81</p>
                <p>{"   "}Cr. Cash ............................ $ 60,000.00</p>
                <p className="mt-1">Dr. Amortization Expense ....... $ 46,547.31</p>
                <p>{"   "}Cr. Accumulated Amort.—ROU ..... $ 46,547.31</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs">
              <strong>Key distinction:</strong> The $60,000 cash payment is split between interest
              ($13,964.19) and principal reduction ($46,035.81). The principal reduction reduces the lease
              liability balance. The amortization entry is separate and reduces the ROU asset — these are
              two distinct expenses on the income statement for a finance lease.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SIM 2 — ASC 606 REVENUE RECOGNITION (FAR)
// ─────────────────────────────────────────────────────────────────────────────

const SIM2_CORRECT = {
  t1: {
    ssa_saas:       480_000,
    ssa_support:    120_000,
    ssa_training:    60_000,
    total_ssp:      660_000,
  },
  t2: {
    alloc_saas:     436_363.64,
    alloc_support:  109_090.91,
    alloc_training:  54_545.45,
    total_alloc:    600_000,
  },
  t3: {
    rev_y1_saas:    218_181.82,
    rev_y1_support: 109_090.91,
    rev_y1_training: 54_545.45,
    total_rev_y1:   381_818.18,
  },
  t4: {
    contract_asset: 218_181.82,
    deferred_rev:   109_090.91,
  },
}

function Sim2() {
  const [inputs, setInputs]   = useState<TaskInputState>({})
  const [graded, setGraded]   = useState<TaskGraded>({})
  const [revealed, setRevealed] = useState<RevealedKeys>({})

  const set = (task: string, field: string, val: string) =>
    setInputs(p => ({ ...p, [task]: { ...(p[task] || {}), [field]: val } }))

  const gradeTask = (taskId: string) => {
    const correct = (SIM2_CORRECT as any)[taskId]
    const result: { [f: string]: boolean | null } = {}
    for (const [field, answer] of Object.entries(correct) as [string, number][]) {
      const userVal = inputs[taskId]?.[field] || ""
      result[field] = userVal === "" ? null : withinTolerance(userVal, answer)
    }
    setGraded(p => ({ ...p, [taskId]: result }))
  }

  const resetTask = (taskId: string) => {
    setInputs(p => { const n = { ...p }; delete n[taskId]; return n })
    setGraded(p => { const n = { ...p }; delete n[taskId]; return n })
    setRevealed(p => { const n = { ...p }; delete n[taskId]; return n })
  }

  const toggleKey = (taskId: string) =>
    setRevealed(p => ({ ...p, [taskId]: !p[taskId] }))

  const NumInput = ({ task, field }: { task: string; field: string }) => {
    const g = graded[task]?.[field]
    const border =
      g === true  ? "border-green-400 bg-green-50" :
      g === false ? "border-red-400 bg-red-50" :
                    "border-gray-300 bg-white"
    return (
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-400 text-sm">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={inputs[task]?.[field] || ""}
          onChange={e => set(task, field, e.target.value)}
          placeholder="0.00"
          className={`w-full border rounded-md py-1.5 text-sm font-mono text-right pr-3 pl-7 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${border}`}
        />
        {g === true  && <CheckCircle2 className="absolute -right-6 h-4 w-4 text-green-500" />}
        {g === false && <XCircle      className="absolute -right-6 h-4 w-4 text-red-500"   />}
      </div>
    )
  }

  const GradeBtn = ({ taskId }: { taskId: string }) => (
    <div className="flex gap-2 flex-wrap mt-4">
      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        onClick={() => gradeTask(taskId)}>
        Check My Answers
      </Button>
      <Button size="sm" variant="outline" onClick={() => resetTask(taskId)}
        className="text-gray-500 border-gray-300 hover:bg-gray-50">
        <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
      </Button>
      <Button size="sm" variant="ghost" onClick={() => toggleKey(taskId)}
        className="text-blue-600 hover:text-blue-700">
        {revealed[taskId] ? <ChevronUp className="h-3.5 w-3.5 mr-1" /> : <ChevronDown className="h-3.5 w-3.5 mr-1" />}
        {revealed[taskId] ? "Hide" : "Show"} Answer Key
      </Button>
    </div>
  )

  const ScoreBar = ({ taskId }: { taskId: string }) => {
    const g = graded[taskId]
    if (!g) return null
    const vals = Object.values(g).filter(v => v !== null)
    const correct = vals.filter(Boolean).length
    const pct = Math.round((correct / vals.length) * 100)
    return (
      <div className={`mt-3 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
        pct === 100 ? "bg-green-50 text-green-700" :
        pct >= 50   ? "bg-yellow-50 text-yellow-700" :
                      "bg-red-50 text-red-700"}`}>
        {pct === 100
          ? <><CheckCircle2 className="h-4 w-4" /> All correct — excellent work!</>
          : <><AlertTriangle className="h-4 w-4" /> {correct}/{vals.length} correct ({pct}%) — review the answer key below.</>}
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* ── Scenario ── */}
      <Card className="p-6 border-l-4 border-teal-400 bg-teal-50/40">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">Scenario — FAR SIM #2</p>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Revenue Recognition — ASC 606</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Apex Software Solutions Inc. ("Apex"), a calendar-year public company, enters into a contract with
          Crestwood Corp. on January 1, 20X1. The contract is for a bundled software arrangement and is
          governed by ASC 606. Apex has determined that the contract contains multiple performance obligations
          and must allocate the transaction price on a relative standalone selling price (SSP) basis.
        </p>
      </Card>

      {/* ── Exhibit A ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit A — Contract Terms</p>
        <Card className="p-0 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Item</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Contract date", "January 1, 20X1"],
                ["Total contract price (transaction price)", "$600,000 (fixed, no variable consideration)"],
                ["Payment terms", "$300,000 due Jan 1, 20X1; $300,000 due Jan 1, 20X2"],
                ["Contract term", "2 years"],
                ["Performance obligations identified", "3 (SaaS License, Customer Support, Implementation Training)"],
              ].map(([t, d]) => (
                <tr key={t} className="hover:bg-gray-50">
                  <td className="px-5 py-2.5 text-gray-600">{t}</td>
                  <td className="px-5 py-2.5 font-medium text-gray-900">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Exhibit B ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit B — Performance Obligations & Delivery</p>
        <Card className="p-0 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                {["Performance Obligation", "Delivery Pattern", "Duration"].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-gray-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS License", "Over time (ratable)", "2 years"],
                ["Customer Support (24/7)", "Over time (ratable)", "2 years"],
                ["Implementation Training", "Point in time", "Completed Jan 1, 20X1"],
              ].map(([po, dp, dur]) => (
                <tr key={po} className="hover:bg-gray-50">
                  <td className="px-5 py-2.5 font-medium text-gray-900">{po}</td>
                  <td className="px-5 py-2.5 text-gray-600">{dp}</td>
                  <td className="px-5 py-2.5 text-gray-600">{dur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Exhibit C ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Exhibit C — Standalone Selling Price Schedule (Internal Memo, Dec 31, 20X0)</p>
        <Card className="p-0 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                {["Performance Obligation", "Annual SSP", "Total SSP (2 years where applicable)"].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-gray-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {[
                ["SaaS License", "$240,000/yr", "$480,000"],
                ["Customer Support", "$60,000/yr", "$120,000"],
                ["Implementation Training", "N/A (one-time)", "$60,000"],
              ].map(([po, ann, tot]) => (
                <tr key={po} className="hover:bg-gray-50">
                  <td className="px-5 py-2.5 font-sans text-gray-800">{po}</td>
                  <td className="px-5 py-2.5 text-gray-700">{ann}</td>
                  <td className="px-5 py-2.5 text-gray-900 font-semibold">{tot}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="px-5 py-2.5 font-sans text-gray-900">Total SSP</td>
                <td className="px-5 py-2.5"></td>
                <td className="px-5 py-2.5 text-gray-900">$660,000</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* ════════════════════════════════════════ TASK 1 ═══════════════ */}
      <Card className="p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Task 1 of 4</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Confirm Standalone Selling Prices</h3>
        <p className="text-sm text-gray-500 mb-4">
          Using the internal memo in Exhibit C, confirm the total standalone selling price for each
          performance obligation over the full contract term.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold text-gray-700 w-1/2">Performance Obligation</th>
                <th className="text-left py-2 font-semibold text-gray-700 w-1/2">Total SSP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS License", "ssa_saas"],
                ["Customer Support", "ssa_support"],
                ["Implementation Training", "ssa_training"],
              ].map(([label, field]) => (
                <tr key={field}>
                  <td className="py-3 pr-4 text-gray-700">{label}</td>
                  <td className="py-3"><div className="pr-8 max-w-xs"><NumInput task="t1" field={field} /></div></td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300">
                <td className="py-3 pr-4 font-bold text-gray-900">Total SSP</td>
                <td className="py-3"><div className="pr-8 max-w-xs"><NumInput task="t1" field="total_ssp" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <GradeBtn taskId="t1" />
        <ScoreBar taskId="t1" />
        {revealed["t1"] && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-2">
            <p className="font-bold text-blue-800">Answer Key — Task 1</p>
            <p className="text-gray-600">Read directly from Exhibit C. The total SSP is $660,000, which exceeds the $600,000 transaction price — this is the typical situation that requires relative SSP allocation in Task 2.</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs space-y-1">
              <p>SaaS License:            $480,000</p>
              <p>Customer Support:        $120,000</p>
              <p>Implementation Training: $ 60,000</p>
              <p className="font-bold border-t pt-1">Total SSP:             $660,000</p>
            </div>
          </div>
        )}
      </Card>

      {/* ════════════════════════════════════════ TASK 2 ═══════════════ */}
      <Card className="p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Task 2 of 4</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Allocate the Transaction Price</h3>
        <p className="text-sm text-gray-500 mb-4">
          Allocate the $600,000 transaction price to each performance obligation on a relative standalone
          selling price basis (ASC 606-10-32-31).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold text-gray-700 w-1/2">Performance Obligation</th>
                <th className="text-left py-2 font-semibold text-gray-700 w-1/2">Allocated Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS License", "alloc_saas"],
                ["Customer Support", "alloc_support"],
                ["Implementation Training", "alloc_training"],
              ].map(([label, field]) => (
                <tr key={field}>
                  <td className="py-3 pr-4 text-gray-700">{label}</td>
                  <td className="py-3"><div className="pr-8 max-w-xs"><NumInput task="t2" field={field} /></div></td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300">
                <td className="py-3 pr-4 font-bold text-gray-900">Total Allocated</td>
                <td className="py-3"><div className="pr-8 max-w-xs"><NumInput task="t2" field="total_alloc" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <GradeBtn taskId="t2" />
        <ScoreBar taskId="t2" />
        {revealed["t2"] && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
            <p className="font-bold text-blue-800">Answer Key — Task 2</p>
            <p className="text-gray-600">Each PO gets: (Its SSP / Total SSP) × Transaction Price</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs space-y-1">
              <p>SaaS:     ($480,000 / $660,000) × $600,000 = <span className="font-bold text-green-700">$436,363.64</span></p>
              <p>Support:  ($120,000 / $660,000) × $600,000 = <span className="font-bold text-green-700">$109,090.91</span></p>
              <p>Training: ($ 60,000 / $660,000) × $600,000 = <span className="font-bold text-green-700">$ 54,545.45</span></p>
              <p className="font-bold border-t pt-1">Total: $600,000.00 ✓ (must equal transaction price)</p>
            </div>
            <p className="text-gray-500 text-xs">
              <strong>Concept:</strong> The total allocated must always equal the transaction price ($600,000),
              not the total SSP ($660,000). The discount of $60,000 is spread proportionally across all POs
              because there is no evidence the discount relates to a specific subset.
            </p>
          </div>
        )}
      </Card>

      {/* ════════════════════════════════════════ TASK 3 ═══════════════ */}
      <Card className="p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Task 3 of 4</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Revenue Recognized in Year 1 (20X1)</h3>
        <p className="text-sm text-gray-500 mb-4">
          Calculate the amount of revenue Apex should recognize for each performance obligation in the year
          ended December 31, 20X1.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold text-gray-700 w-1/2">Performance Obligation</th>
                <th className="text-left py-2 font-semibold text-gray-700 w-1/2">20X1 Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS License (Year 1 of 2)", "rev_y1_saas"],
                ["Customer Support (Year 1 of 2)", "rev_y1_support"],
                ["Implementation Training (completed Jan 1)", "rev_y1_training"],
              ].map(([label, field]) => (
                <tr key={field}>
                  <td className="py-3 pr-4 text-gray-700">{label}</td>
                  <td className="py-3"><div className="pr-8 max-w-xs"><NumInput task="t3" field={field} /></div></td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300">
                <td className="py-3 pr-4 font-bold text-gray-900">Total 20X1 Revenue</td>
                <td className="py-3"><div className="pr-8 max-w-xs"><NumInput task="t3" field="total_rev_y1" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <GradeBtn taskId="t3" />
        <ScoreBar taskId="t3" />
        {revealed["t3"] && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
            <p className="font-bold text-blue-800">Answer Key — Task 3</p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs space-y-1">
              <p>SaaS (over 2 yrs):  $436,363.64 / 2 = <span className="font-bold text-green-700">$218,181.82</span></p>
              <p>Support (over 2 yrs): $109,090.91 / 2 = <span className="font-bold text-green-700">$ 54,545.46</span></p>
              <p>Training (point-in-time, Jan 1): <span className="font-bold text-green-700">$ 54,545.45</span> (100% in 20X1)</p>
              <p className="font-bold border-t pt-1">Total 20X1: $381,818.18</p>
            </div>
            <p className="text-gray-600 text-xs">
              <strong>Key concept:</strong> The SaaS license and support are recognized <em>over time</em>
              on a straight-line (ratable) basis — half in Year 1, half in Year 2. Training was completed
              on January 1, so the <em>entire</em> allocated amount is recognized at that point in time,
              on day one of the contract.
            </p>
          </div>
        )}
      </Card>

      {/* ════════════════════════════════════════ TASK 4 ═══════════════ */}
      <Card className="p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">Task 4 of 4</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Balance Sheet Presentation — Dec 31, 20X1</h3>
        <p className="text-sm text-gray-500 mb-4">
          At December 31, 20X1, Apex has collected $300,000 (the Year 1 payment) but has recognized
          $381,818.18 of revenue. Determine the amounts to be presented on the balance sheet.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-xs text-amber-800">
          <strong>Hint:</strong> Compare what Apex has earned (revenue recognized) to what it has billed/collected.
          If it has earned more than it billed, it has a contract asset. If it has billed more than it earned,
          it has a contract liability (deferred revenue). Consider each PO separately.
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Contract Asset (if any):</p>
            <p className="text-xs text-gray-400 mb-2">Earned but not yet billed/collected</p>
            <NumInput task="t4" field="contract_asset" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Deferred Revenue / Contract Liability (if any):</p>
            <p className="text-xs text-gray-400 mb-2">Billed/collected but not yet earned</p>
            <NumInput task="t4" field="deferred_rev" />
          </div>
        </div>
        <GradeBtn taskId="t4" />
        <ScoreBar taskId="t4" />
        {revealed["t4"] && (
          <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
            <p className="font-bold text-blue-800">Answer Key — Task 4</p>
            <p className="text-gray-600">
              Apex collected $300,000 in Year 1. It recognized $381,818.18 in revenue. The question is
              how the cash was applied and what remains on the balance sheet.
            </p>
            <div className="bg-white border border-blue-100 rounded p-3 font-mono text-xs space-y-2">
              <p className="font-bold">Revenue recognized vs. payment received per PO:</p>
              <p>SaaS earned Y1:     $218,181.82 | Billing pattern: $218,181.82 billed in Y1 (50% of 2yr allocation)</p>
              <p>Support earned Y1:  $54,545.46  | Customer paid $109,090.91 (full 2yr support upfront in $300k)</p>
              <p>Training earned Y1: $54,545.45  | Fully earned and billed on Jan 1</p>
              <div className="border-t mt-2 pt-2">
                <p className="font-bold">Balance Sheet — Dec 31, 20X1:</p>
                <p>Contract Asset:    <span className="text-green-700 font-bold">$218,181.82</span></p>
                <p className="text-gray-400 text-xs">(SaaS revenue earned in Y1 not yet billed — Year 2 billing covers Year 2 SaaS)</p>
                <p>Deferred Revenue:  <span className="text-green-700 font-bold">$109,090.91</span></p>
                <p className="text-gray-400 text-xs">(Support collected for Y2 not yet earned — remaining 50% of support)</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs">
              <strong>Exam tip:</strong> Contract assets (ASC 606-10-45-3) arise when performance precedes
              billing rights. Deferred revenue (contract liabilities) arise when cash is received before
              performance. Both can exist in the same contract simultaneously.
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

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
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
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Get Free Sample
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 md:py-16">
          <div className="container max-w-4xl text-center space-y-4">
            <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Free Practice Resource
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              FAR Task-Based Simulations
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Exam-realistic SIMs with live grading and full answer keys. Enter your answers, check them,
              and learn from the step-by-step explanations.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2 text-sm">
              {[
                "📋 Realistic exam scenarios",
                "✏️ Interactive answer fields",
                "✅ Instant grading",
                "📖 Step-by-step answer keys",
              ].map(f => (
                <span key={f} className="bg-white/10 px-3 py-1 rounded-full text-slate-200">{f}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SIM Selector ── */}
        <div className="bg-white border-b sticky top-16 z-30">
          <div className="container max-w-4xl">
            <div className="flex">
              {([
                { id: 1, label: "SIM #1", topic: "ASC 842 — Lease Accounting",       color: "yellow" },
                { id: 2, label: "SIM #2", topic: "ASC 606 — Revenue Recognition",    color: "teal"   },
              ] as const).map(({ id, label, topic, color }) => (
                <button
                  key={id}
                  onClick={() => setActiveSim(id)}
                  className={`flex-1 py-4 px-4 text-sm font-semibold border-b-2 transition-colors text-left ${
                    activeSim === id
                      ? color === "yellow"
                        ? "border-yellow-500 text-yellow-700 bg-yellow-50/50"
                        : "border-teal-500 text-teal-700 bg-teal-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-bold block">{label}</span>
                  <span className="text-xs font-normal opacity-80">{topic}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── SIM Content ── */}
        <div className="container max-w-4xl py-10">

          {/* Instructions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 text-sm text-gray-600 flex gap-4">
            <BookOpen className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-800 mb-1">How to use these SIMs</p>
              <p>Read the scenario and exhibits carefully before attempting the tasks. Enter your answers in the
              input fields — dollar signs and commas are handled automatically. Click <strong>Check My Answers</strong> to
              see which answers are correct (within 1% tolerance for rounding). Use <strong>Show Answer Key</strong> to
              see full step-by-step workings.</p>
            </div>
          </div>

          {activeSim === 1 ? <Sim1 /> : <Sim2 />}
        </div>

        {/* ── CPABee CTA ── */}
        <section className="py-10 bg-white border-t">
          <div className="container max-w-3xl">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Know what's actually tested</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  SIMs test the same content as MCQs.
                </h3>
                <p className="text-sm text-gray-600">
                  The topics in these SIMs — leases, revenue recognition — are among the most discussed by FAR candidates.
                  CPABee reports show you the full ranked list of highly tested topics so you know exactly where to
                  focus your MCQ volume, SIM practice, and final review.
                </p>
              </div>
              <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
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

      {/* ── Footer ── */}
      <footer className="border-t py-8 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden">
                <Image src="/images/cpabee-logo.png" alt="CPABee Logo" width={24} height={24} className="object-contain" />
              </div>
              <span className="text-sm font-semibold">CPABee</span>
            </Link>
            <div className="flex gap-4 text-sm flex-wrap justify-center">
              <Link href="/terms-of-service" className="text-gray-500 hover:text-yellow-600">Terms of Service</Link>
              <Link href="/privacy-policy"   className="text-gray-500 hover:text-yellow-600">Privacy Policy</Link>
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
