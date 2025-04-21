"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

interface PayPalCheckoutButtonProps {
  amount: string
  itemName: string
  onSuccess: (details: any) => void
  onError: (error: any) => void
}

declare global {
  interface Window {
    paypal?: any
  }
}

export default function PayPalCheckoutButton({ amount, itemName, onSuccess, onError }: PayPalCheckoutButtonProps) {
  const paypalButtonRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState<string | null>(null)

  // Load the PayPal SDK
  useEffect(() => {
    const loadPayPalScript = () => {
      setIsLoading(true)
      setScriptError(null)

      // Check if the script is already loaded
      if (window.paypal) {
        console.log("PayPal SDK already loaded")
        setScriptLoaded(true)
        setIsLoading(false)
        return
      }

      console.log("Loading PayPal SDK...")

      // Create the script element
      const script = document.createElement("script")
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AVvCrlrR_ilRDujegiWTwJJnm8NgIwapO5VVRj-rn1IULNQ-CBwGAXAUF2P7VIBWbvKPFeTl9mWWpj5L&currency=USD"
      script.async = true

      // Set up event handlers
      script.onload = () => {
        console.log("PayPal SDK loaded successfully")
        setScriptLoaded(true)
        setIsLoading(false)
      }

      script.onerror = (e) => {
        console.error("PayPal SDK failed to load:", e)
        setScriptError("Failed to load PayPal SDK. Please check your internet connection and try again.")
        setIsLoading(false)
      }

      // Add the script to the document
      document.body.appendChild(script)

      // Clean up
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }

    loadPayPalScript()
  }, [])

  // Render the PayPal button once the SDK is loaded
  useEffect(() => {
    if (!scriptLoaded || !paypalButtonRef.current || !window.paypal) return

    // Clear any existing buttons
    paypalButtonRef.current.innerHTML = ""

    try {
      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: itemName,
                  amount: {
                    value: amount,
                  },
                },
              ],
            })
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture()
            onSuccess(order)
          },
          onError: (err: any) => {
            console.error("PayPal error:", err)
            onError(err)
          },
        })
        .render(paypalButtonRef.current)
    } catch (error) {
      console.error("Error rendering PayPal buttons:", error)
      setScriptError("Failed to render PayPal buttons")
    }
  }, [scriptLoaded, amount, itemName, onSuccess, onError])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
        <span className="ml-2">Loading PayPal...</span>
      </div>
    )
  }

  if (scriptError) {
    return (
      <div className="text-red-500 text-center py-4 border border-red-200 rounded-md bg-red-50 p-4">
        <p className="font-medium">{scriptError}</p>
        <p className="text-sm mt-2">Please try refreshing the page or contact support at info@cpabee.com</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm transition-colors"
        >
          Refresh Page
        </button>
      </div>
    )
  }

  return <div ref={paypalButtonRef} className="w-full"></div>
}
