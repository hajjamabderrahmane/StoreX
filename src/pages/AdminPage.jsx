import { useState, useEffect, useRef } from "react";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Obsidian Cargo Trouser",
    price: "340",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
  },
  {
    id: 2,
    name: "Ivory Oversized Blazer",
    price: "620",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80",
  },
  {
    id: 3,
    name: "Graphite Utility Vest",
    price: "285",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 4,
    name: "Noir Relaxed Hoodie",
    price: "195",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
  },
  {
    id: 5,
    name: "Cream Wide-Leg Jean",
    price: "310",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
  },
  {
    id: 6,
    name: "Shadow Trench Coat",
    price: "890",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
  },
];

const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"];

const emptyForm = { name: "", price: "", image: "", category: "Tops" };

export default function StorexAdmin() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem("storex_products");
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', data }
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [visible, setVisible] = useState(false);
  const nextId = useRef(100);

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
    setForm({ name: product.name, price: product.price, image: product.image, category: product.category });
    setModal({ mode: "edit", id: product.id });
  };

  const closeModal = () => setModal(null);

  const saveProduct = () => {
    if (!form.name.trim() || !form.price.trim()) return;
    if (modal.mode === "add") {
      setProducts((prev) => [...prev, { ...form, id: nextId.current++ }]);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === modal.id ? { ...p, ...form } : p))
      );
    }
    closeModal();
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black: #0a0a0a;
          --off-black: #111111;
          --charcoal: #1c1c1c;
          --mid: #2e2e2e;
          --muted: #888;
          --cream: #f5f2eb;
          --white: #ffffff;
          --gold: #c9a84c;
          --gold-dim: #a8893c;
          --gold-glow: rgba(201,168,76,0.18);
        }

        body { background: var(--off-black); color: var(--white); font-family: 'DM Sans', sans-serif; }

        .page {
          min-height: 100vh;
          background: var(--off-black);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .page.visible { opacity: 1; transform: translateY(0); }

        /* ── HEADER ── */
        .header {
          padding: 48px 56px 32px;
          border-bottom: 1px solid var(--charcoal);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }
        .header-left {}
        .header-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .header-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--white);
          line-height: 1;
        }
        .header-title span { color: var(--gold); font-style: italic; }
        .header-meta {
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 0.08em;
          margin-top: 10px;
        }
        .header-stats {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .stat {
          text-align: right;
        }
        .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 400;
          color: var(--cream);
          line-height: 1;
        }
        .stat-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--muted);
          text-transform: uppercase;
          margin-top: 4px;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--charcoal);
        }

        /* ── ACTION BAR ── */
        .action-bar {
          padding: 28px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid var(--charcoal);
        }
        .search-wrap {
          position: relative;
          flex: 1;
          max-width: 360px;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          font-size: 14px;
          pointer-events: none;
        }
        .search-input {
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
        .search-input::placeholder { color: var(--muted); }
        .search-input:focus { border-color: var(--gold); }

        .btn-add {
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
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .btn-add:hover { background: var(--gold-dim); transform: translateY(-1px); }
        .btn-add:active { transform: translateY(0); }

        /* ── GRID ── */
        .grid-section { padding: 40px 56px 64px; }
        .grid-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .grid-label span { color: var(--gold); }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2px;
        }

        /* ── CARD ── */
        .card {
          background: var(--black);
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: transform 0.3s cubic-bezier(.25,.8,.25,1), box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
          animation: fadeUp 0.5s ease both;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px var(--gold);
          z-index: 2;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-img-wrap {
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--charcoal);
          position: relative;
        }
        .card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.25,.8,.25,1);
          display: block;
        }
        .card:hover .card-img-wrap img { transform: scale(1.06); }

        .card-category-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--gold);
          color: var(--gold);
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 5px 10px;
          font-family: 'DM Sans', sans-serif;
        }

        .card-body { padding: 20px 20px 16px; }
        .card-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 400;
          color: var(--cream);
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .card-price {
          font-size: 12px;
          letter-spacing: 0.1em;
          color: var(--muted);
          font-weight: 300;
        }
        .card-price span {
          color: var(--gold);
          font-size: 16px;
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          margin-right: 3px;
        }

        .card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid #1e1e1e;
          margin-top: 16px;
        }
        .card-btn {
          background: none;
          border: none;
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 0;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .card-btn:hover.edit { color: var(--cream); background: #181818; }
        .card-btn:hover.del  { color: #e05c5c; background: #1a1010; }
        .card-btn.edit { border-right: 1px solid #1e1e1e; }

        /* ── MODAL OVERLAY ── */
        .overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: overlayIn 0.25s ease;
          padding: 20px;
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .modal {
          background: var(--off-black);
          border: 1px solid var(--charcoal);
          width: 100%;
          max-width: 480px;
          animation: modalIn 0.3s cubic-bezier(.34,1.56,.64,1);
          position: relative;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-header {
          padding: 28px 32px 20px;
          border-bottom: 1px solid var(--charcoal);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 400;
          color: var(--cream);
        }
        .modal-title em { color: var(--gold); font-style: italic; }
        .modal-close {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 20px;
          cursor: pointer;
          line-height: 1;
          padding: 4px;
          transition: color 0.2s;
        }
        .modal-close:hover { color: var(--white); }
        .modal-body { padding: 28px 32px; display: flex; flex-direction: column; gap: 18px; }

        .field label {
          display: block;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .field input, .field select {
          width: 100%;
          background: var(--charcoal);
          border: 1px solid #2a2a2a;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          padding: 12px 14px;
          outline: none;
          transition: border-color 0.2s;
          -webkit-appearance: none;
        }
        .field input:focus, .field select:focus { border-color: var(--gold); }
        .field select { cursor: pointer; background-image: none; }
        .field select option { background: var(--charcoal); }

        .modal-footer {
          padding: 20px 32px 28px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          border-top: 1px solid var(--charcoal);
        }
        .btn-cancel {
          background: none;
          border: 1px solid var(--charcoal);
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 11px 24px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-cancel:hover { border-color: var(--muted); color: var(--white); }
        .btn-save {
          background: var(--gold);
          border: none;
          color: var(--black);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 11px 28px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-save:hover { background: var(--gold-dim); }

        /* ── DELETE CONFIRM ── */
        .confirm-modal {
          background: var(--off-black);
          border: 1px solid #2a1a1a;
          max-width: 380px;
          width: 100%;
          padding: 36px 32px;
          text-align: center;
          animation: modalIn 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .confirm-icon {
          font-size: 32px;
          margin-bottom: 16px;
          color: #e05c5c;
        }
        .confirm-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--cream);
          margin-bottom: 10px;
        }
        .confirm-sub {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 28px;
          line-height: 1.6;
        }
        .confirm-actions { display: flex; gap: 12px; justify-content: center; }
        .btn-del-confirm {
          background: #c0392b;
          border: none;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 24px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-del-confirm:hover { background: #a93226; }

        /* ── EMPTY STATE ── */
        .empty {
          text-align: center;
          padding: 80px 20px;
          color: var(--muted);
        }
        .empty-icon { font-size: 36px; margin-bottom: 16px; opacity: 0.4; }
        .empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: var(--cream);
          margin-bottom: 8px;
          opacity: 0.6;
        }

        /* ── GOLD LINE DECORATOR ── */
        .gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.4;
        }

        @media (max-width: 640px) {
          .header { flex-direction: column; align-items: flex-start; padding: 32px 24px 24px; }
          .action-bar { flex-direction: column; align-items: stretch; padding: 20px 24px; }
          .search-wrap { max-width: 100%; }
          .grid-section { padding: 28px 24px 48px; }
        }
      `}</style>

      <div className={`page ${visible ? "visible" : ""}`}>

        {/* Header */}
        <div className="header">
          <div className="header-left">
            <div className="header-eyebrow">Management Console</div>
            <div className="header-title">STOREX <span>Admin</span> Panel</div>
            <div className="header-meta">SEASON 2025 · EDITORIAL COLLECTION</div>
          </div>
          <div className="header-stats">
            <div className="stat">
              <div className="stat-val">{products.length}</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-val">{[...new Set(products.map(p => p.category))].length}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>

        <div className="gold-line" />

        {/* Action bar */}
        <div className="action-bar">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              placeholder="Search products, categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-add" onClick={openAdd}>+ Add Product</button>
        </div>

        {/* Grid */}
        <div className="grid-section">
          <div className="grid-label">
            Showing <span>{filtered.length}</span> of {products.length} items
          </div>
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">◻</div>
              <div className="empty-title">No products found</div>
              <div>Try a different search or add a new product.</div>
            </div>
          ) : (
            <div className="grid">
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="card-img-wrap">
                    <img src={p.image || "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80"} alt={p.name} />
                    <div className="card-category-badge">{p.category}</div>
                  </div>
                  <div className="card-body">
                    <div className="card-name">{p.name}</div>
                    <div className="card-price"><span>$</span>{parseFloat(p.price).toLocaleString()}</div>
                    <div className="card-actions">
                      <button className="card-btn edit" onClick={() => openEdit(p)}>Edit</button>
                      <button className="card-btn del" onClick={() => setDeleteId(p.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                {modal.mode === "add" ? <>Add <em>New</em> Product</> : <>Edit <em>Product</em></>}
              </div>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="field">
                <label>Product Name</label>
                <input
                  placeholder="e.g. Midnight Cargo Trouser"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Price (USD)</label>
                <input
                  type="number"
                  placeholder="e.g. 340"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Image URL</label>
                <input
                  placeholder="https://…"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-save" onClick={saveProduct}>
                {modal.mode === "add" ? "Publish Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setDeleteId(null)}>
          <div className="confirm-modal">
            <div className="confirm-icon">⚠</div>
            <div className="confirm-title">Remove Product</div>
            <div className="confirm-sub">
              This item will be permanently removed from the collection. This action cannot be undone.
            </div>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-del-confirm" onClick={() => deleteProduct(deleteId)}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}