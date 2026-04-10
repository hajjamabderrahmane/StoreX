import { useState, useEffect } from "react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ShopPage({ initialCategory = "All", onProductClick, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  useEffect(() => { setActiveCategory(initialCategory); }, [initialCategory]);

  let filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "new") filtered = [...filtered].filter((p) => p.badge === "New").concat(
    filtered.filter((p) => p.badge !== "New")
  );

  return (
    <main className="shop-page">
      {/* Banner */}
      <div className="shop-page__banner">
        <h1>La Boutique</h1>
        <p>Streetwear Premium — {filtered.length} articles</p>
      </div>

      <div className="shop-page__body">
        {/* Sidebar filters */}
        <aside className="shop-filters">
          <h3>Catégories</h3>
          <ul className="shop-filters__cats">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`shop-filters__cat ${activeCategory === cat ? "shop-filters__cat--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className="shop-filters__count">
                    {cat === "All" ? products.length : products.filter((p) => p.category === cat).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: "2rem" }}>Trier par</h3>
          <select
            className="shop-filters__select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Populaire</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="new">Nouveautés</option>
          </select>
        </aside>

        {/* Products area */}
        <div className="shop-page__main">
          {/* Search bar */}
          <div className="shop-page__search">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shop-page__search-input"
            />
          </div>

          {/* Category chips (mobile) */}
          <div className="shop-page__chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip ${activeCategory === cat ? "chip--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="shop-page__empty">
              <p>Aucun produit trouvé pour "{search}"</p>
              <button className="btn btn--outline" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
                Réinitialiser
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}