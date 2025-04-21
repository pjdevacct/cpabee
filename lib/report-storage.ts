import { put, list, del } from "@vercel/blob"
import type { ReportType } from "@/components/report-selector"

// Extended ReportType to include ALL and SAMPLE
export type ExtendedReportType = ReportType | "ALL" | "SAMPLE"

// Function to upload a report to Vercel Blob
export async function uploadReport(reportType: ExtendedReportType, file: File | Buffer) {
  try {
    console.log(`Starting upload for ${reportType} report, file type:`, typeof file)

    // Generate a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const filename = `${reportType}_Report_${timestamp}.pdf`

    console.log(`Uploading to path: reports/${reportType}/${filename}`)

    // Upload to Vercel Blob - using public access as required by the error message
    const blob = await put(`reports/${reportType}/${filename}`, file, {
      access: "public",
    })

    console.log(`Upload successful for ${reportType} report:`, blob.url)
    return blob.url
  } catch (error: any) {
    console.error(`Error uploading ${reportType} report:`, error.message || error)
    // Re-throw with more context for better debugging
    throw new Error(`Blob upload failed: ${error.message || "Unknown error"}`)
  }
}

// Function to get a signed URL for a report that expires after a certain time
export async function getSignedReportUrl(reportType: ExtendedReportType): Promise<string | null> {
  try {
    // First try to get the URL from environment variables
    const envUrl = getReportUrlFromEnv(reportType)
    if (envUrl) return envUrl

    // If not found in env vars, try to get the latest report from Blob storage
    const blobs = await list({ prefix: `reports/${reportType}/` })

    if (blobs.blobs.length === 0) {
      console.error(`No reports found for type: ${reportType}`)
      return null
    }

    // Get the most recent report (assuming they're named with timestamps)
    const latestBlob = blobs.blobs.sort((a, b) => {
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    })[0]

    // For now, just return the URL directly since we can't generate a signed URL
    // In a production environment, you would want to implement proper URL signing
    // This is a temporary workaround until we resolve the signed URL issue
    return latestBlob.url

    // Note: When the correct function becomes available, replace the above line with:
    // return await someSigningFunction(latestBlob.url, { expiresIn: 60 * 60 * 24 });
  } catch (error) {
    console.error(`Error getting signed URL for ${reportType} report:`, error)
    return null
  }
}

// Function to delete old reports (e.g., for cleanup)
export async function deleteOldReports(reportType: ExtendedReportType, keepLatest = 1) {
  try {
    const blobs = await list({ prefix: `reports/${reportType}/` })

    if (blobs.blobs.length <= keepLatest) {
      return { deleted: 0 }
    }

    // Sort by upload date (newest first)
    const sortedBlobs = blobs.blobs.sort((a, b) => {
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    })

    // Keep the latest N, delete the rest
    const blobsToDelete = sortedBlobs.slice(keepLatest)

    let deletedCount = 0
    for (const blob of blobsToDelete) {
      await del(blob.url)
      deletedCount++
    }

    return { deleted: deletedCount }
  } catch (error) {
    console.error(`Error deleting old ${reportType} reports:`, error)
    throw error
  }
}

// Helper function to get report URL from environment variables
function getReportUrlFromEnv(reportType: ExtendedReportType): string | null {
  const envVarName = `${reportType}_REPORT_URL`
  return process.env[envVarName] || null
}
