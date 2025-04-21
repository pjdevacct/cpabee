"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"
import { handlePaymentSuccess } from "@/app/actions/payment"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [message, setMessage] = useState("Processing your payment...")
  const [error, setError] = useState("")

  // Process the payment on page load
  useEffect(() => {
    const processPayment = async () => {
      try {
        // Get the payment ID from the URL
        const paymentId = searchParams.get("payment_id") || "unknown"

        // Handle the successful payment
        const result = await handlePaymentSuccess(paymentId)

        if (result.success) {
          setMessage(result.message || "Your purchase was successful!")
        } else {
          setError(result.message || "There was an issue processing your payment.")
        }
      } catch (err) {
        console.error("Error processing payment:", err)
        setError("There was an issue processing your payment. Please contact support.")
      } finally {
        setIsProcessing(false)
      }
    }

    processPayment()
  }, [searchParams])

  // Redirect to home after 10 seconds if successful
  useEffect(() => {
    if (!isProcessing && !error) {
      const timer = setTimeout(() => {
        router.push("/")
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isProcessing, error, router])

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader className="text-center">
          {isProcessing ? (
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Loader2 className="h-6 w-6 text-yellow-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          ) : (
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          )}
          <CardTitle className="text-xl">
            {isProcessing ? "Processing Payment" : error ? "Payment Issue" : "Payment Successful!"}
          </CardTitle>
          <CardDescription>
            {error ? "We encountered a problem with your payment" : "Thank you for your purchase"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">{error || message}</p>
          {!isProcessing && (
            <p className="text-sm text-gray-500">
              {error
                ? "Please contact support if you believe this is an error."
                : "You will be redirected to the homepage in a few seconds, or you can click the button below."}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => router.push("/")}
            className={`${error ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600"} text-black`}
          >
            {error ? "Contact Support" : "Return to Homepage"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
