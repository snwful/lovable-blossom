import { ShoppingBag, Plus, Minus, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";

// Format price helper function
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(amount);
}

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-4 py-4">
            <h1 className="text-xl font-bold">ตะกร้าสินค้า</h1>
          </div>
        </header>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">ตะกร้าของคุณว่างเปล่า</h2>
          <p className="text-muted-foreground text-center mb-6">
            เริ่มเลือกซื้อสินค้าที่คุณชอบเพื่อเพิ่มลงในตะกร้า
          </p>
          <Button className="w-full max-w-xs">
            เริ่มช็อปปิ้ง
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">ตะกร้าสินค้า</h1>
            <span className="text-sm text-muted-foreground">
              {getTotalItems()} รายการ
            </span>
          </div>
        </div>
      </header>

      <div className="pb-32">
        {/* Cart Items */}
        <div className="px-4 py-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-tight mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  {item.variant && (
                    <div className="text-xs text-muted-foreground mb-2">
                      {Object.entries(item.variant.values).map(([key, value]) => (
                        <span key={key} className="inline-block mr-2">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-primary">
                      {formatPrice(item.price)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-medium min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">
                    รวม: {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voucher Section */}
        <div className="px-4 mb-4">
          <div className="bg-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-primary" />
              <h3 className="font-medium">คูปองส่วนลด</h3>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="กรอกรหัสคูปอง"
                className="flex-1"
              />
              <Button variant="outline">
                ใช้
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-tab-bar left-0 right-0 bg-background border-t border-border p-4 z-40">
        <div className="space-y-3">
          {/* Price Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ราคาสินค้า</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ค่าส่ง</span>
              <span className="text-success">ฟรี</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>รวมทั้งสิ้น</span>
              <span className="text-primary">{formatPrice(getTotalPrice())}</span>
            </div>
          </div>
          
          {/* Checkout Button */}
          <Button className="w-full h-12 text-lg font-semibold">
            ดำเนินการชำระเงิน ({getTotalItems()} รายการ)
          </Button>
        </div>
      </div>
    </div>
  );
}