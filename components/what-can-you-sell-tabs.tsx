"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const tabData = {
  services: [
    {
      title: "Astrology",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_dfmczzdfmczzdfmc.jpg?v=1744792227&width=375?height=200&width=300",
      desc: "Astrology All,Birth Chart,Face Reading,Kundli Match, Palmistry, Tarrot Card Reading",
      price: "",
    },
    {
      title: "Deities",
      image: "https://i0.wp.com/73s.bd7.myftpupload.com/wp-content/uploads/2018/04/IMG-20180330-WA0002.jpg?fit=1026%2C1280&ssl=1?height=200&width=300",
      desc: "Altars, Backdrop Painting, Deity Furniture, Deity Dress, Deity Jewellery, Deity Painting, Deity Paraphernalia, Pujaris, Sculptors, Florist",
      price: "",
    },
    {
      title: "Fashion",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_aic8m6aic8m6aic8.jpg?v=1739858336&width=375?height=200&width=300",
      desc: "Dress Designers, Tailors, Custom Jewellery",
      price: "",
    },
    {
      title: "Health & Wellness",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_81zu3z81zu3z81zu.jpg?v=1739857518&width=375?height=200&width=300",
      desc: "Yoga Trainer,  Fitness Trainer, Doctors, Physio, Dentist, Surgeons, Care givers, Massuer, Hospitals & Nusring Homes,Wellness Centers",
      price: "",
    },
    {
      title: "Home Utilities",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_6qqvl06qqvl06qqv.jpg?v=1739860726&width=375?height=200&width=300",
      desc: "Electrician,Plumber, Carpenter, Driver, Cooks",
      price: "",
    },
    {
      title: "Kirtan & Arts",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_vijym9vijym9vijy.jpg?v=1739861525&width=375?height=200&width=300",
      desc: "Kirtaniyas,Drama, Puppet Shows, Rangoli, Instrument Care",
      price: "",
    },
    {
      title: "Learn",
      image: "https://www.aniyor.net/cdn/shop/files/shyama_darshani_works_with_a_student_in_november_2015_23ee5c1e-7a71-468e-8a05-0b7a17b31610.jpg?v=1738319206&width=900?height=200&width=300",
      desc: "Astrological Sciences, Academic Education, Cooking Classes, Deity Worship Training, Kirtan, Music, Schools & Universities, Shastric Courses, Vocational Training, Workshops,Others",
      price: "",
    },
    {
      title: "Plan Events",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_3slbgl3slbgl3slb.jpg?v=1739863689&width=375?height=200&width=300",
      desc: "Caterers,Decorators, Event Managers, Florist / Flower Jewellery, Hall / Venue,Havan & Samskars,Kirtan Groups, Makeup Artists, MCs & Celebrities, Photo / Videography",
      price: "",
    },
    {
      title: "Prasadam",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_boj5p4boj5p4boj5.jpg?v=1739948056&width=375?height=200&width=300",
      desc: "Tiffin Services, Restaurants & Cafes, Home Chefs, Catering, Prasadam Distribution",
      price: "",
    },
    {
      title: "Professional Services",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_rnp6uirnp6uirnp6.jpg?v=1739950470&width=375?height=200&width=300",
      desc: "Accountant, Architect, Astrologer, Financial Advisor, Insurance Advisor, Lawyers, Engineers,Interior Designer, Printers, Real Estate Agent, Graphic Designer, Web/App Developer, Software Developer,Vastu Consultant, Others",
      price: "",
    },
    {
      title: "Yatras",
      image: "https://www.aniyor.net/cdn/shop/files/1702023953-1702023953-6167e.webp?v=1738305278&width=375?height=200&width=300",
      desc: "Travel Booking, Hotels / Ashrams, Home Stay, Hire Vehicle, Tour Guide, Tour Packages, Upcoming Yatras",
      price: "",
    },
  ],
  products: [
    {
      title: "Arts, Craft & Books",
      image: "https://www.aniyor.net/cdn/shop/files/Shrila_Prabhupada_Books.jpg? height=200&width=300",
      desc: "Discover unique art, engaging crafts, and captivating books to inspire your world.",
      price: "",
    },
    {
      title: "Deities & Paraphernalia",
      image: "https://www.aniyor.net/cdn/shop/files/Gemini_Generated_Image_o54blo54blo54blo.jpg? height=200&width=300",
      desc: "Deities paraphernalia are symbolic items, attributes, and ritual accessories used in the worship of divine figures.",
      price: "",
    },
    {
      title: "Electronics & Instruments",
      image: "https://www.aniyor.net/cdn/shop/files/Sound_System.jpg? height=200&width=300",
      desc: "Laptops, Mobile, Musical Instruments, Sound System,TV & Appliances",
      price: "",
    },
    {
      title: "Fashion",
      image: "https://www.aniyor.net/cdn/shop/files/Womens_Fashion.webp? height=200&width=300",
      desc: "Men, Women, Kids, Accessories & Jewellery",
      price: "",
    },
    {
      title: "Food and Wellness",
      image: "https://www.aniyor.net/cdn/shop/files/Gourmet.webp?v=1749115819&width=375? height=200&width=300",
      desc: "Cow Products, Grocery & Gourmet Food, Health & Beauty",
      price: "",
    },
    {
      title: "Gift ideas & Festive Combos",
      image: "https://www.aniyor.net/cdn/shop/files/Gift_Hammper.jpg? height=200&width=300",
      desc: "Gifts & Combos, Curated sets of sweets, decor, and traditional items.",
      price: "",
    },
    {
      title: "Home, Kitchen & Living",
      image: "https://www.aniyor.net/cdn/shop/files/Kitchen_Essentials.webp? height=200&width=300",
      desc: "Kitchen Essential, Home Furnishing",
      price: "",
    },
    {
      title: "Kids / Toys / Games",
      image: "https://www.aniyor.net/cdn/shop/files/Games.jpg? height=200&width=300",
      desc: "Toys & Games, Baby Products",
      price: "",
    },
    {
      title: "Sports, Fitness & Travel",
      image: "https://www.aniyor.net/cdn/shop/files/12721210_2023-wabc-NewApp-SPORTS.jpg? height=200&width=300",
      desc: "HTravel Essentials, Sports & Fitness",
      price: "",
    },
    {
      title: "Other Products",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Religious paintings, spiritual artwork, and divine imagery",
      price: "",
    },
    /*{
      title: "Prayer Beads",
      image: "/placeholder.svg?height=200&width=300",
      desc: "Mala beads, rosaries, and counting beads for meditation",
      price: "₹80 - ₹2,000",
    }*/,
  ],
  events: [
    {
      title: "Spiritual Workshops",
      image: "https://www.iskconcommunications.org/resources/photos-gallery/iskcon-communications/118-spain_ic-meeting-2019-1/file?height=200&width=300",
      desc: "Meditation workshops, spiritual learning sessions, and retreats",
      price: "",
    },
    {
      title: "Yoga Retreats",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnMrvZlICn2TL-rOVQpvdwfRSuWijEnKueQHaQ39VTOmtxHcjNmQ0UvzqX8GWziCSS4_c&usqp=CAU?height=200&width=300",
      desc: "Weekend retreats, yoga camps, and wellness getaways",
      price: "",
    },
    {
      title: "Religious Festivals",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-8fTP9VPzGNyAdS3eCIr7GY5FR3bLXDfyPg&s?height=200&width=300",
      desc: "Festival celebrations, community gatherings, and cultural events",
      price: "",
    },
    {
      title: "House Program",
      image: "https://iskconpunecamp.com/images/hp/2024/rohan-abhilasha-1.jpg?height=200&width=300",
      desc: "Sacred site visits, spiritual journeys, and guided pilgrimages",
      price: "",
    },
    {
      title: "Meditation Sessions",
      image: "https://iskconcongregation.com/wp-content/uploads/2019/05/M1.jpg?height=200&width=300",
      desc: "Group meditation, mindfulness sessions, and spiritual gatherings",
      price: "",
    },
    {
      title: "Satsang Programs",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEXxhXmwt6uTmLVtaakOhC-kmv6BwHyQUISaDlFvlE9x5NycsJJApI9swQcpH4IYQSXYSHoWY9d5ZZc8wT5nWhJ3lB7gNDO1r5yooJfejgLyDwojKhYCrcuElcn5Mmtd4YAEWrof2-ehk/s1600/100_9253.JPG?height=200&width=300",
      desc: "Spiritual discourses, devotional singing, and community prayers",
      price: "",
    },
    {
      title: "Children Programs",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8sOu7J91tDNSsK_LsFyvE24ezHNbQYTc282aHnxG906O0313N3C_dnZil0AHvkBbNWc&usqp=CAU?height=200&width=300",
      desc: "Learning sessions, Art& craft, ",
      price: "",
    },
    {
      title: "Ayurveda Seminar",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCyyJhdUeRafEoYrcn72UpBb2YAKGWkfYAJA&s?height=200&width=300",
      desc: "Energy healing sessions, group therapy, and wellness circles",
      price: "",
    },
    {
      title: "Cultural Performances",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgWfyERykE2n4A7Tr-g9ydvRLw4URZ7ptiaMHtrC52jDbsd-7czCVLZ47Z1_L-VpCroCA&usqp=CAU?height=200&width=300",
      desc: "Devotional music, dance performances, and spiritual arts",
      price: "",
    },
    {
      title: "Spiritual Conferences",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjxDXPfGaJeRrciJUt945f9j0_idHAY-CXXA&s?height=200&width=300",
      desc: "Large gatherings, spiritual summits, and enlightenment conferences",
      price: "",
    },
    {
      title: "Temple Events",
      image: "https://etimg.etb2bimg.com/photo/112805402.cms?height=200&width=300",
      desc: "Temple ceremonies, special pujas, and religious celebrations",
      price: "",
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
                  src={item?.image || "/placeholder.svg"}
                  alt={item?.title || "Item image"}
                  width={320}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-900">
                    {item?.price ? item.price : ""}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item?.title ?? ""}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item?.desc ?? ""}</p>
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
