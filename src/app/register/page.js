"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    router.push("/login");
  }

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h5">Register</Typography>

      <TextField label="Email" fullWidth sx={{ mt: 2 }}
        onChange={(e) => setEmail(e.target.value)} />

      <TextField label="Password" type="password" fullWidth sx={{ mt: 2 }}
        onChange={(e) => setPassword(e.target.value)} />

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
}
