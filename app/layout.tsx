import { Dancing_Script } from 'next/font/google';
import './globals.css';

const cursive = Dancing_Script({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cursive.className}>{children}</body>
    </html>
  );
}