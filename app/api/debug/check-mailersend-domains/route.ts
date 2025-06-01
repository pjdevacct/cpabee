import { NextResponse } from "next/server"

export async function GET() {
  try {
    const MAILSEND_TOKEN = process.env.MAILSEND_TOKEN

    if (!MAILSEND_TOKEN) {
      return NextResponse.json({
        success: false,
        error: "MAILSEND_TOKEN not found",
      })
    }

    console.log("Checking MailerSend domains...")

    // Check what domains are available in your MailerSend account
    const response = await fetch("https://api.mailersend.com/v1/domains", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${MAILSEND_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json().catch(() => ({}))

    console.log("MailerSend domains response:", response.status, data)

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `MailerSend API error: ${data.message || response.statusText}`,
        status: response.status,
        response: data,
      })
    }

    // Extract domain information
    const domains = data.data || []
    const verifiedDomains = domains.filter((domain: any) => domain.domain_settings?.send_paused === false)

    return NextResponse.json({
      success: true,
      totalDomains: domains.length,
      verifiedDomains: verifiedDomains.length,
      domains: domains.map((domain: any) => ({
        name: domain.name,
        verified: domain.domain_settings?.send_paused === false,
        status: domain.domain_settings?.send_paused ? "paused" : "active",
        settings: domain.domain_settings,
      })),
      recommendation:
        verifiedDomains.length > 0
          ? `Use one of your verified domains: ${verifiedDomains.map((d: any) => d.name).join(", ")}`
          : "You need to verify a domain in your MailerSend account first",
    })
  } catch (error: any) {
    console.error("Error checking MailerSend domains:", error)
    return NextResponse.json({
      success: false,
      error: `Failed to check domains: ${error.message}`,
    })
  }
}
