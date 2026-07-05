import { Inter } from 'next/font/google';
import './globals.css';

const mainFont = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} cursor-custom`}>{children}</body>
    </html>
  );
}