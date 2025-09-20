import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Heart, Share, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/stores/cart-store";

// Mock product data
const mockProduct = {
  id: "1",
  name: "iPhone 15 Pro Max 256GB สีน้ำเงิน",
  price: 45900,
  originalPrice: 48900,
  images: [
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
  ],
  rating: 4.8,
  reviewCount: 1250,
  discount: 6,
  description: "iPhone 15 Pro Max รุ่นล่าสุดพร้อมชิป A17 Pro ที่ทรงพลัง กล้อง 48MP ที่ปรับปรุงใหม่ และดีไซน์ไทเทเนียมที่หรูหรา",
  features: [
    "ชิป A17 Pro ที่ทรงพลังสุด",
    "กล้องหลัง 48MP พร้อมระบบ Pro camera",
    "หน้าจอ 6.7 นิ้ว Super Retina XDR",
    "วัสดุไทเทเนียมระดับการบินอวกาศ",
    "ระบบ Action Button ที่ปรับแต่งได้"
  ],
  variants: {
    storage: ["128GB", "256GB", "512GB", "1TB"],
    color: ["สีน้ำเงิน", "สีดำ", "สีเงิน", "สีทอง"]
  }
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [selectedColor, setSelectedColor] = useState("สีน้ำเงิน");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: `${mockProduct.id}-${selectedStorage}-${selectedColor}`,
      productId: mockProduct.id,
      name: `${mockProduct.name} ${selectedStorage}`,
      price: mockProduct.price,
      image: mockProduct.images[0],
      quantity,
      variant: {
        id: `${selectedStorage}-${selectedColor}`,
        name: `${selectedStorage} ${selectedColor}`,
        values: {
          storage: selectedStorage,
          color: selectedColor
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="flex-1 font-semibold truncate">รายละเอียดสินค้า</h1>
          <Button variant="ghost" size="sm" className="p-2">
            <Share className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="pb-24">
        {/* Image Gallery */}
        <section className="relative">
          <div className="aspect-square overflow-hidden bg-white">
            <img
              src={mockProduct.images[currentImageIndex]}
              alt={mockProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image Thumbnails */}
          <div className="flex gap-2 p-4 overflow-x-auto">
            {mockProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                  currentImageIndex === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Product Info */}
        <section className="px-4 py-4 space-y-4">
          {/* Price & Title */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-sale text-sale-foreground">
                    -{mockProduct.discount}%
                  </Badge>
                  <Badge variant="outline">ฟรีส่ง</Badge>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    ฿{mockProduct.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ฿{mockProduct.originalPrice.toLocaleString()}
                  </span>
                </div>

                <h1 className="text-xl font-bold leading-tight">
                  {mockProduct.name}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mockProduct.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {mockProduct.reviewCount.toLocaleString()} รีวิว
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Storage */}
              <div>
                <h3 className="font-medium mb-3">ความจุ</h3>
                <div className="grid grid-cols-4 gap-2">
                  {mockProduct.variants.storage.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedStorage === storage
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="font-medium mb-3">สี</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mockProduct.variants.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">รายละเอียดสินค้า</h3>
              <p className="text-muted-foreground mb-4">
                {mockProduct.description}
              </p>
              <ul className="space-y-2">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-tab-bar left-0 right-0 bg-background border-t border-border p-4 z-40">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-8 w-8 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="font-medium min-w-[2rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {/* Add to Cart */}
          <Button 
            onClick={handleAddToCart}
            className="flex-1 h-12 text-base font-semibold"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            เพิ่มลงตะกร้า
          </Button>
        </div>
      </div>
    </div>
  );
}