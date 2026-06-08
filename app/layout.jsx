import "./globals.css";

export const metadata = {
  title: "Kai Perez — Technical Operator",
  description: "Kai Perez technical operator portfolio site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
