import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartDrawer from "./components/CartDrawer";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const navigate = (page, data = null) => {
    setCurrentPage(page);
    if (data) setSelectedProduct(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product, size, color) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) => i.id === product.id && i.size === size && i.color === color
      );
      if (exists) {
        return prev.map((i) =>
          i.id === product.id && i.size === size && i.color === color
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...product, size, color, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) =>
      prev.filter((i) => !(i.id === id && i.size === size && i.color === color))
    );
  };

  return (
    <div className="app">
      {currentPage !== "admin" && (
        <Navbar
          onNavigate={navigate}
          cartCount={cart.reduce((s, i) => s + i.qty, 0)}
          onCartOpen={() => setCartOpen(true)}
        />
      )}

      {currentPage === "home" && (
        <HomePage
          onNavigate={navigate}
          onCategorySelect={(cat) => {
            setSelectedCategory(cat);
            navigate("shop");
          }}
          onProductClick={(p) => navigate("product", p)}
          onAddToCart={addToCart}
        />
      )}

      {currentPage === "shop" && (
        <ShopPage
          initialCategory={selectedCategory}
          onProductClick={(p) => navigate("product", p)}
          onAddToCart={addToCart}
        />
      )}

      {currentPage === "product" && selectedProduct && (
        <ProductPage
          product={selectedProduct}
          onAddToCart={addToCart}
          onBack={() => navigate("shop")}
          onNavigate={navigate}
        />
      )}

      {currentPage === "admin" && <AdminPage />}

      {currentPage !== "admin" && (
        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          onRemove={removeFromCart}
        />
      )}

      {currentPage !== "admin" && (
        <Footer onNavigate={navigate} />
      )}
    </div>
  );
}
