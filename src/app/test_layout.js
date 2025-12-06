'use client'
import "./globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#fbc02d" }, // McD-ish yellow
    secondary: { main: "#d32f2f" }, // red
  },
});

export const metadata = {
  title: "McDonald's Orders App",
  description: "Customer ordering and manager dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

