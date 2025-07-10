import { type NextRequest, NextResponse } from "next/server"
import { RegistrationService } from "@/lib/registration-service"
import { supabase } from "@/lib/database"

// POST /api/integrations/aniyor-apps - Share data with other Aniyor apps
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { seller_id, app_name, webhook_url, api_key } = body

    // Get seller data
    const seller = await RegistrationService.getSellerData(seller_id)

    if (!seller) {
      return NextResponse.json({ success: false, error: "Seller not found" }, { status: 404 })
    }

    // Create integration record
    const { data: integration, error } = await supabase
      .from("api_integrations")
      .insert({
        seller_id,
        platform: app_name,
        api_key,
        webhook_url,
        integration_status: "active",
        last_sync_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw new Error(`Failed to save integration: ${error.message}`)

    // Send data to webhook if provided
    if (webhook_url) {
      await sendWebhookData(webhook_url, seller, api_key)
    }

    return NextResponse.json({
      success: true,
      data: {
        integration,
        seller_data: formatSellerDataForAPI(seller),
      },
    })
  } catch (error) {
    console.error("Error creating Aniyor app integration:", error)
    return NextResponse.json({ success: false, error: "Failed to create integration" }, { status: 500 })
  }
}

// GET /api/integrations/aniyor-apps - Get seller data for Aniyor apps
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const seller_id = searchParams.get("seller_id")
    const api_key = request.headers.get("x-api-key")

    if (!seller_id) {
      return NextResponse.json({ success: false, error: "seller_id is required" }, { status: 400 })
    }

    if (!api_key) {
      return NextResponse.json({ success: false, error: "API key is required" }, { status: 401 })
    }

    // Verify API key
    const { data: integration } = await supabase
      .from("api_integrations")
      .select("*")
      .eq("seller_id", seller_id)
      .eq("api_key", api_key)
      .eq("integration_status", "active")
      .single()

    if (!integration) {
      return NextResponse.json({ success: false, error: "Invalid API key or integration not found" }, { status: 403 })
    }

    // Get seller data
    const seller = await RegistrationService.getSellerData(seller_id)

    // Update last sync time
    await supabase.from("api_integrations").update({ last_sync_at: new Date().toISOString() }).eq("id", integration.id)

    return NextResponse.json({
      success: true,
      data: formatSellerDataForAPI(seller),
    })
  } catch (error) {
    console.error("Error fetching seller data for Aniyor app:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch seller data" }, { status: 500 })
  }
}

// Helper function to format seller data for API consumption
function formatSellerDataForAPI(seller: any) {
  return {
    seller_id: seller.id,
    store_name: seller.store_name,
    full_name: seller.full_name,
    registration_status: seller.registration_status,
    contact: {
      email: seller.user.email,
      phone: seller.user.phone,
      verification_method: seller.user.verification_method,
    },
    business: {
      has_gst: seller.business_details[0]?.has_gst,
      gst_type: seller.business_details[0]?.gst_type,
      gstin: seller.business_details[0]?.gstin,
      gst_verified: seller.business_details[0]?.gst_verified,
      enrollment_id: seller.business_details[0]?.enrollment_id,
      enrollment_verified: seller.business_details[0]?.enrollment_verified,
      business_name: seller.business_details[0]?.business_name,
      pan_number: seller.business_details[0]?.pan_number,
      business_type: seller.business_details[0]?.business_type,
      business_address: seller.business_details[0]?.business_address,
    },
    pickup_address: {
      room_number: seller.pickup_addresses[0]?.room_number,
      street_locality: seller.pickup_addresses[0]?.street_locality,
      landmark: seller.pickup_addresses[0]?.landmark,
      pincode: seller.pickup_addresses[0]?.pincode,
      city: seller.pickup_addresses[0]?.city,
      state: seller.pickup_addresses[0]?.state,
    },
    bank_details: {
      account_number: seller.bank_details[0]?.account_number,
      ifsc_code: seller.bank_details[0]?.ifsc_code,
      bank_name: seller.bank_details[0]?.bank_name,
      beneficiary_name: seller.bank_details[0]?.beneficiary_name,
      bank_verified: seller.bank_details[0]?.bank_verified,
    },
    selected_plan: seller.selected_plan,
    created_at: seller.created_at,
    updated_at: seller.updated_at,
  }
}

// Helper function to send webhook data
async function sendWebhookData(webhookUrl: string, seller: any, apiKey?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (apiKey) {
    headers["x-api-key"] = apiKey
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      event: "seller_data_sync",
      data: formatSellerDataForAPI(seller),
      timestamp: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.statusText}`)
  }

  return await response.json()
}
