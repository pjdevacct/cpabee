import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { testEmail } = await request.json()

    if (!testEmail || !/^\S+@\S+\.\S+$/.test(testEmail)) {
      return NextResponse.json({
        success: false,
        error: "Please provide a valid email address",
      })
    }

    const MAILSEND_TOKEN = process.env.MAILSEND_TOKEN
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@cpabee.com"

    if (!MAILSEND_TOKEN) {
      return NextResponse.json({
        success: false,
        error: "MAILSEND_TOKEN environment variable is not set",
      })
    }

    console.log("Sending test email to:", testEmail)
    console.log("Using token:", MAILSEND_TOKEN ? `${MAILSEND_TOKEN.substring(0, 8)}...` : "Not found")

    // Send a test email
    const webhookUrl = `https://api.mailersend.com/v1/email`

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
      subject: "CPABee Email Test - Success!",
      text: `
        Congratulations! Your CPABee email system is working correctly.
        
        This test email was sent at: ${new Date().toISOString()}
        
        Your MailerSend integration is now properly configured.
        
        Best regards,
        The CPABee Team
      `,
      html: `
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
            .success {
              background-color: #d4edda;
              border: 1px solid #c3e6cb;
              color: #155724;
              padding: 15px;
              border-radius: 5px;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🐝 CPABee Email Test</h1>
          </div>
          <div class="content">
            <div class="success">
              <h2>✅ Success!</h2>
              <p>Your CPABee email system is working correctly.</p>
            </div>
            
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>Sent at: ${new Date().toISOString()}</li>
              <li>Recipient: ${testEmail}</li>
              <li>Service: MailerSend</li>
              <li>Status: Email delivery successful</li>
            </ul>
            
            <p>Your MailerSend integration is now properly configured and ready to send sample reports and notifications.</p>
            
            <p>Best regards,<br>The CPABee Team</p>
          </div>
        </body>
        </html>
      `,
    }

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

    console.log("MailerSend response:", response.status, responseData)

    if (!response.ok) {
      console.error("Email sending failed:", responseData)
      return NextResponse.json({
        success: false,
        error: `Email sending failed: ${responseData.message || response.statusText}`,
        debug: {
          status: response.status,
          response: responseData,
          tokenPreview: `${MAILSEND_TOKEN.substring(0, 8)}...`,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully! Check your inbox (and spam folder).",
      debug: {
        messageId: responseData.message_id,
        status: response.status,
        recipient: testEmail,
      },
    })
  } catch (error: any) {
    console.error("Test email error:", error)
    return NextResponse.json({
      success: false,
      error: `Failed to send test email: ${error.message}`,
      debug: {
        error: error.message,
      },
    })
  }
}
