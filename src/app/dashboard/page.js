"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Paper,
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  textAlign: "center"
}));

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [weather, setWeather] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadProducts();
    loadWeather();
  }, []);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products);
  }

  async function loadWeather() {
    const res = await fetch("/api/weather");
    const data = await res.json();
    setWeather(data);
  }

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((i) => i._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Weather Bar */}
      <Item>
        {weather ? (
          <>
            <Typography variant="h6">Weather in Dublin</Typography>
            <Typography>
              {Math.round(weather.main.temp)}°C – {weather.weather[0].description}
            </Typography>
          </>
        ) : (
          "Loading weather..."
        )}
      </Item>

      {/* Menu Title */}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="h5">Menu</Typography>
        <Button variant="outlined" onClick={() => router.push("/view_cart")}>
          View Cart
        </Button>
      </Stack>

      {/* Product Grid */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Card>
              <CardMedia component="img" height="160" image={p.imageUrl} />

              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography>{p.description}</Typography>
                <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                  €{p.price.toFixed(2)}
                </Typography>
              </CardContent>

              <CardActions>
                <Button variant="contained" onClick={() => addToCart(p)}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
