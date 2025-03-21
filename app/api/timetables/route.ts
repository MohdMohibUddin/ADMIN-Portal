import { NextResponse } from "next/server"

// In a real app, this would come from a database
const timetables: any[] = []

/**
 * GET /api/timetables
 * Returns all timetables or filtered by department
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")

    let filteredTimetables = [...timetables]

    if (department) {
      filteredTimetables = filteredTimetables.filter((t) => t.department.toLowerCase() === department.toLowerCase())
    }

    return NextResponse.json({
      success: true,
      data: filteredTimetables,
    })
  } catch (error) {
    console.error("Timetables API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch timetables" }, { status: 500 })
  }
}

/**
 * POST /api/timetables
 * Creates or updates a timetable for a department
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.department) {
      return NextResponse.json({ success: false, error: "Department is required" }, { status: 400 })
    }

    if (!body.slots || !Array.isArray(body.slots) || body.slots.length === 0) {
      return NextResponse.json({ success: false, error: "Timetable slots are required" }, { status: 400 })
    }

    // Check if timetable for this department already exists
    const existingIndex = timetables.findIndex((t) => t.department.toLowerCase() === body.department.toLowerCase())

    if (existingIndex >= 0) {
      // Update existing timetable
      timetables[existingIndex] = body
    } else {
      // Add new timetable
      timetables.push(body)
    }

    return NextResponse.json(
      {
        success: true,
        data: body,
      },
      { status: existingIndex >= 0 ? 200 : 201 },
    )
  } catch (error) {
    console.error("Timetables API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to save timetable" }, { status: 500 })
  }
}

