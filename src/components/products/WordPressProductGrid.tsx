import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Truck, Heart, CheckCircle } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  EnhancedWPProduct, 
  getProductPrice, 
  getProductOriginalPrice, 
  getProductDiscount,
  formatTHB,
  isProductInStock,
  getProductBadges 
} from "@/lib/wordpress";
import { toast } from "@/hooks/use-toast";

// Export the enhanced interface from wordpress lib
export type { EnhancedWPProduct as WPProduct };

interface WordPressProductGridProps {
  products?: EnhancedWPProduct[];
  loading?: boolean;
  columns?: 2 | 3;
  className?: string;
  showBadges?: boolean;
  showRating?: boolean;
}

export function WordPressProductGrid({ 
  products = [], 
  loading = false, 
  columns = 2, 
  className,
  showBadges = true,
  showRating = true
}: WordPressProductGridProps) {
  if (loading) {
    return (
      <div className={cn(
        "grid gap-3",
        columns === 2 ? "grid-cols-2" : "grid-cols-3",
        className
      )}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-card rounded-xl p-3 animate-pulse">
            <div className="bg-muted rounded-lg aspect-square mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">ไม่พบสินค้า</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "grid gap-3",
      columns === 2 ? "grid-cols-2" : "grid-cols-3",
      className
    )}>
      {products.map((product) => (
        <WordPressProductCard key={product.databaseId} product={product} />
      ))}
    </div>
  );
}

interface WordPressProductCardProps {
  product: EnhancedWPProduct;
  showBadges?: boolean;
  showRating?: boolean;
}

function WordPressProductCard({ product, showBadges = true, showRating = true }: WordPressProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const displayPrice = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  const discount = getProductDiscount(product);
  const inStock = isProductInStock(product);
  const badges = getProductBadges(product);

  const handleAddToCart = () => {
    if (!inStock) {
      toast({
        title: "สินค้าหมดแล้ว",
        description: "สินค้านี้หมดจากสต็อกแล้ว",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: product.databaseId.toString(),
      productId: product.databaseId.toString(),
      name: product.name,
      price: displayPrice,
      image: product.image?.sourceUrl || '/placeholder.svg',
      quantity: 1
    });

    toast({
      title: "เพิ่มสินค้าแล้ว",
      description: `${product.name} ถูกเพิ่มลงตะกร้าแล้ว`,
    });
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Product Image */}
      <Link to={`/products/${product.slug}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img
            src={product.image?.sourceUrl || '/placeholder.svg'}
            alt={product.image?.altText || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          {showBadges && badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {badges.slice(0, 2).map((badge, index) => (
                <Badge 
                  key={index}
                  className={cn(
                    "text-xs px-2 py-1",
                    badge.includes('ลด') && "bg-sale text-sale-foreground",
                    badge === 'แนะนำ' && "bg-accent text-accent-foreground",
                    badge === 'ขายดี' && "bg-success text-success-foreground",
                    badge === 'สินค้าหมด' && "bg-destructive text-destructive-foreground"
                  )}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Badge variant="destructive" className="text-white">
                สินค้าหมด
              </Badge>
            </div>
          )}

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
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-medium text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Categories & Rating */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {product.productCategories?.nodes && product.productCategories.nodes.length > 0 && (
            <span>{product.productCategories.nodes[0].name}</span>
          )}
          {showRating && product.averageRating && product.reviewCount && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.averageRating}</span>
              <span>({product.reviewCount})</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-lg font-bold text-primary">
            {formatTHB(displayPrice)}
          </span>
          {originalPrice && originalPrice > displayPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatTHB(originalPrice)}
            </span>
          )}
        </div>

        {/* Shipping & Stock Info */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs text-success border-success/20">
            <Truck className="w-3 h-3 mr-1" />
            ส่งฟรี
          </Badge>
          {inStock && (
            <div className="flex items-center gap-1 text-xs text-success">
              <CheckCircle className="w-3 h-3" />
              <span>พร้อมส่ง</span>
              {product.stockQuantity && (
                <span>({product.stockQuantity} ชิ้น)</span>
              )}
            </div>
          )}
          {product.totalSales && product.totalSales > 0 && (
            <span className="text-xs text-muted-foreground">
              ขายแล้ว {product.totalSales} ชิ้น
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant={inStock ? "default" : "outline"}
          size="sm"
          className="w-full"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {inStock ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}
        </Button>
      </div>
    </div>
  );
}