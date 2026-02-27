import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Created with Flux",
  description: "High-performance visionary website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
