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
  {
    id: "3",
    name: "MacBook Air M3 13นิ้ว สี Midnight",
    price: 39900,
    originalPrice: 42900,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviewCount: 2100,
    discount: 7,
    badge: "Best Seller",
  },
  {
    id: "4",
    name: "AirPods Pro (รุ่นที่ 2) พร้อม USB-C",
    price: 8900,
    originalPrice: 9900,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 756,
    discount: 10,
  },
  {
    id: "5",
    name: "iPad Air 11นิ้ว Wi-Fi 128GB สีม่วง",
    price: 19900,
    originalPrice: 22900,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center", 
    rating: 4.8,
    reviewCount: 1450,
    discount: 13,
  },
  {
    id: "6",
    name: "Apple Watch Series 9 45mm GPS",
    price: 12900,
    originalPrice: 14900,
    image: "https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 980,
    discount: 13,
  },
];

export default function Home() {
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

      {/* Flash Sale Products */}
      <section className="mb-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="text-flash-sale">⚡</span>
            Flash Sale วันนี้
          </h2>
          <button className="text-sm text-primary font-medium">
            ดูทั้งหมด →
          </button>
        </div>
        <ProductGrid 
          products={mockProducts.filter(p => p.isFlashSale)} 
          columns={2}
        />
      </section>

      {/* Recommended Products */}
      <section className="mb-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">
            แนะนำสำหรับคุณ
          </h2>
          <button className="text-sm text-primary font-medium">
            ดูทั้งหมด →
          </button>
        </div>
        <ProductGrid products={mockProducts} columns={2} />
      </section>

      {/* Popular Categories */}
      <section className="mb-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">
            หมวดหมู่ยอดนิยม
          </h2>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: "โทรศัพท์", icon: "📱", color: "bg-gradient-to-br from-blue-100 to-blue-200" },
            { name: "คอมพิวเตอร์", icon: "💻", color: "bg-gradient-to-br from-purple-100 to-purple-200" },
            { name: "แฟชั่น", icon: "👕", color: "bg-gradient-to-br from-pink-100 to-pink-200" },
            { name: "ความงาม", icon: "💄", color: "bg-gradient-to-br from-red-100 to-red-200" },
          ].map((category) => (
            <button
              key={category.name}
              className="flex flex-col items-center p-3 rounded-xl bg-card hover:shadow-md transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-xl mb-2`}>
                {category.icon}
              </div>
              <span className="text-xs font-medium text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}