import { useState, useEffect, useRef } from "react";
import { products as INITIAL_PRODUCTS } from "../data/products";

const CATEGORIES = ["T-Shirts", "Hoodies", "Tracksuits", "Shoes", "Accessories"];

const emptyForm = {
  name: "", price: "", category: "T-Shirts",
  description: "", badge: "",
  sizes: "", colors: "", image: "", inStock: true,
};

export default function AdminPage() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem("storex_products");
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [visible, setVisible] = useState(false);
  const nextId = useRef(Date.now());

  useEffect(() => {
    localStorage.setItem("storex_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm(emptyForm);
    setModal({ mode: "add" });
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || "",
      badge: product.badge || "",
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes || "",
      colors: Array.isArray(product.colors) ? product.colors.join(", ") : product.colors || "",
      image: Array.isArray(product.images) ? product.images[0] : product.image || "",
      inStock: product.inStock ?? true,
    });
    setModal({ mode: "edit", id: product.id });
  };

  const closeModal = () => setModal(null);

  const saveProduct = () => {
    if (!form.name.trim() || !form.price) return;
    const shaped = {
      ...form,
      price: parseFloat(form.price),
      sizes: typeof form.sizes === "string"
        ? form.sizes.split(",").map((s) => s.trim()).filter(Boolean)
        : form.sizes,
      colors: typeof form.colors === "string"
        ? form.colors.split(",").map((c) => c.trim()).filter(Boolean)
        : form.colors,
      badge: form.badge?.trim() || null,
      images: [form.image].filter(Boolean),
      inStock: true,
    };
    if (modal.mode === "add") {
      setProducts((prev) => [...prev, { ...shaped, id: nextId.current++ }]);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === modal.id ? { ...p, ...shaped } : p))
      );
    }
    closeModal();
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const getImage = (p) =>
    (Array.isArray(p.images) ? p.images[0] : p.image) ||
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black:    #0a0a0a;
          --off-black:#111111;
          --charcoal: #1c1c1c;
          --mid:      #2e2e2e;
          --muted:    #888;
          --cream:    #f5f2eb;
          --white:    #ffffff;
          --gold:     #c9a84c;
          --gold-dim: #a8893c;
          --red:      #c0392b;
        }

        body { background: var(--off-black); color: var(--white); font-family: 'DM Sans', sans-serif; }

        /* PAGE */
        .sx-page {
          min-height: 100vh;
          background: var(--off-black);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .sx-page.visible { opacity: 1; transform: translateY(0); }

        /* HEADER */
        .sx-header {
          padding: 48px 56px 32px;
          border-bottom: 1px solid var(--charcoal);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }
        .sx-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .sx-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--white);
          line-height: 1;
        }
        .sx-title span { color: var(--gold); font-style: italic; }
        .sx-meta {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.1em;
          margin-top: 10px;
        }
        .sx-stats { display: flex; gap: 32px; align-items: center; }
        .sx-stat { text-align: right; }
        .sx-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: var(--cream);
          line-height: 1;
        }
        .sx-stat-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--muted);
          text-transform: uppercase;
          margin-top: 4px;
        }
        .sx-divider { width: 1px; height: 40px; background: var(--charcoal); }

        /* GOLD LINE */
        .sx-gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.35;
        }

        /* ACTION BAR */
        .sx-bar {
          padding: 28px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid var(--charcoal);
        }
        .sx-search-wrap { position: relative; flex: 1; max-width: 360px; }
        .sx-search-icon {
          position: absolute;
          left: 16px; top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          font-size: 15px;
          pointer-events: none;
        }
        .sx-search {
          width: 100%;
          background: var(--charcoal);
          border: 1px solid #2a2a2a;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          padding: 12px 16px 12px 42px;
          letter-spacing: 0.03em;
          outline: none;
          transition: border-color 0.2s;
        }
        .sx-search::placeholder { color: var(--muted); }
        .sx-search:focus { border-color: var(--gold); }

        .sx-btn-add {
          background: var(--gold);
          color: var(--black);
          border: none;
          padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
        }
        .sx-btn-add:hover { background: var(--gold-dim); transform: translateY(-1px); }

        /* GRID */
        .sx-grid-section { padding: 40px 56px 64px; }
        .sx-grid-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .sx-grid-label span { color: var(--gold); }
        .sx-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 2px;
        }

        /* CARD */
        .sx-card {
          background: var(--black);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(.25,.8,.25,1), box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
          animation: sxFadeUp 0.5s ease both;
        }
        .sx-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px var(--gold);
          z-index: 2;
        }
        @keyframes sxFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sx-card-img {
          width: 100%; aspect-ratio: 3/4;
          overflow: hidden; background: var(--charcoal);
          position: relative;
        }
        .sx-card-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.6s cubic-bezier(.25,.8,.25,1);
        }
        .sx-card:hover .sx-card-img img { transform: scale(1.06); }

        .sx-badge {
          position: absolute; top: 14px; left: 14px;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--gold);
          color: var(--gold);
          font-size: 9px; letter-spacing: 0.25em;
          text-transform: uppercase; padding: 5px 10px;
          font-family: 'DM Sans', sans-serif;
        }
        .sx-stock-dot {
          position: absolute; top: 14px; right: 14px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #27ae60;
          box-shadow: 0 0 6px rgba(39,174,96,0.7);
        }

        .sx-card-body { padding: 20px 20px 0; }
        .sx-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px; font-weight: 400;
          color: var(--cream); margin-bottom: 6px; line-height: 1.3;
        }
        .sx-card-price {
          font-size: 12px; letter-spacing: 0.08em; color: var(--muted);
        }
        .sx-card-price span {
          color: var(--gold);
          font-family: 'Playfair Display', serif;
          font-size: 16px; margin-right: 2px;
        }
        .sx-card-meta {
          margin-top: 10px;
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .sx-tag {
          background: var(--charcoal);
          font-size: 9px; letter-spacing: 0.15em;
          color: var(--muted); padding: 4px 8px;
          text-transform: uppercase;
        }
        .sx-card-actions {
          display: grid; grid-template-columns: 1fr 1fr;
          border-top: 1px solid #1e1e1e; margin-top: 16px;
        }
        .sx-card-btn {
          background: none; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 13px 0; cursor: pointer;
          transition: color 0.2s, background 0.2s;
          color: var(--muted);
        }
        .sx-card-btn.edit { border-right: 1px solid #1e1e1e; }
        .sx-card-btn.edit:hover { color: var(--cream); background: #181818; }
        .sx-card-btn.del:hover  { color: #e05c5c; background: #1a1010; }

        /* MODAL */
        .sx-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          z-index: 999; padding: 20px;
          animation: sxOverlayIn 0.2s ease;
        }
        @keyframes sxOverlayIn { from { opacity: 0; } to { opacity: 1; } }
        .sx-modal {
          background: var(--off-black);
          border: 1px solid var(--charcoal);
          width: 100%; max-width: 500px;
          max-height: 90vh; overflow-y: auto;
          animation: sxModalIn 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .sx-modal::-webkit-scrollbar { width: 4px; }
        .sx-modal::-webkit-scrollbar-track { background: var(--charcoal); }
        .sx-modal::-webkit-scrollbar-thumb { background: var(--gold); }
        @keyframes sxModalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sx-modal-header {
          padding: 28px 32px 20px;
          border-bottom: 1px solid var(--charcoal);
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; background: var(--off-black); z-index: 1;
        }
        .sx-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 400; color: var(--cream);
        }
        .sx-modal-title em { color: var(--gold); font-style: italic; }
        .sx-modal-close {
          background: none; border: none; color: var(--muted);
          font-size: 22px; cursor: pointer; line-height: 1; padding: 4px;
          transition: color 0.2s;
        }
        .sx-modal-close:hover { color: var(--white); }
        .sx-modal-body {
          padding: 28px 32px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .sx-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .sx-field label {
          display: block; font-size: 9px; letter-spacing: 0.3em;
          color: var(--muted); text-transform: uppercase; margin-bottom: 7px;
        }
        .sx-field input, .sx-field select, .sx-field textarea {
          width: 100%;
          background: var(--charcoal);
          border: 1px solid #2a2a2a;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; padding: 11px 14px;
          outline: none; transition: border-color 0.2s;
          -webkit-appearance: none;
        }
        .sx-field textarea { resize: vertical; min-height: 72px; line-height: 1.5; }
        .sx-field input:focus,
        .sx-field select:focus,
        .sx-field textarea:focus { border-color: var(--gold); }
        .sx-field select option { background: var(--charcoal); }
        .sx-field-hint {
          font-size: 10px; color: #555; margin-top: 5px; letter-spacing: 0.02em;
        }

        .sx-modal-footer {
          padding: 20px 32px 28px;
          display: flex; gap: 12px; justify-content: flex-end;
          border-top: 1px solid var(--charcoal);
        }
        .sx-btn-cancel {
          background: none; border: 1px solid var(--charcoal);
          color: var(--muted); font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 11px 22px; cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .sx-btn-cancel:hover { border-color: var(--muted); color: var(--white); }
        .sx-btn-save {
          background: var(--gold); border: none; color: var(--black);
          font-family: 'DM Sans', sans-serif; font-size: 10px;
          font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase;
          padding: 11px 28px; cursor: pointer; transition: background 0.2s;
        }
        .sx-btn-save:hover { background: var(--gold-dim); }

        /* DELETE CONFIRM */
        .sx-confirm {
          background: var(--off-black);
          border: 1px solid #2a1a1a;
          max-width: 380px; width: 100%;
          padding: 40px 32px; text-align: center;
          animation: sxModalIn 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .sx-confirm-icon { font-size: 30px; color: #e05c5c; margin-bottom: 16px; }
        .sx-confirm-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px; color: var(--cream); margin-bottom: 10px;
        }
        .sx-confirm-sub {
          font-size: 13px; color: var(--muted);
          margin-bottom: 28px; line-height: 1.6;
        }
        .sx-confirm-actions { display: flex; gap: 12px; justify-content: center; }
        .sx-btn-del {
          background: var(--red); border: none; color: var(--white);
          font-family: 'DM Sans', sans-serif; font-size: 10px;
          font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 12px 24px; cursor: pointer; transition: background 0.2s;
        }
        .sx-btn-del:hover { background: #a93226; }

        /* EMPTY */
        .sx-empty { text-align: center; padding: 80px 20px; color: var(--muted); }
        .sx-empty-icon { font-size: 32px; margin-bottom: 16px; opacity: 0.3; }
        .sx-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; color: var(--cream);
          margin-bottom: 8px; opacity: 0.5;
        }

        @media (max-width: 640px) {
          .sx-header  { flex-direction: column; align-items: flex-start; padding: 32px 24px 24px; }
          .sx-bar     { flex-direction: column; align-items: stretch; padding: 20px 24px; }
          .sx-search-wrap { max-width: 100%; }
          .sx-grid-section { padding: 28px 24px 48px; }
          .sx-row     { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className={`sx-page ${visible ? "visible" : ""}`}>

        {/* ── Header ── */}
        <div className="sx-header">
          <div>
            <div className="sx-eyebrow">Management Console</div>
            <div className="sx-title">STOREX <span>Admin</span> Panel</div>
            <div className="sx-meta">SEASON 2025 · EDITORIAL COLLECTION</div>
          </div>
          <div className="sx-stats">
            <div className="sx-stat">
              <div className="sx-stat-val">{products.length}</div>
              <div className="sx-stat-label">Products</div>
            </div>
            <div className="sx-divider" />
            <div className="sx-stat">
              <div className="sx-stat-val">{[...new Set(products.map(p => p.category))].length}</div>
              <div className="sx-stat-label">Categories</div>
            </div>
          </div>
        </div>

        <div className="sx-gold-line" />

        {/* ── Action Bar ── */}
        <div className="sx-bar">
          <div className="sx-search-wrap">
            <span className="sx-search-icon">⌕</span>
            <input
              className="sx-search"
              placeholder="Search products, categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="sx-btn-add" onClick={openAdd}>+ Add Product</button>
        </div>

        {/* ── Grid ── */}
        <div className="sx-grid-section">
          <div className="sx-grid-label">
            Showing <span>{filtered.length}</span> of {products.length} items
          </div>
          {filtered.length === 0 ? (
            <div className="sx-empty">
              <div className="sx-empty-icon">◻</div>
              <div className="sx-empty-title">No products found</div>
              <div>Try a different search or add a new product.</div>
            </div>
          ) : (
            <div className="sx-grid">
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="sx-card"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <div className="sx-card-img">
                    <img src={getImage(p)} alt={p.name} />
                    {p.badge && <div className="sx-badge">{p.badge}</div>}
                    {p.inStock && <div className="sx-stock-dot" title="In Stock" />}
                  </div>
                  <div className="sx-card-body">
                    <div className="sx-card-name">{p.name}</div>
                    <div className="sx-card-price"><span>$</span>{parseFloat(p.price).toLocaleString()}</div>
                    <div className="sx-card-meta">
                      <span className="sx-tag">{p.category}</span>
                      {Array.isArray(p.sizes) && p.sizes.slice(0, 3).map(s => (
                        <span key={s} className="sx-tag">{s}</span>
                      ))}
                      {Array.isArray(p.sizes) && p.sizes.length > 3 && (
                        <span className="sx-tag">+{p.sizes.length - 3}</span>
                      )}
                    </div>
                    <div className="sx-card-actions">
                      <button className="sx-card-btn edit" onClick={() => openEdit(p)}>Edit</button>
                      <button className="sx-card-btn del" onClick={() => setDeleteId(p.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {modal && (
        <div className="sx-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="sx-modal">
            <div className="sx-modal-header">
              <div className="sx-modal-title">
                {modal.mode === "add" ? <>Add <em>New</em> Product</> : <>Edit <em>Product</em></>}
              </div>
              <button className="sx-modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="sx-modal-body">

              <div className="sx-field">
                <label>Product Name</label>
                <input
                  placeholder="e.g. Midnight Cargo Trouser"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="sx-row">
                <div className="sx-field">
                  <label>Price (MAD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 349"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>
                <div className="sx-field">
                  <label>Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="sx-field">
                <label>Image URL</label>
                <input
                  placeholder="https://images.unsplash.com/…"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>

              <div className="sx-field">
                <label>Description</label>
                <textarea
                  placeholder="Short product description…"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="sx-row">
                <div className="sx-field">
                  <label>Sizes</label>
                  <input
                    placeholder="S, M, L, XL"
                    value={form.sizes}
                    onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                  />
                  <div className="sx-field-hint">Comma separated</div>
                </div>
                <div className="sx-field">
                  <label>Colors</label>
                  <input
                    placeholder="Black, White"
                    value={form.colors}
                    onChange={(e) => setForm({ ...form, colors: e.target.value })}
                  />
                  <div className="sx-field-hint">Comma separated</div>
                </div>
              </div>

              <div className="sx-field">
                <label>Badge <span style={{ color: "#444", fontWeight: 300 }}>(optional)</span></label>
                <input
                  placeholder="New · Hot · Limited · Best Seller"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                />
              </div>

            </div>
            <div className="sx-modal-footer">
              <button className="sx-btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="sx-btn-save" onClick={saveProduct}>
                {modal.mode === "add" ? "Publish Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId !== null && (
        <div className="sx-overlay" onClick={(e) => e.target === e.currentTarget && setDeleteId(null)}>
          <div className="sx-confirm">
            <div className="sx-confirm-icon">⚠</div>
            <div className="sx-confirm-title">Remove Product</div>
            <div className="sx-confirm-sub">
              This item will be permanently removed from the collection. This action cannot be undone.
            </div>
            <div className="sx-confirm-actions">
              <button className="sx-btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="sx-btn-del" onClick={() => deleteProduct(deleteId)}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
