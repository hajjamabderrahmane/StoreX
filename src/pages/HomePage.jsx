import { useEffect, useRef, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=90",
    title: "New Season",
    subtitle: "Streetwear Premium — Casablanca",
    cta: "Shop Now",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90",
    title: "Fresh Drops",
    subtitle: "Limitées. Exclusives. Inoubliables.",
    cta: "Voir la Collection",
  },
  {
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1600&q=90",
    title: "Elevate Your Style",
    subtitle: "Livraison partout au Maroc 🇲🇦",
    cta: "Commander",
  },
];

const CATEGORIES = [
  { name: "T-Shirts", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80" },
  { name: "Hoodies", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
  { name: "Tracksuits", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { name: "Shoes", img: "https://images.unsplash.com/photo-1556048219-bb6978360b84?w=600&q=80" },
];

const REVIEWS = [
  { name: "Karim M.", rating: 5, text: "Qualité incroyable, livraison rapide. STOREX c'est le meilleur 🔥", location: "Casablanca" },
  { name: "Youssef A.", rating: 5, text: "Les Nike arrivent parfaites, taille exacte. Je recommande à 100%!", location: "Rabat" },
  { name: "Hamza T.", rating: 5, text: "Tracksuit Adidas top qualité. Prix imbattable à Casa.", location: "Marrakech" },
  { name: "Amine R.", rating: 5, text: "Commande facile via WhatsApp, livré le lendemain. 👌", location: "Agadir" },
];

export default function HomePage({ onNavigate, onCategorySelect, onProductClick, onAddToCart }) {
  const [slide, setSlide] = useState(0);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  // Auto-advance hero slides
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (id) => (el) => { sectionRefs.current[id] = el; };

  const featuredProducts = products.filter((p) =>
    ["Best Seller", "Limited", "Hot", "New"].includes(p.badge)
  ).slice(0, 8);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`hero__slide ${i === slide ? "hero__slide--active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__eyebrow">STOREX — Casablanca</p>
          <h1 className="hero__title">{HERO_SLIDES[slide].title}</h1>
          <p className="hero__sub">{HERO_SLIDES[slide].subtitle}</p>
          <div className="hero__ctas">
            <button className="btn btn--primary" onClick={() => onNavigate("shop")}>
              {HERO_SLIDES[slide].cta}
            </button>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noreferrer"
              className="btn btn--whatsapp"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Commander sur WhatsApp
            </a>
          </div>
        </div>
        {/* Slide dots */}
        <div className="hero__dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === slide ? "hero__dot--active" : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <div className="trust-bar">
        <span>🚚 Livraison partout au Maroc</span>
        <span className="trust-bar__sep">|</span>
        <span>⚡ Expédition 24-48h</span>
        <span className="trust-bar__sep">|</span>
        <span>✅ Qualité Premium Garantie</span>
        <span className="trust-bar__sep">|</span>
        <span>💬 Support WhatsApp 7j/7</span>
      </div>

      {/* ===== CATEGORIES ===== */}
      <section
        id="cats"
        ref={ref("cats")}
        className={`section categories-section ${visible.cats ? "section--visible" : ""}`}
      >
        <div className="section__header">
          <h2 className="section__title">Nos Catégories</h2>
          <p className="section__sub">Trouve ton style</p>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => onCategorySelect(cat.name)}
            >
              <img src={cat.img} alt={cat.name} className="category-card__img" />
              <div className="category-card__overlay" />
              <div className="category-card__content">
                <h3>{cat.name}</h3>
                <span>Voir →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section
        id="featured"
        ref={ref("featured")}
        className={`section ${visible.featured ? "section--visible" : ""}`}
      >
        <div className="section__header">
          <h2 className="section__title">Best Sellers</h2>
          <p className="section__sub">Les plus demandés cette semaine</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button className="btn btn--outline btn--lg" onClick={() => onNavigate("shop")}>
            Voir tous les produits →
          </button>
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="promo-banner">
        <div className="promo-banner__inner">
          <div className="promo-banner__text">
            <span className="promo-banner__eyebrow">Livraison Express</span>
            <h2>Commandez maintenant,<br />reçu demain 📦</h2>
            <p>Disponible partout au Maroc. Paiement à la livraison.</p>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noreferrer"
              className="btn btn--whatsapp btn--lg"
            >
              Commander sur WhatsApp
            </a>
          </div>
          <div className="promo-banner__image">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
              alt="Delivery"
            />
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section
        id="reviews"
        ref={ref("reviews")}
        className={`section ${visible.reviews ? "section--visible" : ""}`}
      >
        <div className="section__header">
          <h2 className="section__title">Avis Clients</h2>
          <p className="section__sub">Ce que disent nos clients</p>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-card__stars">{"⭐".repeat(r.rating)}</div>
              <p className="review-card__text">"{r.text}"</p>
              <div className="review-card__author">
                <strong>{r.name}</strong>
                <span>{r.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}