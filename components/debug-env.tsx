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

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Environment Variables Debug</h2>
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
                  <h3 className="font-semibold">Email API Test</h3>
                  <Button onClick={testEmailAPI} disabled={isTestingEmail} size="sm">
                    {isTestingEmail ? "Testing..." : "Test Email API"}
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
                    {emailTest.debug && (
                      <details className="mt-2">
                        <summary className="cursor-pointer font-medium">Debug Details</summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                          {JSON.stringify(emailTest.debug, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                )}
              </div>

              <div className="border rounded p-3 bg-blue-50">
                <h3 className="font-semibold mb-3">Send Test Email</h3>
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
                      onClick={sendTestEmail}
                      disabled={isSendingTestEmail}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSendingTestEmail ? "Sending..." : "Send Test"}
                    </Button>
                  </div>

                  {testEmailResult && (
                    <div
                      className={`p-3 rounded text-sm ${
                        testEmailResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      <p className="font-medium">{testEmailResult.success ? "✅ Success!" : "❌ Failed"}</p>
                      <p>{testEmailResult.message || testEmailResult.error}</p>
                      {testEmailResult.debug && (
                        <details className="mt-2">
                          <summary className="cursor-pointer">Debug Info</summary>
                          <pre className="mt-1 text-xs overflow-auto">
                            {JSON.stringify(testEmailResult.debug, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded p-3">
                <h3 className="font-semibold mb-2">Other Configuration</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>BLOB_READ_WRITE_TOKEN:</strong>{" "}
                    <span className={envStatus.blobToken ? "text-green-600" : "text-red-600"}>
                      {envStatus.blobToken ? "✓ Set" : "✗ Missing"}
                    </span>
                  </p>
                  <p>
                    <strong>ADMIN_SECRET:</strong>{" "}
                    <span className={envStatus.adminSecret ? "text-green-600" : "text-red-600"}>
                      {envStatus.adminSecret ? "✓ Set" : "✗ Missing"}
                    </span>
                  </p>
                  <p>
                    <strong>NODE_ENV:</strong> {envStatus.nodeEnv || "Not set"}
                  </p>
                  <p>
                    <strong>VERCEL_URL:</strong> {envStatus.vercelUrl || "Not set"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded">
              <h3 className="font-semibold mb-2">Next Steps</h3>
              <div className="text-sm space-y-2">
                <p>
                  <strong>1. Redeploy:</strong> If you just updated your MAILSEND_TOKEN, make sure to redeploy your
                  Vercel application.
                </p>
                <p>
                  <strong>2. Test API:</strong> Click "Test Email API" to verify your token works.
                </p>
                <p>
                  <strong>3. Send Test Email:</strong> Enter your email above and click "Send Test" to receive an actual
                  test email.
                </p>
                <p>
                  <strong>4. Check Results:</strong> If the test email works, your sample report system should work too!
                </p>
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
