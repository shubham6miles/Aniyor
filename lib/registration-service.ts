import type { User, SellerProfile, BusinessDetails, PickupAddress, BankDetails, RegistrationLog } from "./database"

// Mock data stores for development/testing
const mockSellerProfiles: SellerProfile[] = []
const mockBusinessDetails: BusinessDetails[] = []
const mockPickupAddresses: PickupAddress[] = []
const mockBankDetails: BankDetails[] = []
const mockRegistrationLogs: RegistrationLog[] = []

let sellerIdCounter = 1
let businessIdCounter = 1
let addressIdCounter = 1
let bankIdCounter = 1
let logIdCounter = 1

export class RegistrationService {
  // Create or update user (mock)
  static async createUser(data: {
    email?: string
    phone?: string
    verification_method: "email" | "mobile"
  }): Promise<User> {
    // This would normally create a user in the database
    // For now, we'll return a mock user
    return {
      id: `user_${Date.now()}`,
      email: data.email,
      phone: data.phone,
      verification_method: data.verification_method,
      verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  // Create seller profile
  static async createSellerProfile(data: {
    user_id: string
    store_name: string
    full_name: string
    selected_plan?: any
  }): Promise<SellerProfile> {
    const profile: SellerProfile = {
      id: `seller_${sellerIdCounter++}`,
      user_id: data.user_id,
      store_name: data.store_name,
      full_name: data.full_name,
      selected_plan: data.selected_plan,
      registration_status: "in_progress",
      registration_step: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockSellerProfiles.push(profile)
    console.log("Created seller profile:", profile)
    return profile
  }

  // Save business details
  static async saveBusinessDetails(data: {
    seller_id: string
    has_gst: boolean
    gst_type?: "regular" | "composition" | "none"
    gstin?: string
    gst_verified?: boolean
    enrollment_id?: string
    enrollment_verified?: boolean
    business_name?: string
    pan_number?: string
    business_type?: string
    business_address?: string
  }): Promise<BusinessDetails> {
    const business: BusinessDetails = {
      id: `business_${businessIdCounter++}`,
      seller_id: data.seller_id,
      has_gst: data.has_gst,
      gst_type: data.gst_type,
      gstin: data.gstin,
      gst_verified: data.gst_verified || false,
      gst_verified_at: data.gst_verified ? new Date().toISOString() : undefined,
      enrollment_id: data.enrollment_id,
      enrollment_verified: data.enrollment_verified || false,
      enrollment_verified_at: data.enrollment_verified ? new Date().toISOString() : undefined,
      business_name: data.business_name,
      pan_number: data.pan_number,
      business_type: data.business_type,
      business_address: data.business_address,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockBusinessDetails.push(business)
    await this.updateRegistrationStep(data.seller_id, 2)
    console.log("Saved business details:", business)
    return business
  }

  // Save pickup address
  static async savePickupAddress(data: {
    seller_id: string
    use_gst_address: boolean
    room_number?: string
    street_locality?: string
    landmark?: string
    pincode?: string
    city?: string
    state?: string
  }): Promise<PickupAddress> {
    const address: PickupAddress = {
      id: `address_${addressIdCounter++}`,
      seller_id: data.seller_id,
      use_gst_address: data.use_gst_address,
      room_number: data.room_number,
      street_locality: data.street_locality,
      landmark: data.landmark,
      pincode: data.pincode,
      city: data.city,
      state: data.state,
      is_primary: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockPickupAddresses.push(address)
    await this.updateRegistrationStep(data.seller_id, 3)
    console.log("Saved pickup address:", address)
    return address
  }

  // Save bank details
  static async saveBankDetails(data: {
    seller_id: string
    account_number: string
    ifsc_code: string
    bank_name?: string
    beneficiary_name?: string
    bank_verified?: boolean
  }): Promise<BankDetails> {
    const bank: BankDetails = {
      id: `bank_${bankIdCounter++}`,
      seller_id: data.seller_id,
      account_number: data.account_number,
      ifsc_code: data.ifsc_code,
      bank_name: data.bank_name,
      beneficiary_name: data.beneficiary_name,
      bank_verified: data.bank_verified || false,
      bank_verified_at: data.bank_verified ? new Date().toISOString() : undefined,
      is_primary: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockBankDetails.push(bank)
    await this.updateRegistrationStep(data.seller_id, 4)
    console.log("Saved bank details:", bank)
    return bank
  }

  // Complete registration
  static async completeRegistration(seller_id: string): Promise<void> {
    const seller = mockSellerProfiles.find((s) => s.id === seller_id)
    if (seller) {
      seller.registration_status = "completed"
      seller.registration_step = 5
      seller.updated_at = new Date().toISOString()
    }

    await this.logRegistrationStep(seller_id, "registration_completed", {
      completed_at: new Date().toISOString(),
    })
    console.log("Registration completed for seller:", seller_id)
  }

  // Update registration step
  static async updateRegistrationStep(seller_id: string, step: number): Promise<void> {
    const seller = mockSellerProfiles.find((s) => s.id === seller_id)
    if (seller) {
      seller.registration_step = step
      seller.updated_at = new Date().toISOString()
    }
    console.log(`Updated registration step to ${step} for seller:`, seller_id)
  }

  // Log registration step
  static async logRegistrationStep(
    seller_id: string,
    step_name: string,
    step_data?: any,
    ip_address?: string,
    user_agent?: string,
  ): Promise<RegistrationLog> {
    const log: RegistrationLog = {
      id: `log_${logIdCounter++}`,
      seller_id,
      step_name,
      step_data,
      completed_at: new Date().toISOString(),
      ip_address,
      user_agent,
    }

    mockRegistrationLogs.push(log)
    console.log("Logged registration step:", log)
    return log
  }

  // Get complete seller data
  static async getSellerData(seller_id: string) {
    const seller = mockSellerProfiles.find((s) => s.id === seller_id)
    if (!seller) {
      throw new Error("Seller not found")
    }

    const business_details = mockBusinessDetails.filter((b) => b.seller_id === seller_id)
    const pickup_addresses = mockPickupAddresses.filter((a) => a.seller_id === seller_id)
    const bank_details = mockBankDetails.filter((b) => b.seller_id === seller_id)
    const registration_logs = mockRegistrationLogs.filter((l) => l.seller_id === seller_id)

    return {
      ...seller,
      business_details,
      pickup_addresses,
      bank_details,
      registration_logs,
    }
  }

  // Search sellers (mock)
  static async searchSellers(filters: any) {
    console.log("Searching sellers with filters:", filters)
    return mockSellerProfiles.map((seller) => ({
      ...seller,
      business_details: mockBusinessDetails.filter((b) => b.seller_id === seller.id),
      pickup_addresses: mockPickupAddresses.filter((a) => a.seller_id === seller.id),
      bank_details: mockBankDetails.filter((b) => b.seller_id === seller.id),
    }))
  }
}
