"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { time: "10:00", cpu: 45, memory: 60, activeVms: 38 },
  { time: "12:00", cpu: 82, memory: 85, activeVms: 44 },
  { time: "14:00", cpu: 55, memory: 70, activeVms: 41 },
  { time: "16:00", cpu: 61, memory: 72, activeVms: 42 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
}

export function RevenueChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          fill="var(--color-revenue)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  )
}