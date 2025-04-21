"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handlePaymentSuccess } from "../actions/payment"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [name, setName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const amount = searchParams.get("amount") || "0"
  const item = searchParams.get("item") || "CPA Report"

  // Format amount from cents to dollars
  const formattedAmount = (Number.parseInt(amount) / 100).toFixed(2)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError("")

    try {
      // In a real implementation, you would use the Square SDK to process the payment
      // This is just a simulation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate a successful payment
      const paymentId = `sq_${Math.random().toString(36).substring(2, 15)}`

      // Handle the successful payment
      const result = await handlePaymentSuccess(paymentId)

      if (result.success) {
        // Redirect to success page
        router.push(
          `/checkout/success?message=${encodeURIComponent(result.message || "")}&item=${encodeURIComponent(item)}`,
        )
      } else {
        setError(result.message || "Payment processing failed. Please try again.")
        setIsProcessing(false)
      }
    } catch (error) {
      console.error("Payment processing error:", error)
      setError("Payment processing failed. Please try again.")
      setIsProcessing(false)
    }
  }

  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "")
    let formattedValue = ""

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " "
      }
      formattedValue += value[i]
    }

    setCardNumber(formattedValue)
  }

  // Format expiry date
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 2) {
      setExpiry(value)
    } else {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`)
    }
  }

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>
            You're purchasing: {item} for ${formattedAmount}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    required
                    value={expiry}
                    onChange={handleExpiryChange}
                    maxLength={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    maxLength={3}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay $${formattedAmount}`
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-xs text-gray-500">Secure payment processing by Square</p>
        </CardFooter>
      </Card>
    </div>
  )
}
