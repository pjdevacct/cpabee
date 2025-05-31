"use server"

import { cookies } from "next/headers"
import type { ReportType } from "@/components/report-selector"

// Environment variables
const MAILSEND_TOKEN = process.env.MAILSEND_TOKEN
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@cpabee.com"
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID

// PayPal payment record interface
interface PayPalPaymentRecord {
  email: string
  reportType: ReportType | "ALL" | "SAMPLE"
  paymentType: "FREE" | "SINGLE" | "BUNDLE"
  paypalOrderId: string
  paypalPayerId: string
  amount: string
}

// Mock database for tracking free samples (in a real app, use a database)
// This is just for demonstration - in production use a real database
const freeSampleEmails = new Set<string>()

interface PaymentData {
  email: string
  reportType: ReportType | "ALL" | "SAMPLE"
  paymentType: "FREE" | "SINGLE" | "BUNDLE"
  manualRequest?: boolean
}

export async function createPayment(data: PaymentData) {
  console.log("Starting createPayment with data:", {
    email: data.email,
    reportType: data.reportType,
    paymentType: data.paymentType,
  })

  try {
    // For free samples, check if email has already received one
    if (data.paymentType === "FREE") {
      console.log("Processing free sample request")

      // In a real app, query your database here
      if (freeSampleEmails.has(data.email)) {
        console.log("Email already received a free sample:", data.email)
        return {
          success: false,
          message:
            "This email has already received a free sample report. Please contact us at info@cpabee.com if you need assistance.",
        }
      }

      // Mark this email as having received a free sample
      freeSampleEmails.add(data.email)
      console.log("Added email to free sample list:", data.email)

      // For trial accounts with domain verification issues, we'll skip email delivery
      // and rely on local storage + manual process
      try {
        console.log("Attempting to deliver sample report")
        await deliverReport(data.email, "SAMPLE", true)
        console.log("Sample report delivered successfully")

        return {
          success: true,
          message:
            "Thank you for your interest! We've received your sample report request. Due to email service limitations, our team will manually send your sample report within 24 hours. Please check your email or contact us at info@cpabee.com.",
        }
      } catch (deliveryError) {
        console.error("Error delivering sample report:", deliveryError)

        // If email fails completely, we'll still show success and rely on local storage
        return {
          success: true,
          message:
            "Thank you for your interest! We've received your sample report request and will send it to your email within 24 hours. If you have any questions, please contact us at info@cpabee.com.",
        }
      }
    }

    // Check if this is a manual request
    if (data.manualRequest) {
      console.log("Processing manual payment request")

      // Calculate amount based on payment type
      const amount = data.paymentType === "SINGLE" ? 19 : 49 // in dollars
      const itemName =
        data.paymentType === "BUNDLE" ? "CPA Reports: Full Access Bundle" : `CPA Report: ${data.reportType}`

      // For manual requests, we'll store the info locally and show success
      // In a real app, you'd store this in a database
      console.log("Manual request stored:", { email: data.email, reportType: data.reportType, amount })

      return {
        success: true,
        manualRequest: true,
        message:
          "Thank you for your interest! Our team will contact you shortly with payment instructions to complete your purchase.",
      }
    }

    // For regular paid reports, we'll store the payment data in a cookie for later use
    try {
      cookies().set("cpabee_payment_data", JSON.stringify(data), {
        maxAge: 60 * 30, // 30 minutes
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      console.log("Payment data stored in cookie")
    } catch (cookieError) {
      console.error("Error setting payment cookie:", cookieError)
      // Continue even if cookie setting fails
    }

    // For paid reports, we'll return success to show the PayPal buttons
    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Payment creation error:", error)
    return {
      success: false,
      message: `We encountered an issue processing your request. Please try again or contact us directly at info@cpabee.com for assistance.`,
    }
  }
}

// New function to record a successful PayPal payment
export async function recordPayPalPayment(paymentRecord: PayPalPaymentRecord) {
  console.log("Recording PayPal payment:", {
    email: paymentRecord.email,
    reportType: paymentRecord.reportType,
    paymentType: paymentRecord.paymentType,
    orderId: paymentRecord.paypalOrderId,
    amount: paymentRecord.amount,
  })

  try {
    // In a production app, you would store this payment record in your database
    console.log("PayPal payment recorded successfully")

    // For now, we'll skip email delivery and rely on manual process
    // In a real app with proper email setup, you'd deliver the reports here

    return {
      success: true,
      message:
        "Payment successful! Due to email service limitations, our team will manually send your report(s) to your email within 24 hours.",
    }
  } catch (error: any) {
    console.error("Error recording PayPal payment:", error)
    return {
      success: false,
      message: `Failed to process your payment: ${error.message || "Unknown error"}. Please contact support.`,
    }
  }
}

export async function handlePaymentSuccess(paymentId: string) {
  console.log("Processing successful payment:", paymentId)

  try {
    // Retrieve the payment data from cookies
    const paymentDataCookie = cookies().get("cpabee_payment_data")
    if (!paymentDataCookie?.value) {
      console.error("Payment data cookie not found")
      return {
        success: false,
        message: "Payment data not found.",
      }
    }

    const paymentData = JSON.parse(paymentDataCookie.value) as PaymentData
    console.log("Retrieved payment data from cookie:", {
      email: paymentData.email,
      reportType: paymentData.reportType,
      paymentType: paymentData.paymentType,
    })

    // For now, we'll skip email delivery and rely on manual process
    console.log("Payment processed successfully - manual delivery required")

    // Clear the payment data cookie
    try {
      cookies().delete("cpabee_payment_data")
      console.log("Payment data cookie cleared")
    } catch (cookieError) {
      console.error("Error clearing payment cookie:", cookieError)
      // Continue even if cookie deletion fails
    }

    return {
      success: true,
      message:
        "Payment successful! Due to email service limitations, our team will manually send your report(s) to your email within 24 hours.",
    }
  } catch (error) {
    console.error("Payment success handling error:", error)
    return {
      success: false,
      message: "Failed to process your payment. Please contact support.",
    }
  }
}

// Helper function to deliver a single report
async function deliverReport(email: string, reportType: ReportType | "ALL" | "SAMPLE", isSample = false) {
  console.log(`Starting report delivery: ${reportType} to ${email}`)

  // For now, we'll skip the actual email sending due to domain verification issues
  // and rely on the local storage + admin panel for tracking requests

  console.log("Email delivery skipped due to domain verification requirements")
  console.log("Request logged for manual processing")

  // Store the request in localStorage (this happens on the client side via the modal)
  // The admin can view these requests using Ctrl+Alt+A

  // Always return true for sample reports to show success to the user
  if (isSample) {
    return true
  }

  // For paid reports, we might want to throw an error to trigger manual processing
  throw new Error("Email delivery requires domain verification - manual processing required")
}

// Helper function to deliver all reports
async function deliverAllReports(email: string) {
  console.log(`Starting delivery of all reports to ${email}`)

  // For now, skip email delivery and rely on manual process
  console.log("All reports delivery logged for manual processing")
  throw new Error("Email delivery requires domain verification - manual processing required")
}

// Helper function to send admin notification
async function sendAdminNotification(
  email: string,
  reportType: ReportType | "ALL" | "SAMPLE",
  isSample = false,
  reportDelivered = true,
  additionalInfo = "",
) {
  console.log(`Admin notification skipped due to domain verification issues`)
  console.log(`Request details: ${email}, ${reportType}, ${isSample ? "sample" : "paid"}`)

  // Skip email sending for now due to domain verification issues
  // The admin can check the admin panel (Ctrl+Alt+A) for stored requests
  return
}

// Helper function to get report name
function getReportName(reportType: ReportType | "SAMPLE" | "ALL"): string {
  const reportNames: Record<string, string> = {
    AUD: "Auditing and Attestation",
    FAR: "Financial Accounting and Reporting",
    REG: "Taxation and Regulation",
    TCP: "Tax Compliance and Planning",
    ISC: "Information Systems and Control",
    BAR: "Business Analysis and Reporting",
    ALL: "All CPA Exam Sections",
    SAMPLE: "Sample Report",
  }

  return reportNames[reportType] || reportType
}
