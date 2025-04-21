import { type NextRequest, NextResponse } from "next/server"
import { uploadReport } from "@/lib/report-storage"

// This is a simple admin API to upload reports
// In production, you should add proper authentication
export async function POST(request: NextRequest) {
  try {
    // Check for admin secret to prevent unauthorized uploads
    const adminSecret = request.headers.get("x-admin-secret")
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const reportType = formData.get("reportType") as string
    const file = formData.get("file") as File

    if (!reportType || !file) {
      return NextResponse.json({ error: "Missing reportType or file" }, { status: 400 })
    }

    // Validate report type
    const validReportTypes = ["AUD", "FAR", "REG", "TCP", "ISC", "BAR", "ALL", "SAMPLE"]
    if (!validReportTypes.includes(reportType)) {
      return NextResponse.json({ error: "Invalid report type" }, { status: 400 })
    }

    // Upload the report
    const url = await uploadReport(reportType as any, file)

    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Error uploading report:", error)
    return NextResponse.json({ error: "Failed to upload report" }, { status: 500 })
  }
}
