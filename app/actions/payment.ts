"use server"

import { cookies } from "next/headers"
import { Client, Environment, type CreatePaymentLinkRequest } from "square"
import type { ReportType } from "@/components/report-selector"
import { getSignedReportUrl } from "@/lib/report-storage"

// Environment variables
const MAILSEND_TOKEN = process.env.MAILSEND_TOKEN
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@cpabee.com"
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID

// Initialize Square client
let squareClient: Client | null = null
try {
  if (SQUARE_ACCESS_TOKEN) {
    squareClient = new Client({
      accessToken: SQUARE_ACCESS_TOKEN,
      environment: process.env.NODE_ENV === "production" ? Environment.Production : Environment.Sandbox,
    })
  } else {
    console.warn("Square client not initialized: Missing SQUARE_ACCESS_TOKEN")
  }
} catch (error) {
  console.error("Failed to initialize Square client:", error)
}

// Mock database for tracking free samples (in a real app, use a database)
// This is just for demonstration - in production use a real database
const freeSampleEmails = new Set<string>()

interface PaymentData {
  email: string
  reportType: ReportType | "ALL" | "SAMPLE"
  paymentType: "FREE" | "SINGLE" | "BUNDLE"
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
          message: "This email has already received a free sample report.",
        }
      }

      // Mark this email as having received a free sample
      freeSampleEmails.add(data.email)
      console.log("Added email to free sample list:", data.email)

      try {
        // Always use SAMPLE report type for free samples
        console.log("Attempting to deliver sample report")
        await deliverReport(data.email, "SAMPLE", true)
        console.log("Sample report delivered successfully")

        return {
          success: true,
          message: "Your free sample report has been sent to your email.",
        }
      } catch (deliveryError) {
        console.error("Error delivering sample report:", deliveryError)
        return {
          success: false,
          message: "We encountered an issue sending your sample report. Please try again or contact support.",
        }
      }
    }

    // For paid reports, create a Square payment
    console.log("Processing paid report request")
    const amount = data.paymentType === "SINGLE" ? 1900 : 4900 // in cents - updated from 2900 to 1900
    const itemName =
      data.paymentType === "SINGLE" ? `CPA Report: ${data.reportType}` : "CPA Reports: Full Access Bundle"

    // Store payment info in cookies for retrieval after payment completion
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

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID || !squareClient) {
      console.error("Square credentials not configured", {
        hasToken: !!SQUARE_ACCESS_TOKEN,
        hasLocationId: !!SQUARE_LOCATION_ID,
        hasClient: !!squareClient,
      })
      return {
        success: false,
        message: "Payment system is not properly configured. Please contact support.",
      }
    }

    // Create a Square payment link
    try {
      console.log("Creating Square payment link")
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

      console.log("Using base URL:", baseUrl)

      const redirectUrl = new URL(baseUrl)
      redirectUrl.pathname = "/checkout/success"

      const paymentLinkRequest: CreatePaymentLinkRequest = {
        idempotencyKey: `cpabee-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
        quickPay: {
          name: itemName,
          priceMoney: {
            amount: BigInt(amount),
            currency: "USD",
          },
          locationId: SQUARE_LOCATION_ID,
        },
        checkoutOptions: {
          redirectUrl: redirectUrl.toString(),
          askForShippingAddress: false,
          merchantSupportEmail: ADMIN_EMAIL,
        },
        prePopulatedData: {
          buyerEmail: data.email,
        },
      }

      console.log("Payment link request prepared:", {
        idempotencyKey: paymentLinkRequest.idempotencyKey,
        name: itemName,
        amount: amount,
        redirectUrl: redirectUrl.toString(),
      })

      const response = await squareClient.checkoutApi.createPaymentLink(paymentLinkRequest)
      console.log("Square API response received")

      if (response.result.paymentLink?.url) {
        console.log("Payment link created successfully")
        return {
          success: true,
          redirectUrl: response.result.paymentLink.url,
        }
      } else {
        console.error("No payment link URL in Square response")
        throw new Error("Failed to create payment link - no URL returned")
      }
    } catch (error) {
      console.error("Square API error:", error)
      return {
        success: false,
        message: "Failed to create payment. Please try again later.",
      }
    }
  } catch (error) {
    console.error("Payment creation error:", error)
    return {
      success: false,
      message: "Failed to process payment. Please try again later.",
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

    // Deliver the report(s) based on the payment type
    try {
      if (paymentData.paymentType === "SINGLE") {
        console.log("Delivering single report:", paymentData.reportType)
        await deliverReport(paymentData.email, paymentData.reportType)
      } else if (paymentData.paymentType === "BUNDLE") {
        console.log("Delivering all reports bundle")
        // Deliver all reports
        await deliverAllReports(paymentData.email)
      }
    } catch (deliveryError) {
      console.error("Error delivering report(s):", deliveryError)
      return {
        success: false,
        message:
          "Payment was successful, but we encountered an issue delivering your report(s). Our team has been notified and will send your report(s) manually.",
      }
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
      message: "Payment successful! Your report(s) have been sent to your email.",
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

  // Get the actual report URL
  let reportUrl: string | null = null

  try {
    // Try to get the URL
    console.log(`Getting signed URL for report type: ${reportType}`)
    reportUrl = await getSignedReportUrl(reportType)
    console.log(`Report URL obtained: ${reportUrl ? "Success" : "Not found"}`)
  } catch (error) {
    console.error(`Error getting report URL: ${error}`)
  }

  // If we couldn't get a URL, use a fallback message
  const hasReport = !!reportUrl

  const reportName = reportType === "ALL" ? "All CPA Exam Sections" : getReportName(reportType as ReportType | "SAMPLE")

  // Prepare email content
  const subject = `Your CPABee Report: ${reportName}`
  console.log(`Preparing email with subject: ${subject}`)

  // Different email content based on whether we have a report URL
  const text = hasReport
    ? `
      Thank you for your ${isSample ? "interest in" : "purchase from"} CPABee!
      
      Your ${reportName} report is ready for download at: ${reportUrl}
      
      If you have any questions, please contact us at ${ADMIN_EMAIL}.
      
      The CPABee Team
    `
    : `
      Thank you for your ${isSample ? "interest in" : "purchase from"} CPABee!
      
      We're preparing your ${reportName} report and will send it to you shortly.
      
      If you have any questions, please contact us at ${ADMIN_EMAIL}.
      
      The CPABee Team
    `

  const html = hasReport
    ? `
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
          .footer {
            font-size: 12px;
            color: #666;
            text-align: center;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #eee;
          }
          .button {
            display: inline-block;
            background-color: #f7df1e;
            color: #000;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CPABee Report Delivery</h1>
        </div>
        <div class="content">
          <h2>Thank you for your ${isSample ? "interest in" : "purchase from"} CPABee!</h2>
          <p>Your <strong>${reportName}</strong> report is ready for download.</p>
          <p style="text-align: center;">
            <a href="${reportUrl}" class="button">Download Your Report</a>
          </p>
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all;">${reportUrl}</p>
          <p>If you have any questions, please contact us at <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CPABee. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
        </div>
      </body>
      </html>
    `
    : `
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
          .footer {
            font-size: 12px;
            color: #666;
            text-align: center;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CPABee Report Delivery</h1>
        </div>
        <div class="content">
          <h2>Thank you for your ${isSample ? "interest in" : "purchase from"} CPABee!</h2>
          <p>We're preparing your <strong>${reportName}</strong> report and will send it to you shortly.</p>
          <p>If you have any questions, please contact us at <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CPABee. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
        </div>
      </body>
      </html>
    `

  // Check if we have the required token for sending emails
  if (!MAILSEND_TOKEN) {
    console.error("MAILSEND_TOKEN is not configured")
    throw new Error("Email service is not properly configured")
  }

  // Send email using MailSend API
  try {
    console.log("Sending email via MailSend API")
    const webhookUrl = `https://api.mailersend.com/v1/email`

    const emailPayload = {
      from: {
        email: "reports@cpabee.com",
        name: "CPABee Reports",
      },
      to: [
        {
          email: email,
          name: "CPABee Customer",
        },
      ],
      subject: subject,
      text: text,
      html: html,
      reply_to: {
        email: ADMIN_EMAIL,
        name: "CPABee Support",
      },
    }

    console.log("Email payload prepared:", {
      to: email,
      subject: subject,
      hasHtml: !!html,
      hasText: !!text,
    })

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILSEND_TOKEN}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(emailPayload),
    })

    if (!response.ok) {
      const responseData = await response.json().catch(() => ({}))
      console.error("Email API error:", responseData)
      console.error("Response status:", response.status, response.statusText)
      throw new Error(`Failed to send report: ${responseData.message || response.statusText}`)
    }

    console.log("Email sent successfully")

    // Also send a notification to admin
    try {
      await sendAdminNotification(email, reportType, isSample, hasReport)
      console.log("Admin notification sent")
    } catch (notificationError) {
      console.error("Failed to send admin notification:", notificationError)
      // Continue even if admin notification fails
    }

    return true
  } catch (error) {
    console.error("Error sending report email:", error)
    throw error
  }
}

// Helper function to deliver all reports
async function deliverAllReports(email: string) {
  console.log(`Starting delivery of all reports to ${email}`)

  // Option 1: Send a single email with all reports bundled
  try {
    await deliverReport(email, "ALL")
    console.log("All reports bundle delivered successfully")
  } catch (error) {
    console.error("Error delivering all reports bundle:", error)
    throw error
  }

  // Option 2: Send individual emails for each report
  // Uncomment this if you prefer to send separate emails
  /*
  const reportTypes: ReportType[] = ["AUD", "FAR", "REG", "TCP", "ISC", "BAR"]
  for (const reportType of reportTypes) {
    await deliverReport(email, reportType)
    // Add a small delay between emails to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  */
}

// Helper function to send admin notification
async function sendAdminNotification(
  email: string,
  reportType: ReportType | "ALL" | "SAMPLE",
  isSample = false,
  reportDelivered = true,
) {
  console.log(`Sending admin notification for ${reportType} report to ${email}`)

  const subject = `New CPABee Report ${isSample ? "Sample Request" : "Purchase"}: ${email}`
  const text = `
    New report ${isSample ? "sample request" : "purchase"} from CPABee website:
    
    Email: ${email}
    Report Type: ${reportType === "ALL" ? "Full Access Bundle" : reportType}
    Report Delivered: ${reportDelivered ? "Yes" : "No - Report not found"}
    Time: ${new Date().toISOString()}
  `

  const html = `
    <h2>New report ${isSample ? "sample request" : "purchase"} from CPABee website</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Report Type:</strong> ${reportType === "ALL" ? "Full Access Bundle" : reportType}</p>
    <p><strong>Report Delivered:</strong> ${reportDelivered ? "Yes" : "No - Report not found"}</p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
  `

  // Check if we have the required token for sending emails
  if (!MAILSEND_TOKEN) {
    console.error("MAILSEND_TOKEN is not configured for admin notification")
    return // Don't throw, just return
  }

  try {
    const webhookUrl = `https://api.mailersend.com/v1/email`

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILSEND_TOKEN}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        from: {
          email: "notifications@cpabee.com",
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

    if (!response.ok) {
      const responseData = await response.json().catch(() => ({}))
      console.error("Admin notification API error:", responseData)
      console.error("Response status:", response.status, response.statusText)
    } else {
      console.log("Admin notification sent successfully")
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
