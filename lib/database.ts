import { createClient } from "@supabase/supabase-js"

// Check if we have the required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Use service role key on server, anon key on client
const supabaseKey = typeof window === "undefined" && supabaseServiceKey ? supabaseServiceKey : supabaseAnonKey

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Database types
export interface User {
  id: string
  email?: string
  phone?: string
  verification_method: "email" | "mobile"
  verified_at?: string
  created_at: string
  updated_at: string
  role: "admin" | "seller"
  passwordHash?: string
}

export interface SellerProfile {
  id: string
  user_id: string
  store_name: string
  full_name: string
  registration_status: "pending" | "in_progress" | "completed" | "rejected"
  registration_step: number
  selected_plan?: any
  created_at: string
  updated_at: string
}

export interface BusinessDetails {
  id: string
  seller_id: string
  has_gst: boolean
  gst_type?: "regular" | "composition" | "none"
  gstin?: string
  gst_verified: boolean
  gst_verified_at?: string
  enrollment_id?: string
  enrollment_verified: boolean
  enrollment_verified_at?: string
  business_name?: string
  pan_number?: string
  business_type?: string
  business_address?: string
  created_at: string
  updated_at: string
}

export interface PickupAddress {
  id: string
  seller_id: string
  use_gst_address: boolean
  room_number?: string
  street_locality?: string
  landmark?: string
  pincode?: string
  city?: string
  state?: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface BankDetails {
  id: string
  seller_id: string
  account_number: string
  ifsc_code: string
  bank_name?: string
  beneficiary_name?: string
  bank_verified: boolean
  bank_verified_at?: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface RegistrationLog {
  id: string
  seller_id: string
  step_name: string
  step_data?: any
  completed_at: string
  ip_address?: string
  user_agent?: string
}

export interface ApiIntegration {
  id: string
  seller_id: string
  platform: string
  api_key?: string
  webhook_url?: string
  integration_status: "pending" | "active" | "inactive" | "failed"
  last_sync_at?: string
  created_at: string
  updated_at: string
}
