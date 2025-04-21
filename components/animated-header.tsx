"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function AnimatedHeader() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="container flex h-16 items-center justify-between py-4">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative h-8 w-8 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-yellow-400 text-black rounded-full">
              <span className="text-lg font-bold">🐝</span>
            </div>
          </div>
          <span className="text-xl font-bold">CPABee</span>
        </motion.div>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-yellow-600 transition-colors">
            Features
          </Link>
          <Link href="#trending" className="text-sm font-medium hover:text-yellow-600 transition-colors">
            Trending Topics
          </Link>
          <Link href="#why" className="text-sm font-medium hover:text-yellow-600 transition-colors">
            Why CPABee
          </Link>
        </nav>
        <div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Sign Up Free</Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
