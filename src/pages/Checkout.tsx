import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const steps = [
  { id: "address", label: "ที่อยู่", icon: MapPin },
  { id: "shipping", label: "จัดส่ง", icon: Truck },
  { id: "payment", label: "ชำระเงิน", icon: CreditCard },
  { id: "review", label: "ยืนยัน", icon: Check },
];

const mockCartItems = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB สีน้ำเงิน",
    price: 45900,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "AirPods Pro (รุ่นที่ 2)",
    price: 8900,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=100&h=100&fit=crop",
  }
];

export default function Checkout() {
  const { step } = useParams();
  const currentStep = step || "address";
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold">ชำระเงิน</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={stepItem.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        isCompleted
                          ? "bg-success text-success-foreground"
                          : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-xs mt-1 ${isActive ? "font-medium" : ""}`}>
                      {stepItem.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        isCompleted ? "bg-success" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <div className="px-4 py-4 pb-32 space-y-6">
        {/* Address Step */}
        {currentStep === "address" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                ที่อยู่จัดส่ง
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                <Input id="name" placeholder="กรอกชื่อ-นามสกุล" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input id="phone" placeholder="กรอกเบอร์โทรศัพท์" type="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">ที่อยู่</Label>
                <Input id="address" placeholder="บ้านเลขที่ ซอย ถนน" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="district">แขวง/ตำบล</Label>
                  <Input id="district" placeholder="แขวง/ตำบล" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdistrict">เขต/อำเภอ</Label>
                  <Input id="subdistrict" placeholder="เขต/อำเภอ" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="province">จังหวัด</Label>
                  <Input id="province" placeholder="จังหวัด" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">รหัสไปรษณีย์</Label>
                  <Input id="postal" placeholder="รหัสไปรษณีย์" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Shipping Step */}
        {currentStep === "shipping" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                วิธีจัดส่ง
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "จัดส่งฟรี", time: "3-5 วันทำการ", price: 0, recommended: true },
                { name: "จัดส่งเร็ว", time: "1-2 วันทำการ", price: 50 },
                { name: "จัดส่งด่วน", time: "ในวันเดียว", price: 150 },
              ].map((option) => (
                <div
                  key={option.name}
                  className="flex items-center justify-between p-3 border-2 border-border rounded-lg hover:border-primary/30 cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{option.name}</h4>
                      {option.recommended && (
                        <Badge variant="secondary" className="text-xs">แนะนำ</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{option.time}</p>
                  </div>
                  <div className="text-right">
                    {option.price === 0 ? (
                      <span className="font-medium text-success">ฟรี</span>
                    ) : (
                      <span className="font-medium">฿{option.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Payment Step */}
        {currentStep === "payment" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                วิธีชำระเงิน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "บัตรเครดิต/เดบิต", icon: "💳" },
                { name: "โมบายแบงกิ้ง", icon: "📱" },
                { name: "True Money Wallet", icon: "💰" },
                { name: "PromptPay", icon: "🏦" },
              ].map((method) => (
                <div
                  key={method.name}
                  className="flex items-center gap-3 p-3 border-2 border-border rounded-lg hover:border-primary/30 cursor-pointer"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-medium">{method.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Review Step */}
        {currentStep === "review" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">ที่อยู่จัดส่ง</h4>
                  <p className="text-sm text-muted-foreground">
                    สุกัญญา กิตติชัย<br />
                    เบอร์โทร: 081-234-5678<br />
                    123/456 ถ.สุขุมวิท แขวงคลองตัน<br />
                    เขตวัฒนา กรุงเทพฯ 10110
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">วิธีจัดส่ง</h4>
                  <p className="text-sm text-muted-foreground">
                    จัดส่งฟรี (3-5 วันทำการ)
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">วิธีชำระเงิน</h4>
                  <p className="text-sm text-muted-foreground">
                    บัตรเครดิต/เดบิต
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>สรุปรายการสินค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      จำนวน: {item.quantity}
                    </span>
                    <span className="font-medium">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ราคาสินค้า</span>
                <span>฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ค่าส่ง</span>
                <span className="text-success">ฟรี</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>รวมทั้งสิ้น</span>
                <span className="text-primary">฿{total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
        <div className="flex gap-3">
          {currentStepIndex > 0 && (
            <Link to={`/checkout/${steps[currentStepIndex - 1].id}`}>
              <Button variant="outline" className="flex-1">
                ย้อนกลับ
              </Button>
            </Link>
          )}
          
          {currentStep === "review" ? (
            <Button className="flex-1 h-12 text-lg font-semibold">
              ยืนยันการสั่งซื้อ
            </Button>
          ) : (
            <Link to={`/checkout/${steps[currentStepIndex + 1].id}`}>
              <Button className="flex-1 h-12 text-lg font-semibold">
                ดำเนินการต่อ
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}