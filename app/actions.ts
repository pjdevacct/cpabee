"use server"

import { headers } from "next/headers"

// Environment variables
const MAILSEND_TOKEN = process.env.MAILSEND_TOKEN
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@cpabee.com"

export async function sendEmailNotification(email: string, source: string) {
  try {
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, message: "Please enter a valid email address." }
    }

    const headersList = headers()
    const userAgent = headersList.get("user-agent") || "Unknown"
    const referer = headersList.get("referer") || "Direct"
    const timestamp = new Date().toISOString()

    // Prepare email content
    const subject = `New CPABee Signup: ${email}`
    const text = `
      New signup from CPABee website:
      
      Email: ${email}
      Source: ${source}
      Time: ${timestamp}
      User Agent: ${userAgent}
      Referrer: ${referer}
    `

    const html = `
      <h2>New signup from CPABee website</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Source:</strong> ${source}</p>
      <p><strong>Time:</strong> ${timestamp}</p>
      <p><strong>User Agent:</strong> ${userAgent}</p>
      <p><strong>Referrer:</strong> ${referer}</p>
    `

    // For debugging
    console.log("Attempting to send email with token:", MAILSEND_TOKEN ? "Token exists" : "No token found")

    // Send email using MailSend API
    try {
      // Use a default MailerSend domain that doesn't require verification
      // or use the admin email if it's from a verified domain

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
            email: "notifications@cpabee.com", // Using your verified domain
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

      const responseData = await response.json()

      if (!response.ok) {
        console.error("API error details:", responseData)
        return {
          success: false,
          message: `Failed to send notification: ${responseData.message || response.statusText}`,
        }
      }

      console.log("Email sent successfully:", responseData)
    } catch (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        message: `Failed to send notification: ${error instanceof Error ? error.message : String(error)}`,
      }
    }

    // Even if email fails, we'll consider the signup successful from the user's perspective
    // and log the information for manual follow-up
    console.log("New signup:", { email, source, timestamp })

    return { success: true }
  } catch (error) {
    console.error("Error processing request:", error)
    return {
      success: false,
      message: "Failed to process your request. Please try again later.",
    }
  }
}
