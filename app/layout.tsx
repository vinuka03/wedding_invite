import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kavindi & Gamindu | Wedding Invitation",
  description: "A wedding invitation for Kavindi and Gamindu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
