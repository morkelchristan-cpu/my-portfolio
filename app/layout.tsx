import { Caveat } from 'next/font/google';
import './globals.css';

const cursive = Caveat({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cursive.className} cursor-custom`}>{children}</body>
    </html>
  );
}