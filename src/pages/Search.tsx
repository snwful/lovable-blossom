import { useState, useEffect } from "react";
import { Search as SearchIcon, Clock, X, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/products/ProductGrid";

const trendingSearches = [
  "iPhone 15",
  "MacBook Air", 
  "Samsung Galaxy",
  "AirPods Pro",
  "iPad",
  "Apple Watch",
  "Nintendo Switch",
  "PlayStation 5"
];

const recentSearches = [
  "iPhone 15 Pro Max",
  "MacBook Pro M3",
  "Samsung S24 Ultra",
];

const mockSearchResults = [
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
    name: "iPhone 15 Plus 128GB สีชมพู",
    price: 32900,
    originalPrice: 34900,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 892,
    discount: 6,
  },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      setIsLoading(true);
      setShowResults(true);
      // Simulate search delay
      setTimeout(() => setIsLoading(false), 800);
      
      // Add to recent searches if not already there
      const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      if (!recent.includes(searchQuery) && searchQuery.trim()) {
        const updated = [searchQuery, ...recent.slice(0, 4)];
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      }
    } else {
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowResults(false);
  };

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ค้นหาสินค้า บรือ หมวดหมู่..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(query)}
                className="pl-11 pr-20 h-12 text-base bg-muted/50"
                autoFocus
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Button
              onClick={() => handleSearch(query)}
              className="h-12 px-4"
              disabled={!query.trim()}
            >
              ค้นหา
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {!showResults ? (
          /* Search Suggestions */
          <div className="space-y-6">
            {/* Trending Searches */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">คำค้นหายอดนิยม</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="bg-muted/50 hover:bg-muted text-sm px-3 py-2 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>

            {/* Recent Searches */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-semibold">ค้นหาล่าสุด</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-muted-foreground"
                >
                  ลบทั้งหมด
                </Button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Quick Categories */}
            <section>
              <h2 className="font-semibold mb-3">หมวดหมู่ยอดนิยม</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "โทรศัพท์", icon: "📱", color: "from-blue-500 to-blue-600" },
                  { name: "แฟชั่น", icon: "👕", color: "from-pink-500 to-pink-600" },
                  { name: "ความงาม", icon: "💄", color: "from-purple-500 to-purple-600" },
                  { name: "กีฬา", icon: "⚽", color: "from-green-500 to-green-600" },
                ].map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleSearch(category.name)}
                    className={`p-4 rounded-xl bg-gradient-to-r ${category.color} text-white flex items-center gap-3 hover:scale-105 transition-transform`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Search Results */
          <div className="space-y-4">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">ผลการค้นหา: "{query}"</h2>
                {!isLoading && (
                  <Badge variant="secondary">
                    {mockSearchResults.length} รายการ
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                ตัวกรอง
              </Button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-lg p-3 animate-pulse">
                    <div className="bg-muted rounded-lg aspect-square mb-3" />
                    <div className="space-y-2">
                      <div className="bg-muted rounded h-4 w-3/4" />
                      <div className="bg-muted rounded h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            {!isLoading && mockSearchResults.length > 0 && (
              <ProductGrid products={mockSearchResults} columns={2} />
            )}

            {/* No Results */}
            {!isLoading && mockSearchResults.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">ไม่พบผลการค้นหา</h3>
                <p className="text-muted-foreground mb-4">
                  ลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกดอีกครั้ง
                </p>
                <Button variant="outline" onClick={clearSearch}>
                  ค้นหาใหม่
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}