"use server"

import { cookies } from "next/headers"
import type { ReportType } from "@/components/report-selector"
import { getSignedReportUrl } from "@/lib/report-storage"

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

      try {
        // Always use SAMPLE report type for free samples
        console.log("Attempting to deliver sample report")
        await deliverReport(data.email, "SAMPLE", true)
        console.log("Sample report delivered successfully")

        return {
          success: true,
          message:
            "Thank you for your interest! We've sent your sample report to your email. If you don't receive it within a few minutes, please check your spam folder or contact us at info@cpabee.com.",
        }
      } catch (deliveryError) {
        console.error("Error delivering sample report:", deliveryError)

        // Even if delivery fails, we'll show success since we've notified admin
        return {
          success: true,
          message:
            "Thank you for your interest! We're preparing your sample report and will send it to your email within 24 hours. If you have any questions, please contact us at info@cpabee.com.",
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

      // Send admin notification about manual request
      try {
        const additionalInfo = `
          MANUAL PAYMENT REQUEST: Customer requested ${data.paymentType} report (${itemName}) for $${amount}.
          Please contact the customer to arrange payment and delivery.
        `
        await sendAdminNotification(data.email, data.reportType, false, false, additionalInfo)
        console.log("Admin notification sent for manual request")
      } catch (notifyError) {
        console.error("Failed to send admin notification about manual request:", notifyError)
      }

      // Return success with manual request message
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

    // Send admin notification about the payment
    try {
      const additionalInfo = `
        PayPal Payment Received
        Order ID: ${paymentRecord.paypalOrderId}
        Payer ID: ${paymentRecord.paypalPayerId}
        Amount: $${paymentRecord.amount}
      `
      await sendAdminNotification(paymentRecord.email, paymentRecord.reportType, false, false, additionalInfo)
    } catch (notifyError) {
      console.error("Failed to send admin notification about PayPal payment:", notifyError)
    }

    // Deliver the report(s) based on the payment type
    try {
      if (paymentRecord.paymentType === "SINGLE") {
        console.log("Delivering single report:", paymentRecord.reportType)
        await deliverReport(paymentRecord.email, paymentRecord.reportType)
      } else if (paymentRecord.paymentType === "BUNDLE") {
        console.log("Delivering all reports bundle")
        await deliverAllReports(paymentRecord.email)
      }
    } catch (deliveryError) {
      console.error("Error delivering report(s):", deliveryError)
      return {
        success: false,
        message:
          "Payment was successful, but we encountered an issue delivering your report(s). Our team has been notified and will send your report(s) manually.",
      }
    }

    return {
      success: true,
      message: "Payment successful! Your report(s) have been sent to your email.",
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

  // For sample reports, we'll always send an email even without a URL
  // and include instructions for manual delivery
  const hasReport = !!reportUrl
  const reportName = reportType === "ALL" ? "All CPA Exam Sections" : getReportName(reportType as ReportType | "SAMPLE")

  // Prepare email content
  const subject = `Your CPABee Report: ${reportName}`
  console.log(`Preparing email with subject: ${subject}`)

  // For sample reports, always send a friendly email
  const text = isSample
    ? `
      Thank you for your interest in CPABee!
      
      ${
        hasReport
          ? `Your ${reportName} sample report is ready for download at: ${reportUrl}`
          : `We're preparing your ${reportName} sample report and will send it to you within 24 hours.`
      }
      
      In the meantime, here's what you can expect from our full reports:
      
      ✓ Analysis of trending topics from real CPA candidate discussions
      ✓ Data-driven insights on what topics are generating the most conversation
      ✓ Study recommendations based on community focus areas
      ✓ Time-saving insights to optimize your exam preparation
      
      Questions? Reply to this email or contact us at ${ADMIN_EMAIL}.
      
      Best regards,
      The CPABee Team
    `
    : hasReport
      ? `
      Thank you for your purchase from CPABee!
      
      Your ${reportName} report is ready for download at: ${reportUrl}
      
      If you have any questions, please contact us at ${ADMIN_EMAIL}.
      
      The CPABee Team
    `
      : `
      Thank you for your purchase from CPABee!
      
      We're preparing your ${reportName} report and will send it to you shortly.
      
      If you have any questions, please contact us at ${ADMIN_EMAIL}.
      
      The CPABee Team
    `

  const html = isSample
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
          .features {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
          }
          .features ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .features li {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🐝 Welcome to CPABee!</h1>
        </div>
        <div class="content">
          <h2>Thank you for your interest in CPABee!</h2>
          
          ${
            hasReport
              ? `<p>Your <strong>${reportName}</strong> sample report is ready for download.</p>
               <p style="text-align: center;">
                 <a href="${reportUrl}" class="button">Download Your Sample Report</a>
               </p>
               <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
               <p style="word-break: break-all;">${reportUrl}</p>`
              : `<p>We're preparing your <strong>${reportName}</strong> sample report and will send it to you within 24 hours.</p>`
          }
          
          <div class="features">
            <h3>What You Can Expect From Our Full Reports:</h3>
            <ul>
              <li>✓ Analysis of trending topics from real CPA candidate discussions</li>
              <li>✓ Data-driven insights on what topics are generating the most conversation</li>
              <li>✓ Study recommendations based on community focus areas</li>
              <li>✓ Time-saving insights to optimize your exam preparation</li>
            </ul>
          </div>
          
          <p>Questions? Reply to this email or contact us at <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>.</p>
          
          <p>Best regards,<br>The CPABee Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CPABee. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
        </div>
      </body>
      </html>
    `
    : hasReport
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
          <h2>Thank you for your purchase from CPABee!</h2>
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
          <h2>Thank you for your purchase from CPABee!</h2>
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

    // For sample reports, we'll still return success and rely on admin notification
    if (isSample) {
      console.log("No email token but continuing for sample report - will rely on admin notification")
      try {
        await sendAdminNotification(
          email,
          reportType,
          isSample,
          hasReport,
          "EMAIL TOKEN MISSING - Manual delivery required",
        )
        console.log("Admin notification sent for manual sample delivery")
      } catch (notifyError) {
        console.error("Failed to send admin notification:", notifyError)
      }
      return true
    }

    throw new Error("Email service is not properly configured")
  }

  // Send email using MailSend API
  try {
    console.log("Sending email via MailSend API")

    // Check if we have a valid token
    if (!MAILSEND_TOKEN || MAILSEND_TOKEN.trim() === "") {
      console.error("MAILSEND_TOKEN is missing or empty")
      throw new Error("Email service not configured")
    }

    const webhookUrl = `https://api.mailersend.com/v1/email`

    // For trial accounts, we need to send to admin email but include customer info in the content
    const isTrialAccount = true // Assume trial account for now
    const actualRecipient = isTrialAccount ? ADMIN_EMAIL : email

    // Update email content to include customer email when sending to admin
    const customerNotice = isTrialAccount
      ? `
    
    CUSTOMER EMAIL: ${email}
    NOTE: This email was sent to admin due to MailerSend trial account limitations.
    Please forward the report to the customer at: ${email}
    
  `
      : ""

    const emailPayload = {
      from: {
        email: "noreply@trial-351ndgwqz7zg23wr.mlsender.net", // Use MailerSend trial domain
        name: "CPABee Reports",
      },
      to: [
        {
          email: actualRecipient,
          name: isTrialAccount ? "CPABee Admin" : "CPABee Customer",
        },
      ],
      subject: isTrialAccount ? `[FORWARD TO ${email}] ${subject}` : subject,
      text: customerNotice + text,
      html: isTrialAccount
        ? `
      <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
        <h3 style="color: #856404; margin: 0 0 10px 0;">⚠️ Admin Notice - Please Forward</h3>
        <p style="color: #856404; margin: 0;"><strong>Customer Email:</strong> ${email}</p>
        <p style="color: #856404; margin: 5px 0 0 0;"><small>This email was sent to admin due to MailerSend trial account limitations. Please forward the report to the customer.</small></p>
      </div>
      ${html}
    `
        : html,
    }

    console.log("Email payload prepared:", {
      to: actualRecipient,
      subject: emailPayload.subject,
      from: emailPayload.from.email,
      hasToken: !!MAILSEND_TOKEN,
      isTrialAccount,
      originalRecipient: email,
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

    const responseData = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error("Email API error:", responseData)
      console.error("Response status:", response.status, response.statusText)

      // For authentication errors, provide specific guidance
      if (response.status === 401 || responseData.message?.includes("Unauthenticated")) {
        console.error("Authentication failed - token may be invalid or expired")
        throw new Error("Email service authentication failed")
      }

      // For trial account limitations, provide helpful message
      if (responseData.message?.includes("Trial accounts can only send emails")) {
        console.error("Trial account limitation detected")
        throw new Error("Trial account limitation - email sent to admin for manual forwarding")
      }

      throw new Error(`Email API error: ${responseData.message || response.statusText}`)
    }

    console.log("Email sent successfully:", responseData)

    // If this was sent to admin due to trial limitations, show appropriate message
    if (isTrialAccount && email !== ADMIN_EMAIL) {
      console.log(`Email sent to admin (${ADMIN_EMAIL}) for forwarding to customer (${email})`)
    }

    return true
  } catch (error) {
    console.error("Error sending report email:", error)

    // For sample reports, always continue and rely on admin notification
    if (isSample) {
      console.log("Email failed for sample report, but continuing - will rely on admin notification and local storage")
      try {
        await sendAdminNotification(
          email,
          reportType,
          isSample,
          hasReport,
          `EMAIL DELIVERY ERROR: ${error instanceof Error ? error.message : String(error)} - Manual delivery required. Customer email: ${email}`,
        )
        console.log("Admin notification sent for manual sample delivery")
      } catch (notifyError) {
        console.error("Failed to send admin notification:", notifyError)
      }
      return true
    }

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
}

// Helper function to send admin notification
async function sendAdminNotification(
  email: string,
  reportType: ReportType | "ALL" | "SAMPLE",
  isSample = false,
  reportDelivered = true,
  additionalInfo = "",
) {
  console.log(`Sending admin notification for ${reportType} report to ${email}`)

  const subject = `New CPABee Report ${isSample ? "Sample Request" : "Purchase"}: ${email}`
  const text = `
    New report ${isSample ? "sample request" : "purchase"} from CPABee website:
    
    Email: ${email}
    Report Type: ${reportType === "ALL" ? "Full Access Bundle" : reportType}
    Report Delivered: ${reportDelivered ? "Yes" : "No - Report not found"}
    Time: ${new Date().toISOString()}
    ${additionalInfo ? `\nAdditional Info: ${additionalInfo}` : ""}
  `

  const html = `
    <h2>New report ${isSample ? "sample request" : "purchase"} from CPABee website</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Report Type:</strong> ${reportType === "ALL" ? "Full Access Bundle" : reportType}</p>
    <p><strong>Report Delivered:</strong> ${reportDelivered ? "Yes" : "No - Report not found"}</p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
    ${additionalInfo ? `<p><strong>Additional Info:</strong> ${additionalInfo}</p>` : ""}
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
          email: "noreply@trial-351ndgwqz7zg23wr.mlsender.net", // Use MailerSend trial domain
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
