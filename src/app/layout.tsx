import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { StoreProvider } from "@/lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuxeStyle - Modern E-Commerce",
  description: "Discover premium fashion and accessories with our curated collection. Shop the latest trends in clothing, footwear, and accessories.",
  keywords: ["fashion", "ecommerce", "clothing", "accessories", "shopping"],
  authors: [{ name: "LuxeStyle Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "LuxeStyle - Modern E-Commerce",
    description: "Discover premium fashion and accessories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeStyle - Modern E-Commerce",
    description: "Discover premium fashion and accessories",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
