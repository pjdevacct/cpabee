"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function DebugEnv() {
  const [isVisible, setIsVisible] = useState(false)
  const [envStatus, setEnvStatus] = useState<any>(null)
  const [emailTest, setEmailTest] = useState<any>(null)
  const [isTestingEmail, setIsTestingEmail] = useState(false)
  const [testEmailAddress, setTestEmailAddress] = useState("")
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false)
  const [testEmailResult, setTestEmailResult] = useState<any>(null)
  const [isDetailedTest, setIsDetailedTest] = useState(false)
  const [detailedTestResult, setDetailedTestResult] = useState<any>(null)

  useEffect(() => {
    // Secret key combination to show debug panel: Ctrl+Alt+D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "d") {
        setIsVisible((prev) => !prev)
        if (!isVisible) {
          checkEnvStatus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isVisible])

  const checkEnvStatus = async () => {
    try {
      const response = await fetch("/api/debug/env-status")
      const data = await response.json()
      setEnvStatus(data)
    } catch (error) {
      console.error("Failed to check env status:", error)
      setEnvStatus({ error: "Failed to check environment variables" })
    }
  }

  const testEmailAPI = async () => {
    setIsTestingEmail(true)
    try {
      const response = await fetch("/api/debug/test-email")
      const data = await response.json()
      setEmailTest(data)
    } catch (error) {
      console.error("Failed to test email API:", error)
      setEmailTest({ error: "Failed to test email API" })
    } finally {
      setIsTestingEmail(false)
    }
  }

  const sendTestEmail = async () => {
    if (!testEmailAddress || !/^\S+@\S+\.\S+$/.test(testEmailAddress)) {
      setTestEmailResult({
        success: false,
        error: "Please enter a valid email address",
      })
      return
    }

    setIsSendingTestEmail(true)
    setTestEmailResult(null)

    try {
      const response = await fetch("/api/debug/send-test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testEmail: testEmailAddress,
        }),
      })

      const data = await response.json()
      setTestEmailResult(data)
    } catch (error) {
      console.error("Failed to send test email:", error)
      setTestEmailResult({
        success: false,
        error: "Failed to send test email",
      })
    } finally {
      setIsSendingTestEmail(false)
    }
  }

  const runDetailedTest = async () => {
    if (!testEmailAddress || !/^\S+@\S+\.\S+$/.test(testEmailAddress)) {
      setDetailedTestResult({
        success: false,
        error: "Please enter a valid email address",
      })
      return
    }

    setIsDetailedTest(true)
    setDetailedTestResult(null)

    try {
      const response = await fetch("/api/debug/detailed-email-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testEmail: testEmailAddress,
        }),
      })

      const data = await response.json()
      setDetailedTestResult(data)
    } catch (error) {
      console.error("Failed to run detailed test:", error)
      setDetailedTestResult({
        success: false,
        error: "Failed to run detailed test",
        step: "network_error",
      })
    } finally {
      setIsDetailedTest(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Email System Debug Panel</h2>
          <Button variant="outline" onClick={() => setIsVisible(false)}>
            Close
          </Button>
        </div>

        {envStatus ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded p-3">
                <h3 className="font-semibold mb-2">Email Configuration</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>MAILSEND_TOKEN:</strong>{" "}
                    <span className={envStatus.mailsendToken ? "text-green-600" : "text-red-600"}>
                      {envStatus.mailsendToken ? "✓ Set" : "✗ Missing"}
                    </span>
                    {envStatus.mailsendTokenPreview && (
                      <span className="text-gray-500 ml-2">({envStatus.mailsendTokenPreview})</span>
                    )}
                  </p>
                  <p>
                    <strong>ADMIN_EMAIL:</strong>{" "}
                    <span className={envStatus.adminEmail ? "text-green-600" : "text-red-600"}>
                      {envStatus.adminEmail || "✗ Missing"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Quick API Test</h3>
                  <Button onClick={testEmailAPI} disabled={isTestingEmail} size="sm">
                    {isTestingEmail ? "Testing..." : "Test API Connection"}
                  </Button>
                </div>
                {emailTest && (
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={emailTest.success ? "text-green-600" : "text-red-600"}>
                        {emailTest.success ? "✓ Working" : "✗ Failed"}
                      </span>
                    </p>
                    {emailTest.error && (
                      <p>
                        <strong>Error:</strong> <span className="text-red-600">{emailTest.error}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="border rounded p-3 bg-blue-50">
                <h3 className="font-semibold mb-3">Detailed Email Test</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={testEmailAddress}
                      onChange={(e) => setTestEmailAddress(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={runDetailedTest}
                      disabled={isDetailedTest}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isDetailedTest ? "Running..." : "Detailed Test"}
                    </Button>
                  </div>

                  {detailedTestResult && (
                    <div
                      className={`p-4 rounded text-sm ${
                        detailedTestResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      <p className="font-medium text-base mb-2">
                        {detailedTestResult.success ? "✅ Success!" : "❌ Failed"}
                      </p>
                      <p className="mb-2">{detailedTestResult.message || detailedTestResult.error}</p>

                      {detailedTestResult.step && (
                        <p className="mb-2">
                          <strong>Failed at step:</strong> {detailedTestResult.step}
                        </p>
                      )}

                      {detailedTestResult.debug && (
                        <details className="mt-3">
                          <summary className="cursor-pointer font-medium">Debug Information</summary>
                          <pre className="mt-2 p-2 bg-white/50 rounded text-xs overflow-auto max-h-40">
                            {JSON.stringify(detailedTestResult.debug, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded p-3 bg-yellow-50">
                <h3 className="font-semibold mb-2">Troubleshooting Guide</h3>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>1. Check Deployment:</strong> Make sure you redeployed after updating the MAILSEND_TOKEN.
                  </p>
                  <p>
                    <strong>2. Verify Token:</strong> Ensure your new MailerSend token is active and has "Email sending"
                    permission.
                  </p>
                  <p>
                    <strong>3. Check Logs:</strong> The detailed test will show exactly where the process fails.
                  </p>
                  <p>
                    <strong>4. Domain Issues:</strong> We're using MailerSend's trial domain - this should work without
                    verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>Loading environment status...</p>
          </div>
        )}
      </Card>
    </div>
  )
}
