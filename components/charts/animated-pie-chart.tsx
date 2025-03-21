"use client"

import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { pieChartColors } from "@/lib/chart-colors"

interface DataItem {
  name: string
  value: number
}

interface AnimatedPieChartProps {
  data: DataItem[]
  title?: string
}

export function AnimatedPieChart({ data, title }: AnimatedPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <defs>
          {pieChartColors.map((color, index) => (
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
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          animationBegin={0}
          animationDuration={1500}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={`url(#gradient-${index})`}
              className="transition-all duration-300 hover:opacity-80"
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          content={({ payload }) => (
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {payload?.map((entry: any, index) => (
                <motion.div
                  key={`legend-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">{entry.value}</span>
                </motion.div>
              ))}
            </div>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

