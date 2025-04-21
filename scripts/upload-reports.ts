import { uploadReport } from "../lib/report-storage"
import path from "path"

// This script helps upload reports to Vercel Blob
// To run: npx tsx scripts/upload-reports.ts

async function uploadReports() {
  console.log("Starting report uploads...")

  try {
    // Replace these paths with the actual paths to your report files
    const reports = [
      { type: "AUD", path: path.join(process.cwd(), "reports", "AUD_Report.pdf") },
      { type: "FAR", path: path.join(process.cwd(), "reports", "FAR_Report.pdf") },
      { type: "REG", path: path.join(process.cwd(), "reports", "REG_Report.pdf") },
      { type: "TCP", path: path.join(process.cwd(), "reports", "TCP_Report.pdf") },
      { type: "ISC", path: path.join(process.cwd(), "reports", "ISC_Report.pdf") },
      { type: "BAR", path: path.join(process.cwd(), "reports", "BAR_Report.pdf") },
      { type: "ALL", path: path.join(process.cwd(), "reports", "All_Reports.pdf") },
      { type: "SAMPLE", path: path.join(process.cwd(), "reports", "Sample_Report.pdf") },
    ]

    for (const report of reports) {
      console.log(`Uploading ${report.type} report...`)
      const url = await uploadReport(report.type as any, report.path)
      console.log(`Uploaded ${report.type} report: ${url}`)
      console.log(`Set this URL as ${report.type}_REPORT_URL in your environment variables`)
    }

    console.log("All reports uploaded successfully!")
  } catch (error) {
    console.error("Error uploading reports:", error)
  }
}

uploadReports()
