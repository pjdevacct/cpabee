"use client"

import React, { useState, useMemo } from "react"
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
  RotateCcw,
  Trophy,
  Filter,
  Shuffle,
} from "lucide-react"
import { ALL_QUESTIONS, type MCQ, type Section } from "./mcq-data"

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION CARD — defined at module level to prevent focus-loss bug
// ─────────────────────────────────────────────────────────────────────────────

interface QuestionCardProps {
  q: MCQ
  index: number
  selected: string | null
  revealed: boolean
  onSelect: (key: string) => void
  onReveal: () => void
  onReset: () => void
}

function QuestionCard({ q, index, selected, revealed, onSelect, onReveal, onReset }: QuestionCardProps) {
  const isCorrect  = selected === q.correct
  const hasAnswered = selected !== null
  const diffColor  = q.difficulty === "Hard" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"

  return (
    <Card className="p-4 md:p-6 shadow-md">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Q{index + 1}</span>
        <span className="text-gray-300">·</span>
        <span className="text-xs font-semibold text-gray-500">{q.topic}</span>
        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${diffColor}`}>{q.difficulty}</span>
      </div>

      {/* Stem */}
      <p className="text-sm text-gray-800 leading-relaxed mb-5 whitespace-pre-line">{q.stem}</p>

      {/* Choices */}
      <div className="space-y-2.5 mb-5">
        {q.choices.map(choice => {
          const isSel = selected === choice.key
          const isRight = choice.key === q.correct
          let style = "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
          if (revealed) {
            if (isRight)       style = "bg-green-50 border-green-400 cursor-default"
            else if (isSel)    style = "bg-red-50 border-red-400 cursor-default"
            else               style = "bg-white border-gray-100 opacity-50 cursor-default"
          } else if (isSel) {
            style = "bg-yellow-50 border-yellow-400 cursor-pointer"
          }
          return (
            <button key={choice.key} onClick={() => !revealed && onSelect(choice.key)} disabled={revealed}
              className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border text-sm transition-colors ${style}`}>
              <span className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                revealed && isRight ? "bg-green-500 text-white" :
                revealed && isSel   ? "bg-red-500 text-white"   :
                isSel               ? "bg-yellow-500 text-white" :
                                      "bg-gray-100 text-gray-600"}`}>
                {choice.key}
              </span>
              <span className={`flex-1 leading-relaxed ${revealed && isRight ? "font-semibold text-green-800" : "text-gray-700"}`}>
                {choice.text}
              </span>
              {revealed && isRight && <CheckCircle2 className="shrink-0 h-4 w-4 text-green-500 mt-0.5" />}
              {revealed && isSel && !isRight && <XCircle className="shrink-0 h-4 w-4 text-red-500 mt-0.5" />}
            </button>
          )
        })}
      </div>

      {/* Feedback banner */}
      {hasAnswered && !revealed && (
        <div className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 mb-4 ${
          isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {isCorrect
            ? <><CheckCircle2 className="h-4 w-4 shrink-0" />Correct! Click Show Explanation for the full reasoning.</>
            : <><XCircle className="h-4 w-4 shrink-0" />Incorrect — click Show Explanation to see where it went wrong.</>}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 flex-wrap">
        {hasAnswered && (
          <Button size="sm" variant="ghost" onClick={onReveal} className="text-blue-600 hover:text-blue-700">
            {revealed ? <><ChevronUp className="h-3.5 w-3.5 mr-1" />Hide Explanation</> : <><ChevronDown className="h-3.5 w-3.5 mr-1" />Show Explanation</>}
          </Button>
        )}
        {(hasAnswered || revealed) && (
          <Button size="sm" variant="outline" onClick={onReset} className="text-gray-500 border-gray-300 hover:bg-gray-50">
            <RotateCcw className="h-3.5 w-3.5 mr-1" />Reset
          </Button>
        )}
        {!hasAnswered && <p className="text-xs text-gray-400 self-center">Select an answer above</p>}
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="mt-4 p-4 md:p-5 bg-blue-50 border border-blue-200 rounded-lg space-y-4">
          <p className="font-bold text-blue-800 text-sm">Step-by-Step Explanation</p>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed text-xs md:text-sm">{q.explanation}</p>
          <div className="space-y-2 border-t border-blue-200 pt-3">
            <p className="font-semibold text-gray-600 text-xs uppercase tracking-wide">Why the other choices are wrong:</p>
            {q.whyWrong.map(w => (
              <div key={w.key} className="flex gap-2 text-xs text-gray-600">
                <span className="shrink-0 h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">{w.key}</span>
                <p className="leading-relaxed">{w.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCORE SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

function ScoreSummary({ questions, answers }: { questions: MCQ[]; answers: Record<string, string | null> }) {
  const answered = questions.filter(q => answers[q.id] != null)
  const correct  = answered.filter(q => answers[q.id] === q.correct)
  const pct      = answered.length ? Math.round((correct.length / answered.length) * 100) : 0
  if (answered.length === 0) return null
  const color = pct === 100 ? "green" : pct >= 60 ? "yellow" : "red"
  return (
    <div className={`rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border ${
      color === "green" ? "bg-green-50 border-green-200" : color === "yellow" ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"}`}>
      <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
        color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : "bg-red-500"}`}>
        <Trophy className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-gray-900">{correct.length} / {answered.length} correct ({pct}%)</p>
        <p className="text-sm text-gray-600 mt-0.5">
          {pct === 100 ? "Perfect! Outstanding command of this material." :
           pct >= 80   ? "Great work — review explanations for any misses." :
           pct >= 60   ? "Solid foundation — focus on the explanations for incorrect answers." :
                         "Keep at it — read each explanation carefully and retry."}
        </p>
      </div>
      {answered.length < questions.length && (
        <p className="text-xs text-gray-400 shrink-0">{questions.length - answered.length} remaining</p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const SECTIONS: { id: Section; label: string; full: string; accent: string }[] = [
  { id: "FAR", label: "FAR", full: "Financial Accounting & Reporting", accent: "border-yellow-500 text-yellow-700 bg-yellow-50/60" },
  { id: "AUD", label: "AUD", full: "Auditing & Attestation",           accent: "border-blue-500 text-blue-700 bg-blue-50/60"     },
  { id: "REG", label: "REG", full: "Taxation & Regulation",            accent: "border-teal-500 text-teal-700 bg-teal-50/60"     },
]

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function PracticeMCQPage() {
  const [activeSection, setActiveSection] = useState<Section>("FAR")
  const [topicFilter,   setTopicFilter]   = useState("All Topics")
  const [diffFilter,    setDiffFilter]    = useState("All Levels")
  const [showFilters,   setShowFilters]   = useState(false)
  const [shuffled,      setShuffled]      = useState(false)
  const [shuffleOrder,  setShuffleOrder]  = useState<string[]>([])
  const [answers,  setAnswers]  = useState<Record<Section, Record<string, string | null>>>({ FAR: {}, AUD: {}, REG: {} })
  const [revealed, setRevealed] = useState<Record<Section, Record<string, boolean>>>({ FAR: {}, AUD: {}, REG: {} })

  const allSectionQs   = ALL_QUESTIONS[activeSection]
  const sectionAnswers = answers[activeSection]
  const sectionReveal  = revealed[activeSection]

  const topics = useMemo(() => {
    const groups = allSectionQs.map(q => q.topic.split(" — ")[0])
    return ["All Topics", ...Array.from(new Set(groups)).sort()]
  }, [allSectionQs])

  const filteredQs = useMemo(() => {
    let qs = allSectionQs
    if (topicFilter !== "All Topics") qs = qs.filter(q => q.topic.startsWith(topicFilter))
    if (diffFilter  !== "All Levels") qs = qs.filter(q => q.difficulty === diffFilter)
    if (shuffled && shuffleOrder.length) {
      const rank: Record<string, number> = {}
      shuffleOrder.forEach((id, i) => { rank[id] = i })
      qs = [...qs].sort((a, b) => (rank[a.id] ?? 999) - (rank[b.id] ?? 999))
    }
    return qs
  }, [allSectionQs, topicFilter, diffFilter, shuffled, shuffleOrder])

  const handleSelect = (qId: string, key: string) =>
    setAnswers(p => ({ ...p, [activeSection]: { ...p[activeSection], [qId]: key } }))

  const handleReveal = (qId: string) =>
    setRevealed(p => ({ ...p, [activeSection]: { ...p[activeSection], [qId]: !p[activeSection][qId] } }))

  const handleReset = (qId: string) => {
    setAnswers(p  => { const s = { ...p[activeSection]  }; delete s[qId]; return { ...p,  [activeSection]: s } })
    setRevealed(p => { const s = { ...p[activeSection]  }; delete s[qId]; return { ...p,  [activeSection]: s } })
  }

  const handleResetAll = () => {
    setAnswers(p  => ({ ...p,  [activeSection]: {} }))
    setRevealed(p => ({ ...p,  [activeSection]: {} }))
  }

  const handleShuffle = () => {
    setShuffleOrder(shuffleArray(allSectionQs.map(q => q.id)))
    setShuffled(true)
    handleResetAll()
  }

  const handleSectionChange = (s: Section) => {
    setActiveSection(s)
    setTopicFilter("All Topics")
    setDiffFilter("All Levels")
    setShuffled(false)
    setShuffleOrder([])
  }

  const answeredCount = filteredQs.filter(q => sectionAnswers[q.id] != null).length
  const correctCount  = filteredQs.filter(q => sectionAnswers[q.id] === q.correct).length
  const activeInfo    = SECTIONS.find(s => s.id === activeSection)!
  const hasFilter     = topicFilter !== "All Topics" || diffFilter !== "All Levels"

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
  <Link href="/#features" className="text-sm font-medium hover:text-yellow-600 transition-colors">
    Reports
  </Link>
  <Link href="/#trending" className="text-sm font-medium hover:text-yellow-600 transition-colors">
    Trending Topics
  </Link>
  <Link href="/#why" className="text-sm font-medium hover:text-yellow-600 transition-colors">
    Why CPABee
  </Link>
  <Link href="/#pricing" className="text-sm font-medium hover:text-yellow-600 transition-colors">
    Pricing
  </Link>
  <Link href="/study-plan" className="text-sm font-medium hover:text-yellow-600 transition-colors">
    Study Plan
  </Link>
  <Link href="/practice-mcq" className="text-sm font-medium hover:text-yellow-600 transition-colors">
    Practice MCQs
  </Link>
  <Link href="/practice-sims" className="text-sm font-medium hover:text-yellow-600 transition-colors">
    Practice SIMs
  </Link>
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
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-10 md:py-14">
          <div className="container max-w-4xl text-center space-y-4 px-4">
            <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Free Practice Resource
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">CPA Exam Practice MCQs</h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
              Exam-style questions for FAR, AUD, and REG — with instant feedback and full step-by-step explanations.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-1">
              {[
                `📝 ${ALL_QUESTIONS.FAR.length} FAR questions`,
                `📝 ${ALL_QUESTIONS.AUD.length} AUD questions`,
                `📝 ${ALL_QUESTIONS.REG.length} REG questions`,
                "✅ Instant feedback",
                "📖 Full explanations",
                "🔀 Shuffle mode",
                "🎯 Topic filters",
              ].map(f => (
                <span key={f} className="bg-white/10 px-3 py-1 rounded-full text-slate-200 text-xs md:text-sm">{f}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Section Tabs */}
        <div className="bg-white border-b sticky top-16 z-30">
          <div className="container max-w-4xl px-0">
            <div className="flex">
              {SECTIONS.map(({ id, label, full, accent }) => (
                <button key={id} onClick={() => handleSectionChange(id)}
                  className={`flex-1 py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold border-b-2 transition-colors text-left ${
                    activeSection === id ? accent : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
                  <span className="font-bold block">{label}</span>
                  <span className="text-xs font-normal opacity-75 hidden sm:block">{full}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container max-w-4xl py-6 md:py-8 px-4 md:px-6">

          {/* Instructions */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 mb-5 flex gap-3">
            <BookOpen className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-800 mb-0.5 text-sm">How to use these questions</p>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Select an answer for each question for instant correct/incorrect feedback. Click <strong>Show Explanation</strong> to see the full step-by-step reasoning and why each wrong answer fails. Filter by topic or difficulty, or shuffle for a randomized practice session.
              </p>
            </div>
          </div>

          {/* Filter + Shuffle Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <button onClick={() => setShowFilters(f => !f)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasFilter && <span className="ml-1 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">●</span>}
                  {showFilters ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
                <span className="text-xs text-gray-400">
                  {filteredQs.length} of {allSectionQs.length} questions
                  {answeredCount > 0 && ` · ${correctCount}/${answeredCount} correct`}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {shuffled
                  ? <Button size="sm" variant="outline" onClick={() => { setShuffled(false); setShuffleOrder([]) }}
                      className="text-xs border-gray-300 text-gray-600">
                      <RotateCcw className="h-3.5 w-3.5 mr-1" />Original Order
                    </Button>
                  : <Button size="sm" variant="outline" onClick={handleShuffle}
                      className="text-xs border-gray-300 text-gray-600">
                      <Shuffle className="h-3.5 w-3.5 mr-1" />Shuffle
                    </Button>
                }
                <Button size="sm" variant="outline" onClick={handleResetAll}
                  className="text-xs border-gray-300 text-gray-500">
                  <RotateCcw className="h-3.5 w-3.5 mr-1" />Reset All
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[180px]">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Topic Area</label>
                  <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[140px]">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Difficulty</label>
                  <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option>All Levels</option>
                    <option>Moderate</option>
                    <option>Hard</option>
                  </select>
                </div>
                {hasFilter && (
                  <div className="flex items-end">
                    <Button size="sm" variant="ghost" onClick={() => { setTopicFilter("All Topics"); setDiffFilter("All Levels") }}
                      className="text-xs text-gray-500">Clear filters</Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Score summary (top) */}
          {answeredCount > 0 && (
            <div className="mb-5">
              <ScoreSummary questions={filteredQs} answers={sectionAnswers} />
            </div>
          )}

          {/* Section label row */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">
              {activeInfo.full}
              <span className="ml-2 text-sm font-normal text-gray-500">
                — {filteredQs.length} Question{filteredQs.length !== 1 ? "s" : ""}
              </span>
              {shuffled && (
                <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">Shuffled</span>
              )}
            </h2>
          </div>

          {/* Empty state */}
          {filteredQs.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Filter className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p className="font-semibold">No questions match these filters.</p>
              <p className="text-sm mt-1">Try adjusting the topic or difficulty filter.</p>
              <Button size="sm" variant="outline" className="mt-4"
                onClick={() => { setTopicFilter("All Topics"); setDiffFilter("All Levels") }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Question list */}
          <div className="space-y-6">
            {filteredQs.map((q, i) => (
              <QuestionCard
                key={q.id}
                q={q}
                index={i}
                selected={sectionAnswers[q.id] ?? null}
                revealed={!!sectionReveal[q.id]}
                onSelect={key => handleSelect(q.id, key)}
                onReveal={() => handleReveal(q.id)}
                onReset={() => handleReset(q.id)}
              />
            ))}
          </div>

          {/* Score summary (bottom — shows after several answered) */}
          {answeredCount >= 5 && (
            <div className="mt-8">
              <ScoreSummary questions={filteredQs} answers={sectionAnswers} />
            </div>
          )}
        </div>

        {/* CTA */}
        <section className="py-8 md:py-10 bg-white border-t">
          <div className="container max-w-3xl px-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Study smarter</p>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Know which topics are buzzing right now.</h3>
                <p className="text-sm text-gray-600">
                  These MCQs cover high-yield areas — but knowing which specific topics are generating the most
                  candidate discussion this testing window gives you a real edge. CPABee reports show you exactly
                  where to focus your practice volume.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
                <Link href="/#pricing">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full md:w-auto whitespace-nowrap">
                    Get a Report <ArrowRight className="ml-2 h-4 w-4" />
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
              <Link href="/practice-mcq"     className="text-gray-500 hover:text-yellow-600">Practice MCQs</Link>
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
