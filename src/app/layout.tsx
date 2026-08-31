import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ngo Ngoc Nguyen - Full Stack Developer Portfolio",
  description: "Portfolio of Ngo Ngoc Nguyen, Web Full Stack Developer with 2 years of experience in React, Next.js, Node.js, Python, and AI-powered systems.",
  icons: {
    icon: "/images/Anh.jpeg",
    shortcut: "/images/Anh.jpeg",
    apple: "/images/Anh.jpeg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
