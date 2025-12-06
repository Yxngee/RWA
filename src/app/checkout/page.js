"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
} from "@mui/material";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(existing);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmOrder = async () => {
    setError("");
    setSuccess(false);

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Order failed");
      return;
    }
    setSuccess(true);
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Checkout
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">Order placed! Check your email.</Alert>
        )}
        <List>
          {cart.map((item) => (
            <ListItem key={item._id}>
              <ListItemText
                primary={`${item.title} x ${item.quantity}`}
                secondary={`€${item.price.toFixed(2)} each`}
              />
            </ListItem>
          ))}
          {cart.length === 0 && (
            <Typography>Your cart is empty.</Typography>
          )}
        </List>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: €{total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          disabled={cart.length === 0}
          onClick={confirmOrder}
        >
          Confirm Order
        </Button>
      </Paper>
    </Container>
  );
}
