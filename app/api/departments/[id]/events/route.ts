import { NextResponse } from "next/server"
import { mockDepartments } from "@/lib/mock-data"

interface Params {
  params: {
    id: string
  }
}

/**
 * GET /api/departments/[id]/events
 * Returns all events for a specific department
 */
export async function GET(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid department ID" }, { status: 400 })
    }

    const department = mockDepartments.find((d) => d.id === id)

    if (!department) {
      return NextResponse.json({ success: false, error: "Department not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: department.events || [],
    })
  } catch (error) {
    console.error("Department Events API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch department events" }, { status: 500 })
  }
}

/**
 * POST /api/departments/[id]/events
 * Creates a new event for a department
 */
export async function POST(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid department ID" }, { status: 400 })
    }

    const departmentIndex = mockDepartments.findIndex((d) => d.id === id)

    if (departmentIndex === -1) {
      return NextResponse.json({ success: false, error: "Department not found" }, { status: 404 })
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "date", "venue"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new event with ID
    const newEvent = {
      id: Date.now(),
      ...body,
    }

    // In a real app, you would save to database here

    return NextResponse.json(
      {
        success: true,
        data: newEvent,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Department Events API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to create department event" }, { status: 500 })
  }
}

