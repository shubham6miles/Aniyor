"use client"

import * as React from "react";

export function SellerDashboardLayout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.reload()
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="font-bold text-xl">Aniyor Seller Portal</div>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </header>
      <main className="p-8 max-w-5xl mx-auto w-full">{children}</main>
    </div>
  );
} 