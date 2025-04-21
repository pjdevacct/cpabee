"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function AnimatedHero() {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            What's Buzzing on the CPA Exam?
          </h1>
          <p className="text-xl text-gray-500 md:text-2xl">
            We scan discussion boards so you don't have to. Get real-time intel on the topics CPA candidates are talking
            about most.
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-yellow-600">Why it matters:</span> The topics candidates discuss most
            are often the ones most heavily tested. Optimize your limited study time by focusing on what's actually
            appearing on the exam.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" asChild>
                <Link href="#trending">Get Started</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50" asChild>
                <Link href="#trending">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="relative h-[300px] md:h-[400px] lg:h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/images/bee-studying.png"
            alt="Bee studying CPA materials"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
