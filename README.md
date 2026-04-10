# STOREX — Premium Streetwear Website

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
storex/
├── index.html
├── vite.config.js
├── package.json
├── vercel.json          ← Deploy to Vercel with 1 click
└── src/
    ├── main.jsx
    ├── App.jsx           ← Main router / state
    ├── styles.css        ← All styles
    ├── data/
    │   └── products.js   ← ⚠️ EDIT YOUR PRODUCTS HERE
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── CartDrawer.jsx
    │   └── Footer.jsx
    └── pages/
        ├── HomePage.jsx
        ├── ShopPage.jsx
        └── ProductPage.jsx
```

## ⚙️ Configuration

### 1. Set your WhatsApp number
In `src/data/products.js`:
```js
export const WHATSAPP_NUMBER = "212XXXXXXXXX"; // Your real number
```

### 2. Add your products
Edit the `products` array in `src/data/products.js`:
```js
{
  id: 11,
  name: "Your Product Name",
  category: "T-Shirts",  // T-Shirts | Hoodies | Tracksuits | Shoes | Accessories
  price: 149,
  badge: "New",          // Best Seller | New | Limited | Hot | null
  sizes: ["S", "M", "L", "XL"],
  colors: ["Black", "White"],
  description: "Your description",
  images: ["url1", "url2"],
  inStock: true,
}
```

### 3. Update store info
- Address, location in `Footer.jsx`
- Instagram handle in `Navbar.jsx` and `Footer.jsx`
- Hero slides in `HomePage.jsx`

## 🌐 Deploy to Vercel (Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo → Deploy
4. Your site is live in 2 minutes!

## 📦 Features

- ✅ Full responsive design (mobile-first)
- ✅ WhatsApp ordering (no checkout needed)
- ✅ Cart drawer with bulk WhatsApp order
- ✅ Auto-fill WhatsApp message with product details
- ✅ Product quick-view with size selector
- ✅ Category filtering + search
- ✅ Smooth scroll animations
- ✅ Hero slideshow
- ✅ Customer reviews section
- ✅ SEO-ready HTML