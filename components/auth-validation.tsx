"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, Shield, Check, Clock } from "lucide-react"
import Image from "next/image"

interface AuthValidationProps {
  onNavigate: (page: string) => void
  onValidationComplete: (data: { method: string; contact: string }) => void
}

export function AuthValidation({ onNavigate, onValidationComplete }: AuthValidationProps) {
  const [authMethod, setAuthMethod] = useState<"email" | "mobile">("email")
  const [step, setStep] = useState<"input" | "otp">("input")
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    otp: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const handleSendOTP = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(`Sending OTP to ${authMethod === "email" ? formData.email : formData.mobile}`)
    setStep("otp")
    setTimeLeft(60) // 60 seconds countdown
    setIsLoading(false)

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
  }

  const handleVerifyOTP = async () => {
    setIsLoading(true)
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Verifying OTP:", formData.otp)

    // Pass validation data to parent
    onValidationComplete({
      method: authMethod,
      contact: authMethod === "email" ? formData.email : formData.mobile,
    })

    setIsLoading(false)
  }

  const handleResendOTP = () => {
    if (timeLeft === 0) {
      handleSendOTP()
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
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Very Top */}
        <div className="pt-4 pb-2">
          <Button onClick={() => onNavigate("home")} variant="outline" className="bg-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Logo and Title Section */}
        <div className="py-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl md:text-2xl font-semibold text-gray-900">Aniyor</span>
          </div>

          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h1>
            <p className="text-sm md:text-base text-gray-600">
              {step === "input"
                ? "Enter your contact details to get started with selling on Aniyor"
                : "Enter the verification code we sent to your " + authMethod}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {step === "input" ? (
              <div className="space-y-6">
                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 bg-green-50 p-3 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Secure Verification Process</span>
                </div>

                {/* Method Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setAuthMethod("email")}
                    className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                      authMethod === "email" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email ID
                  </button>
                  <button
                    onClick={() => setAuthMethod("mobile")}
                    className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                      authMethod === "mobile" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Mobile No.
                  </button>
                </div>

                {/* Input Field */}
                <div className="space-y-4">
                  {authMethod === "email" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.email && !isValidEmail(formData.email) && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-lg">
                          +91
                        </span>
                        <input
                          type="tel"
                          placeholder="Enter your mobile number"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      {formData.mobile && !isValidMobile(formData.mobile) && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit mobile number</p>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={handleSendOTP}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    disabled={!canSendOTP || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending OTP...</span>
                      </div>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </div>

                {/* Benefits */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900">Why verify your contact?</h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>Secure your seller account</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>Receive important order notifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>Enable two-factor authentication</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* OTP Header */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Verification Code Sent</h3>
                  <p className="text-sm text-gray-600">
                    We've sent a 6-digit code to{" "}
                    <span className="font-medium text-gray-900">
                      {authMethod === "email" ? formData.email : `+91 ${formData.mobile}`}
                    </span>
                  </p>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter Verification Code</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={formData.otp}
                    onChange={(e) => handleInputChange("otp", e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest font-mono"
                    maxLength={6}
                  />
                </div>

                {/* Verify Button */}
                <Button
                  onClick={handleVerifyOTP}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={!canVerifyOTP || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>

                {/* Resend OTP */}
                <div className="flex items-center justify-between text-sm">
                  <button onClick={() => setStep("input")} className="text-gray-600 hover:text-gray-900 underline">
                    Change {authMethod === "email" ? "email" : "mobile"}
                  </button>
                  <button
                    onClick={handleResendOTP}
                    disabled={timeLeft > 0}
                    className={`${
                      timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-700 underline"
                    }`}
                  >
                    {timeLeft > 0 ? (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Resend in {timeLeft}s</span>
                      </div>
                    ) : (
                      "Resend OTP"
                    )}
                  </button>
                </div>

                {/* Help Text */}
                <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                  Didn't receive the code? Check your spam folder or try resending.
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          By continuing, you agree to Aniyor's{" "}
          <button onClick={() => onNavigate("terms")} className="text-blue-600 hover:underline">
            Terms & Conditions
          </button>{" "}
          and{" "}
          <button onClick={() => onNavigate("privacy")} className="text-blue-600 hover:underline">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  )
}
