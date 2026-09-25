import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding-invite-teal-one.vercel.app"),

  title: "Kavindi & Gamindu | Wedding Invitation",

  description:
      "You are warmly invited to celebrate the wedding of Kavindi & Gamindu.",

  authors: [
    {
      name: "Kavindi & Gamindu",
    },
  ],

  openGraph: {
    title: "Kavindi & Gamindu | Wedding Invitation",
    description:
        "You are warmly invited to celebrate the wedding of Kavindi & Gamindu.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/couple2.png",
        width: 1200,
        height: 630,
        alt: "Kavindi & Gamindu Wedding Invitation",
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
      </html>
  );
}