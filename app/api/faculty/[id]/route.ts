import { NextResponse } from "next/server"
import { mockFaculty } from "@/lib/mock-data"

interface Params {
  params: {
    id: string
  }
}

/**
 * GET /api/faculty/[id]
 * Returns a specific faculty member by ID
 */
export async function GET(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid faculty ID" }, { status: 400 })
    }

    const faculty = mockFaculty.find((f) => f.id === id)

    if (!faculty) {
      return NextResponse.json({ success: false, error: "Faculty not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: faculty,
    })
  } catch (error) {
    console.error("Faculty API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch faculty data" }, { status: 500 })
  }
}

/**
 * PUT /api/faculty/[id]
 * Updates a faculty member
 */
export async function PUT(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid faculty ID" }, { status: 400 })
    }

    const facultyIndex = mockFaculty.findIndex((f) => f.id === id)

    if (facultyIndex === -1) {
      return NextResponse.json({ success: false, error: "Faculty not found" }, { status: 404 })
    }

    const body = await request.json()

    // In a real app, you would update the database here
    // For demo, we'll just return the updated faculty
    const updatedFaculty = {
      ...mockFaculty[facultyIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    return NextResponse.json({
      success: true,
      data: updatedFaculty,
    })
  } catch (error) {
    console.error("Faculty API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update faculty member" }, { status: 500 })
  }
}

/**
 * DELETE /api/faculty/[id]
 * Deletes a faculty member
 */
export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid faculty ID" }, { status: 400 })
    }

    const facultyIndex = mockFaculty.findIndex((f) => f.id === id)

    if (facultyIndex === -1) {
      return NextResponse.json({ success: false, error: "Faculty not found" }, { status: 404 })
    }

    // In a real app, you would delete from the database here

    return NextResponse.json({
      success: true,
      message: "Faculty deleted successfully",
    })
  } catch (error) {
    console.error("Faculty API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete faculty member" }, { status: 500 })
  }
}

