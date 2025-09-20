"use client";

import { Outlet, useLocation, Link } from "react-router-dom";
import { Home, Grid3X3, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cart-store";

const tabs = [
  {
    id: "home",
    label: "หน้าแรก",
    path: "/",
    icon: Home,
  },
  {
    id: "categories", 
    label: "หมวดหมู่",
    path: "/categories",
    icon: Grid3X3,
  },
  {
    id: "search",
    label: "ค้นหา", 
    path: "/search",
    icon: Search,
  },
  {
    id: "cart",
    label: "ตะกร้า",
    path: "/cart", 
    icon: ShoppingCart,
  },
  {
    id: "account",
    label: "บัญชี",
    path: "/account",
    icon: User,
  },
];

export function BottomTabLayout() {
  const location = useLocation();
  const { items } = useCartStore();
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pb-tab-bar">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
        <div className="flex items-center justify-around px-2 py-1 pb-safe-bottom">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1",
                  "transition-all duration-200 ease-out",
                  "touch-manipulation select-none",
                  // Ensure 48px minimum touch target
                  "min-h-[48px]",
                  isActive
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                style={{ touchAction: "manipulation" }}
              >
                <div className="relative">
                  <Icon 
                    className={cn(
                      "w-5 h-5 transition-all duration-200",
                      isActive && "scale-110"
                    )} 
                  />
                  
                  {/* Cart Badge */}
                  {tab.id === "cart" && cartItemCount > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 bg-primary text-primary-foreground"
                      variant="default"
                    >
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </Badge>
                  )}
                </div>
                
                <span 
                  className={cn(
                    "text-xs font-medium mt-1 text-center leading-tight",
                    "transition-all duration-200",
                    isActive && "font-semibold"
                  )}
                >
                  {tab.label}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}