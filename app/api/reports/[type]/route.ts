import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// This is a protected API route that serves report files
export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    // Get the report type from the URL
    const reportType = params.type.toUpperCase()

    // Get the token from the request
    const token = request.nextUrl.searchParams.get("token")

    // If no token is provided, return 401
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Verify the token (in a real app, use a more secure method)
    const cookieStore = cookies()
    const storedToken = cookieStore.get(`report_token_${reportType}`)?.value

    if (!storedToken || token !== storedToken) {
      return new NextResponse("Invalid token", { status: 403 })
    }

    // Map report type to file path
    const reportFilePath = getReportFilePath(reportType)

    // If the report doesn't exist, return 404
    if (!reportFilePath) {
      return new NextResponse("Report not found", { status: 404 })
    }

    // Redirect to the report file
    // In a production app, you would generate a signed URL with limited time validity
    return NextResponse.redirect(reportFilePath)
  } catch (error) {
    console.error("Error serving report:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// Helper function to map report type to file path
function getReportFilePath(reportType: string): string | null {
  // In a real app, these would be paths to your Vercel Blob storage
  const reportPaths: Record<string, string> = {
    AUD: "/reports/AUD_Report.pdf",
    FAR: "/reports/FAR_Report.pdf",
    REG: "/reports/REG_Report.pdf",
    TCP: "/reports/TCP_Report.pdf",
    ISC: "/reports/ISC_Report.pdf",
    BAR: "/reports/BAR_Report.pdf",
    ALL: "/reports/All_Reports.pdf", // Bundle of all reports
    SAMPLE: "/reports/Sample_Report.pdf", // Free sample report
  }

  return reportPaths[reportType] || null
}
