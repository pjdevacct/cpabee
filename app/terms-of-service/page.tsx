import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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

        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="prose max-w-none">
          <p>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to CPABee. These Terms of Service govern your use of our website and the reports and services we
            provide. By accessing or using CPABee, you agree to be bound by these Terms.
          </p>

          <h2>2. Use of Services</h2>
          <p>
            CPABee provides reports and analysis of trending topics related to the CPA exam. Our services are intended
            to supplement your CPA exam preparation and should not be used as your sole study resource.
          </p>

          <h2>3. Disclaimers</h2>
          <p>
            <strong>3.1 Supplementary Resource:</strong> CPABee is designed to be used alongside other study materials
            and resources. It is not intended to be the only study material a candidate uses for CPA exam preparation.
          </p>
          <p>
            <strong>3.2 No Guarantees:</strong> CPABee does not provide guarantees about what will be on the CPA exams.
            Our reports analyze what users are discussing and studying, but we cannot predict with certainty what will
            appear on any specific exam.
          </p>
          <p>
            <strong>3.3 Passing Scores:</strong> Using CPABee does not guarantee a passing score on the CPA exam.
            Success on the exam depends on many factors including your preparation, understanding of the material, and
            exam conditions.
          </p>
          <p>
            <strong>3.4 Report Content:</strong> The reports provided do not guarantee to cover all topics that will be
            on the exams. They represent our analysis of trending topics based on available data.
          </p>

          <h2>4. Intellectual Property and Licensing</h2>
          <p>
            <strong>4.1 Personal Use:</strong> Reports purchased from CPABee are for the purchaser's personal use only.
          </p>
          <p>
            <strong>4.2 No Sharing:</strong> Reports cannot be shared with others, including but not limited to friends,
            colleagues, study groups, or online forums.
          </p>
          <p>
            <strong>4.3 No Reselling:</strong> Reports cannot be resold, redistributed, or repurposed for commercial
            gain.
          </p>
          <p>
            <strong>4.4 Copyright:</strong> All content provided by CPABee, including reports, analysis, and website
            content, is protected by copyright law. Unauthorized reproduction or distribution is prohibited.
          </p>

          <h2>5. Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your email address and any account information.
            You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, CPABee shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use or
            inability to use our services.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
            posting the new Terms on our website. Your continued use of our services after such modifications
            constitutes your acceptance of the revised Terms.
          </p>

          <h2>8. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
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
