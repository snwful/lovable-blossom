import { useState } from "react";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    id: "electronics",
    name: "อิเล็กทรอนิกส์",
    icon: "📱",
    itemCount: 1250,
    subcategories: ["โทรศัพท์", "แท็บเล็ต", "หูฟัง", "อุปกรณ์เสริม"],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
  },
  {
    id: "computers",
    name: "คอมพิวเตอร์",
    icon: "💻",
    itemCount: 890,
    subcategories: ["โน๊ตบุ๊ก", "เดสก์ทอป", "อุปกรณ์", "ซอฟต์แวร์"],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop"
  },
  {
    id: "fashion",
    name: "แฟชั่น",
    icon: "👕",
    itemCount: 2100,
    subcategories: ["เสื้อผ้าผู้ชาย", "เสื้อผ้าผู้หญิง", "รองเท้า", "กระเป๋า"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop"
  },
  {
    id: "beauty",
    name: "ความงาม",
    icon: "💄",
    itemCount: 1680,
    subcategories: ["เครื่องสำอาง", "ผลิตภัณฑ์ดูแลผิว", "น้ำหอม", "อุปกรณ์ความงาม"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=200&fit=crop"
  },
  {
    id: "sports",
    name: "กีฬา",
    icon: "⚽",
    itemCount: 750,
    subcategories: ["อุปกรณ์ออกกำลังกาย", "เสื้อผ้ากีฬา", "รองเท้ากีฬา", "กิจกรรมกลางแจ้ง"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
  },
  {
    id: "home",
    name: "บ้านและสวน",
    icon: "🏠",
    itemCount: 1320,
    subcategories: ["เฟอร์นิเจอร์", "ของตزแต่งบ้าน", "เครื่องใช้ไฟฟ้า", "อุปกรณ์ทำสวน"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop"
  },
];

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => 
      sub.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาหมวดหมู่..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50"
              />
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
          
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">หมวดหมู่สินค้า</h1>
            <Badge variant="secondary">
              {filteredCategories.length} หมวดหมู่
            </Badge>
          </div>
        </div>
      </header>

      {/* Categories */}
      <main className="px-4 py-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="relative h-24 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-white/90 text-black text-xs">
                      {category.itemCount.toLocaleString()} รายการ
                    </Badge>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 2).map((sub) => (
                      <span
                        key={sub}
                        className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{category.subcategories.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                className="w-full bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-left flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{category.icon}</span>
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {category.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.itemCount.toLocaleString()} รายการ
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}