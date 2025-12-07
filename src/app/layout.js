import './globals.css';

export const metadata = {
  title: "McDonald's Ordering App",
  description: "Order McDonald's food online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
