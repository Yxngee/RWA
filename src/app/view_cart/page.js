"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

export default function ViewCartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(existing);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Your Cart
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>€{item.price.toFixed(2)}</TableCell>
                <TableCell>
                  €{(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => removeItem(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {cart.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>Cart is empty.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: €{total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          disabled={cart.length === 0}
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </Paper>
    </Container>
  );
}
