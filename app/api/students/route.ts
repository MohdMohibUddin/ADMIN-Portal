import { NextResponse } from "next/server"
import { mockStudents } from "@/lib/mock-data"

/**
 * GET /api/students
 * Returns all students or filtered by query parameters
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const rollNumber = searchParams.get("rollNumber")
    const semester = searchParams.get("semester")
    const feeStatus = searchParams.get("feeStatus")

    let filteredStudents = [...mockStudents]

    if (department) {
      filteredStudents = filteredStudents.filter((s) => s.department.toLowerCase() === department.toLowerCase())
    }

    if (rollNumber) {
      filteredStudents = filteredStudents.filter((s) => s.rollNumber.toLowerCase().includes(rollNumber.toLowerCase()))
    }

    if (semester) {
      const semesterNum = Number.parseInt(semester)
      if (!isNaN(semesterNum)) {
        filteredStudents = filteredStudents.filter((s) => s.semester === semesterNum)
      }
    }

    if (feeStatus) {
      if (feeStatus === "paid") {
        filteredStudents = filteredStudents.filter((s) => s.fees.pending === 0)
      } else if (feeStatus === "pending") {
        filteredStudents = filteredStudents.filter((s) => s.fees.pending > 0)
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredStudents,
    })
  } catch (error) {
    console.error("Students API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch students data" }, { status: 500 })
  }
}

/**
 * POST /api/students
 * Creates a new student
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "rollNumber", "department", "semester"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new student with ID
    const newStudent = {
      id: mockStudents.length + 1,
      ...body,
      fees: body.fees || {
        total: 50000,
        paid: 0,
        pending: 50000,
      },
      attendance: body.attendance || 0,
    }

    // In a real app, you would save to database here

    return NextResponse.json(
      {
        success: true,
        data: newStudent,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Students API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to create student" }, { status: 500 })
  }
}

