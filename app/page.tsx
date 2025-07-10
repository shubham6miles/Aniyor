"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Zap, Shield, Star, ArrowRight } from "lucide-react"
import { HeroCarousel } from "@/components/hero-carousel"
import { SmoothScroll } from "@/components/smooth-scroll"
import { EnhancedPricing } from "@/components/enhanced-pricing"
import { Footer } from "@/components/footer"
import {
  TermsPage,
  PrivacyPage,
  ContactPage,
  GSTInfoPage,
  CookiePolicyPage,
  RefundPolicyPage,
} from "@/components/content-pages"
import { SellerRegistration } from "@/components/seller-registration"
import { SignInModal } from "@/components/sign-in-modal"
import { WhatCanYouSellTabs } from "@/components/what-can-you-sell-tabs"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    setIsSignInOpen(false)
    setIsRegisterOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleGSTINClick = () => {
    if (currentPage !== "home") {
      setCurrentPage("home")
      setTimeout(() => {
        const element = document.getElementById("gstin-info")
        if (element) {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    } else {
      const element = document.getElementById("gstin-info")
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }

  // Render different pages based on currentPage state
  if (currentPage === "terms") {
    return <TermsPage onNavigate={handleNavigate} />
  }

  if (currentPage === "privacy") {
    return <PrivacyPage onNavigate={handleNavigate} />
  }

  if (currentPage === "contact") {
    return <ContactPage onNavigate={handleNavigate} />
  }

  if (currentPage === "gst-info") {
    return <GSTInfoPage onNavigate={handleNavigate} />
  }

  if (currentPage === "cookie-policy") {
    return <CookiePolicyPage onNavigate={handleNavigate} />
  }

  if (currentPage === "refund-policy") {
    return <RefundPolicyPage onNavigate={handleNavigate} />
  }

  if (currentPage === "register") {
    return <SellerRegistration onNavigate={handleNavigate} />
  }

  // Default home page
  return (
    <div className="min-h-screen bg-white">
      <SmoothScroll />
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Using just the monogram */}
            <div className="flex items-center space-x-2">
              <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={40} height={40} className="w-10 h-10" />
              <span className="text-xl font-semibold text-gray-900">Aniyor</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#why-aniyor" className="text-gray-600 hover:text-gray-900 text-sm">
                Why Aniyor
              </Link>
              <Link href="#what-you-can-sell" className="text-gray-600 hover:text-gray-900 text-sm">
                What You Can Sell
              </Link>
              <Link href="#who-can-sell" className="text-gray-600 hover:text-gray-900 text-sm">
                Who Can Sell
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm">
                How It Works
              </Link>
              <Link href="#pricing-plans" className="text-gray-600 hover:text-gray-900 text-sm">
                Pricing Plans
              </Link>
              <button onClick={handleGSTINClick} className="text-gray-600 hover:text-gray-900 text-sm">
                GSTIN Info
              </button>
              <Link href="#faqs" className="text-gray-600 hover:text-gray-900 text-sm">
                FAQs
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsSignInOpen(true)}
              >
                Sign In
              </Button>
              <Button
                onClick={() => setIsRegisterOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Start Selling
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <HeroCarousel onNavigate={handleNavigate} />

      {/* Why Sell with Aniyor */}
      <section id="why-aniyor" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Sell with Aniyor?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of joining our spiritual marketplace community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Targeted Audience</h3>
                <p className="text-gray-600 text-sm">
                  Reach spiritual seekers and devotees actively looking for authentic products
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Secure Platform</h3>
                <p className="text-gray-600 text-sm">Safe and secure transactions with verified payment methods</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Easy Setup</h3>
                <p className="text-gray-600 text-sm">Get started in minutes with our simple onboarding process</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Round-the-clock customer support to help you succeed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Can You Sell - Enhanced with Tabs */}
      <section id="what-you-can-sell" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Can You Sell?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From spiritual services to sacred products and meaningful events - discover endless opportunities to serve
              the spiritual community
            </p>
          </div>
          <WhatCanYouSellTabs />
        </div>
      </section>

      {/* Who Can Sell */}
      <section id="who-can-sell" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Who Can Sell on Aniyor?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Individual Artisans", desc: "Craftspeople creating spiritual items" },
              { title: "Small Businesses", desc: "Local shops and spiritual stores" },
              { title: "Authors & Publishers", desc: "Writers of spiritual and religious content" },
              { title: "Service Providers", desc: "Astrologers, spiritual counselors, and guides" },
              { title: "NGOs & Trusts", desc: "Non-profit organizations promoting spirituality" },
              { title: "Institutions", desc: "Religious institutions and spiritual centers" },
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get started in just a few simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Create your seller account in minutes" },
              { step: "2", title: "List Products", desc: "Add your products with photos and descriptions" },
              { step: "3", title: "Get Orders", desc: "Receive orders from customers worldwide" },
              { step: "4", title: "Earn Money", desc: "Get paid securely for every sale" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                {index < 3 && <ArrowRight className="w-6 h-6 text-gray-400 mx-auto mt-4 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Start */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers on Aniyor and grow your spiritual business today
          </p>
          <Button
            onClick={() => handleNavigate("register")}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Start Selling Now
          </Button>
        </div>
      </section>

      {/* GSTIN Info Section */}
      <section id="gstin-info" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Don't have GSTIN? or having Composition GSTIN? No Worries! We got you Covered.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're a big business or a small one, now sell to millions in your state, without a Regular
                  GSTIN
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => handleNavigate("gst-info")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base"
                >
                  Know More
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="GSTIN registration and compliance illustration"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Plans */}
      <EnhancedPricing onNavigate={handleNavigate} />

      {/* FAQs Section */}
      <section id="faqs" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about selling on Aniyor
            </p>
          </div>
          <div className="space-y-8">
            {[
              {
                question: "How do I create a seller account?",
                answer: "Create an account by providing basic information and verifying your identity.",
              },
              {
                question: "What documents do I need to provide?",
                answer:
                  "Required documents may vary but usually include proof of identity, address, and business registration.",
              },
              {
                question: "What are the fees associated with selling on the platform?",
                answer: "Fees may include listing fees, transaction fees, and payment processing fees.",
              },
              {
                question: "How does the platform handle payments?",
                answer:
                  "The platform typically holds funds until the order is fulfilled and then disburses payments to your bank account.",
              },
              {
                question: "What are the different product and Service categories available?",
                answer:
                  "Aniyor offer a wide range of categories, from electronics and fashion to professional services, Yatra assistance and more.",
              },
              {
                question: "How do I list my products / services?",
                answer:
                  "Follow the platform's guidelines to create product listings, including titles, descriptions, images, and pricing.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              onClick={() => handleNavigate("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onNavigate={(page) => {
          if (page === "register") {
            setIsSignInOpen(false)
            setIsRegisterOpen(true)
          } else {
            handleNavigate(page)
          }
        }}
      />
      <SellerRegistration
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
