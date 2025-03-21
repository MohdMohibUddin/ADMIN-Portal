"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { chartColors } from "@/lib/chart-colors"

interface DataItem {
  name: string
  [key: string]: number | string
}

interface AnimatedLineChartProps {
  data: DataItem[]
  keys: string[]
  colors?: string[]
}

export function AnimatedLineChart({ 
  data, 
  keys,
  colors = [
    chartColors.primary.solid,
    chartColors.secondary.solid,
    chartColors.success.solid
  ]
}: AnimatedLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <defs>
          {colors.map((color, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`gradient-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.9}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.3}/>
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          className="text-muted-foreground"
        />
        <YAxis className="text-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
          }}
        />
        <Legend />
        {keys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index]}
            strokeWidth={2}
            dot={{ 
              r: 4,
              strokeWidth: 2,
              fill: 'hsl(var(--background))',
              stroke: colors[index]
            }}
            activeDot={{ r: 6, stroke: colors[index] }}
            animationBegin={index * 200}
            animationDuration={1500}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

