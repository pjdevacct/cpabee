"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function VersionInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const [versionInfo, setVersionInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Secret key combination to show version info: Ctrl+Alt+V
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "v") {
        setIsVisible((prev) => !prev)
        if (!isVisible) {
          fetchVersionInfo()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isVisible])

  const fetchVersionInfo = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/version")
      const data = await response.json()
      setVersionInfo(data)
    } catch (error) {
      console.error("Failed to fetch version info:", error)
      setVersionInfo({
        success: false,
        error: "Failed to fetch deployment information",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🐝 CPABee Deployment Info</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchVersionInfo} disabled={isLoading}>
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="outline" onClick={() => setIsVisible(false)}>
              Close
            </Button>
          </div>
        </div>

        {versionInfo ? (
          <div className="space-y-4">
            {versionInfo.success ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded p-3">
                    <h3 className="font-semibold mb-2 text-green-600">🚀 Current Deployment</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>URL:</strong> {versionInfo.deployment.vercelUrl || "Not available"}
                      </p>
                      <p>
                        <strong>Environment:</strong>
                        <span
                          className={`ml-1 px-2 py-1 rounded text-xs ${
                            versionInfo.deployment.nodeEnv === "production"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {versionInfo.deployment.nodeEnv || "Unknown"}
                        </span>
                      </p>
                      <p>
                        <strong>Deployed:</strong> {new Date(versionInfo.deployment.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border rounded p-3">
                    <h3 className="font-semibold mb-2 text-blue-600">📝 Git Information</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Repository:</strong> {versionInfo.deployment.vercelGitRepoOwner}/
                        {versionInfo.deployment.vercelGitRepoSlug || "Not available"}
                      </p>
                      <p>
                        <strong>Branch:</strong>
                        <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {versionInfo.deployment.vercelGitCommitRef || "Unknown"}
                        </span>
                      </p>
                      <p>
                        <strong>Provider:</strong> {versionInfo.deployment.vercelGitProvider || "Unknown"}
                      </p>
                      {versionInfo.deployment.vercelGitPullRequestId && (
                        <p>
                          <strong>PR:</strong> #{versionInfo.deployment.vercelGitPullRequestId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border rounded p-3">
                  <h3 className="font-semibold mb-2 text-purple-600">💾 Latest Commit</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <strong>Commit:</strong>
                      <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                        {versionInfo.deployment.shortCommitSha || "Unknown"}
                      </code>
                      {versionInfo.deployment.vercelGitCommitSha && (
                        <span className="text-gray-500 text-xs">
                          (Full: {versionInfo.deployment.vercelGitCommitSha})
                        </span>
                      )}
                    </div>
                    {versionInfo.deployment.vercelGitCommitMessage && (
                      <p>
                        <strong>Message:</strong>
                        <span className="ml-1 italic">"{versionInfo.deployment.vercelGitCommitMessage}"</span>
                      </p>
                    )}
                    {versionInfo.deployment.vercelGitCommitAuthorName && (
                      <p>
                        <strong>Author:</strong> {versionInfo.deployment.vercelGitCommitAuthorName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-3">
                  <h4 className="font-medium text-sm mb-2">🔍 Quick Check</h4>
                  <div className="text-xs space-y-1">
                    <p>
                      • <strong>Is this production?</strong>{" "}
                      {versionInfo.deployment.nodeEnv === "production" ? "✅ Yes" : "⚠️ No"}
                    </p>
                    <p>
                      • <strong>Latest commit?</strong> Check your Git history to compare with{" "}
                      {versionInfo.deployment.shortCommitSha}
                    </p>
                    <p>
                      • <strong>Correct branch?</strong> Currently deployed from{" "}
                      <strong>{versionInfo.deployment.vercelGitCommitRef}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-600">❌ {versionInfo.error}</p>
                <p className="text-sm text-gray-500 mt-2">
                  This might happen in local development. Try this on your deployed site.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>Loading deployment information...</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t text-xs text-gray-500">
          <p>
            <strong>💡 Tip:</strong> Press <kbd className="px-1 py-0.5 bg-gray-200 rounded">Ctrl+Alt+V</kbd> anytime to
            check deployment info
          </p>
        </div>
      </Card>
    </div>
  )
}
