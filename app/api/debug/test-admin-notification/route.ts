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

    console.log("Testing admin notification system...")
    console.log("Test customer email:", testEmail)
    console.log("Admin email:", ADMIN_EMAIL)

    // First, check what domains are available
    console.log("Checking available domains...")

    const domainsResponse = await fetch("https://api.mailersend.com/v1/domains", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${MAILSEND_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    let fromEmail = "noreply@trial-351ndgwqz7zg23wr.mlsender.net" // Default trial domain
    let domainInfo = "Using default trial domain"

    if (domainsResponse.ok) {
      const domainsData = await domainsResponse.json()
      const domains = domainsData.data || []
      const verifiedDomains = domains.filter((domain: any) => domain.domain_settings?.send_paused === false)

      console.log(
        "Available domains:",
        domains.map((d: any) => ({
          name: d.name,
          verified: !d.domain_settings?.send_paused,
          paused: d.domain_settings?.send_paused,
        })),
      )

      if (verifiedDomains.length > 0) {
        fromEmail = `noreply@${verifiedDomains[0].name}`
        domainInfo = `Using verified domain: ${verifiedDomains[0].name}`
        console.log("Using verified domain:", fromEmail)
      } else {
        domainInfo = `No verified domains found. Available domains: ${domains.map((d: any) => d.name).join(", ")}`
        console.log("No verified domains found, using trial domain")
      }
    } else {
      console.log("Could not check domains, using trial domain")
      domainInfo = "Could not check domains, using trial domain"
    }

    // Prepare the admin notification email
    const subject = `CPABee Sample Request Test: ${testEmail}`
    const text = `
TEST ADMIN NOTIFICATION

This is a test of the admin notification system.

Customer Email: ${testEmail}
Report Type: Sample Report
Request Type: Free Sample
Time: ${new Date().toISOString()}

ACTION REQUIRED: This is a test - no action needed.

Domain Info: ${domainInfo}
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
            background-color: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
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
          <h1>🐝 CPABee Test Notification</h1>
        </div>
        <div class="content">
          <div class="alert">
            <h3>🧪 TEST NOTIFICATION</h3>
            <p>This is a test of the admin notification system. No action required.</p>
          </div>
          
          <div class="details">
            <h3>Test Details:</h3>
            <p><strong>Customer Email:</strong> ${testEmail}</p>
            <p><strong>Report Type:</strong> Sample Report</p>
            <p><strong>Request Type:</strong> Free Sample</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <p><strong>Domain Info:</strong> ${domainInfo}</p>
          </div>
          
          <p>If you receive this email, the admin notification system is working correctly!</p>
        </div>
      </body>
      </html>
    `

    console.log("Sending test admin notification...")

    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILSEND_TOKEN}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        from: {
          email: fromEmail,
          name: "CPABee Test Notifications",
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

    console.log("MailerSend response:", response.status, responseData)

    if (!response.ok) {
      console.error("Test admin notification failed:", responseData)
      return NextResponse.json({
        success: false,
        error: `Admin notification test failed: ${responseData.message || response.statusText}`,
        debug: {
          status: response.status,
          response: responseData,
          fromEmail: fromEmail,
          toEmail: ADMIN_EMAIL,
          domainInfo: domainInfo,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: `Test admin notification sent successfully to ${ADMIN_EMAIL}! Check your inbox.`,
      debug: {
        messageId: responseData.message_id,
        status: response.status,
        fromEmail: fromEmail,
        toEmail: ADMIN_EMAIL,
        domainInfo: domainInfo,
      },
    })
  } catch (error: any) {
    console.error("Test admin notification error:", error)
    return NextResponse.json({
      success: false,
      error: `Failed to send test admin notification: ${error.message}`,
      debug: {
        error: error.message,
      },
    })
  }
}
