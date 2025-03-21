import { NextResponse } from "next/server"
import { mockStudents, mockFaculty, mockDepartments } from "@/lib/mock-data"

/**
 * GET /api/dashboard
 * Returns dashboard statistics and overview data
 */
export async function GET() {
  try {
    // Calculate statistics
    const totalStudents = mockStudents.length
    const totalFaculty = mockFaculty.length
    const totalDepartments = mockDepartments.length

    // Calculate fee defaulters
    const feeDefaulters = mockStudents.filter((student) => student.fees && student.fees.pending > 0).length

    // Calculate low attendance students
    const lowAttendance = mockStudents.filter((student) => student.attendance && student.attendance < 75).length

    // Calculate department-wise statistics
    const departmentStats = mockDepartments.map((dept) => {
      const deptStudents = mockStudents.filter((s) => s.department === dept.name)
      const deptFaculty = mockFaculty.filter((f) => f.department === dept.name)

      return {
        department: dept.name,
        studentCount: deptStudents.length,
        facultyCount: deptFaculty.length,
        feeDefaulters: deptStudents.filter((s) => s.fees && s.fees.pending > 0).length,
        lowAttendance: deptStudents.filter((s) => s.attendance && s.attendance < 75).length,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalStudents,
          totalFaculty,
          totalDepartments,
          feeDefaulters,
          lowAttendance,
        },
        departmentStats,
      },
    })
  } catch (error) {
    console.error("Dashboard API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}

