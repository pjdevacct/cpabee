"use client"

import { BarChart } from "@/components/ui/chart"
import { useMobile } from "@/hooks/use-mobile"

interface ChartWrapperProps {
  data: any[]
  categories: string[]
  colors: string[]
  yAxisWidth: number
}

export default function ChartWrapper({ data, categories, colors, yAxisWidth }: ChartWrapperProps) {
  const isMobile = useMobile()

  // For mobile, we'll show fewer categories to avoid overcrowding
  const displayCategories = isMobile ? categories.slice(0, 3) : categories

  // For mobile, we'll simplify the data to show fewer data points
  const displayData = isMobile
    ? data.filter((_, i) => i % 2 === 0) // Show every other data point on mobile
    : data

  return (
    <div className="w-full h-full">
      <BarChart
        data={displayData}
        index="name"
        categories={displayCategories}
        colors={colors}
        valueFormatter={(value) => `${value}`}
        yAxisWidth={isMobile ? 40 : yAxisWidth}
      />
    </div>
  )
}
