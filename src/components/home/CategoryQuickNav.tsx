const categories = [
  { id: "electronics", name: "อิเล็กทรอนิกส์", icon: "📱", color: "from-blue-500 to-blue-600" },
  { id: "fashion", name: "แฟชั่น", icon: "👕", color: "from-pink-500 to-pink-600" },
  { id: "beauty", name: "ความงาม", icon: "💄", color: "from-purple-500 to-purple-600" },
  { id: "home", name: "บ้านและสวน", icon: "🏠", color: "from-green-500 to-green-600" },
  { id: "sports", name: "กีฬา", icon: "⚽", color: "from-orange-500 to-orange-600" },
  { id: "automotive", name: "รถยนต์", icon: "🚗", color: "from-gray-500 to-gray-600" },
  { id: "books", name: "หนังสือ", icon: "📚", color: "from-indigo-500 to-indigo-600" },
  { id: "more", name: "ดูเพิ่มเติม", icon: "⋯", color: "from-muted-foreground to-muted-foreground" }
];

export function CategoryQuickNav() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">หมวดหมู่สินค้า</h2>
        <button className="text-sm text-primary font-medium">
          ดูทั้งหมด →
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="flex flex-col items-center group"
          >
            <div 
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} 
              flex items-center justify-center text-2xl mb-2 shadow-lg
              group-hover:scale-105 group-active:scale-95 transition-transform duration-200`}
            >
              {category.icon}
            </div>
            <span className="text-xs font-medium text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}