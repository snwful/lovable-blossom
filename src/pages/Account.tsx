import { User, Package, MapPin, Heart, Settings, LogOut, Bell, CreditCard, Gift, HelpCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    category: "บัญชีของฉัน",
    items: [
      { icon: Package, label: "คำสั่งซื้อของฉัน", badge: "3", href: "/account/orders" },
      { icon: MapPin, label: "ที่อยู่ของฉัน", href: "/account/addresses" },
      { icon: CreditCard, label: "บัตรเครดิต/เดบิต", href: "/account/payment" },
      { icon: Heart, label: "รายการที่ชอบ", badge: "12", href: "/account/wishlist" },
    ]
  },
  {
    category: "การตั้งค่า",
    items: [
      { icon: Bell, label: "การแจ้งเตือน", href: "/account/notifications" },
      { icon: Settings, label: "ตั้งค่าบัญชี", href: "/account/settings" },
      { icon: Gift, label: "โปรโมชั่นของฉัน", href: "/account/promotions" },
    ]
  },
  {
    category: "ความช่วยเหลือ", 
    items: [
      { icon: HelpCircle, label: "ศูนย์ช่วยเหลือ", href: "/help" },
      { icon: Phone, label: "ติดต่อเจ้าหน้าที่", href: "/contact" },
    ]
  }
];

const orderStats = [
  { label: "รอชำระเงิน", count: 1, color: "text-warning" },
  { label: "รอจัดส่ง", count: 2, color: "text-primary" },
  { label: "กำลังจัดส่ง", count: 0, color: "text-accent" },
  { label: "สำเร็จ", count: 24, color: "text-success" },
];

export default function Account() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="px-4 py-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary-foreground/20">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>สก</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">สุกัญญา กิตติชัย</h1>
              <p className="text-primary-foreground/80 text-sm">sukanya@example.com</p>
              <Badge className="mt-2 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20">
                สมาชิก Gold
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-primary-foreground">
              แก้ไข
            </Button>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* Order Status Cards */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">คำสั่งซื้อของฉัน</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                ดูทั้งหมด →
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {orderStats.map((stat) => (
                <button
                  key={stat.label}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                    {stat.count}
                  </div>
                  <div className="text-xs text-center text-muted-foreground leading-tight">
                    {stat.label}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map((section) => (
            <Card key={section.category}>
              <CardContent className="p-4">
                <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                  {section.category}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      >
                        <Icon className="w-5 h-5 text-muted-foreground" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="h-5 px-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
              การดำเนินการด่วน
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-primary/30 hover:bg-primary/5 transition-all">
                <Gift className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">รับคูปอง</span>
              </button>
              <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-secondary/30 hover:bg-secondary/5 transition-all">
                <Heart className="w-8 h-8 text-secondary mb-2" />
                <span className="text-sm font-medium">รีวิวสินค้า</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/5 justify-start"
            >
              <LogOut className="w-5 h-5 mr-3" />
              ออกจากระบบ
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-xs text-muted-foreground pb-8">
          <p>แอปพลิเคชัน Mae Thuan Store v1.0.0</p>
          <p className="mt-1">© 2024 Mae Thuan. สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </div>
  );
}