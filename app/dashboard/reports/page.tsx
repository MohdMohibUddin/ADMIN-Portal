"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("performance")
  const { students, faculty, departments } = useStore()

  // Generate real performance data from students
  const performanceData = departments
    .map((dept) => {
      const deptStudents = students.filter((s) => s.department === dept.name)
      const totalStudents = deptStudents.length

      if (totalStudents === 0) return null

      const avgAttendance = deptStudents.reduce((sum, s) => sum + (s.attendance || 0), 0) / totalStudents
      const passPercentage = (deptStudents.filter((s) => (s.attendance || 0) >= 75).length / totalStudents) * 100

      return {
        department: dept.name,
        averageScore: Math.round(avgAttendance),
        passPercentage: Math.round(passPercentage),
        totalStudents,
      }
    })
    .filter(Boolean)

  // Generate real attendance data
  const attendanceData = departments
    .map((dept) => {
      const deptStudents = students.filter((s) => s.department === dept.name)
      const totalStudents = deptStudents.length

      if (totalStudents === 0) return null

      const avgAttendance = deptStudents.reduce((sum, s) => sum + (s.attendance || 0), 0) / totalStudents
      const below75 = deptStudents.filter((s) => (s.attendance || 0) < 75).length

      return {
        department: dept.name,
        averageAttendance: Math.round(avgAttendance),
        below75,
      }
    })
    .filter(Boolean)

  // Generate real fee collection data
  const feeCollectionData = departments
    .map((dept) => {
      const deptStudents = students.filter((s) => s.department === dept.name)

      if (deptStudents.length === 0) return null

      const totalFees = deptStudents.reduce((sum, s) => sum + (s.fees?.total || 0), 0)
      const collectedFees = deptStudents.reduce((sum, s) => sum + (s.fees?.paid || 0), 0)
      const pendingFees = deptStudents.reduce((sum, s) => sum + (s.fees?.pending || 0), 0)

      return {
        department: dept.name,
        totalFees,
        collectedFees,
        pendingFees,
      }
    })
    .filter(Boolean)

  const handleExport = (type: string) => {
    // Implement export functionality
    console.log(`Exporting ${type} report`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <Button onClick={() => handleExport(activeTab)}>
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <Tabs defaultValue="performance" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="fees">Fee Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance by Department</CardTitle>
              <CardDescription>Average scores and pass percentage</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {performanceData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averageScore" fill="#8884d8" name="Average Score" />
                    <Bar dataKey="passPercentage" fill="#82ca9d" name="Pass %" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No performance data available. Add students to see analytics.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Statistics</CardTitle>
              <CardDescription>Department-wise attendance analysis</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {attendanceData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="averageAttendance" stroke="#8884d8" name="Average Attendance %" />
                    <Line type="monotone" dataKey="below75" stroke="#82ca9d" name="Students Below 75%" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No attendance data available. Add students to see analytics.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Status</CardTitle>
              <CardDescription>Department-wise fee collection analysis</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {feeCollectionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={feeCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                    <Legend />
                    <Bar dataKey="collectedFees" fill="#8884d8" name="Collected Fees" />
                    <Bar dataKey="pendingFees" fill="#82ca9d" name="Pending Fees" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No fee data available. Add students to see analytics.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

