"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Phone, Mail, MapPin, Users, Shield } from "lucide-react"
import Image from "next/image"

interface ContentPageProps {
  onNavigate: (page: string) => void
}

export function TermsPage({ onNavigate }: ContentPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Very Top */}
        <div className="pt-4 pb-2">
          <Button onClick={() => onNavigate("home")} variant="outline" className="bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Logo and Title Section */}
        <div className="py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-900">Aniyor</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        {/* Content starts here with proper spacing */}
        <div className="py-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Platform Usage</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using Aniyor, you agree to be bound by these Terms and Conditions. Our platform
                  connects spiritual businesses with devotees worldwide, facilitating the sale of authentic spiritual
                  products and services.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>You must be at least 18 years old to use our services</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You agree to provide accurate and complete information</li>
                  <li>You will not use the platform for any illegal or unauthorized purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Seller Obligations</h2>
                <p className="text-gray-600 mb-4">As a seller on Aniyor, you agree to the following obligations:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate product descriptions and pricing</li>
                  <li>Fulfill orders promptly and professionally</li>
                  <li>Maintain appropriate inventory levels</li>
                  <li>Respond to customer inquiries within 24 hours</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Maintain quality standards for all products and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Payment Terms</h2>
                <p className="text-gray-600 mb-4">Payment processing and terms are as follows:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Payments are processed securely through our payment partners</li>
                  <li>Seller payouts are made within 7-14 business days after order completion</li>
                  <li>Platform fees are deducted from seller earnings as per the chosen plan</li>
                  <li>Refunds are processed according to our refund policy</li>
                  <li>All prices are inclusive of applicable taxes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Activities</h2>
                <p className="text-gray-600 mb-4">The following activities are strictly prohibited on our platform:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Selling counterfeit or fraudulent products</li>
                  <li>Misrepresenting products or services</li>
                  <li>Engaging in price manipulation or unfair practices</li>
                  <li>Violating intellectual property rights</li>
                  <li>Posting inappropriate or offensive content</li>
                  <li>Attempting to circumvent platform fees</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-600">
                  Aniyor provides the platform "as is" and makes no warranties regarding the availability, accuracy, or
                  reliability of the service. We are not liable for any indirect, incidental, or consequential damages
                  arising from your use of the platform.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PrivacyPage({ onNavigate }: ContentPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Very Top */}
        <div className="pt-4 pb-2">
          <Button onClick={() => onNavigate("home")} variant="outline" className="bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Logo and Title Section */}
        <div className="py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-900">Aniyor</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        {/* Content starts here with proper spacing */}
        <div className="py-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Data Collection</h2>
                <p className="text-gray-600 mb-4">
                  We collect information to provide better services to our users. The types of information we collect
                  include:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Personal information (name, email, phone number, address)</li>
                  <li>Business information (company details, GST information)</li>
                  <li>Transaction data (purchase history, payment information)</li>
                  <li>Usage data (how you interact with our platform)</li>
                  <li>Device information (IP address, browser type, operating system)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Data Usage</h2>
                <p className="text-gray-600 mb-4">We use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and payments</li>
                  <li>Communicating with users about their accounts and transactions</li>
                  <li>Improving our platform and user experience</li>
                  <li>Complying with legal obligations</li>
                  <li>Preventing fraud and ensuring platform security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell your personal information. We may share your information in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>With your explicit consent</li>
                  <li>With service providers who assist in our operations</li>
                  <li>For legal compliance or to protect our rights</li>
                  <li>In case of business transfers or mergers</li>
                  <li>With payment processors for transaction processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Rights</h2>
                <p className="text-gray-600 mb-4">You have the following rights regarding your personal data:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Right to access your personal information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your account and data</li>
                  <li>Right to data portability</li>
                  <li>Right to object to certain data processing</li>
                  <li>Right to withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContactPage({ onNavigate }: ContentPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Very Top */}
        <div className="pt-4 pb-2">
          <Button onClick={() => onNavigate("home")} variant="outline" className="bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Logo and Title Section */}
        <div className="py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-900">Aniyor</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Get in touch with our team. We're here to help you succeed on Aniyor.</p>
        </div>

        {/* Content starts here with proper spacing */}
        <div className="py-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardContent className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>General Support</option>
                      <option>Seller Support</option>
                      <option>Technical Help</option>
                      <option>Partnership</option>
                      <option>Legal Inquiries</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Phone Support */}
              <Card className="p-6">
                <CardContent className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-gray-600 mb-2">+91 98765 43210</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM IST</p>
                  </div>
                </CardContent>
              </Card>

              {/* Email Support */}
              <Card className="p-6">
                <CardContent className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-2">support@aniyor.com</p>
                    <p className="text-sm text-gray-500">24/7 support available</p>
                  </div>
                </CardContent>
              </Card>

              {/* Office Address */}
              <Card className="p-6">
                <CardContent className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h3>
                    <p className="text-gray-600">
                      123 Business Park, Sector 18
                      <br />
                      Gurgaon, Haryana 122015
                      <br />
                      India
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Department Emails */}
              <Card className="p-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-Specific Emails</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seller Support:</span>
                      <a href="mailto:sellers@aniyor.net" className="text-blue-600 hover:underline">
                        sellers@aniyor.net
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technical Help:</span>
                      <a href="mailto:tech@aniyor.net" className="text-blue-600 hover:underline">
                        tech@aniyor.net
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Partnership:</span>
                      <a href="mailto:partners@aniyor.net" className="text-blue-600 hover:underline">
                        partners@aniyor.net
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Legal Inquiries:</span>
                      <a href="mailto:legal@aniyor.net" className="text-blue-600 hover:underline">
                        legal@aniyor.net
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GSTInfoPage({ onNavigate }: ContentPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Very Top */}
        <div className="pt-4 pb-2">
          <Button onClick={() => onNavigate("home")} variant="outline" className="bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Logo and Title Section */}
        <div className="py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-900">Aniyor</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">GST Information</h1>
          <p className="text-lg text-gray-600">
            Complete guide to selling without regular GSTIN and composition scheme benefits
          </p>
        </div>

        {/* Content starts here with proper spacing */}
        <div className="py-8">
          <div className="space-y-8">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 p-8">
              <CardContent>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Don't have GSTIN? or having Composition GSTIN? No Worries!
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Whether you're a big business or a small one, now sell to millions in your state, without a Regular
                  GSTIN
                </p>
                <Button onClick={() => onNavigate("register")} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started Today
                </Button>
              </CardContent>
            </Card>

            {/* Selling Without Regular GSTIN */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Selling Without Regular GSTIN</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardContent>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Who Can Sell?</h3>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• Small businesses with turnover below ₹40 lakhs</li>
                      <li>• Individual artisans and craftspeople</li>
                      <li>• Service providers with local operations</li>
                      <li>• Composition scheme registered businesses</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• Simplified tax compliance</li>
                      <li>• Lower tax rates under composition scheme</li>
                      <li>• Reduced paperwork and filing requirements</li>
                      <li>• Focus on business growth, not compliance</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Composition Scheme Benefits */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Composition Scheme Benefits</h2>
              <Card className="p-6">
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">1%</div>
                      <div className="text-sm text-gray-600">Tax rate for manufacturers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">2.5%</div>
                      <div className="text-sm text-gray-600">Tax rate for traders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">6%</div>
                      <div className="text-sm text-gray-600">Tax rate for service providers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Eligibility Criteria */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eligibility Criteria</h2>
              <Card className="p-6">
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Turnover Limit</h4>
                        <p className="text-gray-600 text-sm">Annual turnover should not exceed ₹1.5 crores</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Business Type</h4>
                        <p className="text-gray-600 text-sm">
                          Suitable for manufacturers, traders, and service providers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">State Operations</h4>
                        <p className="text-gray-600 text-sm">
                          Can sell within your state without interstate complications
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Required Documents */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Required Documents</h2>
              <Card className="p-6">
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Basic Documents</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• PAN Card</li>
                        <li>• Aadhaar Card</li>
                        <li>• Bank Account Details</li>
                        <li>• Business Address Proof</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Additional Documents</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Business Registration Certificate (if applicable)</li>
                        <li>• Partnership Deed (for partnerships)</li>
                        <li>• MOA/AOA (for companies)</li>
                        <li>• Digital Signature Certificate</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA Section */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <CardContent className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Selling?</h3>
                <p className="text-blue-100 mb-6">
                  Join thousands of sellers who are growing their business with Aniyor's simplified GST solutions
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => onNavigate("register")} className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Selling Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                    onClick={() => onNavigate("contact")}
                  >
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CookiePolicyPage({ onNavigate }: ContentPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Very Top */}
        <div className="pt-4 pb-2">
          <Button onClick={() => onNavigate("home")} variant="outline" className="bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Logo and Title Section */}
        <div className="py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-900">Aniyor</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        {/* Content starts here with proper spacing */}
        <div className="py-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are stored on your device when you visit our website. They help us
                  provide you with a better experience by remembering your preferences and analyzing how you use our
                  platform.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand user behavior</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies for personalized advertising</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                    <p className="text-gray-600">
                      These cookies are necessary for the website to function properly. They enable core functionality
                      such as security, network management, and accessibility.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                    <p className="text-gray-600">
                      We use analytics cookies to understand how visitors interact with our website, helping us improve
                      our services and user experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                    <p className="text-gray-600">
                      These cookies enable enhanced functionality and personalization, such as remembering your login
                      details and language preferences.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Managing Cookies</h2>
                <p className="text-gray-600 mb-4">
                  You can control and manage cookies in various ways. Please note that removing or blocking cookies may
                  impact your user experience and parts of our website may no longer be fully accessible.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Browser settings to block or delete cookies</li>
                  <li>Opt-out tools provided by advertising networks</li>
                  <li>Privacy settings on your device</li>
                  <li>Third-party cookie management tools</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
                <p className="text-gray-600">
                  We may use third-party services that place cookies on your device. These include analytics providers,
                  advertising networks, and social media platforms. Each third party has their own privacy and cookie
                  policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Updates to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Cookie Policy from time to time. We will notify you of any significant changes by
                  posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RefundPolicyPage({ onNavigate }: ContentPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Very Top */}
        <div className="pt-4 pb-2">
          <Button onClick={() => onNavigate("home")} variant="outline" className="bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Logo and Title Section */}
        <div className="py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-900">Aniyor</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        {/* Content starts here with proper spacing */}
        <div className="py-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Refund Eligibility</h2>
                <p className="text-gray-600 mb-4">
                  We want you to be completely satisfied with your purchase. Refunds are available under the following
                  conditions:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Product not as described or significantly different from listing</li>
                  <li>Damaged or defective items received</li>
                  <li>Items not delivered within the specified timeframe</li>
                  <li>Seller cancellation or inability to fulfill order</li>
                  <li>Quality issues that don't meet platform standards</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Refund Process</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Request Refund</h3>
                    <p className="text-gray-600">
                      Contact our customer support within 7 days of delivery to initiate a refund request. Provide order
                      details and reason for refund.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Review Process</h3>
                    <p className="text-gray-600">
                      Our team will review your request within 2-3 business days. We may request additional information
                      or photos if needed.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Refund Processing</h3>
                    <p className="text-gray-600">
                      Once approved, refunds are processed within 5-7 business days to your original payment method.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Non-Refundable Items</h2>
                <p className="text-gray-600 mb-4">Certain items are not eligible for refunds:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Digital products and services once delivered</li>
                  <li>Personalized or custom-made items</li>
                  <li>Perishable goods and consumables</li>
                  <li>Items damaged due to misuse or normal wear</li>
                  <li>Products returned without original packaging</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Seller Refund Policies</h2>
                <p className="text-gray-600 mb-4">
                  Individual sellers may have their own refund policies that are more restrictive than our platform
                  policy. Please check the seller's specific terms before making a purchase.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Seller-specific return windows</li>
                  <li>Condition requirements for returns</li>
                  <li>Return shipping responsibilities</li>
                  <li>Restocking fees (if applicable)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Subscription Refunds</h2>
                <p className="text-gray-600 mb-4">For subscription services and seller plans:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>30-day money-back guarantee for new subscribers</li>
                  <li>Pro-rated refunds for annual plans cancelled mid-term</li>
                  <li>No refunds for partial months of service</li>
                  <li>Cancellation takes effect at the end of current billing period</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
                <p className="text-gray-600">
                  For refund requests or questions about this policy, please contact our customer support team at
                  support@aniyor.com or call +91 98765 43210 during business hours.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
