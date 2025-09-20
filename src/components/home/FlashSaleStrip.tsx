"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FlashSaleStrip() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 24 hours when countdown ends
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-4 bg-gradient-to-r from-flash-sale via-red-500 to-orange-500 rounded-xl p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-pulse">⚡</span>
            <div>
              <h3 className="font-bold text-lg">Flash Sale</h3>
              <p className="text-xs opacity-90">ลดสูงสุด 80% วันนี้เท่านั้น!</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Countdown Timer */}
          <div className="flex items-center gap-1">
            <div className="bg-white/20 rounded px-2 py-1 min-w-[2rem] text-center">
              <span className="text-sm font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-xs">:</span>
            <div className="bg-white/20 rounded px-2 py-1 min-w-[2rem] text-center">
              <span className="text-sm font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-xs">:</span>
            <div className="bg-white/20 rounded px-2 py-1 min-w-[2rem] text-center">
              <span className="text-sm font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>

          <Button 
            size="sm" 
            className="bg-white text-flash-sale hover:bg-white/90 font-bold text-xs px-3 shadow-lg"
          >
            ช็อปเลย →
          </Button>
        </div>
      </div>

      {/* Flash Sale Items Preview */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {[
          { name: "iPhone 15", discount: "30%", image: "📱" },
          { name: "MacBook", discount: "25%", image: "💻" },
          { name: "AirPods", discount: "40%", image: "🎧" },
          { name: "iPad", discount: "35%", image: "📟" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white/10 rounded-lg p-2 flex items-center gap-2 min-w-[120px]"
          >
            <span className="text-lg">{item.image}</span>
            <div>
              <p className="text-xs font-medium">{item.name}</p>
              <Badge className="bg-white text-flash-sale text-xs px-1.5 py-0.5">
                -{item.discount}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}