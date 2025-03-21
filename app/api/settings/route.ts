import { NextResponse } from "next/server"

// In a real app, this would come from a database
let userSettings = {
  theme: "system",
  notifications: true,
  language: "en",
}

/**
 * GET /api/settings
 * Returns user settings
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: userSettings,
    })
  } catch (error) {
    console.error("Settings API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 })
  }
}

/**
 * PUT /api/settings
 * Updates user settings
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // Update settings
    userSettings = {
      ...userSettings,
      ...body,
    }

    return NextResponse.json({
      success: true,
      data: userSettings,
    })
  } catch (error) {
    console.error("Settings API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 })
  }
}

