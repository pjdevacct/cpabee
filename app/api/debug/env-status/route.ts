import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check environment variables (don't expose actual values for security)
    const envStatus = {
      mailsendToken: !!process.env.MAILSEND_TOKEN,
      adminEmail: process.env.ADMIN_EMAIL || null,
      squareToken: !!process.env.SQUARE_ACCESS_TOKEN,
      squareLocationId: !!process.env.SQUARE_LOCATION_ID,
      blobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      adminSecret: !!process.env.ADMIN_SECRET,
      nodeEnv: process.env.NODE_ENV,
      vercelUrl: process.env.VERCEL_URL,
    }

    // Additional debug info
    const debugInfo = {
      ...envStatus,
      timestamp: new Date().toISOString(),
      // Show first few characters of tokens for debugging (if they exist)
      mailsendTokenPreview: process.env.MAILSEND_TOKEN ? `${process.env.MAILSEND_TOKEN.substring(0, 8)}...` : null,
    }

    return NextResponse.json(debugInfo)
  } catch (error) {
    console.error("Error checking environment variables:", error)
    return NextResponse.json(
      {
        error: "Failed to check environment variables",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
