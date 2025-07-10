import { type NextRequest, NextResponse } from "next/server"
import { RegistrationService } from "@/lib/registration-service"
import { supabase } from "@/lib/database"

// POST /api/integrations/shopify - Create Shopify integration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { seller_id, shop_domain, access_token, webhook_url } = body

    // Get seller data
    const seller = await RegistrationService.getSellerData(seller_id)

    if (!seller) {
      return NextResponse.json({ success: false, error: "Seller not found" }, { status: 404 })
    }

    // Create Shopify customer/supplier
    const shopifyData = await createShopifySupplier(seller, shop_domain, access_token)

    // Save integration
    const { data: integration, error } = await supabase
      .from("api_integrations")
      .insert({
        seller_id,
        platform: "shopify",
        api_key: access_token,
        webhook_url,
        integration_status: "active",
        last_sync_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw new Error(`Failed to save integration: ${error.message}`)

    return NextResponse.json({
      success: true,
      data: {
        integration,
        shopify_data: shopifyData,
      },
    })
  } catch (error) {
    console.error("Error creating Shopify integration:", error)
    return NextResponse.json({ success: false, error: "Failed to create Shopify integration" }, { status: 500 })
  }
}

// GET /api/integrations/shopify - Sync seller data to Shopify
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const seller_id = searchParams.get("seller_id")

    if (!seller_id) {
      return NextResponse.json({ success: false, error: "seller_id is required" }, { status: 400 })
    }

    // Get seller data
    const seller = await RegistrationService.getSellerData(seller_id)

    // Get Shopify integration
    const { data: integration } = await supabase
      .from("api_integrations")
      .select("*")
      .eq("seller_id", seller_id)
      .eq("platform", "shopify")
      .eq("integration_status", "active")
      .single()

    if (!integration) {
      return NextResponse.json({ success: false, error: "No active Shopify integration found" }, { status: 404 })
    }

    // Sync data to Shopify
    const syncResult = await syncToShopify(seller, integration)

    // Update last sync time
    await supabase.from("api_integrations").update({ last_sync_at: new Date().toISOString() }).eq("id", integration.id)

    return NextResponse.json({
      success: true,
      data: syncResult,
    })
  } catch (error) {
    console.error("Error syncing to Shopify:", error)
    return NextResponse.json({ success: false, error: "Failed to sync to Shopify" }, { status: 500 })
  }
}

// Helper function to create Shopify supplier
async function createShopifySupplier(seller: any, shopDomain: string, accessToken: string) {
  const shopifyUrl = `https://${shopDomain}.myshopify.com/admin/api/2023-10/customers.json`

  const customerData = {
    customer: {
      first_name: seller.full_name.split(" ")[0],
      last_name: seller.full_name.split(" ").slice(1).join(" "),
      email: seller.user.email,
      phone: seller.user.phone,
      tags: "aniyor-supplier",
      note: `Aniyor Seller - Store: ${seller.store_name}`,
      addresses: [
        {
          address1: seller.pickup_addresses[0]?.room_number,
          address2: seller.pickup_addresses[0]?.street_locality,
          city: seller.pickup_addresses[0]?.city,
          province: seller.pickup_addresses[0]?.state,
          zip: seller.pickup_addresses[0]?.pincode,
          country: "India",
        },
      ],
      metafields: [
        {
          namespace: "aniyor",
          key: "seller_id",
          value: seller.id,
          type: "single_line_text_field",
        },
        {
          namespace: "aniyor",
          key: "store_name",
          value: seller.store_name,
          type: "single_line_text_field",
        },
        {
          namespace: "aniyor",
          key: "gstin",
          value: seller.business_details[0]?.gstin || "",
          type: "single_line_text_field",
        },
        {
          namespace: "aniyor",
          key: "bank_account",
          value: seller.bank_details[0]?.account_number || "",
          type: "single_line_text_field",
        },
      ],
    },
  }

  const response = await fetch(shopifyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify(customerData),
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`)
  }

  return await response.json()
}

// Helper function to sync data to Shopify
async function syncToShopify(seller: any, integration: any) {
  // This would contain the logic to sync seller data to Shopify
  // For now, we'll return a mock response
  return {
    synced_at: new Date().toISOString(),
    seller_id: seller.id,
    shopify_customer_id: "12345",
    status: "success",
  }
}
