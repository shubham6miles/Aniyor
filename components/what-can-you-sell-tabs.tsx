"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const tabData = {
  services: [
    {
      title: "Astrology Consultation",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Vedic astrology readings, birth chart analysis, and future predictions",
      price: "Starting from ₹500",
    },
    {
      title: "Spiritual Counseling",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Life guidance, meditation coaching, and spiritual mentorship",
      price: "Starting from ₹800",
    },
    {
      title: "Vastu Consultation",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Home and office Vastu analysis and remedial solutions",
      price: "Starting from ₹1,200",
    },
    {
      title: "Yoga Classes",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Personal and group yoga sessions, pranayama, and meditation",
      price: "Starting from ₹300",
    },
    {
      title: "Puja Services",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Home puja, temple ceremonies, and religious rituals",
      price: "Starting from ₹600",
    },
    {
      title: "Numerology Reading",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Name analysis, lucky numbers, and life path guidance",
      price: "Starting from ₹400",
    },
    {
      title: "Palmistry",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Hand reading, palm analysis, and destiny predictions",
      price: "Starting from ₹350",
    },
    {
      title: "Tarot Reading",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Card readings for love, career, and life guidance",
      price: "Starting from ₹450",
    },
    {
      title: "Reiki Healing",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Energy healing, chakra balancing, and spiritual cleansing",
      price: "Starting from ₹700",
    },
    {
      title: "Mantra Chanting",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Personalized mantra sessions and chanting guidance",
      price: "Starting from ₹250",
    },
    {
      title: "Gemstone Consultation",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Gemstone recommendations and astrological remedies",
      price: "Starting from ₹600",
    },
  ],
  products: [
    {
      title: "Sacred Books",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Religious scriptures, spiritual guides, and devotional literature",
      price: "₹150 - ₹2,500",
    },
    {
      title: "Spiritual Jewelry",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Rudraksha, gemstone jewelry, and sacred pendants",
      price: "₹200 - ₹15,000",
    },
    {
      title: "Puja Items",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Incense, diyas, prayer accessories, and ritual items",
      price: "₹50 - ₹5,000",
    },
    {
      title: "Idols & Statues",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Deity idols, spiritual statues, and sacred sculptures",
      price: "₹300 - ₹25,000",
    },
    {
      title: "Handicrafts",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Handmade spiritual items, decorative pieces, and artifacts",
      price: "₹100 - ₹8,000",
    },
    {
      title: "Meditation Accessories",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Meditation cushions, singing bowls, and prayer mats",
      price: "₹250 - ₹3,500",
    },
    {
      title: "Ayurvedic Products",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Natural herbs, oils, and traditional wellness products",
      price: "₹180 - ₹4,000",
    },
    {
      title: "Spiritual Clothing",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Traditional wear, meditation robes, and sacred garments",
      price: "₹400 - ₹6,000",
    },
    {
      title: "Crystals & Gemstones",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Healing crystals, precious stones, and energy gems",
      price: "₹100 - ₹12,000",
    },
    {
      title: "Sacred Art",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Religious paintings, spiritual artwork, and divine imagery",
      price: "₹500 - ₹20,000",
    },
    {
      title: "Prayer Beads",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Mala beads, rosaries, and counting beads for meditation",
      price: "₹80 - ₹2,000",
    },
  ],
  events: [
    {
      title: "Spiritual Workshops",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Meditation workshops, spiritual learning sessions, and retreats",
      price: "₹500 - ₹5,000",
    },
    {
      title: "Yoga Retreats",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Weekend retreats, yoga camps, and wellness getaways",
      price: "₹2,000 - ₹25,000",
    },
    {
      title: "Religious Festivals",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Festival celebrations, community gatherings, and cultural events",
      price: "₹1,000 - ₹15,000",
    },
    {
      title: "Pilgrimage Tours",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Sacred site visits, spiritual journeys, and guided pilgrimages",
      price: "₹5,000 - ₹50,000",
    },
    {
      title: "Meditation Sessions",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Group meditation, mindfulness sessions, and spiritual gatherings",
      price: "₹200 - ₹1,500",
    },
    {
      title: "Satsang Programs",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Spiritual discourses, devotional singing, and community prayers",
      price: "₹300 - ₹2,000",
    },
    {
      title: "Astrology Seminars",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Learning sessions, astrology courses, and prediction workshops",
      price: "₹800 - ₹8,000",
    },
    {
      title: "Healing Circles",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Energy healing sessions, group therapy, and wellness circles",
      price: "₹400 - ₹3,000",
    },
    {
      title: "Cultural Performances",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Devotional music, dance performances, and spiritual arts",
      price: "₹1,500 - ₹12,000",
    },
    {
      title: "Spiritual Conferences",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Large gatherings, spiritual summits, and enlightenment conferences",
      price: "₹2,500 - ₹20,000",
    },
    {
      title: "Temple Events",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Temple ceremonies, special pujas, and religious celebrations",
      price: "₹600 - ₹10,000",
    },
  ],
}

export function WhatCanYouSellTabs() {
  const [activeTab, setActiveTab] = useState<"services" | "products" | "events">("services")
  const [scrollPositions, setScrollPositions] = useState({
    services: 0,
    products: 0,
    events: 0,
  })

  const tabs = [
    { id: "services" as const, label: "Services", count: tabData.services.length },
    { id: "products" as const, label: "Products", count: tabData.products.length },
    { id: "events" as const, label: "Events", count: tabData.events.length },
  ]

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById(`scroll-container-${activeTab}`)
    if (!container) return

    const cardWidth = 320 // Card width + gap
    const scrollAmount = cardWidth * 2 // Scroll 2 cards at a time
    const currentScroll = container.scrollLeft
    const newScroll = direction === "left" ? Math.max(0, currentScroll - scrollAmount) : currentScroll + scrollAmount

    container.scrollTo({
      left: newScroll,
      behavior: "smooth",
    })

    setScrollPositions((prev) => ({
      ...prev,
      [activeTab]: newScroll,
    }))
  }

  const currentData = tabData[activeTab]
  const canScrollLeft = scrollPositions[activeTab] > 0
  const canScrollRight = scrollPositions[activeTab] < (currentData.length - 3) * 320

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all relative ${
                activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all ${
            canScrollLeft
              ? "bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all ${
            canScrollRight
              ? "bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Cards */}
        <div
          id={`scroll-container-${activeTab}`}
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={(e) => {
            const target = e.target as HTMLDivElement
            setScrollPositions((prev) => ({
              ...prev,
              [activeTab]: target.scrollLeft,
            }))
          }}
        >
          {currentData.map((item, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-80 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={320}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    {activeTab.slice(0, -1)} {/* Remove 's' from plural */}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
                    Learn More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Tab Content Summary */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-4 bg-blue-50 px-6 py-3 rounded-lg">
          <div className="text-sm text-blue-800">
            <span className="font-semibold">{currentData.length}</span> {activeTab} available
          </div>
          <div className="w-px h-4 bg-blue-200" />
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
            View All {tabs.find((t) => t.id === activeTab)?.label} →
          </button>
        </div>
      </div>
    </div>
  )
}
