import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Truck, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// WordPress Product interface
export interface WPProduct {
  databaseId: number;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  regularPrice?: string;
  salePrice?: string;
  onSale: boolean;
  stockStatus: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  galleryImages?: {
    nodes: Array<{
      sourceUrl: string;
      altText?: string;
    }>;
  };
  productCategories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  price?: string;
  variations?: {
    nodes: Array<{
      databaseId: number;
      name: string;
      price?: string;
      salePrice?: string;
      stockStatus: string;
      attributes?: {
        nodes: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
}

interface WordPressProductGridProps {
  products?: WPProduct[];
  loading?: boolean;
  columns?: 2 | 3;
  className?: string;
}

export function WordPressProductGrid({ products = [], loading = false, columns = 2, className }: WordPressProductGridProps) {
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

function WordPressProductCard({ product }: { product: WPProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  
  const price = parseFloat(product.price || '0');
  const salePrice = parseFloat(product.salePrice || '0');
  const regularPrice = parseFloat(product.regularPrice || '0');
  
  const displayPrice = product.onSale && salePrice > 0 ? salePrice : price;
  const originalPrice = product.onSale && regularPrice > 0 ? regularPrice : null;
  
  const discount = originalPrice && displayPrice < originalPrice 
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.databaseId.toString(),
      productId: product.databaseId.toString(),
      name: product.name,
      price: displayPrice,
      image: product.image?.sourceUrl || '/placeholder.svg',
      quantity: 1
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
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <Badge className="bg-sale text-sale-foreground text-xs px-2 py-1">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          {product.stockStatus === 'OUT_OF_STOCK' && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Badge variant="destructive">หมด</Badge>
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

        {/* Categories */}
        {product.productCategories?.nodes && product.productCategories.nodes.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{product.productCategories.nodes[0].name}</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-lg font-bold text-primary">
            {formatPrice(displayPrice)}
          </span>
          {originalPrice && originalPrice > displayPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Free Shipping Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs text-success border-success/20">
            <Truck className="w-3 h-3 mr-1" />
            ส่งฟรี
          </Badge>
          {product.stockStatus === 'IN_STOCK' && (
            <span className="text-xs text-success">
              พร้อมส่ง
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="default"
          size="sm"
          className="w-full"
          disabled={product.stockStatus === 'OUT_OF_STOCK'}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stockStatus === 'OUT_OF_STOCK' ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
        </Button>
      </div>
    </div>
  );
}