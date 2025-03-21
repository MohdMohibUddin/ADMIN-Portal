"use client"

import { motion } from "framer-motion"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateDepartmentStats, safeParse } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

const MotionCard = motion(Card)

export default function HomePage() {
  const { students = [], faculty = [], departments = [] } = useStore()

  // Calculate department-wise statistics with error handling
  const departmentStats = calculateDepartmentStats(students)

  // Prepare data for charts using real data from departments
  const distributionData = departments.flatMap((dept) => {
    const deptStudents = students.filter((s) => s.department === dept.name)
    const deptFaculty = faculty.filter((f) => f.department === dept.name)

    return [
      {
        name: `${dept.name} - Students`,
        value: deptStudents.length || 0,
        type: "Students",
      },
      {
        name: `${dept.name} - Faculty`,
        value: deptFaculty.length || 0,
        type: "Faculty",
      },
    ]
  })

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        >
          Welcome to Admin Dashboard
        </motion.h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Students",
              value: safeParse(students.length, 0),
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Total Faculty",
              value: safeParse(faculty.length, 0),
              color: "from-green-500 to-green-600",
            },
            {
              title: "Total Departments",
              value: safeParse(departments.length, 0),
              color: "from-purple-500 to-purple-600",
            },
            {
              title: "Fee Defaulters",
              value: Object.values(departmentStats).reduce((total, stats) => total + safeParse(stats.feePending, 0), 0),
              color: "from-red-500 to-red-600",
            },
          ].map((item, index) => (
            <MotionCard
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value}
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </div>

        <MotionCard
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-card to-card/50"
        >
          <CardHeader>
            <CardTitle className="text-primary">Student and Faculty Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <div className="text-xs text-muted-foreground mb-2">
              Showing real-time distribution data from {departments.length} departments
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} (${(safeParse(percent, 0) * 100).toFixed(0)}%)`}
                  outerRadius={180}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.type === "Students" ? COLORS[index % 3] : COLORS[(index % 3) + 3]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `${value} ${name.includes("Students") ? "Students" : "Faculty"}`,
                    name.split(" - ")[0],
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </MotionCard>
      </div>
    </ErrorBoundary>
  )
}

