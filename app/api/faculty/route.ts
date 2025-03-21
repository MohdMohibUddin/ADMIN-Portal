import { NextResponse } from "next/server"
import { mockFaculty } from "@/lib/mock-data"

/**
 * GET /api/faculty
 * Returns all faculty members or filtered by query parameters
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const staffId = searchParams.get("staffId")

    let filteredFaculty = [...mockFaculty]

    if (department) {
      filteredFaculty = filteredFaculty.filter((f) => f.department.toLowerCase() === department.toLowerCase())
    }

    if (staffId) {
      filteredFaculty = filteredFaculty.filter(
        (f) => f.staffId && f.staffId.toLowerCase().includes(staffId.toLowerCase()),
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredFaculty,
    })
  } catch (error) {
    console.error("Faculty API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch faculty data" }, { status: 500 })
  }
}

/**
 * POST /api/faculty
 * Creates a new faculty member
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "department", "email"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new faculty with ID
    const newFaculty = {
      id: mockFaculty.length + 1,
      ...body,
    }

    // In a real app, you would save to database here
    // For demo, we'll just return the new faculty

    return NextResponse.json(
      {
        success: true,
        data: newFaculty,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Faculty API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to create faculty member" }, { status: 500 })
  }
}

