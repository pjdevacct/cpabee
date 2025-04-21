"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2, Mail } from "lucide-react"
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
      // For FREE type, we don't need to validate report selection anymore
      // For SINGLE type, we still need to validate
      if (type === "SINGLE" && !selectedReport) {
        setError("Please select a report.")
        setIsSubmitting(false)
        return
      }

      console.log(`Submitting ${type} report request for ${email}`)

      // Special handling for free sample reports - direct email option
      if (type === "FREE") {
        try {
          // Create payment - for FREE type, we always use "SAMPLE" as reportType
          const result = await createPayment({
            email,
            reportType: "SAMPLE",
            paymentType: "FREE",
          })

          console.log("Free sample result:", result)

          if (result.success) {
            // Show success message for free reports
            console.log("Free report request successful")
            setSuccessMessage(result.message || "Your free sample report has been sent to your email.")
            setShowSuccess(true)
          } else {
            console.error("Free sample request failed:", result.message)
            setError(result.message || "Failed to process your request. Please try again.")
            setIsSubmitting(false)
          }
        } catch (error: any) {
          console.error("Error in free sample submission:", error)
          setError(
            "We're having trouble processing your request. Please email info@cpabee.com directly for a sample report.",
          )
          setDebugInfo(error.message || "Unknown error")
          setIsSubmitting(false)
        }
        return
      }

      // For paid reports, show PayPal checkout
      setShowPayPal(true)
      setIsSubmitting(false)
    } catch (error: any) {
      console.error("Error in submission:", error)
      setError("An unexpected error occurred. Please try again.")
      setDebugInfo(error.message || "Unknown error")
      setIsSubmitting(false)
    }
  }

  const handlePayPalSuccess = async (details: any) => {
    setIsSubmitting(true)
    try {
      // Record the successful PayPal payment
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
      console.error("Error recording PayPal payment:", error)
      setError("Payment was received but we encountered an issue. Our team will contact you shortly.")
    } finally {
      setIsSubmitting(false)
      setShowPayPal(false)
    }
  }

  const handlePayPalError = (error: any) => {
    console.error("PayPal error:", error)
    setError("There was an issue with PayPal. Please try again or contact support.")
    setShowPayPal(false)
  }

  const getButtonText = () => {
    if (isSubmitting) return "Processing..."

    switch (type) {
      case "FREE":
        return "Get Free Sample"
      case "SINGLE":
      case "BUNDLE":
        return "Continue to Payment"
      default:
        return "Submit"
    }
  }

  const getPaymentAmount = () => {
    switch (type) {
      case "SINGLE":
        return "19.00"
      case "BUNDLE":
        return "49.00"
      default:
        return "0.00"
    }
  }

  const getItemName = () => {
    if (type === "BUNDLE") {
      return "CPABee Full Access Bundle"
    } else if (type === "SINGLE" && selectedReport) {
      return `CPABee ${selectedReport} Report`
    }
    return "CPABee Report"
  }

  const handleManualRequest = async () => {
    try {
      // Create a manual payment request
      const result = await createPayment({
        email,
        reportType: type === "BUNDLE" ? "ALL" : (selectedReport as ReportType),
        paymentType: type,
        manualRequest: true, // Add this flag to indicate it's a manual request
      })

      return result
    } catch (error) {
      console.error("Error creating manual request:", error)
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-1 shadow-sm opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>

            {showPayPal ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Complete Your Purchase</h4>
                  <p className="text-sm text-gray-600">
                    You're purchasing: <strong>{getItemName()}</strong> for <strong>${getPaymentAmount()}</strong>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Your report will be delivered to: <strong>{email}</strong>
                  </p>
                </div>

                <PayPalCheckoutButton
                  amount={getPaymentAmount()}
                  itemName={getItemName()}
                  onSuccess={handlePayPalSuccess}
                  onError={handlePayPalError}
                />

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Having trouble with PayPal?</p>
                  <Button
                    onClick={async () => {
                      setIsSubmitting(true)
                      try {
                        // Use the manual request flow as a fallback
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
                    className="w-full"
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

                <Button onClick={() => setShowPayPal(false)} variant="outline" className="w-full">
                  Back
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
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
                </div>

                {/* Only show report selector for SINGLE type */}
                {type === "SINGLE" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select a Report</label>
                    <ReportSelector onSelect={setSelectedReport} selectedReport={selectedReport} />
                  </div>
                )}

                {/* For FREE type, show sample report description */}
                {type === "FREE" && (
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Sample Report Information</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Our free sample report gives you a preview of our comprehensive CPA exam trend analysis. You'll
                      see:
                    </p>
                    <ul className="space-y-1 text-sm list-disc pl-5 text-gray-600">
                      <li>How we analyze candidate discussions</li>
                      <li>The format of our topic distribution data</li>
                      <li>Our study recommendations based on trending topics</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">
                      The sample will be delivered instantly to your email address.
                    </p>
                  </div>
                )}

                {type === "BUNDLE" && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Full Access Bundle Includes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs">
                          AUD
                        </div>
                        <span>Auditing and Attestation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs">
                          FAR
                        </div>
                        <span>Financial Accounting and Reporting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs">
                          REG
                        </div>
                        <span>Taxation and Regulation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs">
                          TCP
                        </div>
                        <span>Tax Compliance and Planning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs">
                          ISC
                        </div>
                        <span>Information Systems and Control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs">
                          BAR
                        </div>
                        <span>Business Analysis and Reporting</span>
                      </li>
                    </ul>
                  </div>
                )}

                {error && (
                  <div className="text-sm text-red-500 p-3 bg-red-50 rounded-md">
                    <p className="font-medium">Error:</p>
                    <p>{error}</p>
                    {debugInfo && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs">Technical Details</summary>
                        <p className="text-xs mt-1 break-words">{debugInfo}</p>
                      </details>
                    )}
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {getButtonText()}
                      </>
                    ) : (
                      getButtonText()
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  {type === "FREE"
                    ? "No credit card required for the sample report."
                    : "Secure payment processing by PayPal"}
                </p>
              </form>
            )}
          </>
        ) : (
          <div className="py-6 text-center">
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
            <h3 className="text-lg font-medium text-gray-900">Success!</h3>
            <p className="mt-2 text-sm text-gray-500">{successMessage}</p>

            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={handleClose} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Close
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>
                  Questions? Email us at{" "}
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
