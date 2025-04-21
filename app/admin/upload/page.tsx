"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function UploadReportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [reportType, setReportType] = useState("SAMPLE")
  const [adminSecret, setAdminSecret] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; url?: string; error?: string; details?: string } | null>(
    null,
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile || !reportType || !adminSecret) return

    setIsUploading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("reportType", reportType)
      formData.append("file", selectedFile)

      const response = await fetch("/api/admin/upload-report", {
        method: "POST",
        headers: {
          "x-admin-secret": adminSecret,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, url: data.url })
      } else {
        setResult({
          success: false,
          error: data.error || "Failed to upload report",
          details: data.details || "No additional details available",
        })
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: "An unexpected error occurred",
        details: error.message || "Check the console for more information",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Upload CPA Report</CardTitle>
          <CardDescription>Upload PDF reports to the Vercel Blob storage</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminSecret">Admin Secret</Label>
              <Input
                id="adminSecret"
                type="password"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                required
                placeholder="Enter admin secret"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="SAMPLE">Sample Report</option>
                <option value="AUD">AUD - Auditing and Attestation</option>
                <option value="FAR">FAR - Financial Accounting and Reporting</option>
                <option value="REG">REG - Taxation and Regulation</option>
                <option value="TCP">TCP - Tax Compliance and Planning</option>
                <option value="ISC">ISC - Information Systems and Control</option>
                <option value="BAR">BAR - Business Analysis and Reporting</option>
                <option value="ALL">ALL - Bundle of All Reports</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Report PDF</Label>
              <Input id="file" type="file" accept=".pdf" onChange={handleFileChange} required />
              {selectedFile && (
                <p className="text-xs text-gray-500">
                  Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Report"
              )}
            </Button>
          </form>
        </CardContent>
        {result && (
          <CardFooter className="flex flex-col items-start">
            {result.success ? (
              <div className="text-green-600">
                <p className="font-medium">Upload successful!</p>
                <p className="text-sm break-all mt-1">URL: {result.url}</p>
                <p className="text-xs mt-2">Add this URL to your environment variables as {reportType}_REPORT_URL</p>
              </div>
            ) : (
              <div className="text-red-600">
                <p className="font-medium">Upload failed</p>
                <p className="text-sm mt-1">{result.error}</p>
                {result.details && <p className="text-xs mt-1 bg-red-50 p-2 rounded">Details: {result.details}</p>}
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
