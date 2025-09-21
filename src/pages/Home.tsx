import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { WordPressProductGrid } from "@/components/products/WordPressProductGrid";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryQuickNav } from "@/components/home/CategoryQuickNav";
import { FlashSaleStrip } from "@/components/home/FlashSaleStrip";
import { ArrowRight, Zap } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    price: 44900,
    originalPrice: 49900,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 2341,
    discount: 10,
    badge: "ขายดี",
  },
  {
    id: "2", 
    name: "MacBook Air M3 13 นิ้ว",
    price: 39900,
    originalPrice: 42900,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 1876,
    discount: 7,
  },
  {
    id: "3",
    name: "Samsung Galaxy S24 Ultra",
    price: 42900,
    originalPrice: 45900,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 1543,
    discount: 6,
  },
  {
    id: "4",
    name: "AirPods Pro (2nd generation)",
    price: 8990,
    originalPrice: 9990,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 3421,
    discount: 10,
  },
];

export default function Home() {
  const { data: wpProducts, isLoading } = useProducts({ first: 8 });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel */}
      <div className="mb-6">
        <HeroCarousel />
      </div>

      {/* Flash Sale Strip */}
      <div className="px-4 mb-6">
        <FlashSaleStrip />
      </div>

      {/* Category Quick Navigation */}
      <div className="px-4 mb-6">
        <CategoryQuickNav />
      </div>

      {/* Flash Sale Products */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-flash-sale" />
            <h2 className="text-lg font-bold">Flash Sale</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            ดูทั้งหมด <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </div>

      {/* WordPress Products */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">สินค้าจาก WordPress</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            ดูทั้งหมด <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        {isLoading ? (
          <WordPressProductGrid loading={true} />
        ) : wpProducts?.nodes ? (
          <WordPressProductGrid products={wpProducts.nodes} />
        ) : (
          <div className="bg-card rounded-xl p-6 text-center">
            <p className="text-muted-foreground mb-2">
              ไม่สามารถเชื่อมต่อกับ WordPress ได้
            </p>
            <p className="text-sm text-muted-foreground">
              กรุณาตรวจสอบการตั้งค่า GraphQL endpoint
            </p>
            <div className="mt-4 text-xs text-muted-foreground bg-muted p-3 rounded-lg">
              <strong>Endpoint:</strong> https://www.maethuan.com/graphql
            </div>
          </div>
        )}
      </div>

      {/* Featured Products (Mock Data) */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">สินค้ายอดนิยม</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            ดูทั้งหมด <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </div>

      {/* Spacer for bottom navigation */}
      <div className="h-20" />
    </div>
  );
}