import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/products/ProductGrid";

const mockCollection = {
  id: "smartphones",
  name: "โทรศัพท์มือถือ",
  description: "สมาร์ทโฟนรุ่นใหม่ล่าสุด ทุกยี่ห้อชั้นนำ",
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=200&fit=crop",
  productCount: 247,
};

const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB สีน้ำเงิน",
    price: 45900,
    originalPrice: 48900,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 1250,
    discount: 6,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 42900,
    originalPrice: 45900,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 892,
    discount: 7,
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro 256GB",
    price: 28900,
    originalPrice: 32900,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 564,
    discount: 12,
  },
  {
    id: "4",
    name: "OnePlus 12 256GB สีเขียว",
    price: 24900,
    originalPrice: 27900,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 423,
    discount: 11,
  },
  {
    id: "5",
    name: "Xiaomi 14 Ultra 512GB",
    price: 35900,
    originalPrice: 38900,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 789,
    discount: 8,
  },
  {
    id: "6",
    name: "Huawei P60 Pro 256GB",
    price: 26900,
    originalPrice: 29900,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 345,
    discount: 10,
  },
];

const sortOptions = [
  { label: "ความนิยม", value: "popularity" },
  { label: "ราคาต่ำสุด", value: "price_asc" },
  { label: "ราคาสูงสุด", value: "price_desc" },
  { label: "คะแนนรีวิว", value: "rating" },
  { label: "ใหม่ล่าสุด", value: "newest" },
];

export default function Collection() {
  const { slug } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <Link to="/categories">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold">{mockCollection.name}</h1>
              <p className="text-sm text-muted-foreground">
                {mockCollection.productCount.toLocaleString()} รายการ
              </p>
            </div>
          </div>

          {/* Collection Banner */}
          <div className="relative h-20 rounded-lg overflow-hidden mb-3">
            <img
              src={mockCollection.image}
              alt={mockCollection.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-4">
              <p className="text-white text-sm font-medium">
                {mockCollection.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Filters & Sort */}
      <div className="sticky top-[140px] z-30 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              ตัวกรอง
            </Button>
            
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                {currentSort?.label}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-muted first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? "bg-muted font-medium" : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="p-2"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="p-2"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="px-4 py-4">
        {viewMode === "grid" ? (
          <ProductGrid products={mockProducts} columns={2} />
        ) : (
          <div className="space-y-3">
            {mockProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <div className="bg-card rounded-lg p-3 shadow-sm hover:shadow-md transition-all flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-primary">
                        ฿{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ฿{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      {product.discount && (
                        <Badge className="bg-sale text-sale-foreground text-xs">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-xs font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviewCount.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="w-full max-w-xs">
            โหลดเพิ่มเติม
          </Button>
        </div>
      </main>
    </div>
  );
}