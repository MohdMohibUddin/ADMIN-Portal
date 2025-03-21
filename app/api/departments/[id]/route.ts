import { NextResponse } from "next/server"
import { mockDepartments } from "@/lib/mock-data"

interface Params {
  params: {
    id: string
  }
}

/**
 * GET /api/departments/[id]
 * Returns a specific department by ID
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
      data: department,
    })
  } catch (error) {
    console.error("Departments API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch department data" }, { status: 500 })
  }
}

/**
 * PUT /api/departments/[id]
 * Updates a department
 */
export async function PUT(request: Request, { params }: Params) {
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

    // In a real app, you would update the database here
    const updatedDepartment = {
      ...mockDepartments[departmentIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    return NextResponse.json({
      success: true,
      data: updatedDepartment,
    })
  } catch (error) {
    console.error("Departments API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update department" }, { status: 500 })
  }
}

/**
 * DELETE /api/departments/[id]
 * Deletes a department
 */
export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid department ID" }, { status: 400 })
    }

    const departmentIndex = mockDepartments.findIndex((d) => d.id === id)

    if (departmentIndex === -1) {
      return NextResponse.json({ success: false, error: "Department not found" }, { status: 404 })
    }

    // In a real app, you would delete from the database here

    return NextResponse.json({
      success: true,
      message: "Department deleted successfully",
    })
  } catch (error) {
    console.error("Departments API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete department" }, { status: 500 })
  }
}

