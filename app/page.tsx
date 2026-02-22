"use client"

export const dynamic = "force-dynamic";

import React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { TrendingUp, Brain, Zap, CheckCircle2, Clock, Target, Mail, FileText, ArrowRight } from "lucide-react"
import ChartSection from "@/components/chart-section"
import AnimatedSection from "@/components/animated-section"
import ScrollToTop from "@/components/scroll-to-top"
import EmailSignupModal from "@/components/email-signup-modal"
import ReportPurchaseModal from "@/components/report-purchase-modal"
import AdminPanel from "@/components/admin-panel"
import { sendEmailNotification } from "./actions"

export default function LandingPage() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false)
  const [isFreeSampleModalOpen, setIsFreeSampleModalOpen] = useState(false)
  const [isSingleReportModalOpen, setIsSingleReportModalOpen] = useState(false)
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false)

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)
  const [subscribeError, setSubscribeError] = useState("")

  const trendingTopics = [
    { topic: "Basis (Individual, Partnership, S-Corp)", mentions: 1742 },
    { topic: "Business Law (BLAW)", mentions: 1554 },
    { topic: "Book-to-Tax Adjustments", mentions: 1383 },
    { topic: "Taxable Income Calculations", mentions: 1296 },
  ]

  const chartData = [
    { name: "Basis", value: 28 },
    { name: "Business Law", value: 21 },
    { name: "Book-to-Tax", value: 16 },
    { name: "Taxable Income", value: 14 },
    { name: "Consolidations", value: 12 },
    { name: "Other Topics", value: 9 },
  ]

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubscribeError("")

    try {
      try {
        const signups = JSON.parse(localStorage.getItem("cpabee_signups") || "[]")
        signups.push({
          email,
          source: "Footer Subscribe Form",
          timestamp: new Date().toISOString(),
        })
        localStorage.setItem("cpabee_signups", JSON.stringify(signups))
      } catch (error) {
        console.error("Failed to store signup locally:", error)
      }

      const result = await sendEmailNotification(email, "Footer Subscribe Form")

      if (result.success) {
        setSubscribeSuccess(true)
        setEmail("")
      } else {
        console.error("API error but continuing:", result.message)
        setSubscribeSuccess(true)
        setEmail("")
      }
    } catch (err) {
      console.error("Error in submission:", err)
      setSubscribeSuccess(true)
      setEmail("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">

      {/* ── Animated banner keyframes injected inline ── */}
      <style>{`
        @keyframes hiveShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes hexFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.07; }
          33%       { transform: translateY(-8px) rotate(2deg); opacity: 0.11; }
          66%       { transform: translateY(4px) rotate(-1deg); opacity: 0.08; }
        }
        .hero-banner {
          background: linear-gradient(
            135deg,
            #92400e 0%,
            #b45309 15%,
            #d97706 30%,
            #f59e0b 45%,
            #fbbf24 55%,
            #f59e0b 65%,
            #d97706 80%,
            #b45309 90%,
            #92400e 100%
          );
          background-size: 300% 300%;
          animation: hiveShift 10s ease infinite;
        }
        .hex {
          position: absolute;
          width: 120px;
          height: 120px;
          background: white;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          animation: hexFloat 8s ease-in-out infinite;
        }
        .hex:nth-child(1)  { top: -20px; left:  5%; animation-delay: 0s;   width: 90px;  height: 90px;  }
        .hex:nth-child(2)  { top:  10px; left: 20%; animation-delay: 1.5s; width: 60px;  height: 60px;  }
        .hex:nth-child(3)  { top: -10px; left: 40%; animation-delay: 3s;   width: 110px; height: 110px; }
        .hex:nth-child(4)  { top:  20px; left: 60%; animation-delay: 0.8s; width: 75px;  height: 75px;  }
        .hex:nth-child(5)  { top: -15px; left: 78%; animation-delay: 2.2s; width: 95px;  height: 95px;  }
        .hex:nth-child(6)  { top:  30px; left: 90%; animation-delay: 4s;   width: 55px;  height: 55px;  }
        .hex:nth-child(7)  { bottom: -10px; left: 12%; animation-delay: 1s;   width: 80px; height: 80px; }
        .hex:nth-child(8)  { bottom:  5px;  left: 50%; animation-delay: 2.8s; width: 65px; height: 65px; }
        .hex:nth-child(9)  { bottom: -5px;  left: 70%; animation-delay: 0.3s; width: 100px; height: 100px; }
      `}</style>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative h-8 w-8 overflow-hidden">
              <Image
                src="/images/cpabee-logo.png"
                alt="CPABee Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">CPABee</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-yellow-600 transition-colors">
              Reports
            </Link>
            <Link href="#trending" className="text-sm font-medium hover:text-yellow-600 transition-colors">
              Trending Topics
            </Link>
            <Link href="#why" className="text-sm font-medium hover:text-yellow-600 transition-colors">
              Why CPABee
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-yellow-600 transition-colors">
              Pricing
            </Link>
            <Link href="/study-plan" className="text-sm font-medium hover:text-yellow-600 transition-colors">
              Study Plan
            </Link>
            <Link href="/practice-sims" className="text-sm font-medium hover:text-yellow-600 transition-colors">
              Practice SIMs
            </Link>
          </nav>
          <div>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              onClick={() => setIsFreeSampleModalOpen(true)}
            >
              Get Free Sample
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero Section with animated banner ── */}
        <section className="relative overflow-hidden">

          {/* Animated gradient banner */}
          <div className="hero-banner absolute inset-0" style={{ minHeight: "320px" }}>
            {/* Floating hexagons */}
            <div className="hex" />
            <div className="hex" />
            <div className="hex" />
            <div className="hex" />
            <div className="hex" />
            <div className="hex" />
            <div className="hex" />
            <div className="hex" />
            <div className="hex" />
          </div>

          {/* Hero card */}
          <div className="relative pt-16 pb-24">
            <div className="container">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto border border-yellow-100">

                {/* Eyebrow badge */}
                <div className="flex justify-center mb-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                    CPA Exam Intelligence
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-center mb-6 text-gray-900">
                  What's Buzzing on the CPA Exam?
                </h1>
                <p className="text-xl text-gray-700 md:text-2xl text-center mb-4">
                  We analyze candidate discussion boards so you don't have to — and turn that data into focused study intel.
                </p>
                <p className="text-lg text-gray-600 text-center mb-8">
                  <span className="font-semibold text-yellow-600">Why it matters:</span>{" "}
                  The topics candidates discuss most are often the ones causing the most confusion — and showing up most on the exam.
                  Stop guessing what to study. Focus on what's actually being tested.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6"
                    onClick={() => setIsFreeSampleModalOpen(true)}
                  >
                    Get Free Sample Report
                  </Button>
                  <Button
                    variant="outline"
                    className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 font-medium"
                    onClick={() => {
                      document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    See What's Trending
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Trending Topics Section ── */}
        <section id="trending" className="bg-gray-50 py-12 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Track the Buzz</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  See which topics are generating the most discussion right now among CPA candidates
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
              <AnimatedSection delay={0.2}>
                <Card className="p-4 md:p-6 shadow-md">
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-yellow-500" />
                    Top Trending Topics Right Now
                  </h3>
                  <ul className="space-y-3">
                    {trendingTopics.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-wrap md:flex-nowrap justify-between items-center border-b pb-2"
                      >
                        <span className="font-medium text-sm md:text-base mb-1 md:mb-0">{item.topic}</span>
                        <div className="ml-auto">
                          <span className="text-gray-500 bg-yellow-100 px-2 py-1 rounded-full text-xs md:text-sm">
                            {item.mentions} mentions
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 mt-4">
                    Sample data shown — full reports include all sections with ranked topic lists.
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <ChartSection chartData={chartData} />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ── Reports / Features Section ── */}
        <section id="features" className="py-12 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">CPA Exam Reports</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  Focused intel on the topics that matter most — broken down by exam section
                </p>
                <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                  Not sure yet? Get a free sample — email us at info@cpabee.com
                </div>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedSection delay={0.2}>
                <Card className="p-6 shadow-md h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-4">What's In Each Report</h3>
                  <p className="text-gray-500 mb-4">
                    Each report covers one section of the CPA exam and tells you exactly which topics are generating
                    the most candidate discussion — so you can prioritize intelligently.
                  </p>

                  <div className="mb-6 space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-bold text-lg mb-2">CPA Exam Structure</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        The CPA exam has three required Core sections and one Discipline section you choose:
                      </p>

                      <h5 className="font-semibold text-sm mb-1">Core Sections (Required for all candidates):</h5>
                      <ul className="space-y-2 mb-3">
                        {[
                          { code: "AUD", name: "Auditing and Attestation" },
                          { code: "FAR", name: "Financial Accounting and Reporting" },
                          { code: "REG", name: "Taxation and Regulation" },
                        ].map(({ code, name }) => (
                          <li key={code} className="flex items-center gap-2">
                            <div className="h-6 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-xs font-bold">
                              {code}
                            </div>
                            <span className="text-sm">{name}</span>
                          </li>
                        ))}
                      </ul>

                      <h5 className="font-semibold text-sm mb-1">Discipline Sections (Choose one):</h5>
                      <ul className="space-y-2">
                        {[
                          { code: "BAR", name: "Business Analysis and Reporting" },
                          { code: "ISC", name: "Information Systems and Control" },
                          { code: "TCP", name: "Tax Compliance and Planning" },
                        ].map(({ code, name }) => (
                          <li key={code} className="flex items-center gap-2">
                            <div className="h-6 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-xs font-bold">
                              {code}
                            </div>
                            <span className="text-sm">{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black w-full mt-auto font-semibold"
                    onClick={() => setIsFreeSampleModalOpen(true)}
                  >
                    Get Your Free Sample Report
                  </Button>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <Card className="p-6 shadow-md h-full">
                  <h3 className="text-xl font-bold mb-4">What You'll Get</h3>
                  <ul className="space-y-5">
                    <li className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Highly Tested Topic Rankings</p>
                        <p className="text-gray-500 text-sm">
                          A ranked list of the topics generating the most candidate discussion — built from hundreds of
                          real posts. These are the areas you should be prioritizing.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Real Candidate Insights</p>
                        <p className="text-gray-500 text-sm">
                          We monitor public candidate forums so you don't have to scroll through endless posts. The
                          signal is extracted and handed to you cleanly.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Study Focus Recommendations</p>
                        <p className="text-gray-500 text-sm">
                          Know exactly where to direct your energy. Each report tells you not just what's trending, but
                          how to think about allocating your limited study time.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Built for Busy Candidates</p>
                        <p className="text-gray-500 text-sm">
                          Most CPA candidates are working full-time. We respect your time — these reports give you the
                          clarity to study smarter, not just longer.
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ── Pricing Section ── */}
        <section id="pricing" className="py-12 md:py-24 bg-gray-50">
          <div className="container space-y-12">
            <AnimatedSection>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Pricing</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  Every CPA candidate must pass all 4 sections. The bundle covers your entire exam for less than the cost of two individual reports.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">

              {/* Single Report */}
              <AnimatedSection delay={0.2} className="lg:col-span-1">
                <Card className="p-6 shadow-md h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Single Report</h3>
                    <p className="text-sm text-gray-500 mb-3">Best if you're laser-focused on one section right now</p>
                    <div className="text-3xl font-bold mb-4">$19</div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-sm">Choose one: AUD, FAR, REG, TCP, ISC, or BAR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-sm">Ranked list of highly tested topics for that section</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-sm">Built from hundreds of real candidate discussions</span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black w-full mt-auto font-semibold"
                    onClick={() => setIsSingleReportModalOpen(true)}
                  >
                    Buy Single Report — $19
                  </Button>
                </Card>
              </AnimatedSection>

              {/* Bundle — Best Value */}
              <AnimatedSection delay={0.3} className="lg:col-span-1">
                <Card className="p-6 shadow-md border-2 border-yellow-500 h-full flex flex-col relative">
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                      Best Value
                    </span>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold mb-1">Full Access Bundle</h3>
                    <p className="text-sm text-gray-500 mb-3">Best for candidates who still have multiple sections ahead</p>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold">$49</span>
                      <span className="text-gray-400 line-through text-sm">$114</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium mb-4">You save $65 — all 6 sections included</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-sm">All 6 section reports (AUD, FAR, REG, BAR, ISC, TCP)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-sm">You need all 4 sections to become a CPA — this covers every one of them</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-sm">Compare discipline sections before committing to one</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-sm">If you retake a section, you already have the report</span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black w-full mt-auto font-bold"
                    onClick={() => setIsBundleModalOpen(true)}
                  >
                    Get Full Bundle — $49
                  </Button>
                </Card>
              </AnimatedSection>

              {/* Free Sample */}
              <AnimatedSection delay={0.4} className="md:col-span-2 lg:col-span-1">
                <Card className="p-6 shadow-md h-full flex flex-col bg-teal-50 border-teal-100">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Free Sample</h3>
                    <p className="text-sm text-gray-500 mb-3">See exactly what you're getting before you spend a dollar</p>
                    <div className="text-3xl font-bold mb-4 text-teal-700">$0</div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                        <span className="text-sm">Full sample report from a real testing window</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                        <span className="text-sm">Shows our methodology and topic ranking format</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                        <span className="text-sm">No credit card. No commitment.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      className="bg-teal-600 hover:bg-teal-700 text-white w-full font-semibold"
                      onClick={() => setIsFreeSampleModalOpen(true)}
                    >
                      Get Free Sample Report
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span>
                        Or email{" "}
                        <a href="mailto:info@cpabee.com" className="text-teal-700 hover:text-teal-600 underline">
                          info@cpabee.com
                        </a>
                      </span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>

            {/* Bundle nudge callout */}
            <AnimatedSection delay={0.5}>
              <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                <p className="text-amber-900 font-semibold text-lg mb-1">
                  💡 Every CPA candidate must pass all 4 sections.
                </p>
                <p className="text-amber-800 text-sm">
                  Buying sections one at a time costs $76. The Full Bundle is $49 — covers all 4 required sections
                  plus all 3 discipline options, including any retakes. Simple math.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-amber-500 text-amber-800 hover:bg-amber-100 font-semibold"
                  onClick={() => setIsBundleModalOpen(true)}
                >
                  Get the Bundle <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── Why CPABee Section ── */}
        <section id="why" className="py-12 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Why CPABee?</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  Study smarter with intel from the broader CPA candidate community
                </p>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedSection delay={0.2}>
                <Card className="p-6 flex flex-col items-center text-center space-y-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold">Community-powered intel</h3>
                  <p className="text-gray-500 text-sm">
                    We analyze hundreds of posts from active CPA candidates to surface the topics generating the most
                    discussion. That collective signal tells you where the difficulty — and the testing — is concentrated.
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <Card className="p-6 flex flex-col items-center text-center space-y-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold">Focus on what's tested</h3>
                  <p className="text-gray-500 text-sm">
                    Not all topics are created equal. Our reports help you spend your time on high-yield areas rather
                    than spreading thin across content that rarely shows up on exam day.
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <Card className="p-6 flex flex-col items-center text-center space-y-4 shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold">Delivered instantly</h3>
                  <p className="text-gray-500 text-sm">
                    Reports land in your inbox right away. No waiting, no account to create. Just clear, actionable
                    study intelligence you can act on today.
                  </p>
                </Card>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.5}>
              <Card className="p-6 mt-4">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold mb-6 text-center">Why Knowing What's Highly Tested Changes Everything</h3>
                  <div className="space-y-5">
                    {[
                      {
                        title: "Optimize Your Limited Study Time",
                        body: "Most CPA candidates are working full-time. With only a few hours a day, you can't study everything equally. Knowing which topics carry the most weight lets you make every study session count.",
                      },
                      {
                        title: "Stop Studying in the Dark",
                        body: "Review materials cover everything — but the exam tests some things heavily and others barely at all. CPABee gives you the signal that helps you calibrate your effort correctly.",
                      },
                      {
                        title: "Leverage What Others Are Learning",
                        body: "The CPA candidate community is constantly sharing what's showing up on their exams. We aggregate that signal and hand it to you in a clean, ranked format.",
                      },
                      {
                        title: "Walk In With Confidence",
                        body: "Knowing you've prioritized the right content reduces exam anxiety. You've studied what matters. That confidence is real — and it shows up in your score.",
                      },
                    ].map(({ title, body }) => (
                      <div key={title} className="flex gap-3 items-start">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-1 shrink-0" />
                        <div>
                          <p className="font-semibold">{title}</p>
                          <p className="text-gray-600 text-sm">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                      onClick={() => setIsFreeSampleModalOpen(true)}
                    >
                      Get Your Free Sample Report
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* ── CTA / Subscribe Section ── */}
        <section className="bg-yellow-50 py-12 md:py-24">
          <div className="container">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                  See What CPA Candidates Are Focused On Right Now
                </h2>
                <p className="text-xl text-gray-600">
                  Get a free sample report and see exactly how CPABee can sharpen your study strategy.
                </p>
                <div className="inline-block bg-yellow-200 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold">
                  No credit card required
                </div>

                <div className="max-w-md mx-auto">
                  {subscribeSuccess ? (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="mb-4 h-12 w-12 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">You're all set!</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Check your inbox — your free sample report is on the way.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFooterSubscribe} className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold whitespace-nowrap"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Get Free Sample"}
                      </Button>
                    </form>
                  )}
                  {subscribeError && <p className="text-sm text-red-500 mt-2">{subscribeError}</p>}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t py-8 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden">
                <Image
                  src="/images/cpabee-logo.png"
                  alt="CPABee Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold">CPABee</span>
            </div>

            <div className="flex gap-4 text-sm">
              <Link href="/terms-of-service" className="text-gray-600 hover:text-yellow-600">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-yellow-600">
                Privacy Policy
              </Link>
              <Link href="/study-plan" className="text-gray-600 hover:text-yellow-600">
                Study Plan
              </Link>
              <Link href="/practice-sims" className="text-gray-600 hover:text-yellow-600">
                Practice SIMs
              </Link>
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

      {/* ── Scroll to top ── */}
      <ScrollToTop />

      {/* ── Modals ── */}
      <EmailSignupModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        title="Get Your Free Sample Report"
        description="Enter your email to receive a free sample of our CPA exam reports."
        buttonText="Send Me the Sample"
        source="Sample Report Request"
      />

      <EmailSignupModal
        isOpen={isGetStartedModalOpen}
        onClose={() => setIsGetStartedModalOpen(false)}
        title="Get Started with CPABee"
        description="Enter your email to receive a free sample of our CPA exam reports."
        buttonText="Get Sample Report"
        source="Hero Get Started Button"
      />

      <ReportPurchaseModal
        isOpen={isFreeSampleModalOpen}
        onClose={() => setIsFreeSampleModalOpen(false)}
        type="FREE"
        title="Get Your Free Sample Report"
        description="Enter your email and we'll send over a full sample report — no strings attached."
      />

      <ReportPurchaseModal
        isOpen={isSingleReportModalOpen}
        onClose={() => setIsSingleReportModalOpen(false)}
        type="SINGLE"
        title="Purchase a Single Report — $19"
        description="Choose one section. Get a ranked breakdown of the most highly tested topics."
      />

      <ReportPurchaseModal
        isOpen={isBundleModalOpen}
        onClose={() => setIsBundleModalOpen(false)}
        type="BUNDLE"
        title="Full Access Bundle — $49"
        description="All 6 section reports. Covers your entire CPA exam journey — including retakes. Save $65 vs. buying individually."
      />

      {/* Admin Panel — press Ctrl+Alt+A to open */}
      <AdminPanel />
    </div>
  )
}
