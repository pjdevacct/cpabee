"use client"

import type React from "react"
import { useState } from "react"
import { X, Loader2, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ReportSelector, { type ReportType } from "@/components/report-selector"
import { createPayment, recordPayPalPayment } from "@/app/actions/payment"
import PayPalCheckoutButton from "./paypal-checkout-button"

interface ReportPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  type: "FREE" | "SINGLE" | "BUNDLE"
  title: string
  description: string
}

export default function ReportPurchaseModal({ isOpen, onClose, type, title, description }: ReportPurchaseModalProps) {
  const [email, setEmail] = useState("")
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showPayPal, setShowPayPal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setDebugInfo(null)
    setShowSuccess(false)

    try {
      if (type === "SINGLE" && !selectedReport) {
        setError("Please select a report section before continuing.")
        setIsSubmitting(false)
        return
      }

      if (type === "FREE") {
        try {
          const result = await createPayment({
            email,
            reportType: "SAMPLE",
            paymentType: "FREE",
          })

          if (result.success) {
            setSuccessMessage(result.message || "Your free sample report has been sent to your email.")
            setShowSuccess(true)
          } else {
            setError(result.message || "Failed to process your request. Please try again.")
            setIsSubmitting(false)
          }
        } catch (error: any) {
          setError(
            "We're having trouble processing your request. Please email info@cpabee.com directly for a sample report.",
          )
          setDebugInfo(error.message || "Unknown error")
          setIsSubmitting(false)
        }
        return
      }

      // Paid reports — show PayPal
      setShowPayPal(true)
      setIsSubmitting(false)
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again.")
      setDebugInfo(error.message || "Unknown error")
      setIsSubmitting(false)
    }
  }

  const handlePayPalSuccess = async (details: any) => {
    setIsSubmitting(true)
    try {
      const result = await recordPayPalPayment({
        email,
        reportType: type === "BUNDLE" ? "ALL" : (selectedReport as ReportType),
        paymentType: type,
        paypalOrderId: details.id,
        paypalPayerId: details.payer?.payer_id,
        amount: details.purchase_units[0]?.amount?.value || "0",
      })

      if (result.success) {
        setSuccessMessage(result.message || "Payment successful! Your report will be delivered to your email shortly.")
        setShowSuccess(true)
      } else {
        setError(result.message || "There was an issue processing your payment. Please contact support.")
      }
    } catch (error: any) {
      setError("Payment was received but we encountered an issue. Our team will contact you shortly.")
    } finally {
      setIsSubmitting(false)
      setShowPayPal(false)
    }
  }

  const handlePayPalError = (error: any) => {
    setError("There was an issue with PayPal. Please try again or contact support.")
    setShowPayPal(false)
  }

  const getButtonText = () => {
    if (isSubmitting) return "Processing..."
    switch (type) {
      case "FREE":    return "Send Me the Free Sample"
      case "SINGLE":  return "Continue to Payment — $19"
      case "BUNDLE":  return "Continue to Payment — $49"
      default:        return "Submit"
    }
  }

  const getPaymentAmount = () => {
    switch (type) {
      case "SINGLE": return "19.00"
      case "BUNDLE": return "49.00"
      default:       return "0.00"
    }
  }

  const getItemName = () => {
    if (type === "BUNDLE") return "CPABee Full Access Bundle (All 6 Sections)"
    if (type === "SINGLE" && selectedReport) return `CPABee ${selectedReport} Report`
    return "CPABee Report"
  }

  const handleManualRequest = async () => {
    try {
      const result = await createPayment({
        email,
        reportType: type === "BUNDLE" ? "ALL" : (selectedReport as ReportType),
        paymentType: type,
        manualRequest: true,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  const handleClose = () => {
    setShowSuccess(false)
    setSuccessMessage("")
    setEmail("")
    setSelectedReport(null)
    setError("")
    setDebugInfo(null)
    setShowPayPal(false)
    onClose()
  }

  const bundleSections = [
    { code: "AUD", name: "Auditing and Attestation" },
    { code: "FAR", name: "Financial Accounting and Reporting" },
    { code: "REG", name: "Taxation and Regulation" },
    { code: "TCP", name: "Tax Compliance and Planning" },
    { code: "ISC", name: "Information Systems and Control" },
    { code: "BAR", name: "Business Analysis and Reporting" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className="text-sm text-gray-600">{description}</DialogDescription>
            </DialogHeader>

            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-1 shadow-sm opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>

            {showPayPal ? (
              /* ── PayPal payment step ── */
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Order Summary</h4>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{getItemName()}</span>
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-1">${getPaymentAmount()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Delivering to: <span className="font-medium">{email}</span>
                  </p>
                </div>

                {type === "BUNDLE" && (
                  <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-yellow-800 mb-2">All 6 sections included:</p>
                    <div className="grid grid-cols-2 gap-1">
                      {bundleSections.map(({ code, name }) => (
                        <div key={code} className="flex items-center gap-1.5 text-xs text-gray-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
                          <span>{code} – {name.split(" ").slice(0, 2).join(" ")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <PayPalCheckoutButton
                  amount={getPaymentAmount()}
                  itemName={getItemName()}
                  onSuccess={handlePayPalSuccess}
                  onError={handlePayPalError}
                />

                <div className="mt-2 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Having trouble with PayPal?</p>
                  <Button
                    onClick={async () => {
                      setIsSubmitting(true)
                      try {
                        const result = await handleManualRequest()
                        if (result.success) {
                          setSuccessMessage(
                            result.message ||
                              "Your request has been received. Our team will contact you shortly with payment instructions.",
                          )
                          setShowSuccess(true)
                        } else {
                          setError(result.message || "Failed to process your request. Please try again.")
                        }
                      } catch (error: any) {
                        setError("An error occurred. Please try again or contact support.")
                      } finally {
                        setIsSubmitting(false)
                        setShowPayPal(false)
                      }
                    }}
                    variant="outline"
                    className="w-full text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Request Manual Payment Instructions"
                    )}
                  </Button>
                </div>

                <Button onClick={() => setShowPayPal(false)} variant="ghost" className="w-full text-sm text-gray-500">
                  ← Back
                </Button>
              </div>
            ) : (
              /* ── Main form ── */
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email input */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400">Your report will be delivered to this address.</p>
                </div>

                {/* SINGLE — section selector */}
                {type === "SINGLE" && (
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Select Your Exam Section</label>
                    <ReportSelector onSelect={setSelectedReport} selectedReport={selectedReport} />
                  </div>
                )}

                {/* FREE — sample description */}
                {type === "FREE" && (
                  <div className="bg-teal-50 border border-teal-100 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold text-sm text-teal-800">What's in the free sample?</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                        <span>A real report from a previous testing window</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                        <span>Ranked topic list showing what was most discussed by candidates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                        <span>Study focus recommendations based on that data</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 pt-1">Delivered instantly. No credit card required.</p>
                  </div>
                )}

                {/* BUNDLE — section list + value callout */}
                {type === "BUNDLE" && (
                  <div className="space-y-3">
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
                      <div className="flex items-baseline justify-between mb-3">
                        <h4 className="font-semibold text-sm">All 6 sections included:</h4>
                        <div className="text-right">
                          <span className="text-xs text-gray-400 line-through mr-1">$114</span>
                          <span className="text-sm font-bold text-yellow-700">$49</span>
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {bundleSections.map(({ code, name }) => (
                          <li key={code} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-yellow-500 shrink-0" />
                            <span className="font-medium text-gray-700 w-8">{code}</span>
                            <span className="text-gray-600">{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bundle value nudge */}
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-800">
                      <strong>Why most candidates choose the bundle:</strong> The average CPA candidate sits for
                      3–4 sections. Buying individually costs $57–$76. The bundle covers your full journey —
                      including any retakes — for $49.
                    </div>
                  </div>
                )}

                {/* Error display */}
                {error && (
                  <div className="text-sm text-red-600 p-3 bg-red-50 border border-red-100 rounded-md">
                    <p className="font-medium">Something went wrong:</p>
                    <p>{error}</p>
                    {debugInfo && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs text-red-400">Technical details</summary>
                        <p className="text-xs mt-1 break-words text-red-400">{debugInfo}</p>
                      </details>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black w-full font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    getButtonText()
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  {type === "FREE"
                    ? "No credit card required. No spam — just your report."
                    : "Secure payment via PayPal. Your report is delivered to your email immediately after payment."}
                </p>
              </form>
            )}
          </>
        ) : (
          /* ── Success state ── */
          <div className="py-8 text-center">
            <div className="mb-4 h-14 w-14 rounded-full bg-green-100 mx-auto flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {type === "FREE" ? "Check Your Inbox!" : "Purchase Confirmed!"}
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">{successMessage}</p>

            {type === "FREE" && (
              <p className="mt-3 text-xs text-gray-400 max-w-xs mx-auto">
                Once you've had a chance to look it over, come back if you'd like the full report for your section —
                most candidates find the sample convincing.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={handleClose} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                {type === "FREE" ? "Got It, Thanks!" : "Close"}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Mail className="h-3.5 w-3.5" />
                <span>
                  Questions?{" "}
                  <a href="mailto:info@cpabee.com" className="text-yellow-700 hover:text-yellow-600 underline">
                    info@cpabee.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
