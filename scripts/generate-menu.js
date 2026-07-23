const fs = require('fs');
const path = require('path');
const root = process.cwd();
const outPath = path.join(root, 'src', 'data', 'menu.ts');
const placeholderDir = path.join(root, 'public', 'images', 'menu', 'placeholders');
fs.mkdirSync(placeholderDir, { recursive: true });
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const escape = (value) => value.replace(/"/g, '\\"');
const describe = (name, category) => {
  const nm = name.toLowerCase();
  const patterns = [
    [/cappuccino/, 'Equal parts espresso, steamed milk, and silky foam.'],
    [/cafe mocha/, 'Espresso, chocolate, and steamed milk finished with cocoa.'],
    [/cafe latte/, 'Smooth espresso with steamed milk and a light foam cap.'],
    [/hazelnut/, 'Espresso with roasted hazelnut syrup and creamy milk.'],
    [/tiramisu(?! frappe)/, 'Espresso with sweet dessert notes of mascarpone and cocoa.'],
    [/flat white/, 'Rich espresso layered under a thin, velvety milk texture.'],
    [/cortado/, 'Half espresso and half steamed milk for a balanced sip.'],
    [/vanilla/, 'Espresso with aromatic vanilla syrup and soft steamed milk.'],
    [/macchiato(?! iced)/, 'Espresso marked with a small spoonful of foam.'],
    [/irish coffee/, 'Coffee blended with Irish cream notes and warm spices.'],
    [/biscoff latte/, 'Espresso with Biscoff cookie syrup and steamed milk.'],
    [/nutella latte/, 'Espresso wrapped in rich chocolate-hazelnut cream.'],
    [/espresso$/, 'Pure pulled espresso, intense and concentrated.'],
    [/americano/, 'Espresso diluted with hot water for a clean black brew.'],
    [/doppio/, 'A double shot of espresso with extra boldness.'],
    [/classic frappe/, 'Blended iced coffee with a creamy, frothy finish.'],
    [/hazelnut frappe/, 'Hazelnut mocha frappe topped with whipped cream.'],
    [/caramel frappe/, 'Coffee frappe with buttery caramel sweetness.'],
    [/tiramisu frappe/, 'Tiramisu-inspired frappe with cocoa and cream notes.'],
    [/irish frappe/, 'Cool coffee frappe with warm caramel and spice.'],
    [/oreo frappe/, 'Chocolate frappe layered with Oreo cookie crunch.'],
    [/brownie frappe/, 'Frappe blended with brownie pieces and chocolate sauce.'],
    [/nutella frappe/, 'Nutella frappe with hazelnut spread and creamy ice.'],
    [/biscoff frappe/, 'Biscoff frappe with cookie butter sweetness and ice.'],
    [/treviso iced latte/, 'Chilled latte with sweet syrup and long iced pour.'],
    [/iced americano/, 'Black iced espresso with crisp, cool clarity.'],
    [/mocha iced coffee/, 'Iced coffee with chocolate and espresso over ice.'],
    [/coconut iced/, 'Iced coffee blended with coconut and cream.'],
    [/strawberry mocha/, 'Strawberry-spiked mocha over icy coffee.'],
    [/orange caramel/, 'Iced coffee with bright orange caramel swirl.'],
    [/vietnamese latte/, 'Strong coffee with sweet condensed milk over ice.'],
    [/lemon iced tea/, 'Lemon iced tea with zesty lemon, crisp ice, and fresh mint.'],
    [/peach iced tea/, 'Peach iced tea with fragrant fruit, bright citrus, and iced refreshment.'],
    [/green apple iced tea/, 'Green apple iced tea with tart fruit, herbal green notes, and cool fizz.'],
    [/pink guava iced tea/, 'Pink guava iced tea layered with tropical sweetness and light citrus.'],
    [/black currant iced tea/, 'Black currant iced tea with deep berry accents and a crisp finish.'],
    [/mint iced tea/, 'Mint iced tea with lively mint, citrus, and sharp refreshment.'],
    [/iced crusher/, (name) => `${name.replace(/ Iced Crusher$/i, '')} crushed with ice, mint, and sweet syrup for a brunch-ready refresher.`],
    [/hot chocolate/, (name) => `${name.replace(/ Hot Chocolate$/i, '')} made with velvety chocolate, steamed milk, and a pillowy whipped topping.`],
    [/shake/, (name) => `${name} blended into a rich, creamy shake with indulgent layers of flavor.`],
    [/mojito/, (name) => `${name} with fresh mint, soda, and bright citrus lift for a lightly sparkling finish.`],
    [/liit/, (name) => `${name.replace(/ LIIT 500ml$/i, '')} long island iced tea poured from a chilled bottle to share.`],
    [/pizza/, (name) => `${name} topped with vibrant herbs, molten cheese, and a crisp golden crust.`],
    [/sizzler/, (name) => `${name} served sizzling with rice, grilled veggies, and bold house spices.`],
    [/sandwich/, (name) => `${name} layered with fresh fillings, toasty bread, and a creamy house sauce.`],
    [/fries/, 'Crispy fries seasoned with cafe-spice salt.'],
    [/crispy corn/, 'Sweet corn kernels seasoned and crisped to perfection.'],
    [/jalapeno/, 'Fiery jalapeno bites with melted cheese.'],
    [/spring rolls/, 'Golden spring rolls filled with veggie crunch and dip.'],
    [/puffs/, 'Cheesy Italian puffs with warm, herby pastry.'],
    [/potato veggies/, 'Seasoned potato and vegetable medley with spice.'],
    [/kebab/, (name) => `${name} made with seasoned greens, aromatic spices, and a crisp finish.`],
    [/nachos/, 'Crispy nachos topped with cheese, beans, and salsa.'],
    [/tostadas/, 'Crunchy tostadas loaded with fresh vegetables.'],
    [/tacos/, 'Soft tacos layered with spicy veggies and salsa.'],
    [/burritos/, 'Stuffed burritos with rice, beans, and cheese.'],
    [/chimichangas/, 'Crispy chimichangas filled with savory veg.'],
    [/quesadillas/, 'Melty quesadillas with cheese and seasoned veggies.'],
    [/enchiladas/, 'Saucy enchiladas wrapped in soft tortillas.'],
    [/burrito bowl/, 'Burrito bowl with rice, beans, and fresh toppings.'],
    [/pasta/, (name) => `${name} in a rich sauce with fresh herbs, cheese, and a satisfying finish.`],
    [/ramen/, (name) => `${name} with slurpable noodles, savory broth, and topped greens.`],
    [/sushi/, (name) => `${name} sushi rolls finished with zesty sauce and crisp textures.`],
    [/soup/, (name) => `${name} served hot with aromatic spices and comforting broth.`],
    [/salad/, (name) => `${name} tossed with crisp vegetables, fresh herbs, and bright dressing.`],
    [/noodles/, (name) => `${name} with savory sauce, fresh noodles, and garden-fresh vegetables.`],
  ];
  for (const [pattern, result] of patterns) {
    if (pattern.test(nm)) {
      return typeof result === 'function' ? result(name) : result;
    }
  }
  return `A crafted ${name.toLowerCase()} that brings a memorable flavor.`;
};
const itemColor = (category) => {
  switch (category) {
    case 'Coffee': return ['#4d2d1f', '#caa776'];
    case 'Cold Drinks': return ['#1f4f5f', '#80b2c0'];
    case 'Italian & Snacks': return ['#6a3d24', '#d4a47c'];
    case 'Global Bowls': return ['#34523c', '#a5c19b'];
    case 'Dessert': return ['#704d3e', '#ebcfb2'];
    default: return ['#3b3b3b', '#b8b8b8'];
  }
};
const iconFor = (category) => {
  switch (category) {
    case 'Coffee': return '☕';
    case 'Cold Drinks': return '🥤';
    case 'Italian & Snacks': return '🍕';
    case 'Global Bowls': return '🍜';
    case 'Dessert': return '🍮';
    default: return '🍽️';
  }
};
const placeholderPath = (name) => `/images/menu/placeholders/${slug(name)}.svg`;
const writePlaceholder = (name, category) => {
  const [bg, accent] = itemColor(category);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg width="520" height="520" viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg">\n  <defs>\n    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">\n      <stop offset="0%" stop-color="${bg}"/>\n      <stop offset="100%" stop-color="${accent}"/>\n    </linearGradient>\n  </defs>\n  <rect x="0" y="0" width="520" height="520" rx="48" fill="url(#grad)"/>\n  <rect x="24" y="24" width="472" height="472" rx="32" fill="rgba(255,255,255,0.12)"/>\n  <text x="50%" y="38%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" fill="rgba(255,255,255,0.9)">${iconFor(category)}</text>\n  <text x="50%" y="66%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="white">${escape(name)}</text>\n</svg>`;
  const filePath = path.join(placeholderDir, `${slug(name)}.svg`);
  fs.writeFileSync(filePath, svg, 'utf8');
  return placeholderPath(name);
};
const photoMap = new Map([
  ['Cappuccino', '/images/menu/coffee/latte-art.jpeg'],
  ['Cafe Mocha', '/images/menu/coffee/latte-art.jpeg'],
  ['Cafe Latte', '/images/menu/coffee/latte-art.jpeg'],
  ['Hazelnut', '/images/menu/coffee/latte-art.jpeg'],
  ['Tiramisu', '/images/menu/coffee/latte-art.jpeg'],
  ['Flat White', '/images/menu/coffee/latte-art.jpeg'],
  ['Cortado', '/images/menu/coffee/latte-art.jpeg'],
  ['Vanilla', '/images/menu/coffee/latte-art.jpeg'],
  ['Macchiato', '/images/menu/coffee/latte-art.jpeg'],
  ['Irish Coffee', '/images/menu/coffee/latte-art.jpeg'],
  ['Biscoff Latte', '/images/menu/coffee/latte-art.jpeg'],
  ['Nutella Latte', '/images/menu/coffee/latte-art.jpeg'],
  ['Lemon Iced Tea', '/images/menu/tea/green-cooler.jpeg'],
  ['Peach Iced Tea', '/images/menu/tea/green-cooler.jpeg'],
  ['Green Apple Iced Tea', '/images/menu/tea/green-cooler.jpeg'],
  ['Pink Guava Iced Tea', '/images/menu/tea/green-cooler.jpeg'],
  ['Black Currant Iced Tea', '/images/menu/tea/green-cooler.jpeg'],
  ['Mint Iced Tea', '/images/menu/tea/green-cooler.jpeg'],
  ['Watermelon Iced Crusher', '/images/menu/tea/green-cooler.jpeg'],
  ['Strawberry Iced Crusher', '/images/menu/tea/green-cooler.jpeg'],
  ['Kiwi Iced Crusher', '/images/menu/tea/green-cooler.jpeg'],
  ['Galaxy Iced Crusher', '/images/menu/tea/green-cooler.jpeg'],
  ['Berry Blast Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Nutella Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Double Coco Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Chocolate Mint Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Kitkat Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Brownie Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Belgium Chocolate Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Popcorn Caramel Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Lotus Biscoff Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Ferrero Rocher Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Peanut Butter Banana Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Strawberry Coconut Shake', '/images/menu/seasonal/berry-frappe.jpeg'],
  ['Margherita Pizza', '/images/menu/bites/pizza-and-sides.jpeg'],
  ['Paneer Tikka Sizzler', '/images/menu/bites/table-service.jpeg'],
  ['Special Sizzler', '/images/menu/bites/table-service.jpeg'],
  ['Veggie Delight Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Veggie Mayo Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Cheese Chutney Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Aloo Tikki Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Paneer Schezwan Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Paneer Peri Peri Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Mushroom Schezwan Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Chilli Cheese Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Paneer Tandoori Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Chocolate Sandwich', '/images/menu/bites/table-service.jpeg'],
  ['Herb Rice Bowl', '/images/menu/bites/table-service.jpeg'],
  ['Veg Rice Bowl', '/images/menu/bites/table-service.jpeg'],
  ['Peri Peri Rice Bowl', '/images/menu/bites/table-service.jpeg'],
  ['Paneer Bowl', '/images/menu/bites/table-service.jpeg'],
  ['Classic Affogato', '/images/gallery/menu-page-desserts.jpeg'],
]);
const items = {
  Coffee: [
    { name: 'Cappuccino', price: 'Rs. 159' },
    { name: 'Cafe Mocha', price: 'Rs. 159' },
    { name: 'Cafe Latte', price: 'Rs. 159' },
    { name: 'Hazelnut', price: 'Rs. 159' },
    { name: 'Tiramisu', price: 'Rs. 179' },
    { name: 'Flat White', price: 'Rs. 179' },
    { name: 'Cortado', price: 'Rs. 179' },
    { name: 'Vanilla', price: 'Rs. 179' },
    { name: 'Macchiato', price: 'Rs. 179' },
    { name: 'Irish Coffee', price: 'Rs. 179' },
    { name: 'Biscoff Latte', price: 'Rs. 209' },
    { name: 'Nutella Latte', price: 'Rs. 209' },
    { name: 'Espresso', price: 'Rs. 79' },
    { name: 'Americano', price: 'Rs. 149' },
    { name: 'Doppio', price: 'Rs. 149' },
    { name: 'Classic Frappe', price: 'Rs. 179' },
    { name: 'Hazelnut Frappe', price: 'Rs. 179' },
    { name: 'Caramel Frappe', price: 'Rs. 179' },
    { name: 'Tiramisu Frappe', price: 'Rs. 179' },
    { name: 'Irish Frappe', price: 'Rs. 179' },
    { name: 'Oreo Frappe', price: 'Rs. 179' },
    { name: 'Brownie Frappe', price: 'Rs. 219' },
    { name: 'Nutella Frappe', price: 'Rs. 219' },
    { name: 'Biscoff Frappe', price: 'Rs. 219' },
    { name: 'Treviso Iced Latte', price: 'Rs. 179' },
    { name: 'Iced Americano (Black Coffee)', price: 'Rs. 179' },
    { name: 'Mocha Iced Coffee', price: 'Rs. 179' },
    { name: 'Coconut Iced', price: 'Rs. 179' },
    { name: 'Strawberry Mocha', price: 'Rs. 219' },
    { name: 'Orange Caramel', price: 'Rs. 219' },
    { name: 'Vietnamese Latte', price: 'Rs. 219' },
  ],
  'Cold Drinks': [
    { name: 'Lemon Iced Tea', price: 'Rs. 149' },
    { name: 'Peach Iced Tea', price: 'Rs. 149' },
    { name: 'Green Apple Iced Tea', price: 'Rs. 149' },
    { name: 'Pink Guava Iced Tea', price: 'Rs. 149' },
    { name: 'Black Currant Iced Tea', price: 'Rs. 149' },
    { name: 'Mint Iced Tea', price: 'Rs. 149' },
    { name: 'Watermelon Iced Crusher', price: 'Rs. 169' },
    { name: 'Strawberry Iced Crusher', price: 'Rs. 169' },
    { name: 'Kiwi Iced Crusher', price: 'Rs. 169' },
    { name: 'Galaxy Iced Crusher', price: 'Rs. 179' },
    { name: 'Classic Hot Chocolate', price: 'Rs. 179' },
    { name: 'Hazelnut Hot Chocolate', price: 'Rs. 179' },
    { name: 'Orange Caramel Hot Chocolate', price: 'Rs. 179' },
    { name: 'Mint Chocolate Hot Chocolate', price: 'Rs. 179' },
    { name: 'Berry Blast Shake', price: 'Rs. 189' },
    { name: 'Nutella Shake', price: 'Rs. 189' },
    { name: 'Double Coco Shake', price: 'Rs. 189' },
    { name: 'Chocolate Mint Shake', price: 'Rs. 189' },
    { name: 'Kitkat Shake', price: 'Rs. 189' },
    { name: 'Brownie Shake', price: 'Rs. 189' },
    { name: 'Belgium Chocolate Shake', price: 'Rs. 189' },
    { name: 'Popcorn Caramel Shake', price: 'Rs. 189' },
    { name: 'Lotus Biscoff Shake', price: 'Rs. 189' },
    { name: 'Ferrero Rocher Shake', price: 'Rs. 189' },
    { name: 'Peanut Butter Banana Shake', price: 'Rs. 189' },
    { name: 'Strawberry Coconut Shake', price: 'Rs. 189' },
    { name: 'Blue Lagoon Mojito', price: 'Rs. 169' },
    { name: 'Green Apple Mojito', price: 'Rs. 169' },
    { name: 'Mango Mansion Mojito', price: 'Rs. 169' },
    { name: 'Strawberry Rush Mojito', price: 'Rs. 169' },
    { name: 'Blueberry Mojito', price: 'Rs. 169' },
    { name: 'Cucumber Tonic Mojito', price: 'Rs. 169' },
    { name: 'Virgin Mint Mojito', price: 'Rs. 179' },
    { name: 'Kiwi Blast Mojito', price: 'Rs. 179' },
    { name: 'Guava Chilli Mojito', price: 'Rs. 179' },
    { name: 'Rose Basil Mojito', price: 'Rs. 179' },
    { name: 'Green Apple LIIT 500ml', price: 'Rs. 269' },
    { name: 'Peach LIIT 500ml', price: 'Rs. 269' },
    { name: 'Cranberry LIIT 500ml', price: 'Rs. 269' },
    { name: 'Passion Fruit LIIT 500ml', price: 'Rs. 269' },
    { name: 'Caffeine Rush LIIT 500ml', price: 'Rs. 269' },
  ],
  'Italian & Snacks': [
    { name: 'Margherita Pizza', price: 'Rs. 299' },
    { name: 'Cheese Corn Pizza', price: 'Rs. 299' },
    { name: 'Veggie Heaven Pizza', price: 'Rs. 299' },
    { name: 'Fiery Jalapeno Pizza', price: 'Rs. 299' },
    { name: 'Paneer Paprika Pizza', price: 'Rs. 299' },
    { name: 'Mushroom Pizza', price: 'Rs. 299' },
    { name: 'Punjabi Pizza', price: 'Rs. 299' },
    { name: 'Paneer Tikka Sizzler', price: 'Rs. 359' },
    { name: 'Special Sizzler', price: 'Rs. 359' },
    { name: 'Veggie Delight Sandwich', price: 'Rs. 159' },
    { name: 'Veggie Mayo Sandwich', price: 'Rs. 159' },
    { name: 'Cheese Chutney Sandwich', price: 'Rs. 159' },
    { name: 'Aloo Tikki Sandwich', price: 'Rs. 159' },
    { name: 'Paneer Schezwan Sandwich', price: 'Rs. 199' },
    { name: 'Paneer Peri Peri Sandwich', price: 'Rs. 199' },
    { name: 'Mushroom Schezwan Sandwich', price: 'Rs. 199' },
    { name: 'Chilli Cheese Sandwich', price: 'Rs. 199' },
    { name: 'Paneer Tandoori Sandwich', price: 'Rs. 199' },
    { name: 'Chocolate Sandwich', price: 'Rs. 199' },
    { name: 'French Fries', price: 'Rs. 169' },
    { name: 'Crispy Corn', price: 'Rs. 169' },
    { name: 'Jalapeno Shots', price: 'Rs. 169' },
    { name: 'Spring Rolls', price: 'Rs. 169' },
    { name: 'Italian Puffs', price: 'Rs. 169' },
    { name: 'Potato Veggies', price: 'Rs. 169' },
    { name: 'Hara Bhara Kebab', price: 'Rs. 189' },
    { name: 'Dahi Kebab', price: 'Rs. 189' },
    { name: 'Nachos', price: 'Rs. 189' },
    { name: 'Tostadas', price: 'Rs. 249' },
    { name: 'Tacos', price: 'Rs. 249' },
    { name: 'Burritos', price: 'Rs. 349' },
    { name: 'Chimichangas', price: 'Rs. 349' },
    { name: 'Quesadillas', price: 'Rs. 349' },
    { name: 'Enchiladas', price: 'Rs. 349' },
    { name: 'Burrito Bowl', price: 'Rs. 349' },
    { name: 'Alfredo Pasta', price: 'Rs. 249' },
    { name: 'Arrabbiata Pasta', price: 'Rs. 249' },
    { name: 'Mac & Cheese Pasta', price: 'Rs. 249' },
    { name: 'Peri Peri Pasta', price: 'Rs. 249' },
    { name: 'Mushroom Pasta', price: 'Rs. 249' },
    { name: 'Pesto Pasta', price: 'Rs. 289' },
    { name: 'Pink Panther Pasta', price: 'Rs. 289' },
  ],
  'Global Bowls': [
    { name: 'Herb Rice Bowl', price: 'Rs. 249' },
    { name: 'Veg Rice Bowl', price: 'Rs. 249' },
    { name: 'Peri Peri Rice Bowl', price: 'Rs. 249' },
    { name: 'Paneer Bowl', price: 'Rs. 249' },
    { name: 'Creamy Mushroom Ramen Bowl', price: 'Rs. 349' },
    { name: 'Veggie Ramen', price: 'Rs. 349' },
    { name: 'Paneer Sushi', price: 'Rs. 349' },
    { name: 'Mushroom Sushi', price: 'Rs. 349' },
    { name: 'Tempura Sushi', price: 'Rs. 349' },
    { name: 'Chilli Paneer', price: 'Rs. 199' },
    { name: 'Paneer Manchurian', price: 'Rs. 199' },
    { name: 'Chilli Mushroom', price: 'Rs. 179' },
    { name: 'Manchurian', price: 'Rs. 179' },
    { name: 'Hakka Noodles', price: 'Rs. 149' },
    { name: 'Burnt Garlic Noodles', price: 'Rs. 179' },
    { name: 'Chilli Garlic Noodles', price: 'Rs. 169' },
    { name: 'Veg Fried Rice', price: 'Rs. 149' },
    { name: 'Burnt Garlic Rice', price: 'Rs. 179' },
    { name: 'Schezwan Fried Rice', price: 'Rs. 149' },
    { name: 'Mushroom Soup', price: 'Rs. 119' },
    { name: 'Tomato Soup', price: 'Rs. 119' },
    { name: 'Hot & Sour Soup', price: 'Rs. 119' },
    { name: 'Manchow Soup', price: 'Rs. 119' },
    { name: 'Lemon Coriander Soup', price: 'Rs. 119' },
    { name: 'Saute Veggies Salad', price: 'Rs. 149' },
    { name: 'Paneer Veggie Salad', price: 'Rs. 199' },
    { name: 'Zucchini Ribbon Salad', price: 'Rs. 199' },
    { name: 'Greek Salad', price: 'Rs. 199' },
    { name: 'Russian Salad', price: 'Rs. 199' },
  ],
  Dessert: [
    { name: 'Classic Affogato', price: 'Rs. 189' },
    { name: 'Oreo Affogato', price: 'Rs. 219' },
    { name: 'Brownie Affogato', price: 'Rs. 239' },
    { name: 'Nutella Affogato', price: 'Rs. 239' },
    { name: 'Butter Scotch', price: 'Rs. 219' },
  ],
};
const makeImage = (item, category) => {
  if (photoMap.has(item.name)) return photoMap.get(item.name);
  return writePlaceholder(item.name, category);
};
let output = `export type MenuCategory = \"Coffee\" | \"Cold Drinks\" | \"Italian & Snacks\" | \"Global Bowls\" | \"Dessert\";\n\nexport type MenuItem = {\n  name: string;\n  description: string;\n  price: string;\n  tags?: string[];\n  image?: string;\n};\n\nexport const menuCategories: MenuCategory[] = [\"Coffee\", \"Cold Drinks\", \"Italian & Snacks\", \"Global Bowls\", \"Dessert\"];\n\nexport const menuItems: Record<MenuCategory, MenuItem[]> = {\n`;
for (const category of Object.keys(items)) {
  output += `  ${JSON.stringify(category)}: [\n`;
  for (const item of items[category]) {
    const description = describe(item.name, category);
    const image = makeImage(item, category);
    output += `    { name: ${JSON.stringify(item.name)}, description: ${JSON.stringify(description)}, price: ${JSON.stringify(item.price)}, image: ${JSON.stringify(image)} },\n`;
  }
  output += `  ],\n`;
}
output += `};\n\nexport const featuredItems = [\n  menuItems.Coffee[0],\n  menuItems[\"Italian & Snacks\"][0],\n  menuItems[\"Cold Drinks\"][0],\n  menuItems.Dessert[0],\n];\n`;
fs.writeFileSync(outPath, output, 'utf8');
console.log('Wrote', outPath);
