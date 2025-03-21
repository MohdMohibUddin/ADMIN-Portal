import { NextResponse } from "next/server"
import { mockStudents } from "@/lib/mock-data"

interface Params {
  params: {
    id: string
  }
}

/**
 * GET /api/students/[id]
 * Returns a specific student by ID
 */
export async function GET(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid student ID" }, { status: 400 })
    }

    const student = mockStudents.find((s) => s.id === id)

    if (!student) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: student,
    })
  } catch (error) {
    console.error("Students API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch student data" }, { status: 500 })
  }
}

/**
 * PUT /api/students/[id]
 * Updates a student
 */
export async function PUT(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid student ID" }, { status: 400 })
    }

    const studentIndex = mockStudents.findIndex((s) => s.id === id)

    if (studentIndex === -1) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 })
    }

    const body = await request.json()

    // In a real app, you would update the database here
    const updatedStudent = {
      ...mockStudents[studentIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    return NextResponse.json({
      success: true,
      data: updatedStudent,
    })
  } catch (error) {
    console.error("Students API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update student" }, { status: 500 })
  }
}

/**
 * DELETE /api/students/[id]
 * Deletes a student
 */
export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid student ID" }, { status: 400 })
    }

    const studentIndex = mockStudents.findIndex((s) => s.id === id)

    if (studentIndex === -1) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 })
    }

    // In a real app, you would delete from the database here

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    })
  } catch (error) {
    console.error("Students API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete student" }, { status: 500 })
  }
}

