import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SearchHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาสินค้า ยี่ห้อ หรือหมวดหมู่..."
              className="pl-10 bg-muted/50 border-0 h-10"
              readOnly
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs p-0 bg-primary">
              3
            </Badge>
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {[
            { label: "Flash Sale", icon: "⚡", color: "bg-flash-sale text-white" },
            { label: "ส่งฟรี", icon: "🚚", color: "bg-success text-white" },
            { label: "คูปอง", icon: "🎟️", color: "bg-warning text-white" },
            { label: "ยี่ห้อดัง", icon: "⭐", color: "bg-accent text-white" },
          ].map((action) => (
            <button
              key={action.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${action.color}`}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}