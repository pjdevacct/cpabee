"use client"

import { Card } from "@/components/ui/card"
import { PieChart } from "lucide-react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

// Import the chart component with SSR disabled
const ChartWrapper = dynamic(() => import("@/components/topic-distribution-chart"), {
  ssr: false,
})

interface ChartSectionProps {
  chartData: any[]
}

export default function ChartSection({ chartData }: ChartSectionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="p-4 md:p-6 shadow-md">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 flex items-center">
          <PieChart className="mr-2 h-5 w-5 text-yellow-500" />
          FAR Topic Distribution
        </h3>
        <div className="h-[350px] md:h-[300px] w-full">
          <ChartWrapper data={chartData} colors={["#EAB308", "#FB923C", "#38BDF8", "#10B981", "#8B5CF6", "#EC4899"]} />
        </div>
      </Card>
    </motion.div>
  )
}
