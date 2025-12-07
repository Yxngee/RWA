"use client";

import { useEffect, useState } from "react";

export default function ViewCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  function remove(index) {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 40 }}>
      <h1>Your Cart</h1>

      {cart.map((c, i) => (
        <div key={i}>
          {c.title} — €{c.price}
          <button onClick={() => remove(i)}>Remove</button>
        </div>
      ))}

      <h2>Total: €{total.toFixed(2)}</h2>

      <a href="/checkout">Proceed to Checkout</a>
    </div>
  );
}
