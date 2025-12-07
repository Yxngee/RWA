"use client";

import { useEffect, useState } from "react";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  async function placeOrder() {
    const total = cart.reduce((s, i) => s + i.price, 0);

    await fetch("/api/orders/create", {
      method: "POST",
      body: JSON.stringify({
        items: cart,
        total
      }),
    });

    alert("Order placed!");
    localStorage.removeItem("cart");
    window.location.href = "/dashboard";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Checkout</h1>

      <button onClick={placeOrder}>Confirm Order</button>
    </div>
  );
}
