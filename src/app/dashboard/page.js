"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [weather, setWeather] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((d) => setProducts(d.products));

    fetch("/api/weather")
      .then((res) => res.json())
      .then((d) => setWeather(d));
  }, []);

  function addToCart(item) {
    const saved = [...cart, item];
    setCart(saved);
    localStorage.setItem("cart", JSON.stringify(saved));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Customer Dashboard</h1>

      {weather && (
        <p>
          <b>Weather:</b> {weather.main.temp}°C — {weather.weather[0].description}
        </p>
      )}

      <h2>Menu</h2>

      {products.map((p) => (
        <div key={p._id} style={{ marginBottom: 20 }}>
          <b>{p.title}</b> — €{p.price}
          <br />
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
