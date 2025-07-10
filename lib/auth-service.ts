import type { User } from "./database"
import bcrypt from "bcryptjs"

// Mock data store for development/testing
const mockUsers: User[] = []
let userIdCounter = 1

export class AuthService {
  // Create or get existing user account
  static async createOrGetUser(data: {
    email?: string
    phone?: string
    verification_method: "email" | "mobile"
  }): Promise<User> {
    // Check if user already exists in mock data
    const existingUser = mockUsers.find(
      (user) => (data.email && user.email === data.email) || (data.phone && user.phone === data.phone),
    )

    if (existingUser) {
      // Update verification status
      existingUser.verified_at = new Date().toISOString()
      console.log("Updated existing user:", existingUser)
      return existingUser
    }

    // Create new user
    const newUser: User = {
      id: `user_${userIdCounter++}`,
      email: data.email,
      phone: data.phone,
      verification_method: data.verification_method,
      verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      role: "seller",
    }

    mockUsers.push(newUser)
    console.log("Created new user:", newUser)
    return newUser
  }

  // Get user by contact info
  static async getUserByContact(contact: string, method: "email" | "mobile"): Promise<User | null> {
    const user = mockUsers.find(
      (user) => (method === "email" && user.email === contact) || (method === "mobile" && user.phone === contact),
    )
    return user || null
  }

  // Get user's registration progress (mock)
  static async getUserRegistrationProgress(userId: string) {
    // For now, return null (no existing progress)
    // In a real implementation, this would query the seller_profiles table
    console.log("Checking registration progress for user:", userId)
    return null
  }

  // Send OTP (mock implementation)
  static async sendOTP(contact: string, method: "email" | "mobile"): Promise<{ success: boolean; message: string }> {
    console.log(`📱 Sending OTP to ${contact} via ${method}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: `OTP sent successfully to ${contact}`,
    }
  }

  // Verify OTP (mock implementation)
  static async verifyOTP(
    contact: string,
    otp: string,
    method: "email" | "mobile",
  ): Promise<{ success: boolean; message: string }> {
    console.log(`🔐 Verifying OTP ${otp} for ${contact}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // For demo purposes, accept any 6-digit OTP
    if (otp.length === 6) {
      return {
        success: true,
        message: "OTP verified successfully",
      }
    }

    return {
      success: false,
      message: "Invalid OTP. Please enter a 6-digit code.",
    }
  }

  static async registerWithPassword(data: { email: string; password: string; role: "admin" | "seller" }): Promise<User> {
    const existingUser = mockUsers.find((user) => user.email === data.email)
    if (existingUser) throw new Error("User already exists")
    const passwordHash = await bcrypt.hash(data.password, 10)
    const newUser: User = {
      id: `user_${userIdCounter++}`,
      email: data.email,
      verification_method: "email",
      verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      role: data.role,
      passwordHash,
    }
    mockUsers.push(newUser)
    return newUser
  }

  static async loginWithPassword(email: string, password: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.email === email)
    if (!user || !user.passwordHash) return null
    const valid = await bcrypt.compare(password, user.passwordHash)
    return valid ? user : null
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return mockUsers.find((u) => u.email === email) || null
  }
}
