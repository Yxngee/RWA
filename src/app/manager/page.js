"use client";

import { useEffect, useState } from "react";

export default function ManagerDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/manager/stats")
      .then((res) => res.json())
      .then((d) => setStats(d));
  }, []);

  if (!stats) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Manager Dashboard</h1>

      <h3>Total Orders: {stats.totalOrders}</h3>
      <h3>Total Revenue: €{stats.totalRevenue.toFixed(2)}</h3>

      <h2>Orders List</h2>

      {stats.orders.map((o) => (
        <div key={o._id} style={{ marginBottom: 20 }}>
          <b>Order ID:</b> {o._id} <br />
          <b>Date:</b> {new Date(o.createdAt).toLocaleString()} <br />
          <b>Total:</b> €{o.total.toFixed(2)} <br />
          <b>Items:</b>
          <ul>
            {o.items.map((i, idx) => (
              <li key={idx}>
                {i.title} — €{i.price} (x{i.quantity || 1})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
