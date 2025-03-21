import { NextResponse } from "next/server"

// In a real app, this would come from a database
let userProfile = {
  name: "Admin User",
  email: "admin@example.com",
  phone: "",
  role: "Administrator",
}

/**
 * GET /api/settings/profile
 * Returns user profile
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: userProfile,
    })
  } catch (error) {
    console.error("Profile API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch profile" }, { status: 500 })
  }
}

/**
 * PUT /api/settings/profile
 * Updates user profile
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 })
    }

    // Update profile
    userProfile = {
      ...userProfile,
      ...body,
    }

    return NextResponse.json({
      success: true,
      data: userProfile,
    })
  } catch (error) {
    console.error("Profile API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 })
  }
}

