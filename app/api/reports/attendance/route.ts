import { NextResponse } from "next/server"
import { mockStudents, mockDepartments } from "@/lib/mock-data"

/**
 * GET /api/reports/attendance
 * Returns attendance reports for students by department
 */
export async function GET() {
  try {
    // Generate attendance data
    const attendanceData = mockDepartments
      .map((dept) => {
        const deptStudents = mockStudents.filter((s) => s.department === dept.name)
        const totalStudents = deptStudents.length

        if (totalStudents === 0) return null

        const avgAttendance = deptStudents.reduce((sum, s) => sum + (s.attendance || 0), 0) / totalStudents
        const below75 = deptStudents.filter((s) => (s.attendance || 0) < 75).length

        return {
          department: dept.name,
          averageAttendance: Math.round(avgAttendance),
          below75,
          totalStudents,
        }
      })
      .filter(Boolean)

    return NextResponse.json({
      success: true,
      data: attendanceData,
    })
  } catch (error) {
    console.error("Attendance Reports API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate attendance reports" }, { status: 500 })
  }
}

