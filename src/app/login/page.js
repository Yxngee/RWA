"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.role === "manager") router.push("/manager");
    else router.push("/dashboard");
  }

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h5">Login</Typography>

      <TextField label="Email" fullWidth sx={{ mt: 2 }}
        onChange={(e) => setEmail(e.target.value)} />

      <TextField label="Password" type="password" fullWidth sx={{ mt: 2 }}
        onChange={(e) => setPassword(e.target.value)} />

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}

