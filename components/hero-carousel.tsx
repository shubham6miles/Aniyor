"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    id: 1,
    title: "Connect your Business with devotees worldwide",
    subtitle: "Join Our Spiritual Community",
    description: "Reach millions of spiritual seekers and devotees looking for authentic products and services.",
    cta: "List your Products / Services Today!",
    background: "bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800",
    image:
      "https://www.aniyor.net/cdn/shop/files/Corporate_Devotte_594c269d-ed47-44b9-8c9f-4c6a6dc76b93.png?v=1743756487&width=3024",
    imageAlt: "Spiritual community connecting worldwide",
  },
  {
    id: 2,
    title: "Expand your Network • Find Clients, Share Your Expertise",
    subtitle: "Grow Your Professional Network",
    description: "Connect with like-minded professionals and expand your reach in the spiritual community.",
    cta: "Get Listed",
    background: "bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800",
    image:
      "https://www.aniyor.net/cdn/shop/files/Experty_10a2b0c5-e3af-4378-bce5-3eba5e2c5acd.png?v=1743756325&width=3024",
    imageAlt: "Professional networking and expertise sharing",
  },
  {
    id: 3,
    title: "Unlock Your Potential: Start Selling on Aniyor!",
    subtitle: "Unleash Your Business Potential",
    description:
      "Transform your passion into profit with our comprehensive selling platform designed for spiritual entrepreneurs.",
    cta: "Register Now",
    background: "bg-gradient-to-br from-orange-600 via-red-600 to-pink-700",
    image:
      "https://www.aniyor.net/cdn/shop/files/Hare_Krishna_LoveFest_004_tnu5ch_3baa1fb5-c656-43b8-afe5-4f594ef686e3.webp?v=1743759244&width=3024",
    imageAlt: "Unlock business potential on Aniyor",
  },
  {
    id: 4,
    title: "Share Your Skill • Serve the Community",
    subtitle: "Make a Meaningful Impact",
    description: "Use your talents to serve others and build a thriving spiritual business that makes a difference.",
    cta: "Join Aniyor!",
    background: "bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800",
    image:
      "https://www.aniyor.net/cdn/shop/files/Vijaya-Murti-1.jpg?v=1743741281&width=3024w=600&h=500&q=80",
    imageAlt: "Share skills and serve the spiritual community",
  },
]

interface HeroCarouselProps {
  onNavigate?: (page: string) => void
}

export function HeroCarousel({ onNavigate = () => {} }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 ${slide.background}`} />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-20">
                {/* Left Content */}
                <div className="space-y-8 text-white">
                  <div className="space-y-6">
                    <div className="transform transition-all duration-1000 delay-300 ease-out">
                      <p className="text-sm font-medium text-white/80 mb-2">{slide.subtitle}</p>
                      <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{slide.title}</h1>
                    </div>

                    <div className="transform transition-all duration-1000 delay-500 ease-out">
                      <p className="text-lg text-white/90 leading-relaxed max-w-lg">{slide.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ease-out">
                    <Button
                      onClick={() => onNavigate("register")}
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {slide.cta}
                    </Button>
                    <Button
                      onClick={() => onNavigate("register")}
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-base bg-transparent backdrop-blur-sm"
                    >
                      Learn More
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center space-x-8 pt-4 transform transition-all duration-1000 delay-900 ease-out">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">10K+</div>
                      <div className="text-sm text-white/70">Active Sellers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">50K+</div>
                      <div className="text-sm text-white/70">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">1M+</div>
                      <div className="text-sm text-white/70">Customers</div>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative transform transition-all duration-1000 delay-500 ease-out">
                  <div className="relative h-[500px] w-full max-w-lg mx-auto overflow-hidden rounded-lg shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.imageAlt}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority={index === 0}
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/70 hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: isAutoPlaying ? "100%" : "0%",
            animation: isAutoPlaying ? "progress 4.5s linear infinite" : "none",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  )
}
