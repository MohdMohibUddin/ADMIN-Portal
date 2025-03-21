import { NextResponse } from "next/server"

// In a real app, this would come from a database
let timetables: any[] = []

interface Params {
  params: {
    department: string
  }
}

/**
 * GET /api/timetables/[department]
 * Returns a specific timetable by department
 */
export async function GET(request: Request, { params }: Params) {
  try {
    const department = decodeURIComponent(params.department)

    const timetable = timetables.find((t) => t.department.toLowerCase() === department.toLowerCase())

    if (!timetable) {
      return NextResponse.json({ success: false, error: "Timetable not found for this department" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: timetable,
    })
  } catch (error) {
    console.error("Timetables API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch timetable" }, { status: 500 })
  }
}

/**
 * PUT /api/timetables/[department]
 * Updates a timetable for a department
 */
export async function PUT(request: Request, { params }: Params) {
  try {
    const department = decodeURIComponent(params.department)
    const body = await request.json()

    // Validate required fields
    if (!body.slots || !Array.isArray(body.slots) || body.slots.length === 0) {
      return NextResponse.json({ success: false, error: "Timetable slots are required" }, { status: 400 })
    }

    const timetableIndex = timetables.findIndex((t) => t.department.toLowerCase() === department.toLowerCase())

    if (timetableIndex === -1) {
      return NextResponse.json({ success: false, error: "Timetable not found for this department" }, { status: 404 })
    }

    // Update timetable
    timetables[timetableIndex] = {
      ...timetables[timetableIndex],
      ...body,
      department, // Ensure department doesn't change
    }

    return NextResponse.json({
      success: true,
      data: timetables[timetableIndex],
    })
  } catch (error) {
    console.error("Timetables API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update timetable" }, { status: 500 })
  }
}

/**
 * DELETE /api/timetables/[department]
 * Deletes a timetable for a department
 */
export async function DELETE(request: Request, { params }: Params) {
  try {
    const department = decodeURIComponent(params.department)

    const timetableIndex = timetables.findIndex((t) => t.department.toLowerCase() === department.toLowerCase())

    if (timetableIndex === -1) {
      return NextResponse.json({ success: false, error: "Timetable not found for this department" }, { status: 404 })
    }

    // Remove timetable
    timetables = timetables.filter((_, index) => index !== timetableIndex)

    return NextResponse.json({
      success: true,
      message: "Timetable deleted successfully",
    })
  } catch (error) {
    console.error("Timetables API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete timetable" }, { status: 500 })
  }
}

