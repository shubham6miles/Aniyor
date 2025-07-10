import { type NextRequest, NextResponse } from "next/server"
import { RegistrationService } from "@/lib/registration-service"

// GET /api/sellers - Search and list sellers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      email: searchParams.get("email") || undefined,
      phone: searchParams.get("phone") || undefined,
      store_name: searchParams.get("store_name") || undefined,
      registration_status: searchParams.get("registration_status") || undefined,
      has_gst: searchParams.get("has_gst") ? searchParams.get("has_gst") === "true" : undefined,
      state: searchParams.get("state") || undefined,
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 50,
      offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0,
    }

    const sellers = await RegistrationService.searchSellers(filters)

    return NextResponse.json({
      success: true,
      data: sellers,
      count: sellers.length,
    })
  } catch (error) {
    console.error("Error fetching sellers:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch sellers" }, { status: 500 })
  }
}

// POST /api/sellers - Create new seller registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_data, seller_data } = body

    // Create user first
    const user = await RegistrationService.createUser(user_data)

    // Create seller profile
    const seller = await RegistrationService.createSellerProfile({
      user_id: user.id,
      ...seller_data,
    })

    // Log registration start
    await RegistrationService.logRegistrationStep(
      seller.id,
      "registration_started",
      { user_data, seller_data },
      request.ip,
      request.headers.get("user-agent") || undefined,
    )

    return NextResponse.json({
      success: true,
      data: { user, seller },
    })
  } catch (error) {
    console.error("Error creating seller:", error)
    return NextResponse.json({ success: false, error: "Failed to create seller" }, { status: 500 })
  }
}
