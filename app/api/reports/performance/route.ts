import { NextResponse } from "next/server"
import { mockStudents, mockDepartments } from "@/lib/mock-data"

/**
 * GET /api/reports/performance
 * Returns performance reports for students by department
 */
export async function GET() {
  try {
    // Generate performance data from students
    const performanceData = mockDepartments
      .map((dept) => {
        const deptStudents = mockStudents.filter((s) => s.department === dept.name)
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

    return NextResponse.json({
      success: true,
      data: performanceData,
    })
  } catch (error) {
    console.error("Performance Reports API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate performance reports" }, { status: 500 })
  }
}

