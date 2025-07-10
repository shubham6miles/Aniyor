"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Mail, Phone } from "lucide-react"
import Image from "next/image"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate?: (page: string) => void
}

export function SignInModal({ isOpen, onClose, onNavigate = () => {} }: SignInModalProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      // If admin, check role
      if (isAdmin && data.user.role !== "admin") throw new Error("Not an admin account")
      if (!isAdmin && data.user.role !== "seller") throw new Error("Not a seller account")
      onClose()
      window.location.reload()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <Image src="/aniyor-logo-dark.png" alt="Aniyor Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-semibold text-gray-900">Sign In</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Admin/Seller Toggle */}
            <div className="flex justify-center mb-4">
              <button
                className={`px-4 py-2 rounded-l-lg border ${!isAdmin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                onClick={() => setIsAdmin(false)}
              >
                Seller
              </button>
              <button
                className={`px-4 py-2 rounded-r-lg border ${isAdmin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                onClick={() => setIsAdmin(true)}
              >
                Admin
              </button>
            </div>
            {/* Email/Password Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={loading || !formData.email || !formData.password}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
            {/* Registration Link for Sellers */}
            {!isAdmin && (
              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    onClose();
                    onNavigate("register");
                  }}
                >
                  Register here
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
