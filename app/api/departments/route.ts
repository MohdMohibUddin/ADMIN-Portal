import { NextResponse } from "next/server"
import { mockDepartments } from "@/lib/mock-data"

/**
 * GET /api/departments
 * Returns all departments
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockDepartments,
    })
  } catch (error) {
    console.error("Departments API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch departments data" }, { status: 500 })
  }
}

/**
 * POST /api/departments
 * Creates a new department
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "hod"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new department with ID
    const newDepartment = {
      id: mockDepartments.length + 1,
      ...body,
      totalFaculty: body.totalFaculty || 0,
      totalStudents: body.totalStudents || 0,
      courses: body.courses || [],
      rooms: body.rooms || [],
      events: body.events || [],
    }

    // In a real app, you would save to database here

    return NextResponse.json(
      {
        success: true,
        data: newDepartment,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Departments API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to create department" }, { status: 500 })
  }
}

