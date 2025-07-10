"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Users, Package, ArrowLeft, Check, Star } from "lucide-react"
import Image from "next/image"
import { AuthService } from "@/lib/auth-service"

interface WelcomeScreenProps {
  onNavigate: (page: string) => void
  onValidationComplete: (data: { method: string; contact: string; userId?: string; existingProgress?: any }) => void
}

export function WelcomeScreen({ onNavigate, onValidationComplete }: WelcomeScreenProps) {
  const [authMethod, setAuthMethod] = useState<"email" | "mobile">("mobile")
  const [step, setStep] = useState<"input" | "otp">("input")
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    otp: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [agreeToWhatsApp, setAgreeToWhatsApp] = useState(true)

  const handleSendOTP = async () => {
    setIsLoading(true)

    try {
      const contact = authMethod === "email" ? formData.email : formData.mobile
      const result = await AuthService.sendOTP(contact, authMethod)

      if (result.success) {
        console.log(`OTP sent to ${contact}`)
        setStep("otp")
        setTimeLeft(60) // 60 seconds countdown

        // Start countdown timer
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        alert("Failed to send OTP. Please try again.")
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      alert("Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    setIsLoading(true)

    try {
      const contact = authMethod === "email" ? formData.email : formData.mobile
      const result = await AuthService.verifyOTP(contact, formData.otp, authMethod)

      if (result.success) {
        // Create or get user account
        const user = await AuthService.createOrGetUser({
          email: authMethod === "email" ? contact : undefined,
          phone: authMethod === "mobile" ? contact : undefined,
          verification_method: authMethod,
        })

        console.log("User account created/updated:", user)

        // Check if user has existing registration progress
        const registrationProgress = await AuthService.getUserRegistrationProgress(user.id)

        if (registrationProgress) {
          console.log("Found existing registration progress:", registrationProgress)
          // User can continue from where they left off
          alert(`Welcome back! You can continue your registration from step ${registrationProgress.registration_step}.`)
        }

        // Pass validation data to parent
        onValidationComplete({
          method: authMethod,
          contact: contact,
          userId: user.id,
          existingProgress: registrationProgress,
        })
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      alert("Failed to verify OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValidMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile)
  }

  const canSendOTP = authMethod === "email" ? isValidEmail(formData.email) : isValidMobile(formData.mobile)
  const canVerifyOTP = formData.otp.length === 6

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Very Top */}
        <div className="pt-4 pb-2">
          <Button onClick={() => onNavigate("home")} variant="outline" className="bg-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Header with Logo and Auth Options */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200 mb-8">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl md:text-2xl font-semibold text-gray-900">Aniyor</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Already a user?</span>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent text-sm px-4 py-2"
            >
              Login
            </Button>
          </div>
        </div>

        {/* Rest of the content with proper grid layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Aniyor</h1>
              <p className="text-gray-600">Create your account to start selling</p>
            </div>

            {step === "input" ? (
              <div className="space-y-6">
                {/* Method Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setAuthMethod("mobile")}
                    className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                      authMethod === "mobile" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Mobile Number
                  </button>
                  <button
                    onClick={() => setAuthMethod("email")}
                    className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                      authMethod === "email" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email ID
                  </button>
                </div>

                {/* Input Field */}
                <div className="space-y-4">
                  {authMethod === "mobile" ? (
                    <div>
                      <label className="block text-sm font-medium text-red-500 mb-2">Enter Mobile Number</label>
                      <div className="flex space-x-2">
                        <input
                          type="tel"
                          placeholder="Enter Mobile Number"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button
                          onClick={handleSendOTP}
                          className={`${canSendOTP ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-500"} text-white px-6`}
                          disabled={!canSendOTP || isLoading}
                        >
                          {isLoading ? "Sending..." : "Send OTP"}
                        </Button>
                      </div>
                      {formData.mobile && !isValidMobile(formData.mobile) && (
                        <p className="text-red-500 text-sm mt-1">This field is required.</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-red-500 mb-2">Enter Email Address</label>
                      <div className="flex space-x-2">
                        <input
                          type="email"
                          placeholder="Enter Email Address"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button
                          onClick={handleSendOTP}
                          className={`${canSendOTP ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-500"} text-white px-6`}
                          disabled={!canSendOTP || isLoading}
                        >
                          {isLoading ? "Sending..." : "Send OTP"}
                        </Button>
                      </div>
                      {formData.email && !isValidEmail(formData.email) && (
                        <p className="text-red-500 text-sm mt-1">This field is required.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={(e) => handleInputChange("otp", e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest font-mono"
                    maxLength={6}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <button onClick={() => setStep("input")} className="text-gray-600 hover:text-gray-900 underline">
                    Change {authMethod === "email" ? "email" : "mobile"}
                  </button>
                  <button
                    onClick={handleSendOTP}
                    disabled={timeLeft > 0}
                    className={`${
                      timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-700 underline"
                    }`}
                  >
                    {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}

            {/* WhatsApp Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agreeToWhatsApp}
                onChange={(e) => setAgreeToWhatsApp(e.target.checked)}
                className="mt-1 text-blue-600"
              />
              <span className="text-sm text-gray-700">
                I want to receive important updates on{" "}
                <span className="inline-flex items-center">
                  <span className="text-green-600 font-semibold">WhatsApp</span>
                </span>
              </span>
            </div>

            {/* Create Account Button */}
            {step === "input" ? (
              <Button
                onClick={handleSendOTP}
                className={`${canSendOTP ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-500"} w-full text-white py-3 text-lg`}
                disabled={!canSendOTP || isLoading}
              >
                Create Account
              </Button>
            ) : (
              <Button
                onClick={handleVerifyOTP}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                disabled={!canVerifyOTP || isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
            )}

            {/* Terms */}
            <div className="text-xs text-gray-500 text-center">
              By clicking you agree to our{" "}
              <button onClick={() => onNavigate("terms")} className="text-blue-600 hover:underline">
                Terms & Conditions
              </button>{" "}
              and{" "}
              <button onClick={() => onNavigate("privacy")} className="text-blue-600 hover:underline">
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Grow your business faster by selling on Aniyor</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1Mn+</div>
                    <div className="text-sm text-gray-600">Potential customers across India</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">150+</div>
                    <div className="text-sm text-gray-600">Categories to Sell</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">No Setup</div>
                    <div className="text-sm text-gray-600">Fee</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">First Month</div>
                    <div className="text-sm text-gray-600">Free</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All you need to sell on Aniyor is:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Tax Details</div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">• Enrolment ID/UIN</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">For Non-GST sellers</span>
                        <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">New!</span>
                      </div>
                      <div className="text-sm text-gray-600">• GSTIN - Regular & Composition GST sellers</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Bank Account</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="text-center">
              <div className="w-64 h-48 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-600">Start your spiritual business journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
