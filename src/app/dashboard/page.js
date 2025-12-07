"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((d) => setProducts(d.products));
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src="/images/mcd_logo.png"
          alt="McDonald's Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <h1 style={{ color: "#D32F2F" }}>Welcome to McDonald's</h1>
      </div>

      <h2 style={{ marginTop: 30 }}>🍔 Menu</h2>

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            background: "white",
          }}
        >
          <img
            src={p.image}
            alt={p.title}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "10px",
              marginRight: "20px",
            }}
          />

          <div style={{ flexGrow: 1 }}>
            <h3>{p.title}</h3>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>€{p.price}</p>
          </div>

          <button
            style={{
              padding: "10px 20px",
              background: "#D32F2F",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
