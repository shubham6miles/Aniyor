import { type NextRequest, NextResponse } from "next/server"
import { RegistrationService } from "@/lib/registration-service"

// GET /api/sellers/[id] - Get specific seller data
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const seller = await RegistrationService.getSellerData(params.id)

    return NextResponse.json({
      success: true,
      data: seller,
    })
  } catch (error) {
    console.error("Error fetching seller:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch seller" }, { status: 500 })
  }
}

// PUT /api/sellers/[id] - Update seller data
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { step, data } = body

    let result

    switch (step) {
      case "business_details":
        result = await RegistrationService.saveBusinessDetails({
          seller_id: params.id,
          ...data,
        })
        break

      case "pickup_address":
        result = await RegistrationService.savePickupAddress({
          seller_id: params.id,
          ...data,
        })
        break

      case "bank_details":
        result = await RegistrationService.saveBankDetails({
          seller_id: params.id,
          ...data,
        })
        break

      case "complete":
        await RegistrationService.completeRegistration(params.id)
        result = { message: "Registration completed successfully" }
        break

      default:
        throw new Error("Invalid step")
    }

    // Log the step completion
    await RegistrationService.logRegistrationStep(
      params.id,
      step,
      data,
      request.ip,
      request.headers.get("user-agent") || undefined,
    )

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Error updating seller:", error)
    return NextResponse.json({ success: false, error: "Failed to update seller" }, { status: 500 })
  }
}
