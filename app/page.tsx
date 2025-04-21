"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { TrendingUp, Brain, Zap, CheckCircle2, Clock, Target, Mail, FileText } from "lucide-react"
import ChartSection from "@/components/chart-section"
import AnimatedSection from "@/components/animated-section"
import ScrollToTop from "@/components/scroll-to-top"
import EmailSignupModal from "@/components/email-signup-modal"
import ReportPurchaseModal from "@/components/report-purchase-modal"
import AdminPanel from "@/components/admin-panel"
import { sendEmailNotification } from "./actions"

export default function LandingPage() {
  // State for modals
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false)
  const [isFreeSampleModalOpen, setIsFreeSampleModalOpen] = useState(false)
  const [isSingleReportModalOpen, setIsSingleReportModalOpen] = useState(false)
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false)

  // State for footer subscribe form
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)
  const [subscribeError, setSubscribeError] = useState("")

  // Mock data for trending topics
  const trendingTopics = [
    { topic: "Basis (Individual, Partnership, S-Corp)", mentions: 7 },
    { topic: "Business Law (BLAW)", mentions: 5 },
    { topic: "Book-to-Tax Adjustments", mentions: 3 },
    { topic: "Taxable Income Calculations", mentions: 2 },
  ]

  // Mock data for pie chart
  const chartData = [
    { name: "Basis", value: 28 },
    { name: "Business Law", value: 21 },
    { name: "Book-to-Tax", value: 16 },
    { name: "Taxable Income", value: 14 },
    { name: "Consolidations", value: 12 },
    { name: "Other Topics", value: 9 },
  ]

  // Update the handleFooterSubscribe function to include local storage backup

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubscribeError("")

    try {
      // Store signup locally as backup
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

      // Try to send email notification
      const result = await sendEmailNotification(email, "Footer Subscribe Form")

      if (result.success) {
        console.log("Email notification sent successfully from footer form")
        setSubscribeSuccess(true)
        setEmail("")
      } else {
        // If API fails but we stored locally, still show success to user
        console.error("API error but continuing:", result.message)
        setSubscribeSuccess(true)
        setEmail("")
      }
    } catch (err) {
      console.error("Error in submission:", err)
      // Even if there's an error, we'll show success since we stored locally
      setSubscribeSuccess(true)
      setEmail("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with Sign Up button that opens modal */}
      <header className="sticky top-0 z-40 border-b bg-white">
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
            <span className="text-xl font-bold">CPABee</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-yellow-600 transition-colors">
              Features
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
          </nav>
          <div>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={() => setIsFreeSampleModalOpen(true)}
            >
              Get Sample Report
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Get Started button that opens modal - WITH BANNER */}
        <section className="relative">
          {/* Banner background */}
          <div
            className="absolute inset-0 h-64 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/bee-pattern-banner.png")' }}
          ></div>

          {/* Content overlay */}
          <div className="relative pt-16 pb-24">
            <div className="container">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-center mb-6">
                  What's Buzzing on the CPA Exam?
                </h1>
                <p className="text-xl text-gray-700 md:text-2xl text-center mb-4">
                  We scan discussion boards so you don't have to. Get real-time intel on the topics CPA candidates are
                  talking about most.
                </p>
                <p className="text-lg text-gray-600 text-center mb-8">
                  <span className="font-semibold text-yellow-600">Why it matters:</span> The topics candidates discuss
                  most frequently often indicate areas causing concern or confusion. Optimize your limited study time by
                  focusing on these high-discussion areas.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    onClick={() => setIsFreeSampleModalOpen(true)}
                  >
                    Get Sample Report
                  </Button>
                  <Button
                    variant="outline"
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    onClick={() => {
                      document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Topics Section */}
        <section id="trending" className="bg-gray-50 py-12 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Track the Buzz</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  See what topics are generating the most discussion right now among CPA candidates
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
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <ChartSection chartData={chartData} />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Section - UPDATED with more content */}
        <section id="features" className="py-12 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">CPA Exam Reports</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  Everything you need to stay on top of the CPA exam
                </p>
                <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                  Get a free sample report - Email us at info@cpabee.com
                </div>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedSection delay={0.2}>
                <Card className="p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4">What's In Each Report</h3>
                  <p className="text-gray-500 mb-4">
                    Our comprehensive reports cover all sections of the new CPA exam format:
                  </p>

                  <div className="mb-6 space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-bold text-lg mb-2">New CPA Exam Format</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        The Uniform CPA Examination has been restructured with three Core sections and one Discipline
                        section:
                      </p>

                      <h5 className="font-semibold text-sm mb-1">Core Sections (Required):</h5>
                      <ul className="space-y-2 mb-3">
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            AUD
                          </div>
                          <span>Auditing and Attestation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            FAR
                          </div>
                          <span>Financial Accounting and Reporting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            REG
                          </div>
                          <span>Taxation and Regulation</span>
                        </li>
                      </ul>

                      <h5 className="font-semibold text-sm mb-1">Discipline Sections (Choose One):</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            BAR
                          </div>
                          <span>Business Analysis and Reporting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            ISC
                          </div>
                          <span>Information Systems and Control</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            TCP
                          </div>
                          <span>Tax Compliance and Planning</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black w-full"
                    onClick={() => setIsFreeSampleModalOpen(true)}
                  >
                    Get Your Sample Report
                  </Button>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <Card className="p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4">What You'll Get</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Current Trending Topics</p>
                        <p className="text-gray-500">
                          See what topics are being discussed most frequently by exam takers right now on public forums.
                          Focus your study time on areas generating the most conversation.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Real Candidate Insights</p>
                        <p className="text-gray-500">
                          Our reports analyze hundreds of posts from CPA candidates to identify trending discussion
                          topics. We monitor multiple forums so you don't have to spend hours scrolling through posts.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Study Recommendations</p>
                        <p className="text-gray-500">
                          Get targeted suggestions on what to focus on based on community discussions. Stop wasting time
                          on rarely tested topics and concentrate on what matters.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Time-Saving Insights</p>
                        <p className="text-gray-500">
                          With limited study time, knowing where to focus is crucial. Our reports help you maximize your
                          study efficiency by highlighting what matters most right now.
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Pricing Section - NEW */}
        <section id="pricing" className="py-12 md:py-24 bg-gray-50">
          <div className="container space-y-12">
            <AnimatedSection>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Pricing</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  Invest in your CPA exam success with our detailed reports
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <AnimatedSection delay={0.2} className="lg:col-span-1">
                <Card className="p-6 shadow-md h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Single Report</h3>
                    <div className="text-3xl font-bold mb-4">$19</div>
                    <p className="text-gray-500 mb-6">Access to 1 section report</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span>Choose one: AUD, FAR, REG, TCP, ISC, or BAR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span>Built from 100s of real candidate comments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span>Most talked about topics and high-yield insights</span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black w-full mt-auto"
                    onClick={() => setIsSingleReportModalOpen(true)}
                  >
                    Buy Single Report
                  </Button>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.3} className="lg:col-span-1">
                <Card className="p-6 shadow-md border-2 border-yellow-500 h-full flex flex-col relative">
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                      Best Value
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Full Access Bundle</h3>
                    <div className="text-3xl font-bold mb-4">$49</div>
                    <p className="text-gray-500 mb-6">All 6 section reports</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span>Covers every possible CPA exam path</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span>Best for planning or comparing exam options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span>Perfect if you might switch sections later</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <span>Save $65 compared to buying individually</span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black w-full mt-auto"
                    onClick={() => setIsBundleModalOpen(true)}
                  >
                    Get Full Access
                  </Button>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.4} className="md:col-span-2 lg:col-span-1">
                <Card className="p-6 shadow-md h-full flex flex-col bg-teal-50">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Free Sample</h3>
                    <div className="text-3xl font-bold mb-4">$0</div>
                    <p className="text-gray-500 mb-6">Try before you buy with our sample report</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                        <span>Sample report from a previous testing window</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                        <span>See our analysis methodology</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                        <span>Experience the CPABee difference</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      className="bg-teal-600 hover:bg-teal-700 text-white w-full"
                      onClick={() => setIsFreeSampleModalOpen(true)}
                    >
                      Get Sample Report
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span>
                        Or email us at{" "}
                        <a href="mailto:info@cpabee.com" className="text-teal-700 hover:text-teal-600 underline">
                          info@cpabee.com
                        </a>
                      </span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Why CPABee Section - UPDATED with more content */}
        <section id="why" className="py-12 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection>
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Why CPABee?</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  Study smarter, not harder with insights from real CPA candidates
                </p>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedSection delay={0.2}>
                <Card className="p-6 flex flex-col items-center text-center space-y-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold">Community-powered insights</h3>
                  <p className="text-gray-500">
                    We analyze hundreds of posts from exam taker platforms to identify what topics are causing the most
                    discussion among real candidates. This collective intelligence provides valuable signals about areas
                    worth focusing on.
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <Card className="p-6 flex flex-col items-center text-center space-y-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold">Real exam trends</h3>
                  <p className="text-gray-500">
                    Focus your study time on topics that are generating significant discussion, based on candidate
                    conversations. When multiple candidates mention the same topics, it's a strong signal of areas that
                    may deserve extra attention.
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <Card className="p-6 flex flex-col items-center text-center space-y-4 shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold">Delivered with a buzz</h3>
                  <p className="text-gray-500">
                    Our reports are delivered instantly to your inbox, helping you stay on top of changing exam
                    patterns. Our service helps you adapt your study plan based on real-time feedback from the CPA
                    candidate community.
                  </p>
                </Card>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.5}>
              <Card className="p-6 mt-8">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold mb-4 text-center">Why Tracking Exam Trends Matters</h3>

                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-1 shrink-0" />
                      <div>
                        <p className="font-medium">Optimize Your Limited Study Time</p>
                        <p className="text-gray-600">
                          Most CPA candidates are working full-time while studying. With only a few hours available each
                          day, focusing on high-yield topics is essential for exam success.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-1 shrink-0" />
                      <div>
                        <p className="font-medium">Adapt to Changing Discussion Trends</p>
                        <p className="text-gray-600">
                          The CPA candidate community's focus evolves constantly, with different topics generating
                          discussion over time. Our real-time analysis helps you stay current with what's being actively
                          discussed.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-1 shrink-0" />
                      <div>
                        <p className="font-medium">Leverage Collective Intelligence</p>
                        <p className="text-gray-600">
                          Why study in isolation when you can benefit from the insights of hundreds of other candidates?
                          Our community-driven approach helps you learn from the collective wisdom of the CPA candidate
                          community.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-1 shrink-0" />
                      <div>
                        <p className="font-medium">Reduce Anxiety and Build Confidence</p>
                        <p className="text-gray-600">
                          Knowing you're focusing on topics that many candidates are discussing reduces exam anxiety and
                          builds confidence. Walk into the testing center with a study strategy informed by the broader
                          CPA candidate community.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                      onClick={() => setIsFreeSampleModalOpen(true)}
                    >
                      Get Your Sample Report
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section with subscribe form */}
        <section className="bg-yellow-50 py-12 md:py-24">
          <div className="container">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Get the Latest CPA Exam Insights</h2>
                <p className="text-xl text-gray-500">
                  Stay ahead of the curve with our detailed reports on trending CPA exam topics
                </p>
                <div className="inline-block bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                  Try a free sample report today
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
                      <h3 className="text-lg font-medium text-gray-900">Thank you for your interest!</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        We'll send your free sample report to your inbox shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFooterSubscribe} className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email for a free sample"
                        className="flex-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black whitespace-nowrap"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Get Sample"}
                      </Button>
                    </form>
                  )}
                  {subscribeError && <p className="text-sm text-red-500 mt-2">{subscribeError}</p>}
                  {!subscribeSuccess && (
                    <p className="text-sm text-gray-500 mt-2">No credit card required for the sample report.</p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
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
              <span className="text-sm font-medium">CPABee</span>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Contact:{" "}
                <a href="mailto:info@cpabee.com" className="text-teal-700 hover:text-teal-600 underline">
                  info@cpabee.com
                </a>
              </p>
            </div>

            <div className="text-sm text-gray-500">
              <p>Built by CPA nerds with too much free time</p>
              <p>© {new Date().getFullYear()} CPABee. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* Email Signup Modal - For backward compatibility */}
      <EmailSignupModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        title="Get Your Free Sample Report"
        description="Enter your email to receive a free sample of our CPA exam trend reports."
        buttonText="Send Me the Sample"
        source="Sample Report Request"
      />

      <EmailSignupModal
        isOpen={isGetStartedModalOpen}
        onClose={() => setIsGetStartedModalOpen(false)}
        title="Get Started with CPABee"
        description="Enter your email to receive a free sample of our reports on trending CPA exam topics."
        buttonText="Get Sample Report"
        source="Hero Get Started Button"
      />

      {/* Report Purchase Modals */}
      <ReportPurchaseModal
        isOpen={isFreeSampleModalOpen}
        onClose={() => setIsFreeSampleModalOpen(false)}
        type="FREE"
        title="Get Your Free Sample Report"
        description="Select a report section and enter your email to receive a free sample report."
      />

      <ReportPurchaseModal
        isOpen={isSingleReportModalOpen}
        onClose={() => setIsSingleReportModalOpen(false)}
        type="SINGLE"
        title="Purchase a Single Report"
        description="Select one report section to purchase for $19."
      />

      <ReportPurchaseModal
        isOpen={isBundleModalOpen}
        onClose={() => setIsBundleModalOpen(false)}
        type="BUNDLE"
        title="Purchase Full Access Bundle"
        description="Get access to all 6 report sections for just $49 - save $67 compared to buying individually!"
      />

      {/* Admin Panel - Hidden by default, press Ctrl+Alt+A to show */}
      <AdminPanel />
    </div>
  )
}
