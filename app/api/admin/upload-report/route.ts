import { type NextRequest, NextResponse } from "next/server"
import { uploadReport } from "@/lib/report-storage"

// This is a simple admin API to upload reports
// In production, you should add proper authentication
export async function POST(request: NextRequest) {
  try {
    // Check for admin secret to prevent unauthorized uploads
    const adminSecret = request.headers.get("x-admin-secret")
    if (adminSecret !== process.env.ADMIN_SECRET) {
      console.error("Unauthorized upload attempt with incorrect admin secret")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const reportType = formData.get("reportType") as string
    const file = formData.get("file") as File

    if (!reportType || !file) {
      console.error("Missing required fields:", { reportType: !!reportType, file: !!file })
      return NextResponse.json({ error: "Missing reportType or file" }, { status: 400 })
    }

    // Validate report type
    const validReportTypes = ["AUD", "FAR", "REG", "TCP", "ISC", "BAR", "ALL", "SAMPLE"]
    if (!validReportTypes.includes(reportType)) {
      console.error("Invalid report type:", reportType)
      return NextResponse.json({ error: "Invalid report type" }, { status: 400 })
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      console.error("Invalid file type:", file.type)
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    console.log("Starting upload for report type:", reportType, "file:", file.name, "size:", file.size)

    // Upload the report
    try {
      const url = await uploadReport(reportType as any, file)
      console.log("Upload successful:", url)
      return NextResponse.json({ success: true, url })
    } catch (uploadError: any) {
      console.error("Error in uploadReport function:", uploadError.message || uploadError)
      return NextResponse.json(
        {
          error: "Failed to upload to Vercel Blob",
          details: uploadError.message || "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Unhandled error in upload API:", error)
    return NextResponse.json(
      {
        error: "Failed to upload report",
        details: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
