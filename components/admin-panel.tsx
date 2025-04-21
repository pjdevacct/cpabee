"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Signup {
  email: string
  source: string
  timestamp: string
}

export default function AdminPanel() {
  const [signups, setSignups] = useState<Signup[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Load signups from localStorage
    try {
      const storedSignups = JSON.parse(localStorage.getItem("cpabee_signups") || "[]")
      setSignups(storedSignups)
    } catch (error) {
      console.error("Failed to load signups:", error)
    }
  }, [])

  const clearSignups = () => {
    localStorage.removeItem("cpabee_signups")
    setSignups([])
  }

  const copyToClipboard = () => {
    const text = signups.map((signup) => `${signup.email}, ${signup.source}, ${signup.timestamp}`).join("\n")
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err))
  }

  // Secret key combination to show admin panel: Ctrl+Alt+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "a") {
        setIsVisible((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Admin Panel - Stored Signups</h2>
          <Button variant="outline" onClick={() => setIsVisible(false)}>
            Close
          </Button>
        </div>

        {signups.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No signups stored locally</p>
        ) : (
          <>
            <div className="mb-4 flex justify-between">
              <p>Total signups: {signups.length}</p>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  Copy to Clipboard
                </Button>
                <Button variant="destructive" size="sm" onClick={clearSignups}>
                  Clear All
                </Button>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Source</th>
                    <th className="p-2 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((signup, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{signup.email}</td>
                      <td className="p-2">{signup.source}</td>
                      <td className="p-2">{new Date(signup.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
