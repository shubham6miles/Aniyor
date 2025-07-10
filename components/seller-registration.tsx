"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Check,
  Building,
  MapPin,
  CreditCard,
  User,
  AlertCircle,
  Phone,
  ChevronDown,
  ChevronUp,
  Play,
  Users,
  ArrowLeft,
  X,
} from "lucide-react"
import Image from "next/image"
import { WelcomeScreen } from "./welcome-screen"

interface RegistrationProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: string) => void
}

export function SellerRegistration({ isOpen, onClose, onNavigate }: RegistrationProps) {
  if (!isOpen) return null
  const [isValidated, setIsValidated] = useState(false)
  const [validationData, setValidationData] = useState<{ method: string; contact: string } | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [sellerId, setSellerId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    // Business Details (Step 1)
    hasGST: "",
    gstin: "",
    gstVerified: false,
    businessName: "",
    panNumber: "",
    businessType: "",
    businessAddress: "",
    enrollmentId: "",
    enrollmentVerified: false,

    // Pickup Address (Step 2)
    useGSTAddress: true,
    roomNumber: "",
    streetLocality: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",

    // Bank Details (Step 3)
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankVerified: false,

    // Supplier Details (Step 4)
    storeName: "",
    fullName: "",
    emailId: "",
    agreeToTerms: false,
    password: "",
  })

  // Add this useEffect after the existing useState declarations to check for selected plan
  useEffect(() => {
    // Check if user came from pricing selection
    const selectedPlan = localStorage.getItem("selectedPlan")
    if (selectedPlan) {
      const planData = JSON.parse(selectedPlan)
      console.log("User selected plan:", planData)
      // You could show a banner or pre-fill some information based on the plan choice
    }
  }, [])

  const handleValidationComplete = async (data: {
    method: string
    contact: string
    userId?: string
    existingProgress?: any
  }) => {
    setValidationData(data)
    setIsValidated(true)

    // Pre-fill email if validated via email
    if (data.method === "email") {
      setFormData((prev) => ({ ...prev, emailId: data.contact }))
    }

    // If user has existing progress, restore it
    if (data.existingProgress) {
      setSellerId(data.existingProgress.id)
      setCurrentStep(data.existingProgress.registration_step || 1)

      // Pre-fill form data from existing progress
      if (data.existingProgress.business_details?.[0]) {
        const business = data.existingProgress.business_details[0]
        setFormData((prev) => ({
          ...prev,
          hasGST: business.has_gst ? "yes" : "no",
          gstin: business.gstin || "",
          gstVerified: business.gst_verified || false,
          businessName: business.business_name || "",
          panNumber: business.pan_number || "",
          businessAddress: business.business_address || "",
          enrollmentId: business.enrollment_id || "",
          enrollmentVerified: business.enrollment_verified || false,
        }))
      }

      return
    }

    // Create initial seller record for new users
    try {
      const selectedPlan = localStorage.getItem("selectedPlan")
      const planData = selectedPlan ? JSON.parse(selectedPlan) : null

      const response = await fetch("/api/sellers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_data: {
            email: data.method === "email" ? data.contact : undefined,
            phone: data.method === "mobile" ? data.contact : undefined,
            verification_method: data.method,
          },
          seller_data: {
            store_name: "Temporary Store Name", // Will be updated later
            full_name: "Temporary Name", // Will be updated later
            selected_plan: planData,
          },
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSellerId(result.data.seller.id)
      }
    } catch (error) {
      console.error("Error creating seller record:", error)
    }
  }

  // Show validation screen if not validated
  if (!isValidated) {
    return <WelcomeScreen onNavigate={onNavigate} onValidationComplete={handleValidationComplete} />
  }

  const steps = [
    { id: 1, title: "Business Details", icon: Building, completed: currentStep > 1 },
    { id: 2, title: "Pickup Address", icon: MapPin, completed: currentStep > 2 },
    { id: 3, title: "Bank Details", icon: CreditCard, completed: currentStep > 3 },
    { id: 4, title: "Supplier Details", icon: User, completed: currentStep > 4 },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = async () => {
    if (!sellerId) return

    try {
      let stepData = {}
      let stepName = ""

      switch (currentStep) {
        case 1:
          stepName = "business_details"
          stepData = {
            has_gst: formData.hasGST === "yes",
            gst_type:
              formData.hasGST === "yes" ? "regular" : formData.hasGST === "composition" ? "composition" : "none",
            gstin: formData.gstin,
            gst_verified: formData.gstVerified,
            enrollment_id: formData.enrollmentId,
            enrollment_verified: formData.enrollmentVerified,
            business_name: formData.businessName,
            pan_number: formData.panNumber,
            business_type: formData.businessType,
            business_address: formData.businessAddress,
          }
          break
        case 2:
          stepName = "pickup_address"
          stepData = {
            use_gst_address: formData.useGSTAddress,
            room_number: formData.roomNumber,
            street_locality: formData.streetLocality,
            landmark: formData.landmark,
            pincode: formData.pincode,
            city: formData.city,
            state: formData.state,
          }
          break
        case 3:
          stepName = "bank_details"
          stepData = {
            account_number: formData.accountNumber,
            ifsc_code: formData.ifscCode,
            bank_verified: formData.bankVerified,
          }
          break
        case 4:
          stepName = "complete"
          stepData = {
            store_name: formData.storeName,
            full_name: formData.fullName,
            email_id: formData.emailId,
            password: formData.password,
          }
          // Register the user with email and password
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.emailId, password: formData.password }),
          })
          const regData = await res.json()
          if (!res.ok) throw new Error(regData.error || "Registration failed")
          break
      }

      const response = await fetch(`/api/sellers/${sellerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step: stepName,
          data: stepData,
        }),
      })

      const result = await response.json()
      if (result.success) {
        if (currentStep < 4) {
          setCurrentStep(currentStep + 1)
        } else {
          alert("Registration completed successfully!")
          onClose()
          window.location.reload()
        }
      }
    } catch (error) {
      console.error("Error saving step data:", error)
      const message = typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error)
      alert(message || "Registration failed")
    }
  }

  // Check if current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.hasGST &&
          ((formData.hasGST === "yes" && formData.gstVerified) ||
            (formData.hasGST === "no" && formData.enrollmentVerified))
        )
      case 2:
        return formData.pincode && formData.city && formData.state
      case 3:
        return formData.bankVerified
      case 4:
        return formData.storeName && formData.fullName && formData.emailId && formData.password.length >= 6 && formData.agreeToTerms
      default:
        return false
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BusinessDetailsStep formData={formData} onInputChange={handleInputChange} />
      case 2:
        return <PickupAddressStep formData={formData} onInputChange={handleInputChange} />
      case 3:
        return <BankDetailsStep formData={formData} onInputChange={handleInputChange} />
      case 4:
        return (
          <SupplierDetailsStep formData={formData} onInputChange={handleInputChange} validationData={validationData} />
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <CardContent className="p-0">
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Back Button - Very Top */}
              <div className="pt-4 pb-2">
                <Button onClick={() => onNavigate("home")} variant="outline" className="bg-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>

              {/* Header with Logo and Verification Status */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-gray-200 mb-6">
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={40} height={40} className="w-10 h-10" />
                  <span className="text-xl md:text-2xl font-semibold text-gray-900">Aniyor</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <span className="text-green-600 font-medium">✓ Verified:</span>{" "}
                  {validationData?.method === "email" ? validationData.contact : `+91 ${validationData?.contact}`}
                </div>
              </div>

              {/* Plan Selection Banner */}
              {(() => {
                const selectedPlan = localStorage.getItem("selectedPlan")
                if (selectedPlan) {
                  const planData = JSON.parse(selectedPlan)
                  return (
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              Selected Plan: {planData.plan} ({planData.billing})
                            </p>
                            <p className="text-xs text-blue-700">
                              Complete registration to activate your {planData.plan} plan
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => localStorage.removeItem("selectedPlan")}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Change Plan
                        </button>
                      </div>
                    </div>
                  )
                }
                return null
              })()}

              <div className="grid lg:grid-cols-4 gap-8">
                {/* Main Content - 3 columns */}
                <div className="lg:col-span-3">
                  {/* Progress Steps */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between">
                      {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                step.completed
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : currentStep === step.id
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : "bg-white border-gray-300 text-gray-400"
                              }`}
                            >
                              {step.completed ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                            </div>
                            <div className="mt-2 text-center">
                              <div
                                className={`text-xs font-medium ${
                                  currentStep === step.id
                                    ? "text-blue-600"
                                    : step.completed
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                }`}
                              >
                                {step.title}
                              </div>
                            </div>
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 ${step.completed ? "bg-blue-600" : "bg-gray-200"}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="bg-white rounded-lg p-8 mb-6">{renderStepContent()}</div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mb-8">
                    <Button onClick={handleBack} variant="outline" disabled={currentStep === 1} className="bg-white">
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      className={`px-8 ${canProceed() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-500"} text-white`}
                      disabled={!canProceed()}
                    >
                      {currentStep === 4 ? "Complete Registration" : "Continue"}
                    </Button>
                  </div>

                  {/* FAQ Section - Below buttons */}
                  <RegistrationFAQ currentStep={currentStep} />
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-6">
                  <RegistrationSidebar currentStep={currentStep} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Business Details Step (Simplified 2-column layout)
function BusinessDetailsStep({ formData, onInputChange }: any) {
  const handleGSTVerification = async () => {
    // Simulate GST verification
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onInputChange("gstVerified", true)
    // Auto-fill business details from GST
    onInputChange("businessName", "6Miles Consulting")
    onInputChange("panNumber", "AHMPD4207H")
    onInputChange(
      "businessAddress",
      "A 32, Plot Number 938, Juhu Sunn Sea CHS LTD, Mumbai, Juhu Tara Road, Santacruz West, Pincode - 400049, Mumbai Suburban, Maharashtra",
    )
  }

  const handleEnrollmentVerification = async () => {
    // Simulate Enrollment ID verification
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onInputChange("enrollmentVerified", true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Do you have a GST number?</h2>

        <div className="space-y-4">
          {/* Radio buttons in horizontal layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Yes Option */}
            <label
              className={`flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.hasGST === "yes"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="hasGST"
                value="yes"
                checked={formData.hasGST === "yes"}
                onChange={(e) => onInputChange("hasGST", e.target.value)}
                className="mt-1 text-blue-600"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">Yes</div>
                <div className="text-sm text-gray-600">Enter your GSTIN and sell anywhere easily</div>
              </div>
            </label>

            {/* No Option */}
            <label
              className={`flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.hasGST === "no"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="hasGST"
                value="no"
                checked={formData.hasGST === "no"}
                onChange={(e) => onInputChange("hasGST", e.target.value)}
                className="mt-1 text-blue-600"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">No</div>
                <div className="text-sm text-gray-600 mb-2">Worry not, you can sell without GST</div>
                <div className="text-sm text-green-600 font-medium">Get EID in mins ⚡</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* GST Input Section */}
      {formData.hasGST === "yes" && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter GSTIN"
              value={formData.gstin}
              onChange={(e) => onInputChange("gstin", e.target.value.toUpperCase())}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={15}
            />
            <Button
              onClick={handleGSTVerification}
              className={`${formData.gstVerified ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-6`}
              disabled={formData.gstin.length !== 15}
            >
              {formData.gstVerified ? "Verified" : "Verify"}
            </Button>
          </div>

          {formData.gstVerified && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">GST Details Verified Successfully</span>
              </div>
              <div className="text-sm text-green-700">Business details have been auto-filled from GST records.</div>
            </div>
          )}
        </div>
      )}

      {/* EID Section */}
      {formData.hasGST === "no" && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Get EID in minutes & sell in your registered state</h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <div className="font-medium text-blue-900">Apply for Enrolment ID</div>
                  <div className="text-sm text-blue-700">from the GST website (only PAN required)</div>
                  <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
                    Get it Now
                  </Button>
                </div>
              </div>

              <div className="bg-red-50 p-3 rounded-lg flex items-center space-x-2">
                <Play className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700 font-medium">Watch this video to learn more</span>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <div className="font-medium text-blue-900">Enter Enrolment ID here to complete account setup</div>
                  <div className="text-sm text-blue-700 mb-3">
                    Once your ID is created, copy and paste it here to complete your setup
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter Enrolment ID / UIN"
                      value={formData.enrollmentId}
                      onChange={(e) => onInputChange("enrollmentId", e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      onClick={handleEnrollmentVerification}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                      disabled={!formData.enrollmentId}
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Keep other step components unchanged...
function PickupAddressStep({ formData, onInputChange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pickup Address</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">Aniyor provides free shipping to 24,000+ pincodes in India</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">Products will be picked up from this location for delivery</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.useGSTAddress}
            onChange={(e) => onInputChange("useGSTAddress", e.target.checked)}
            className="text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Use address registered on GST</span>
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Room/ Floor/ Building Number</label>
          <input
            type="text"
            placeholder="A 32, Plot Number 938, Juhu Sunn Sea CHS LTD"
            value={formData.roomNumber}
            onChange={(e) => onInputChange("roomNumber", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Street/ Locality</label>
          <input
            type="text"
            placeholder="Juhu Tara Road, Santacruz West, Mumbai"
            value={formData.streetLocality}
            onChange={(e) => onInputChange("streetLocality", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
          <input
            type="text"
            placeholder="Near Juhu Beach"
            value={formData.landmark}
            onChange={(e) => onInputChange("landmark", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
            <input
              type="text"
              placeholder="400049"
              value={formData.pincode}
              onChange={(e) => onInputChange("pincode", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              placeholder="Mumbai Suburban"
              value={formData.city}
              onChange={(e) => onInputChange("city", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select
            value={formData.state}
            onChange={(e) => onInputChange("state", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function BankDetailsStep({ formData, onInputChange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Bank Details</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">Payments are deposited safely in your bank account on time</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Bank account should be in the name of registered business name or trade name as per EID / GSTIN.
            </p>
          </div>
        </div>
      </div>

      {formData.bankVerified ? (
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Bank details verified successfully</span>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Beneficiary Name:</span>
              <div className="font-medium">6MILES CONSULTING</div>
            </div>
            <div>
              <span className="text-gray-600">Account Number:</span>
              <div className="font-medium">097663400000418</div>
            </div>
            <div>
              <span className="text-gray-600">Bank Name:</span>
              <div className="font-medium">YES BANK</div>
            </div>
            <div>
              <span className="text-gray-600">IFSC Code:</span>
              <div className="font-medium">YESB0000976</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input
              type="text"
              placeholder="Enter your account number"
              value={formData.accountNumber}
              onChange={(e) => onInputChange("accountNumber", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Account Number</label>
            <input
              type="text"
              placeholder="Re-enter your account number"
              value={formData.confirmAccountNumber}
              onChange={(e) => onInputChange("confirmAccountNumber", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
            <input
              type="text"
              placeholder="Enter IFSC Code"
              value={formData.ifscCode}
              onChange={(e) => onInputChange("ifscCode", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-blue-600 mt-1">
              Don't remember IFSC Code?{" "}
              <a href="#" className="underline">
                Find IFSC Code
              </a>
            </p>
          </div>

          <Button
            onClick={() => onInputChange("bankVerified", true)}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white"
            disabled={!formData.accountNumber || !formData.confirmAccountNumber || !formData.ifscCode}
          >
            Verify Bank Details
          </Button>
        </div>
      )}
    </div>
  )
}

function SupplierDetailsStep({ formData, onInputChange, validationData }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Supplier Details</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">
              Resellers use store name to identify their favourite suppliers to buy products
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">Your store name will be visible to all buyers of Aniyor.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
          <input
            type="text"
            placeholder="6Miles Consulting"
            value={formData.storeName}
            onChange={(e) => onInputChange("storeName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">Eg. Business Name, Trade Name, etc.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Full Name</label>
          <input
            type="text"
            placeholder="Vicky Chandramohan Dhanwani"
            value={formData.fullName}
            onChange={(e) => onInputChange("fullName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
          <div className="relative">
            <input
              type="email"
              placeholder="vickydhanwani@gmail.com"
              value={formData.emailId}
              onChange={(e) => onInputChange("emailId", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              disabled={validationData?.method === "email"}
            />
            {validationData?.method === "email" && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Check className="w-5 h-5 text-green-600" />
              </div>
            )}
          </div>
          {validationData?.method === "email" && (
            <p className="text-sm text-green-600 mt-1">✓ Verified email address</p>
          )}
        </div>

        <label className="flex items-start space-x-3 mt-6">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => onInputChange("agreeToTerms", e.target.checked)}
            className="text-blue-600 mt-1"
          />
          <span className="text-sm text-gray-700">
            I agree to comply with Aniyor's{" "}
            <a href="#" className="text-blue-600 underline">
              Supplier Agreement
            </a>
          </span>
        </label>
      </div>
    </div>
  )
}

// FAQ Section Component
function RegistrationFAQ({ currentStep }: { currentStep: number }) {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const toggleFAQ = (faq: string) => {
    setExpandedFAQ(expandedFAQ === faq ? null : faq)
  }

  const faqData = {
    1: [
      {
        id: "sellers",
        question: "Which sellers can sell on Aniyor?",
        answer:
          "Starting October 1st, 2023, sellers (with or without GST registration) can sell on Aniyor. To start selling, Non-GST sellers must obtain an Enrolment ID/ UIN from the GST website. Regular GST & Composite GST sellers can register using their GSTIN number.",
      },
      {
        id: "gstin",
        question: "How can I obtain GSTIN No or Enrolment ID / UIN?",
        answer:
          "You can obtain GSTIN by registering on the GST portal if your turnover exceeds the threshold. For Enrolment ID, visit the GST website and apply with just your PAN number. It takes only a few minutes to complete.",
      },
      {
        id: "difference",
        question: "What is the difference between Enrolment ID / UIN and GSTIN?",
        answer:
          "GSTIN is for businesses with turnover above threshold limits and allows interstate sales. Enrolment ID is for smaller businesses to sell within their state without GST compliance burden.",
      },
    ],
    2: [
      {
        id: "pickup",
        question: "Who will pick up the products for delivery?",
        answer:
          "All products will be picked up by Aniyor certified delivery partners from your location and delivered directly to the customer.",
      },
      {
        id: "address",
        question: "Can I change my pickup address later?",
        answer:
          "Yes, you can update your pickup address anytime from your seller dashboard. However, ensure the address is accurate for smooth order fulfillment.",
      },
    ],
    3: [
      {
        id: "bank",
        question: "What if I don't have bank account in the name of business?",
        answer:
          "We can only transfer payments to accounts which are in the registered business name. Please open a new bank account with any bank in your registered business name.",
      },
      {
        id: "verification",
        question: "How long does bank verification take?",
        answer:
          "Bank verification is usually instant. In some cases, it may take up to 24 hours for verification to complete.",
      },
    ],
    4: [
      {
        id: "store",
        question: "What is Store Name and where it is used?",
        answer:
          "Your Store Name is visible on the Aniyor reseller app with your products. Resellers use Store Name to identify their preferred suppliers.",
      },
      {
        id: "change",
        question: "Can I change my store name later?",
        answer:
          "Yes, you can update your store name from your seller dashboard. However, frequent changes may affect your brand recognition among buyers.",
      },
    ],
  }

  const currentFAQs = faqData[currentStep as keyof typeof faqData] || []

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {currentFAQs.map((faq) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {expandedFAQ === faq.id ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedFAQ === faq.id && <div className="px-4 pb-4 text-sm text-gray-600">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function RegistrationSidebar({ currentStep }: { currentStep: number }) {
  const sidebarContent = [
    {
      step: 1,
      title: "GST & Business Verification",
      content:
        "GST verification helps us ensure compliance and enables you to sell across India. If you don't have GST, we'll help you get an Enrollment ID (EID) to start selling within your state immediately.",
      icon: Building,
      color: "blue",
    },
    {
      step: 2,
      title: "Pickup & Delivery",
      content:
        "All products will be picked up by Aniyor certified delivery partners from your location and delivered directly to the customer.",
      icon: MapPin,
      color: "green",
    },
    {
      step: 3,
      title: "Secure Payments",
      content:
        "We can only transfer payments to accounts which are in the registered business name. Please open a new bank account with any bank in your registered business name.",
      icon: CreditCard,
      color: "purple",
    },
    {
      step: 4,
      title: "Store Identity",
      content:
        "Your Store Name is visible on the Aniyor reseller app with your products. Resellers use Store Name to identify their preferred suppliers.",
      icon: User,
      color: "orange",
    },
  ]

  const currentContent = sidebarContent.find((content) => content.step === currentStep)

  return (
    <div className="space-y-6">
      {/* Current Step Info */}
      {currentContent && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-${currentContent.color}-100 rounded-lg flex items-center justify-center`}>
                <currentContent.icon className={`w-5 h-5 text-${currentContent.color}-600`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{currentContent.title}</h3>
                <p className="text-sm text-gray-600">{currentContent.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Call us</p>
                <p className="text-sm text-blue-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">100,000+ sellers trust Aniyor</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of 4</span>
              <span>{Math.round((currentStep / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
