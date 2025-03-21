import { NextResponse } from "next/server"
import { mockStudents, mockDepartments } from "@/lib/mock-data"

/**
 * GET /api/reports/fees
 * Returns fee collection reports by department
 */
export async function GET() {
  try {
    // Generate fee collection data
    const feeCollectionData = mockDepartments
      .map((dept) => {
        const deptStudents = mockStudents.filter((s) => s.department === dept.name)

        if (deptStudents.length === 0) return null

        const totalFees = deptStudents.reduce((sum, s) => sum + (s.fees?.total || 0), 0)
        const collectedFees = deptStudents.reduce((sum, s) => sum + (s.fees?.paid || 0), 0)
        const pendingFees = deptStudents.reduce((sum, s) => sum + (s.fees?.pending || 0), 0)

        return {
          department: dept.name,
          totalFees,
          collectedFees,
          pendingFees,
          totalStudents: deptStudents.length,
        }
      })
      .filter(Boolean)

    return NextResponse.json({
      success: true,
      data: feeCollectionData,
    })
  } catch (error) {
    console.error("Fee Reports API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate fee reports" }, { status: 500 })
  }
}

