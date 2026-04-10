import { useState } from "react";
import { buildWhatsAppLink } from "../data/products";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ProductPage({ product, onAddToCart, onBack, onNavigate }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleWhatsApp = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    window.open(buildWhatsAppLink(product.name, selectedSize, selectedColor), "_blank");
  };

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    onAddToCart(product, selectedSize, selectedColor);
  };

  return (
    <main className="product-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <button onClick={() => onNavigate("home")}>Accueil</button>
        <span>/</span>
        <button onClick={onBack}>Boutique</button>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-page__grid">
        {/* LEFT: Images */}
        <div className="product-page__gallery">
          <div className="product-page__main-image">
            <img src={product.images[activeImage]} alt={product.name} />
            {product.badge && (
              <span className="product-page__badge">{product.badge}</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="product-page__thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`product-page__thumb ${activeImage === i ? "product-page__thumb--active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Info */}
        <div className="product-page__info">
          <p className="product-page__category">{product.category}</p>
          <h1 className="product-page__name">{product.name}</h1>

          <div className="product-page__price-row">
            <span className="product-page__price">{product.price} MAD</span>
            <span className="product-page__delivery">🚚 Livraison 24-48h</span>
          </div>

          <p className="product-page__description">{product.description}</p>

          {/* Color selection */}
          <div className="product-page__option-group">
            <label>Couleur: <strong>{selectedColor}</strong></label>
            <div className="product-page__colors">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`color-btn ${selectedColor === c ? "color-btn--active" : ""}`}
                  onClick={() => setSelectedColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div className="product-page__option-group">
            <label>
              Taille {selectedSize && <strong>— {selectedSize}</strong>}
              {sizeError && <span className="product-page__error"> ← Choisissez une taille</span>}
            </label>
            <div className="product-page__sizes">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn ${selectedSize === s ? "size-btn--active" : ""}`}
                  onClick={() => { setSelectedSize(s); setSizeError(false); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="product-page__ctas">
            <button className="btn btn--whatsapp btn--full btn--lg" onClick={handleWhatsApp}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Commander sur WhatsApp
            </button>
            <button className="btn btn--outline btn--full" onClick={handleAddToCart}>
              + Ajouter au panier
            </button>
          </div>

          {/* Trust badges */}
          <div className="product-page__trust">
            <span>✅ Qualité garantie</span>
            <span>📦 Emballage soigné</span>
            <span>🔄 Retours faciles</span>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section" style={{ marginTop: "5rem" }}>
          <div className="section__header">
            <h2 className="section__title">Vous aimerez aussi</h2>
          </div>
          <div className="products-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onClick={(prod) => { onNavigate("product", prod); }} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}