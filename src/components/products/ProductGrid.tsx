import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  badge?: string;
  isFlashSale?: boolean;
}

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3;
  className?: string;
}

export function ProductGrid({ products, columns = 2, className }: ProductGridProps) {
  return (
    <div className={cn(
      "grid gap-3",
      columns === 2 ? "grid-cols-2" : "grid-cols-3",
      className
    )}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercent = product.originalPrice 
    ? Math.round((discountAmount / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isFlashSale && (
              <Badge className="bg-flash-sale text-flash-sale-foreground text-xs px-2 py-1">
                ⚡ Flash Sale
              </Badge>
            )}
            {discountPercent > 0 && (
              <Badge className="bg-sale text-sale-foreground text-xs px-2 py-1">
                -{discountPercent}%
              </Badge>
            )}
            {product.badge && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 p-1 w-8 h-8 bg-background/80 hover:bg-background"
          >
            <Heart className="w-4 h-4" />
          </Button>

        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-lg font-bold text-primary">
            ฿{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ฿{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Free Shipping Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs text-success border-success/20">
            ส่งฟรี
          </Badge>
          {product.isFlashSale && (
            <span className="text-xs text-flash-sale font-medium">
              จำนวนจำกัด!
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="default"
          size="sm"
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          เพิ่มลงตะกร้า
        </Button>
      </div>
    </div>
  );
}