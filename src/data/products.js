export const categories = ["All", "T-Shirts", "Hoodies", "Tracksuits", "Shoes", "Accessories"];

export const products = [
  {
    id: 1,
    name: "Essential Oversized Tee",
    category: "T-Shirts",
    price: 149,
    badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    description: "100% premium cotton. Oversized drop-shoulder fit. Street-ready silhouette.",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 2,
    name: "Monogram Polo Shirt",
    category: "T-Shirts",
    price: 149,
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Navy"],
    description: "Clean cut polo with embroidered logo. Premium pique cotton.",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 3,
    name: "Fendi Monogram Jacket",
    category: "Hoodies",
    price: 299,
    badge: "Limited",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Black"],
    description: "All-over logo pattern. Relaxed fit. Statement outerwear.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 4,
    name: "Adidas Tracksuit Set",
    category: "Tracksuits",
    price: 249,
    badge: "Best Seller",
    sizes: ["M", "L", "XL"],
    colors: ["Black/White", "Grey/Black", "Green"],
    description: "Classic 3-stripe design. Matching jacket and jogger. Iconic streetwear.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 5,
    name: "Nike Tech Joggers",
    category: "Tracksuits",
    price: 119,
    badge: null,
    sizes: ["3XL", "4XL", "5XL", "6XL"],
    colors: ["Grey", "Black"],
    description: "Nike tech fleece. Tapered fit. Zip pockets. All-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 6,
    name: "Balenciaga Runner 9XS",
    category: "Shoes",
    price: 179,
    badge: "Hot",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Black/Grey"],
    description: "Chunky sole runner aesthetic. Premium build quality. Iconic silhouette.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 7,
    name: "Air Jordan 1 High",
    category: "Shoes",
    price: 99,
    badge: "Best Seller",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Black/White"],
    description: "High-top silhouette. Crisp colorway. Court-ready heritage design.",
    images: [
      "https://images.unsplash.com/photo-1556048219-bb6978360b84?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 8,
    name: "Nike Vomero White",
    category: "Shoes",
    price: 99,
    badge: null,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["White"],
    description: "Lightweight runner. Clean all-white build. Versatile everyday wear.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 9,
    name: "LV Monogram Sneakers",
    category: "Shoes",
    price: 149,
    badge: "Limited",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Black/White"],
    description: "All-over monogram print. Premium build. Statement piece.",
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    inStock: true,
  },
  {
    id: 10,
    name: "Slim Stretch Jeans",
    category: "Accessories",
    price: 99,
    badge: null,
    sizes: ["31", "32", "33", "34", "36"],
    colors: ["Black", "Grey"],
    description: "Premium denim blend. Slim tapered cut. All-day stretch comfort.",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    inStock: true,
  },
];

export const WHATSAPP_NUMBER = "212600000000"; // Replace with real number

export const buildWhatsAppLink = (productName, size, color) => {
  const message = encodeURIComponent(
    `Bonjour STOREX 👋\n\nJe souhaite commander :\n📦 Produit: ${productName}\n📏 Taille: ${size}\n🎨 Couleur: ${color}\n\nMerci!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};