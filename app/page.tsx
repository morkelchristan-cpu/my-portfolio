'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Next.js', icon: 'Ⓝ' }
];

export default function Home() {
  const [text, setText] = useState('');
  const fullText = "Full-stack Developer";
  
  // Typing animation effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-screen flex flex-col items-center justify-center text-white cursor-custom">
      <img src="/pfp.jpg" className="w-32 h-32 rounded-full mb-6 border-2 border-white/20" alt="Profile" />
      <h1 className="text-6xl mb-4 font-bold">twizzy</h1>

      {/* Tech Stack Icons with Tooltips */}
      <div className="flex gap-4 bg-white/10 p-4 rounded-full mb-6 border border-white/10">
        {techStack.map((t) => (
          <div key={t.name} className="relative group cursor-custom-pointer">
            <span className="text-2xl">{t.icon}</span>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/80 px-3 py-1 rounded text-sm whitespace-nowrap border border-white/20">
              {t.name}
            </div>
          </div>
        ))}
      </div>

      {/* Typing Animation */}
      <p className="text-3xl mb-8 min-h-[3rem] tracking-wider">{text}<span className="animate-pulse">|</span></p>

      {/* Social Links */}
      <div className="flex gap-10 text-4xl mt-4">
        <a href="https://discord.com" className="cursor-custom-pointer hover:opacity-70 transition">👾</a>
        <a href="https://github.com" className="cursor-custom-pointer hover:opacity-70 transition">🐙</a>
        <a href="https://instagram.com" className="cursor-custom-pointer hover:opacity-70 transition">🌐</a>
      </div>
    </main>
  );
}