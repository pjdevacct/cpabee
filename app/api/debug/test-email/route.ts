import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if environment variables are available
    const mailsendToken = process.env.MAILSEND_TOKEN
    const adminEmail = process.env.ADMIN_EMAIL

    console.log("Environment check:")
    console.log("MAILSEND_TOKEN exists:", !!mailsendToken)
    console.log("MAILSEND_TOKEN length:", mailsendToken?.length || 0)
    console.log("MAILSEND_TOKEN preview:", mailsendToken ? `${mailsendToken.substring(0, 8)}...` : "Not found")
    console.log("ADMIN_EMAIL:", adminEmail)

    if (!mailsendToken) {
      return NextResponse.json({
        success: false,
        error: "MAILSEND_TOKEN environment variable is not set",
        debug: {
          tokenExists: false,
          tokenLength: 0,
          adminEmail: adminEmail || "Not set",
        },
      })
    }

    // Test the MailerSend API with a simple request
    try {
      const testResponse = await fetch("https://api.mailersend.com/v1/domains", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${mailsendToken}`,
          "Content-Type": "application/json",
        },
      })

      const testData = await testResponse.json().catch(() => ({}))

      console.log("MailerSend API test response:", testResponse.status, testData)

      if (!testResponse.ok) {
        return NextResponse.json({
          success: false,
          error: "MailerSend API authentication failed",
          debug: {
            tokenExists: true,
            tokenLength: mailsendToken.length,
            tokenPreview: `${mailsendToken.substring(0, 8)}...`,
            apiStatus: testResponse.status,
            apiResponse: testData,
            adminEmail: adminEmail || "Not set",
          },
        })
      }

      // If we get here, the token works
      return NextResponse.json({
        success: true,
        message: "MailerSend token is valid and working",
        debug: {
          tokenExists: true,
          tokenLength: mailsendToken.length,
          tokenPreview: `${mailsendToken.substring(0, 8)}...`,
          apiStatus: testResponse.status,
          adminEmail: adminEmail || "Not set",
          domains: testData.data || [],
        },
      })
    } catch (apiError: any) {
      console.error("MailerSend API error:", apiError)
      return NextResponse.json({
        success: false,
        error: "Failed to connect to MailerSend API",
        debug: {
          tokenExists: true,
          tokenLength: mailsendToken.length,
          tokenPreview: `${mailsendToken.substring(0, 8)}...`,
          apiError: apiError.message,
          adminEmail: adminEmail || "Not set",
        },
      })
    }
  } catch (error: any) {
    console.error("Test email API error:", error)
    return NextResponse.json({
      success: false,
      error: "Internal server error",
      debug: {
        error: error.message,
      },
    })
  }
}
