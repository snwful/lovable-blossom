"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "iPhone 15 Series",
    subtitle: "ส่วนลดสูงสุด 15%",
    description: "เทคโนโลยีล้ำสมัย ดีไซน์ที่สุดแห่งนวัตกรรม",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=400&fit=crop&crop=center",
    cta: "ช็อปเลย",
    gradient: "from-blue-600 via-purple-600 to-pink-600"
  },
  {
    id: 2,
    title: "Flash Sale 24 ชม.",
    subtitle: "ลดสูงสุด 70%",
    description: "สินค้าแบรนด์ดัง ราคาสุดพิเศษ",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop&crop=center",
    cta: "ซื้อตอนนี้",
    gradient: "from-red-500 via-orange-500 to-yellow-500"
  },
  {
    id: 3,
    title: "MacBook Collection",
    subtitle: "ผ่อน 0% นาน 10 เดือน",
    description: "Performance ที่เหนือระดับ สำหรับทุกการทำงาน",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=400&fit=crop&crop=center",
    cta: "ดูรายละเอียด",
    gradient: "from-gray-600 via-slate-700 to-zinc-800"
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div 
      className="relative h-48 rounded-xl overflow-hidden mx-4 shadow-lg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 transform translate-x-0" 
              : index < currentSlide 
              ? "opacity-0 transform -translate-x-full"
              : "opacity-0 transform translate-x-full"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`} />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center px-6">
            <div className="text-white max-w-[60%]">
              <div className="text-xs font-medium mb-1 opacity-90">
                {slide.subtitle}
              </div>
              <h2 className="text-xl font-bold mb-2 leading-tight">
                {slide.title}
              </h2>
              <p className="text-xs mb-4 opacity-90 leading-relaxed">
                {slide.description}
              </p>
              <Button 
                size="sm" 
                className="bg-white text-gray-900 hover:bg-white/90 font-medium shadow-lg"
              >
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 w-8 h-8 bg-white/20 hover:bg-white/30 text-white border-white/20"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 w-8 h-8 bg-white/20 hover:bg-white/30 text-white border-white/20"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? "bg-white w-4" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}