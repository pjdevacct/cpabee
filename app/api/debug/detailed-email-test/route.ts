import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { testEmail } = await request.json()

    console.log("=== DETAILED EMAIL TEST START ===")
    console.log("Test email address:", testEmail)
    console.log("Timestamp:", new Date().toISOString())

    // Check environment variables
    const MAILSEND_TOKEN = process.env.MAILSEND_TOKEN
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@cpabee.com"

    console.log("Environment check:")
    console.log("- MAILSEND_TOKEN exists:", !!MAILSEND_TOKEN)
    console.log("- MAILSEND_TOKEN length:", MAILSEND_TOKEN?.length || 0)
    console.log("- MAILSEND_TOKEN preview:", MAILSEND_TOKEN ? `${MAILSEND_TOKEN.substring(0, 12)}...` : "Not found")
    console.log("- ADMIN_EMAIL:", ADMIN_EMAIL)

    if (!MAILSEND_TOKEN) {
      console.error("❌ MAILSEND_TOKEN is missing")
      return NextResponse.json({
        success: false,
        error: "MAILSEND_TOKEN environment variable is not set",
        step: "environment_check",
      })
    }

    if (!testEmail || !/^\S+@\S+\.\S+$/.test(testEmail)) {
      console.error("❌ Invalid email address:", testEmail)
      return NextResponse.json({
        success: false,
        error: "Please provide a valid email address",
        step: "email_validation",
      })
    }

    // Test MailerSend API connectivity first
    console.log("🔍 Testing MailerSend API connectivity...")
    try {
      const connectivityResponse = await fetch("https://api.mailersend.com/v1/domains", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${MAILSEND_TOKEN}`,
          "Content-Type": "application/json",
        },
      })

      const connectivityData = await connectivityResponse.json().catch(() => ({}))
      console.log("Connectivity test response:", connectivityResponse.status, connectivityData)

      if (!connectivityResponse.ok) {
        console.error("❌ MailerSend API connectivity failed")
        return NextResponse.json({
          success: false,
          error: `MailerSend API authentication failed: ${connectivityData.message || connectivityResponse.statusText}`,
          step: "api_connectivity",
          debug: {
            status: connectivityResponse.status,
            response: connectivityData,
            tokenPreview: `${MAILSEND_TOKEN.substring(0, 12)}...`,
          },
        })
      }

      console.log("✅ MailerSend API connectivity successful")
    } catch (connectivityError: any) {
      console.error("❌ MailerSend API connectivity error:", connectivityError)
      return NextResponse.json({
        success: false,
        error: `Failed to connect to MailerSend API: ${connectivityError.message}`,
        step: "api_connectivity_exception",
        debug: {
          error: connectivityError.message,
          tokenPreview: `${MAILSEND_TOKEN.substring(0, 12)}...`,
        },
      })
    }

    // Prepare email payload
    console.log("📧 Preparing email payload...")
    const emailPayload = {
      from: {
        email: "noreply@trial-351ndgwqz7zg23wr.mlsender.net",
        name: "CPABee Test",
      },
      to: [
        {
          email: testEmail,
          name: "Test Recipient",
        },
      ],
      subject: "CPABee Email Test - Detailed Debug",
      text: `
        This is a detailed test email from CPABee.
        
        Test Details:
        - Sent at: ${new Date().toISOString()}
        - Recipient: ${testEmail}
        - Token used: ${MAILSEND_TOKEN.substring(0, 12)}...
        - Service: MailerSend API
        
        If you receive this email, your email system is working correctly!
        
        Best regards,
        The CPABee Team
      `,
      html: `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f7df1e; padding: 20px; text-align: center;">
            <h1>🐝 CPABee Detailed Email Test</h1>
          </div>
          <div style="padding: 20px; background-color: #fff; border: 1px solid #eee;">
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h2>✅ Email System Working!</h2>
              <p>If you receive this email, your CPABee email system is functioning correctly.</p>
            </div>
            
            <h3>Test Details:</h3>
            <ul>
              <li><strong>Sent at:</strong> ${new Date().toISOString()}</li>
              <li><strong>Recipient:</strong> ${testEmail}</li>
              <li><strong>Token used:</strong> ${MAILSEND_TOKEN.substring(0, 12)}...</li>
              <li><strong>Service:</strong> MailerSend API</li>
              <li><strong>From domain:</strong> trial-351ndgwqz7zg23wr.mlsender.net</li>
            </ul>
            
            <p>Your sample report delivery system should now work perfectly!</p>
            
            <p>Best regards,<br>The CPABee Team</p>
          </div>
        </body>
        </html>
      `,
    }

    console.log("Email payload prepared:", {
      from: emailPayload.from.email,
      to: emailPayload.to[0].email,
      subject: emailPayload.subject,
    })

    // Send the email
    console.log("📤 Sending email via MailerSend API...")
    const webhookUrl = `https://api.mailersend.com/v1/email`

    const emailResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILSEND_TOKEN}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(emailPayload),
    })

    const emailResponseData = await emailResponse.json().catch(() => ({}))

    console.log("Email send response:", emailResponse.status, emailResponseData)

    if (!emailResponse.ok) {
      console.error("❌ Email sending failed")
      return NextResponse.json({
        success: false,
        error: `Email sending failed: ${emailResponseData.message || emailResponse.statusText}`,
        step: "email_send",
        debug: {
          status: emailResponse.status,
          response: emailResponseData,
          tokenPreview: `${MAILSEND_TOKEN.substring(0, 12)}...`,
          payload: {
            from: emailPayload.from.email,
            to: emailPayload.to[0].email,
            subject: emailPayload.subject,
          },
        },
      })
    }

    console.log("✅ Email sent successfully!")
    console.log("=== DETAILED EMAIL TEST END ===")

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully! Check your inbox and spam folder.",
      step: "email_sent",
      debug: {
        messageId: emailResponseData.message_id,
        status: emailResponse.status,
        recipient: testEmail,
        tokenPreview: `${MAILSEND_TOKEN.substring(0, 12)}...`,
      },
    })
  } catch (error: any) {
    console.error("❌ Unexpected error in detailed email test:", error)
    console.error("Error stack:", error.stack)
    console.log("=== DETAILED EMAIL TEST END (ERROR) ===")

    return NextResponse.json({
      success: false,
      error: `Unexpected error: ${error.message}`,
      step: "unexpected_error",
      debug: {
        error: error.message,
        stack: error.stack,
      },
    })
  }
}
