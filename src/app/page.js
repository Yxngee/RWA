"use client";

import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Box sx={{ p: 5, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome to McDonald's Online Ordering
      </Typography>

      <Button variant="contained" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button
        variant="outlined"
        sx={{ ml: 2 }}
        onClick={() => router.push("/register")}
      >
        Register
      </Button>
    </Box>
  );
}
