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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validate report selection for FREE and SINGLE types
      if ((type === "FREE" || type === "SINGLE") && !selectedReport) {
        setError("Please select a report.")
        setIsSubmitting(false)
        return
      }

      // Create payment
      const result = await createPayment({
        email,
        reportType: type === "BUNDLE" ? "ALL" : (selectedReport as ReportType),
        paymentType: type,
      })

      if (result.success) {
        if (result.redirectUrl) {
          // Redirect to Square payment page
          window.location.href = result.redirectUrl
        } else {
          // Show success message for free reports
          onClose()
          // You could show a toast notification here
          alert(result.message || "Your free sample report has been sent to your email.")
        }
      } else {
        setError(result.message || "Failed to process your request. Please try again.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error in submission:", error)
      setError("An unexpected error occurred. Please try again.")
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

          {type !== "BUNDLE" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select a Report</label>
              <ReportSelector onSelect={setSelectedReport} selectedReport={selectedReport} />
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

          {error && <p className="text-sm text-red-500">{error}</p>}

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
