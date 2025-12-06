export const metadata = {
  title: "McDonald's Ordering App",
  description: "Order McDonald's menu items online"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
