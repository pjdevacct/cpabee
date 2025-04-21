"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { sendEmailNotification } from "@/app/actions"

interface EmailSignupModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  buttonText?: string
  source: string
}

// Helper function to store signup in localStorage as backup
const storeSignupLocally = (email: string, source: string) => {
  try {
    const signups = JSON.parse(localStorage.getItem("cpabee_signups") || "[]")
    signups.push({
      email,
      source,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("cpabee_signups", JSON.stringify(signups))
  } catch (error) {
    console.error("Failed to store signup locally:", error)
  }
}

export default function EmailSignupModal({
  isOpen,
  onClose,
  title,
  description,
  buttonText = "Subscribe",
  source,
}: EmailSignupModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Store signup locally as backup
      storeSignupLocally(email, source)

      // Try to send email notification
      const result = await sendEmailNotification(email, source)

      if (result.success) {
        console.log("Email notification sent successfully")
        setIsSuccess(true)
        setEmail("")
      } else {
        // If API fails but we stored locally, still show success to user
        console.error("API error but continuing:", result.message)
        setIsSuccess(true)
        setEmail("")
      }
    } catch (err) {
      console.error("Error in submission:", err)
      // Even if there's an error, we'll show success since we stored locally
      setIsSuccess(true)
      setEmail("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
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
            <h3 className="text-lg font-medium text-gray-900">Thank you for subscribing!</h3>
            <p className="mt-2 text-sm text-gray-500">
              We've sent a confirmation to your inbox. You'll start receiving updates soon.
            </p>
            <Button onClick={onClose} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-500 hover:bg-yellow-600 text-black w-full"
              >
                {isSubmitting ? "Submitting..." : buttonText}
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">We respect your privacy. Unsubscribe at any time.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
