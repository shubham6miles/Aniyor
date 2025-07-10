import { type NextRequest, NextResponse } from "next/server"
import { RegistrationService } from "@/lib/registration-service"

// POST /api/webhooks/registration - Handle registration webhooks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, seller_id, data } = body

    switch (event) {
      case "registration_completed":
        await handleRegistrationCompleted(seller_id, data)
        break

      case "step_completed":
        await handleStepCompleted(seller_id, data)
        break

      case "verification_completed":
        await handleVerificationCompleted(seller_id, data)
        break

      default:
        console.log("Unknown webhook event:", event)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ success: false, error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleRegistrationCompleted(seller_id: string, data: any) {
  // Get complete seller data
  const seller = await RegistrationService.getSellerData(seller_id)

  // Send welcome email
  await sendWelcomeEmail(seller)

  // Create default integrations
  await createDefaultIntegrations(seller_id)

  // Log completion
  console.log("Registration completed for seller:", seller_id)
}

async function handleStepCompleted(seller_id: string, data: any) {
  // Log step completion
  await RegistrationService.logRegistrationStep(seller_id, data.step_name, data.step_data)

  console.log("Step completed:", data.step_name, "for seller:", seller_id)
}

async function handleVerificationCompleted(seller_id: string, data: any) {
  // Handle verification completion
  console.log("Verification completed for seller:", seller_id, "type:", data.verification_type)
}

async function sendWelcomeEmail(seller: any) {
  // Implementation for sending welcome email
  console.log("Sending welcome email to:", seller.user.email)
}

async function createDefaultIntegrations(seller_id: string) {
  // Create default API integrations
  console.log("Creating default integrations for seller:", seller_id)
}
