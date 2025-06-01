"use client"

import { useState } from "react"
import { X, Clock, TrendingUp } from "lucide-react"

export default function DeliveryBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-pulse" />
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base font-medium">
                <span className="font-bold">High Volume Notice:</span> Report delivery may take up to 24 hours to ensure
                you receive the latest available data and trending insights.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 hover:bg-yellow-600 rounded-full transition-colors shrink-0"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
