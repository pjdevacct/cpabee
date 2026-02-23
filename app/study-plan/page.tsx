import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BookOpen,
  PenLine,
  BarChart2,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Moon,
  Apple,
  Flame,
  ArrowRight,
} from "lucide-react"

// ── Phase data ──────────────────────────────────────────────────────────────

const fullArcPhases = [
  {
    label: "Phase 1",
    title: "Read & Build Your Notes",
    icon: BookOpen,
    color: "yellow",
    description:
      "This is your foundation phase. Go through your review materials chapter by chapter. The goal is not to memorize — it's to understand and capture.",
    bullets: [
      "Read actively, not passively. Slow down when something is unclear.",
      "Take organized, structured notes as you go. These will be your most important resource later.",
      "Highlight concepts you don't fully grasp — flag them for extra attention.",
      "Don't skip sections, but know that not all topics are tested equally. Use your CPABee report to understand which areas deserve the deepest focus.",
      "Keep your notes in a single, organized document or notebook you can return to easily.",
    ],
    callout: {
      type: "tip",
      text: "Your notes are your lifeline. Candidates who take thorough, organized notes during Phase 1 dramatically outperform those who rely on re-reading the book later.",
    },
  },
  {
    label: "Phase 2",
    title: "Multiple Choice Repetition",
    icon: BarChart2,
    color: "yellow",
    description:
      "This is the most important phase of your preparation. Multiple choice questions (MCQs) are the core of the CPA exam, and volume and repetition are the key to mastering them.",
    bullets: [
      "Do as many MCQs as possible — this phase should dominate your study time.",
      "Focus your heaviest MCQ volume on the highest-tested topics. Refer to your CPABee report consistently.",
      "When you get a question wrong, don't just note the answer — understand why.",
      "Return to your notes often. When a topic surfaces in questions, review your notes on it immediately.",
      "Track your performance by topic. Weak areas that are also highly tested need the most attention.",
      "Use timed practice sessions to simulate exam conditions.",
    ],
    callout: {
      type: "tip",
      text: "The candidates who pass are almost always the candidates who did the most MCQs — and who did them intentionally, not just to check a box. Quality reps beat passive volume.",
    },
  },
  {
    label: "Phase 3",
    title: "SIMs — About One Week Out",
    icon: PenLine,
    color: "amber",
    description:
      "Task-Based Simulations (SIMs) should receive focused attention for roughly one to two days, approximately one week before your exam. No more than that.",
    bullets: [
      "Do not spend excessive time on SIMs. Two days of focused SIM practice is sufficient for most candidates.",
      "The goal is not to master every possible SIM — it's to understand how SIMs are framed and what they're asking.",
      "Practice recognizing the format: what data is given, what's being asked, and how to navigate the interface.",
      "Focus SIM practice on the highest-tested topics in your section. Your CPABee report shows you which topics are most likely to appear.",
      "After SIM practice, return your focus to MCQs. Do not let SIMs dominate your final week.",
    ],
    callout: {
      type: "warning",
      text: "A common mistake: spending too much time on SIMs at the expense of MCQ volume. SIMs test the same content as MCQs — strong MCQ preparation translates directly to SIM performance.",
    },
  },
]

const finalCountdown = [
  {
    day: "10 Days Out",
    icon: Flame,
    color: "yellow",
    focus: "High-Intensity MCQ Sprint",
    description:
      "Shift into high gear. This is your most productive window before the exam. Volume and focus matter enormously right now.",
    actions: [
      "Push your MCQ volume as high as sustainably possible.",
      "Prioritize the highest-tested topics from your CPABee report above everything else.",
      "Review your notes on any topic where your MCQ accuracy is still weak.",
      "Minimize new content — reinforce what you know rather than introducing unfamiliar material.",
    ],
  },
  {
    day: "7 Days Out",
    icon: BarChart2,
    color: "yellow",
    focus: "SIM Familiarization (1–2 Days Max)",
    description:
      "Spend one to two days on SIM practice. Understand the format and question framing. Then return to MCQs.",
    actions: [
      "Work through SIMs in your highest-tested topic areas.",
      "Focus on understanding how SIMs are structured, not on memorizing every possible variation.",
      "After SIM practice, return immediately to MCQs for the remainder of the week.",
      "Do not let SIM anxiety pull you away from your MCQ foundation.",
    ],
  },
  {
    day: "3 Days Out",
    icon: Brain,
    color: "orange",
    focus: "Highly Tested Topics Only",
    description:
      "Narrow your focus completely. Only study the topics your CPABee report identifies as most highly tested. This is not the time to cover everything — it's the time to be ruthless about prioritization.",
    actions: [
      "Pull up your CPABee report and identify the top-ranked topics for your section.",
      "Do MCQs exclusively in those areas.",
      "Review your notes on those topics.",
      "Let lower-priority topics go. Trust the preparation you've done.",
    ],
    highlight: true,
  },
  {
    day: "1–2 Days Out",
    icon: BookOpen,
    color: "blue",
    focus: "Notes Review Only",
    description:
      "Put down the question banks. Your job now is to review and reinforce — not to learn anything new.",
    actions: [
      "Read through your organized notes carefully.",
      "Focus especially on the topics you've flagged as weak or highly tested.",
      "Do not attempt large MCQ sets — light review only if you need to feel active.",
      "Start protecting your sleep and mental energy.",
    ],
  },
  {
    day: "Exam Day",
    icon: Moon,
    color: "teal",
    focus: "Rest, Fuel, and Execute",
    description:
      "Do not study today. You have done the work. Your job today is to show up in the best possible physical and mental state.",
    actions: [
      "Do not open your review materials or question bank.",
      "If you absolutely must review something, limit it to a single page of notes or a handful of flashcards — nothing more.",
      "Eat a real meal. Stay hydrated.",
      "Get enough sleep the night before — this is more valuable than any last-minute studying.",
      "Arrive early. Give yourself time to settle before the exam begins.",
    ],
    callout: {
      type: "rest",
      text: "Sleep and nutrition directly affect cognitive performance. A well-rested candidate who studied well will outperform an exhausted candidate who crammed the night before. Don't undo weeks of preparation in the final 12 hours.",
    },
  },
]

// ── Color helpers ────────────────────────────────────────────────────────────

const iconBg: Record<string, string> = {
  yellow: "bg-yellow-100",
  amber:  "bg-amber-100",
  orange: "bg-orange-100",
  blue:   "bg-blue-100",
  teal:   "bg-teal-100",
}
const iconColor: Record<string, string> = {
  yellow: "text-yellow-600",
  amber:  "text-amber-600",
  orange: "text-orange-600",
  blue:   "text-blue-600",
  teal:   "text-teal-600",
}
const borderColor: Record<string, string> = {
  yellow: "border-yellow-200",
  amber:  "border-amber-200",
  orange: "border-orange-300",
  blue:   "border-blue-200",
  teal:   "border-teal-200",
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StudyPlanPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <Image src="/images/cpabee-logo.png" alt="CPABee Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight">CPABee</span>
          </Link>
           <nav className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
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
</nav>          <Link href="/#pricing">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Get Free Sample
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-yellow-50 to-white border-b py-14 md:py-20">
          <div className="container max-w-3xl text-center space-y-5">
            <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Free Resource
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
              CPA Exam Study Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A straightforward framework for how to structure your preparation — from first chapter to exam morning.
              Built around one principle: focus on what's actually tested.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a href="#full-arc">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  See the Full Plan
                </Button>
              </a>
              <a href="#final-countdown">
                <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-medium">
                  Jump to Final 10 Days
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ── Key Principles ── */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">The Core Principles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: BarChart2,
                  title: "MCQs are everything",
                  body: "Multiple choice questions are the backbone of the CPA exam. The candidates who pass are almost always the ones who did the most questions — intentionally.",
                },
                {
                  icon: Brain,
                  title: "Focus on highly tested topics",
                  body: "Not all content is weighted equally. Knowing which topics show up most is the single biggest lever you can pull. That's exactly what CPABee reports give you.",
                },
                {
                  icon: BookOpen,
                  title: "Your notes are your anchor",
                  body: "Build organized notes from the start and return to them constantly. On exam week, your notes — not the textbook — are what you review.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <Card key={title} className="p-5 flex flex-col items-center text-center gap-3 shadow-sm">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-500">{body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Full Study Arc ── */}
        <section id="full-arc" className="py-12 md:py-20 bg-gray-50">
          <div className="container max-w-4xl space-y-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-900">The Full Study Arc</h2>
              <p className="text-gray-500 mt-2 max-w-xl mx-auto">
                Three phases that cover your preparation from Day 1 through the week before your exam.
              </p>
            </div>

            {fullArcPhases.map(({ label, title, icon: Icon, color, description, bullets, callout }) => (
              <Card key={label} className={`p-6 md:p-8 shadow-md border-l-4 ${borderColor[color]}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`h-10 w-10 rounded-full ${iconBg[color]} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${iconColor[color]}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{description}</p>

                <ul className="space-y-2 mb-4">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className={`h-4 w-4 ${iconColor[color]} mt-0.5 shrink-0`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {callout && (
                  <div className={`rounded-lg p-4 mt-2 flex gap-3 ${
                    callout.type === "warning"
                      ? "bg-orange-50 border border-orange-200"
                      : "bg-yellow-50 border border-yellow-200"
                  }`}>
                    <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${
                      callout.type === "warning" ? "text-orange-500" : "text-yellow-600"
                    }`} />
                    <p className="text-sm text-gray-700">{callout.text}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* ── CPABee Callout ── */}
        <section className="py-10 bg-white border-y">
          <div className="container max-w-3xl">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">Why it matters</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Know which topics are most highly tested before you start.
                </h3>
                <p className="text-sm text-gray-600">
                  Every study plan is only as good as your ability to prioritize. CPABee reports tell you exactly which
                  topics are generating the most discussion among active CPA candidates — so you know where to focus your
                  heaviest MCQ volume, your SIM practice, and your final-week review.
                </p>
              </div>
              <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
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

        {/* ── Final Countdown ── */}
        <section id="final-countdown" className="py-12 md:py-20 bg-gray-50">
          <div className="container max-w-4xl space-y-6">
            <div className="text-center mb-10">
              <div className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                Final Countdown
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-gray-900">The Last 10 Days</h2>
              <p className="text-gray-500 mt-2 max-w-xl mx-auto">
                What you do in the final stretch matters enormously. Here's exactly how to use each day.
              </p>
            </div>

            {finalCountdown.map(({ day, icon: Icon, color, focus, description, actions, callout, highlight }) => (
              <Card
                key={day}
                className={`p-6 md:p-8 shadow-md border-l-4 ${borderColor[color]} ${
                  highlight ? "ring-2 ring-orange-300 ring-offset-2" : ""
                }`}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className={`h-10 w-10 rounded-full ${iconBg[color]} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${iconColor[color]}`} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${iconColor[color]}`}>{day}</p>
                    <h3 className="text-xl font-bold text-gray-900">{focus}</h3>
                  </div>
                  {highlight && (
                    <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full shrink-0">
                      High Priority
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 text-sm">{description}</p>

                <ul className="space-y-2 mb-2">
                  {actions.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className={`h-4 w-4 ${iconColor[color]} mt-0.5 shrink-0`} />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                {callout && (
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-3 flex gap-3">
                    <Apple className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{callout.text}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-12 md:py-16 bg-yellow-50 border-t">
          <div className="container max-w-2xl text-center space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-gray-900">
              A great study plan needs great intel.
            </h2>
            <p className="text-gray-600">
              Knowing <em>how</em> to study is only half the equation. Knowing <em>what</em> to prioritize is the other half.
              CPABee reports tell you which topics are generating the most candidate discussion — so every hour of your
              study plan is pointed at what actually matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/#pricing">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Get a Report — Starting at $19
                </Button>
              </Link>
              <Link href="/#pricing">
                <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-50">
                  Get Free Sample First
                </Button>
              </Link>
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
            <div className="flex gap-4 text-sm">
              <Link href="/terms-of-service" className="text-gray-500 hover:text-yellow-600">Terms of Service</Link>
              <Link href="/privacy-policy"   className="text-gray-500 hover:text-yellow-600">Privacy Policy</Link>
              <Link href="/study-plan"       className="text-gray-500 hover:text-yellow-600">Study Plan</Link>
              <Link href="/practice-sims"    className="text-gray-500 hover:text-yellow-600">Practice SIMs</Link>
            </div>
            <div className="text-sm text-gray-500 text-center md:text-right">
              <p>
                Contact:{" "}
                <a href="mailto:info@cpabee.com" className="text-teal-700 hover:text-teal-600 underline">
                  info@cpabee.com
                </a>
              </p>
              <p>© {new Date().getFullYear()} CPABee. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
