"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ReportSelector, { type ReportType } from "@/components/report-selector"
import { createPayment } from "@/app/actions/payment"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setDebugInfo(null)

    try {
      // For FREE type, we don't need to validate report selection anymore
      // For SINGLE type, we still need to validate
      if (type === "SINGLE" && !selectedReport) {
        setError("Please select a report.")
        setIsSubmitting(false)
        return
      }

      console.log(`Submitting ${type} report request for ${email}`)

      // Create payment - for FREE type, we always use "SAMPLE" as reportType
      const result = await createPayment({
        email,
        reportType: type === "FREE" ? "SAMPLE" : type === "BUNDLE" ? "ALL" : (selectedReport as ReportType),
        paymentType: type,
      })

      console.log("Payment result:", result)

      if (result.success) {
        if (result.redirectUrl) {
          // Redirect to Square payment page
          console.log("Redirecting to:", result.redirectUrl)
          window.location.href = result.redirectUrl
        } else {
          // Show success message for free reports
          console.log("Free report request successful")
          onClose()
          // You could show a toast notification here
          alert(result.message || "Your free sample report has been sent to your email.")
        }
      } else {
        console.error("Payment request failed:", result.message)
        setError(result.message || "Failed to process your request. Please try again.")
        setIsSubmitting(false)
      }
    } catch (error: any) {
      console.error("Error in submission:", error)
      setError("An unexpected error occurred. Please try again.")
      setDebugInfo(error.message || "Unknown error")
      setIsSubmitting(false)
    }
  }

  const getButtonText = () => {
    if (isSubmitting) return "Processing..."

    switch (type) {
      case "FREE":
        return "Get Free Sample"
      case "SINGLE":
        return "Continue to Payment"
      case "BUNDLE":
        return "Continue to Payment"
      default:
        return "Submit"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-1 shadow-sm opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

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
                Our free sample report gives you a preview of our comprehensive CPA exam trend analysis. You'll see:
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
            {type === "FREE" ? "No credit card required for the sample report." : "Secure payment processing by Square"}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
