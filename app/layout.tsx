import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css"; // Ensure this imports your Tailwind styles

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chris.io",
  description: "Developer portfolio and community hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Vercel Analytics component to track visitors */}
        <Analytics />
      </body>
    </html>
  );
}