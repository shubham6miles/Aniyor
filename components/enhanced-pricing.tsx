"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Clock, Zap } from "lucide-react"

interface PricingPlan {
  name: string
  monthlyPrice: string
  yearlyPrice: string
  monthlyOriginal?: string
  yearlyOriginal?: string
  features: string[]
  popular: boolean
  highlight?: string
}

interface EnhancedPricingProps {
  onNavigate?: (page: string) => void
}

const plans: PricingPlan[] = [
  {
    name: "Basic",
    monthlyPrice: "₹750",
    yearlyPrice: "₹8100",
    features: ["Up to 5 products", "Basic analytics", "Email support", "Standard listing"],
    popular: false,
    highlight: "Start for free - 30 day trial",
  },
  {
    name: "Professional",
    monthlyPrice: "₹2000",
    yearlyPrice: "₹21,600",
    monthlyOriginal: "₹2400",
    yearlyOriginal: "₹25,920",
    features: ["Up to 15 products", "Advanced analytics", "Priority support", "Featured listings", "Marketing tools"],
    popular: true,
    highlight: "Most Popular Choice",
  },
  {
    name: "Enterprise",
    monthlyPrice: "₹5,000",
    yearlyPrice: "₹54,000",
    monthlyOriginal: "₹6,000",
    yearlyOriginal: "₹64,800",
    features: [
      "50 products",
      "Custom analytics",
      "24/7 phone support",
      "Premium listings",
      "Advanced marketing",
      "API access",
    ],
    popular: false,
    highlight: "Best Value for Scale",
  },
]

export function EnhancedPricing({ onNavigate = () => {} }: EnhancedPricingProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 0,
    seconds: 0,
  })

  const handleNavigate = (page: string) => {
    onNavigate(page)
  }

  // Add this function after the existing handleNavigate function
  const handlePlanSelection = (planName: string, planType: string) => {
    // Record the plan choice in localStorage (simulating backend storage)
    const planChoice = {
      plan: planName,
      billing: isYearly ? "yearly" : "monthly",
      timestamp: new Date().toISOString(),
      action: planType, // 'get-started', 'try-free', or 'start-free-trial'
      price: isYearly
        ? plans.find((p) => p.name === planName)?.yearlyPrice || "₹0"
        : plans.find((p) => p.name === planName)?.monthlyPrice || "₹0",
    }

    localStorage.setItem("selectedPlan", JSON.stringify(planChoice))
    console.log("Plan choice recorded:", planChoice)

    // Navigate to registration page
    handleNavigate("register")
  }

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          // Reset to 3 hours when countdown reaches 0
          return { hours: 3, minutes: 0, seconds: 0 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="pricing-plans" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Select the perfect plan for your business needs and start growing today
          </p>

          {/* Countdown Banner */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-4 rounded-lg shadow-lg animate-pulse">
              <div className="flex items-center justify-center space-x-4">
                <Clock className="w-6 h-6 animate-spin" />
                <div className="text-center">
                  <div className="text-sm font-medium">🔥 Limited Time Offer!</div>
                  <div className="text-lg font-bold">Second Month for just ₹20/-</div>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">Ends in:</span>
                  <div className="flex space-x-1 font-mono font-bold">
                    <span className="bg-white/30 px-2 py-1 rounded text-sm">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </span>
                    <span>:</span>
                    <span className="bg-white/30 px-2 py-1 rounded text-sm">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </span>
                    <span>:</span>
                    <span className="bg-white/30 px-2 py-1 rounded text-sm">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  !isYearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                  isYearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 10%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                plan.popular ? "border-blue-600 border-2 shadow-lg" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <CardContent className="text-center space-y-6">
                {/* Plan Header */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  {plan.highlight && (
                    <p className={`text-sm font-bold ${plan.name === "Basic" ? "text-green-600" : "text-blue-600"}`}>
                      {plan.highlight}
                    </p>
                  )}
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <div className="text-left">
                      <div className="text-gray-600 text-sm">{isYearly ? "/year" : "/month"}</div>
                      {isYearly && plan.yearlyOriginal && (
                        <div className="text-gray-400 text-xs line-through">{plan.yearlyOriginal}</div>
                      )}
                      {!isYearly && plan.monthlyOriginal && (
                        <div className="text-gray-400 text-xs line-through">{plan.monthlyOriginal}</div>
                      )}
                    </div>
                  </div>
                  {isYearly && plan.name !== "Basic" && (
                    <div className="text-green-600 text-sm font-medium">Save 10% with yearly billing</div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => handlePlanSelection(plan.name, "get-started")}
                    className={`w-full py-3 text-base font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    Get Started
                  </Button>
                  <Button
                    onClick={() => handlePlanSelection(plan.name, "try-free")}
                    variant="outline"
                    className="w-full py-2 text-sm border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 bg-transparent"
                  >
                    Try for 30 days
                  </Button>
                </div>

                {/* Additional Info */}
                {plan.name === "Basic" && (
                  <div className="text-xs text-gray-500 pt-2">No credit card required • Cancel anytime</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still not sure which plan is right for you?</h3>
            <p className="text-gray-600 mb-6">Start with our free plan and upgrade anytime as your business grows</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handlePlanSelection("Basic", "start-free-trial")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Start Free Trial
              </Button>
              <Button
                onClick={() => handleNavigate("contact")}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
