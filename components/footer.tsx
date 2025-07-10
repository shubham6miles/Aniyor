"use client"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

interface FooterProps {
  onNavigate: (page: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
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

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Branding */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <Image src="/aniyor-logo.png" alt="Aniyor Logo" width={40} height={40} className="w-10 h-10" />
                <span className="text-2xl font-semibold">Aniyor</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Connecting spiritual businesses with devotees worldwide. Your trusted marketplace for authentic
                spiritual products and services. Empowering sellers to reach millions of customers across India.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210 (Mon-Fri, 9 AM - 6 PM IST)</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>support@aniyor.com (24/7 support)</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>
                    123 Business Park, Sector 18,
                    <br />
                    Gurgaon, Haryana 122015
                  </span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => handleSmoothScroll("why-aniyor")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Why Aniyor
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSmoothScroll("what-you-can-sell")}
                    className="hover:text-white transition-colors text-left"
                  >
                    What You Can Sell
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSmoothScroll("who-can-sell")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Who Can Sell
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSmoothScroll("how-it-works")}
                    className="hover:text-white transition-colors text-left"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSmoothScroll("pricing-plans")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Pricing Plans
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("gst-info")}
                    className="hover:text-white transition-colors text-left"
                  >
                    GST Information
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => handleSmoothScroll("faqs")}
                    className="hover:text-white transition-colors text-left"
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <a href="mailto:sellers@aniyor.net" className="hover:text-white transition-colors">
                    Seller Support
                  </a>
                </li>
                <li>
                  <a href="mailto:tech@aniyor.net" className="hover:text-white transition-colors">
                    Technical Help
                  </a>
                </li>
                <li>
                  <a href="mailto:partners@aniyor.net" className="hover:text-white transition-colors">
                    Partnership
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-6 text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <button onClick={() => onNavigate("terms")} className="hover:text-white transition-colors text-left">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("privacy")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("cookie-policy")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("refund-policy")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Refund Policy
                  </button>
                </li>
                <li>
                  <a href="mailto:legal@aniyor.net" className="hover:text-white transition-colors">
                    Legal Inquiries
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>&copy; 2024 Aniyor. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-400">
              <button onClick={() => onNavigate("terms")} className="hover:text-white transition-colors">
                Terms
              </button>
              <button onClick={() => onNavigate("privacy")} className="hover:text-white transition-colors">
                Privacy
              </button>
              <button onClick={() => onNavigate("cookie-policy")} className="hover:text-white transition-colors">
                Cookies
              </button>
              <button onClick={() => onNavigate("refund-policy")} className="hover:text-white transition-colors">
                Refunds
              </button>
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
