export type MenuCategory = "Hot Coffee" | "Cold Beverages" | "Refreshers" | "Shakes & Mocktails" | "Desserts & Teas";

export type MenuItem = {
  name: string;
  price: string;
  isSubcategory?: boolean;
};

export const menuCategories: MenuCategory[] = [
  "Hot Coffee",
  "Cold Beverages",
  "Refreshers",
  "Shakes & Mocktails",
  "Desserts & Teas"
];

export const menuItems: Record<MenuCategory, MenuItem[]> = {
  "Hot Coffee": [
    { name: "With Milk", price: "", isSubcategory: true },
    { name: "Cappuccino / Cafe Latte", price: "159" },
    { name: "Cafe Mocha / Hazelnut", price: "159" },
    { name: "Tiramisu / Flat White", price: "179" },
    { name: "Cortado / Vanilla", price: "179" },
    { name: "Macchiato / Irish Coffee", price: "179" },
    { name: "Biscoff / Nutella Latte", price: "209" },
    { name: "Without Milk", price: "", isSubcategory: true },
    { name: "Espresso", price: "79" },
    { name: "Americano", price: "149" },
    { name: "Doppio", price: "149" }
  ],
  "Cold Beverages": [
    { name: "Cold Coffee", price: "", isSubcategory: true },
    { name: "Classic Frappe", price: "179" },
    { name: "Hazelnut Frappe", price: "179" },
    { name: "Caramel Frappe", price: "179" },
    { name: "Tiramisu / Irish Frappe", price: "179" },
    { name: "Oreo Frappe", price: "179" },
    { name: "Brownie Frappe", price: "219" },
    { name: "Iced Coffee", price: "", isSubcategory: true },
    { name: "Treviso Iced Latte", price: "179" },
    { name: "Iced Americano", price: "179" },
    { name: "Strawberry Mocha", price: "219" },
    { name: "Vietnamese Latte", price: "219" }
  ],
  "Refreshers": [
    { name: "Iced Tea", price: "", isSubcategory: true },
    { name: "Lemon / Peach", price: "149" },
    { name: "Green Apple / Guava", price: "149" },
    { name: "Coolers", price: "", isSubcategory: true },
    { name: "Kiwi Mint / Watermelon", price: "169" },
    { name: "Strawberry Basil", price: "169" },
    { name: "Cucumber Mint", price: "169" },
    { name: "Iced Crusher", price: "", isSubcategory: true },
    { name: "Watermelon / Strawberry", price: "169" },
    { name: "Smoothies", price: "", isSubcategory: true },
    { name: "Mango / Blueberry", price: "189" }
  ],
  "Shakes & Mocktails": [
    { name: "Shakes", price: "", isSubcategory: true },
    { name: "Berry Blast / Nutella", price: "189" },
    { name: "Double Coco / Mint", price: "189" },
    { name: "Kitkat / Brownie", price: "189" },
    { name: "Belgium Chocolate", price: "189" },
    { name: "Lotus Biscoff", price: "189" },
    { name: "Mojito", price: "", isSubcategory: true },
    { name: "Blue Lagoon / Green Apple", price: "169" },
    { name: "Mango / Strawberry", price: "169" },
    { name: "Virgin Mint / Kiwi", price: "179" },
    { name: "LIIT (500ml)", price: "", isSubcategory: true },
    { name: "Green Apple / Peach", price: "269" },
    { name: "Caffeine Rush", price: "269" }
  ],
  "Desserts & Teas": [
    { name: "Coffee Desserts", price: "", isSubcategory: true },
    { name: "Classic Affogato", price: "189" },
    { name: "Oreo Affogato", price: "219" },
    { name: "Brownie Affogato", price: "239" },
    { name: "Nutella Affogato", price: "239" },
    { name: "Desserts", price: "", isSubcategory: true },
    { name: "Chocolate Brownie", price: "289" },
    { name: "Cheese Cakes", price: "", isSubcategory: true },
    { name: "Classic", price: "219" },
    { name: "Blue Berry", price: "269" },
    { name: "Nutella / Biscoff", price: "289" },
    { name: "Teas & Add-Ons", price: "", isSubcategory: true },
    { name: "Black / Ginger Tea", price: "50" },
    { name: "Hibiscus / Chamomile", price: "169" },
    { name: "Kashmiri Kahwa", price: "169" },
    { name: "Extra Syrups / Shot", price: "40" }
  ]
};
