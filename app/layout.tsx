import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "LogiCore - Global Logistics Partner",
  description:
    "Premium freight, air, and sea transport solutions for your business.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "LogiCore - Global Logistics Partner",
    description:
      "Premium freight, air, and sea transport solutions for your business.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LogiCore",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
