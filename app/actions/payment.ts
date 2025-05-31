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

      // Send admin notification about the sample request
      try {
        console.log("Sending admin notification about sample request")
        await sendAdminNotification(
          data.email,
          "SAMPLE",
          true,
          false,
          "Customer requested a free sample report. Please send manually.",
        )
        console.log("Admin notification sent successfully")
      } catch (notificationError) {
        console.error("Failed to send admin notification:", notificationError)
        // Continue even if notification fails
      }

      return {
        success: true,
        message:
          "Thank you for your interest! We've received your sample report request and will send it to your email within 24 hours. If you have any questions, please contact us at info@cpabee.com.",
      }
    }

    // Check if this is a manual request
    if (data.manualRequest) {
      console.log("Processing manual payment request")

      // Calculate amount based on payment type
      const amount = data.paymentType === "SINGLE" ? 19 : 49 // in dollars
      const itemName =
        data.paymentType === "BUNDLE" ? "CPA Reports: Full Access Bundle" : `CPA Report: ${data.reportType}`

      // Send admin notification about manual payment request
      try {
        await sendAdminNotification(
          data.email,
          data.reportType,
          false,
          false,
          `Manual payment request: ${itemName} for $${amount}. Please contact customer to arrange payment.`,
        )
      } catch (notificationError) {
        console.error("Failed to send admin notification for manual request:", notificationError)
      }

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
    // Send admin notification about the PayPal payment
    try {
      await sendAdminNotification(
        paymentRecord.email,
        paymentRecord.reportType,
        false,
        false,
        `PayPal payment received: $${paymentRecord.amount}. Order ID: ${paymentRecord.paypalOrderId}. Please deliver report(s) manually.`,
      )
    } catch (notificationError) {
      console.error("Failed to send admin notification about PayPal payment:", notificationError)
    }

    return {
      success: true,
      message: "Payment successful! Our team will manually send your report(s) to your email within 24 hours.",
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

    // Send admin notification about the payment
    try {
      await sendAdminNotification(
        paymentData.email,
        paymentData.reportType,
        false,
        false,
        `Payment successful for ${paymentData.paymentType} report. Payment ID: ${paymentId}. Please deliver report(s) manually.`,
      )
    } catch (notificationError) {
      console.error("Failed to send admin notification:", notificationError)
    }

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
      message: "Payment successful! Our team will manually send your report(s) to your email within 24 hours.",
    }
  } catch (error) {
    console.error("Payment success handling error:", error)
    return {
      success: false,
      message: "Failed to process your payment. Please contact support.",
    }
  }
}

// Helper function to send admin notification
async function sendAdminNotification(
  email: string,
  reportType: ReportType | "ALL" | "SAMPLE",
  isSample = false,
  reportDelivered = true,
  additionalInfo = "",
) {
  console.log(`Sending admin notification for ${reportType} ${isSample ? "sample request" : "purchase"} from ${email}`)

  // Check if we have the required token for sending emails
  if (!MAILSEND_TOKEN) {
    console.error("MAILSEND_TOKEN is not configured for admin notification")
    return // Don't throw, just return
  }

  const subject = `CPABee ${isSample ? "Sample Request" : "Purchase"}: ${email}`
  const text = `
New ${isSample ? "sample request" : "purchase"} from CPABee website:

Email: ${email}
Report Type: ${reportType === "ALL" ? "Full Access Bundle" : reportType}
Request Type: ${isSample ? "Free Sample" : "Paid Report"}
Time: ${new Date().toISOString()}
${
  additionalInfo
    ? `
Additional Info: ${additionalInfo}`
    : ""
}

ACTION REQUIRED: Please manually send the report to the customer.
  `

  const html = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #f7df1e;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #fff;
          border: 1px solid #eee;
        }
        .alert {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        .details {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🐝 CPABee ${isSample ? "Sample Request" : "Purchase"}</h1>
      </div>
      <div class="content">
        <div class="alert">
          <h3>⚠️ ACTION REQUIRED</h3>
          <p>Please manually send the report to the customer.</p>
        </div>
        
        <div class="details">
          <h3>Request Details:</h3>
          <p><strong>Customer Email:</strong> ${email}</p>
          <p><strong>Report Type:</strong> ${reportType === "ALL" ? "Full Access Bundle" : reportType}</p>
          <p><strong>Request Type:</strong> ${isSample ? "Free Sample" : "Paid Report"}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          ${additionalInfo ? `<p><strong>Additional Info:</strong> ${additionalInfo}</p>` : ""}
        </div>
        
        <p>Please send the appropriate report(s) to <strong>${email}</strong> as soon as possible.</p>
      </div>
    </body>
    </html>
  `

  try {
    const webhookUrl = `https://api.mailersend.com/v1/email`

    // First, let's check what domains are available
    console.log("Checking available domains before sending...")

    const domainsResponse = await fetch("https://api.mailersend.com/v1/domains", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${MAILSEND_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    let fromEmail = "noreply@trial-351ndgwqz7zg23wr.mlsender.net" // Default trial domain

    if (domainsResponse.ok) {
      const domainsData = await domainsResponse.json()
      const domains = domainsData.data || []
      const verifiedDomains = domains.filter((domain: any) => domain.domain_settings?.send_paused === false)

      console.log(
        "Available domains:",
        domains.map((d: any) => ({ name: d.name, verified: !d.domain_settings?.send_paused })),
      )

      if (verifiedDomains.length > 0) {
        // Use the first verified domain
        fromEmail = `noreply@${verifiedDomains[0].name}`
        console.log("Using verified domain:", fromEmail)
      } else {
        console.log("No verified domains found, using trial domain")
      }
    } else {
      console.log("Could not check domains, using trial domain")
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILSEND_TOKEN}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        from: {
          email: fromEmail,
          name: "CPABee Notifications",
        },
        to: [
          {
            email: ADMIN_EMAIL,
            name: "CPABee Admin",
          },
        ],
        subject: subject,
        text: text,
        html: html,
        reply_to: {
          email: ADMIN_EMAIL,
          name: "CPABee Admin",
        },
      }),
    })

    const responseData = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error("Admin notification API error:", responseData)
      console.error("Response status:", response.status, response.statusText)

      // If domain verification fails, log the specific error
      if (responseData.message?.includes("domain must be verified")) {
        console.error("Domain verification required. Available domains need to be verified in MailerSend dashboard.")
      }
    } else {
      console.log("Admin notification sent successfully to:", ADMIN_EMAIL)
    }
  } catch (error) {
    console.error("Error sending admin notification:", error)
    // Don't throw here, as this is just a notification
  }
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
