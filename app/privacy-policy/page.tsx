import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-yellow-400 text-black rounded-full">
                <span className="text-lg font-bold">🐝</span>
              </div>
            </div>
            <span className="text-xl font-bold">CPABee</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8 md:py-12 max-w-3xl">
        <Button variant="outline" className="mb-6" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose max-w-none">
          <p>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2>1. Introduction</h2>
          <p>
            At CPABee, we respect your privacy and are committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, and safeguard your information when you use our website and services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Email address, name (if provided), and payment information when you
              make a purchase.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our website, including pages visited, time
              spent on pages, and other analytical data.
            </li>
            <li>
              <strong>Device Information:</strong> Information about the device you use to access our website, including
              IP address, browser type, and operating system.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To process payments and deliver purchased reports</li>
            <li>To send you important updates about our services</li>
            <li>To improve our website and services</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>4. Analytics and Tracking</h2>
          <p>
            We use Google Analytics to help us understand how visitors interact with our website. Google Analytics uses
            cookies and similar technologies to collect information about your use of our website and may transmit this
            information to Google servers in the United States or other countries.
          </p>
          <p>The information collected by Google Analytics includes:</p>
          <ul>
            <li>Pages visited and time spent on each page</li>
            <li>Referring websites or sources</li>
            <li>Technical information about your device, browser, and operating system</li>
            <li>Geographic location (typically at the city level)</li>
          </ul>
          <p>
            We use this information to improve our website and services. Google Analytics does not identify individual
            users or associate your IP address with any other data held by Google.
          </p>
          <p>
            You can opt out of Google Analytics by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            We may use third-party services, such as payment processors and analytics providers, that collect, use, and
            process information on our behalf. These third parties have their own privacy policies addressing how they
            use such information.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to correct inaccurate or incomplete data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to restrict or object to our processing of your data</li>
            <li>The right to data portability</li>
          </ul>

          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
            information from children. If you are a parent or guardian and believe your child has provided us with
            personal information, please contact us.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>10. Disclaimer Regarding CPA Exam Content</h2>
          <p>
            CPABee analyzes what users are studying and discussing regarding the CPA exam. We do not have access to
            actual exam content or questions. Our reports are based on publicly available information and user
            discussions, and should not be considered a guarantee of what will appear on the exam.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:info@cpabee.com">info@cpabee.com</a>.
          </p>
        </div>
      </main>

      <footer className="border-t py-8 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-6 w-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-yellow-400 text-black rounded-full">
                    <span className="text-xs font-bold">🐝</span>
                  </div>
                </div>
                <span className="text-sm font-medium">CPABee</span>
              </Link>
            </div>

            <div className="flex gap-4 text-sm">
              <Link href="/terms-of-service" className="text-gray-600 hover:text-yellow-600">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-yellow-600">
                Privacy Policy
              </Link>
            </div>

            <div className="text-sm text-gray-500">
              <p>© {new Date().getFullYear()} CPABee. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
