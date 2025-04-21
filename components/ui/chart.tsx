import type React from "react"
import { Bar } from "recharts"
import {
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts"

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  yAxisWidth = 50,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} tick={{ fontSize: 12 }} tickMargin={8} />
        <YAxis width={yAxisWidth} tickFormatter={valueFormatter} tick={{ fontSize: 12 }}>
          <Label
            value="Mentions"
            position="insideLeft"
            angle={-90}
            style={{
              textAnchor: "middle",
              fontSize: "14px",
              fontWeight: 500,
              fill: "#666",
            }}
            offset={-15}
          />
        </YAxis>
        <Tooltip
          formatter={valueFormatter ? (value) => [valueFormatter(value as number), "Mentions"] : undefined}
          contentStyle={{ fontSize: "12px" }}
        />
        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
