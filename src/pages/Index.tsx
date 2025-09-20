// Update this page (the content is just a fallback if you fail to update the page)

import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FlashSaleStrip } from "@/components/home/FlashSaleStrip";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryQuickNav } from "@/components/home/CategoryQuickNav";
import { SearchHeader } from "@/components/layout/SearchHeader";

const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB สีน้ำเงิน",
    price: 45900,
    originalPrice: 48900,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 1250,
    discount: 6,
    isFlashSale: true,
  },
  {
    id: "2", 
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 42900,
    originalPrice: 45900,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 892,
    discount: 7,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <SearchHeader />
      
      {/* Hero Section */}
      <section className="mb-4">
        <HeroCarousel />
      </section>

      {/* Flash Sale Strip */}
      <section className="mb-6">
        <FlashSaleStrip />
      </section>

      {/* Category Quick Navigation */}
      <section className="mb-6 px-4">
        <CategoryQuickNav />
      </section>

      {/* Recommended Products */}
      <section className="mb-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">
            แนะนำสำหรับคุณ
          </h2>
        </div>
        <ProductGrid products={mockProducts} columns={2} />
      </section>
    </div>
  );
};

export default Index;
