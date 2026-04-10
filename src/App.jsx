import { useState, useEffect } from "react";
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

  // ✅ handle browser back
  useEffect(() => {
    const handleBack = (event) => {
      if (event.state) {
        setCurrentPage(event.state.page);
        if (event.state.data) setSelectedProduct(event.state.data);
      }
    };

    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  // ✅ initial history state
  useEffect(() => {
    window.history.replaceState({ page: "home" }, "", "");
  }, []);

  // ✅ navigation function
  const navigate = (page, data = null) => {
    setCurrentPage(page);
    if (data) setSelectedProduct(data);

    window.history.pushState({ page, data }, "", "");

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
      <Navbar
        onNavigate={navigate}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        onCartOpen={() => setCartOpen(true)}
      />

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
          onBack={() => window.history.back()} // 🔥 back button حقيقي
          onNavigate={navigate}
        />
      )}

      {currentPage === "admin" && (
  <AdminPage />
)}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
      />

      <Footer onNavigate={navigate} />
    </div>
  );
}