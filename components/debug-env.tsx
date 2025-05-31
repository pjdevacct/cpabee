"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function DebugEnv() {
  const [isVisible, setIsVisible] = useState(false)
  const [envStatus, setEnvStatus] = useState<any>(null)
  const [domainCheck, setDomainCheck] = useState<any>(null)
  const [isCheckingDomains, setIsCheckingDomains] = useState(false)
  const [testEmailAddress, setTestEmailAddress] = useState("")
  const [isTestingNotification, setIsTestingNotification] = useState(false)
  const [notificationTestResult, setNotificationTestResult] = useState<any>(null)

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

  const checkMailerSendDomains = async () => {
    setIsCheckingDomains(true)
    try {
      const response = await fetch("/api/debug/check-mailersend-domains")
      const data = await response.json()
      setDomainCheck(data)
    } catch (error) {
      console.error("Failed to check MailerSend domains:", error)
      setDomainCheck({ error: "Failed to check MailerSend domains" })
    } finally {
      setIsCheckingDomains(false)
    }
  }

  const testAdminNotification = async () => {
    if (!testEmailAddress || !/^\S+@\S+\.\S+$/.test(testEmailAddress)) {
      setNotificationTestResult({
        success: false,
        error: "Please enter a valid email address",
      })
      return
    }

    setIsTestingNotification(true)
    setNotificationTestResult(null)

    try {
      const response = await fetch("/api/debug/test-admin-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testEmail: testEmailAddress,
        }),
      })

      const data = await response.json()
      setNotificationTestResult(data)
    } catch (error) {
      console.error("Failed to test admin notification:", error)
      setNotificationTestResult({
        success: false,
        error: "Failed to test admin notification",
      })
    } finally {
      setIsTestingNotification(false)
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

              <div className="border rounded p-3 bg-yellow-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">MailerSend Domain Check</h3>
                  <Button onClick={checkMailerSendDomains} disabled={isCheckingDomains} size="sm">
                    {isCheckingDomains ? "Checking..." : "Check Domains"}
                  </Button>
                </div>

                {domainCheck && (
                  <div className="space-y-2 text-sm">
                    {domainCheck.success ? (
                      <div>
                        <p>
                          <strong>Status:</strong> <span className="text-green-600">✓ Connected to MailerSend</span>
                        </p>
                        <p>
                          <strong>Total Domains:</strong> {domainCheck.totalDomains}
                        </p>
                        <p>
                          <strong>Verified Domains:</strong> {domainCheck.verifiedDomains}
                        </p>

                        {domainCheck.domains && domainCheck.domains.length > 0 && (
                          <div className="mt-3">
                            <p className="font-medium">Your Domains:</p>
                            <ul className="mt-1 space-y-1">
                              {domainCheck.domains.map((domain: any, index: number) => (
                                <li key={index} className="flex items-center gap-2">
                                  <span className={domain.verified ? "text-green-600" : "text-red-600"}>
                                    {domain.verified ? "✓" : "✗"}
                                  </span>
                                  <span>{domain.name}</span>
                                  <span className="text-gray-500">({domain.status})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-3 p-3 bg-blue-50 rounded">
                          <p className="font-medium text-blue-800">Recommendation:</p>
                          <p className="text-blue-700">{domainCheck.recommendation}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>
                          <strong>Status:</strong> <span className="text-red-600">✗ Failed</span>
                        </p>
                        <p>
                          <strong>Error:</strong> <span className="text-red-600">{domainCheck.error}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="border rounded p-3 bg-green-50">
                <h3 className="font-semibold mb-3">Test Admin Notification</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Test if admin notifications are working by simulating a sample request.
                </p>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter test customer email"
                      value={testEmailAddress}
                      onChange={(e) => setTestEmailAddress(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={testAdminNotification}
                      disabled={isTestingNotification}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isTestingNotification ? "Testing..." : "Test Notification"}
                    </Button>
                  </div>

                  {notificationTestResult && (
                    <div
                      className={`p-4 rounded text-sm ${
                        notificationTestResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      <p className="font-medium text-base mb-2">
                        {notificationTestResult.success ? "✅ Success!" : "❌ Failed"}
                      </p>
                      <p className="mb-2">{notificationTestResult.message || notificationTestResult.error}</p>

                      {notificationTestResult.debug && (
                        <details className="mt-3">
                          <summary className="cursor-pointer font-medium">Debug Information</summary>
                          <pre className="mt-2 p-2 bg-white/50 rounded text-xs overflow-auto max-h-40">
                            {JSON.stringify(notificationTestResult.debug, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded p-3 bg-blue-50">
                <h3 className="font-semibold mb-2">Current Status & Next Steps</h3>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Issue:</strong> MailerSend requires domain verification even for trial accounts.
                  </p>
                  <p>
                    <strong>Current Solution:</strong> Admin notifications should work, customer emails are disabled.
                  </p>

                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="font-medium mb-2">To Fix Customer Email Delivery:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to your MailerSend dashboard</li>
                      <li>Add and verify a domain (like cpabee.com)</li>
                      <li>Update the code to use your verified domain</li>
                      <li>Or upgrade to a paid plan for more flexibility</li>
                    </ol>
                  </div>

                  <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                    <p className="font-medium text-green-800 mb-1">For Now:</p>
                    <p className="text-green-700">
                      Admin notifications should work. Test them above, then try requesting a sample report to see if
                      you get notified.
                    </p>
                  </div>
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
