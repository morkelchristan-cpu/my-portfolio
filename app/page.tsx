'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

// --- Expanded Content Data ---
const PROJECT_DETAILS = [
  { name: "ZHPD Nexus", status: "Active", desc: "An enterprise-grade Discord portal designed for massive community scaling. It features automated role management and real-time incident logging." },
  { name: "Bot Infrastructure", status: "Updating", desc: "A robust back-end ecosystem built with Node.js to bridge manual administration gaps with high-performance automation." },
  { name: "3D Environments", status: "Idle", desc: "A personal creative project exploring Blender-based 3D modeling for immersive visual environments and character rigs." }
];

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-black text-white selection:bg-blue-500/30 font-sans" ref={scrollRef}>
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10 brightness-[0.2]" src="/Background1.mp4" />

      {/* Persistent Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 flex gap-8 text-[10px] uppercase tracking-[0.2em]">
        {['home', 'about', 'projects', 'socials'].map(item => (
          <button key={item} onClick={() => scrollTo(item)} className="hover:text-blue-400 transition">{item}</button>
        ))}
      </nav>

      {/* 1. Home Section */}
      <section id="home" className="h-screen flex flex-col items-center justify-center text-center">
        <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src="/your-profile.gif" className="w-32 h-32 rounded-full mb-8 border border-white/10" />
        <h1 className="text-8xl font-bold tracking-tighter">Chris.io</h1>
        <p className="mt-6 text-blue-300 font-mono tracking-widest text-sm uppercase">Digital Architect & Streamer</p>
      </section>

      {/* 2. About Section */}
      <section id="about" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
        <h2 className="text-5xl font-bold mb-12">The Architect.</h2>
        <div className="space-y-8 text-lg opacity-60 leading-relaxed">
          <p>At 18, I am building the digital infrastructure I once dreamed of using. Born in Africa, my journey started with a simple passion for gaming, which evolved into a career in system architecture and automation.</p>
          <p>I believe in "clean code" and "love-first design." Every project I touch is aimed at creating a seamless, glass-themed experience that respects the user's journey. I am a firm believer that the best tools are the ones that disappear—leaving only functionality and elegance.</p>
          <p>My expertise lies in Discord development, Next.js, and high-concurrency Node.js environments. When I'm not coding, I am diving deep into 3D modeling in Blender to push the boundaries of what is visually possible on the web.</p>
        </div>
      </section>

      {/* 3. Projects Section */}
      <section id="projects" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
        <h2 className="text-5xl font-bold mb-16">Active Works.</h2>
        <div className="grid gap-8">
          {PROJECT_DETAILS.map(p => (
            <div key={p.name} className="p-10 bg-white/[0.02] border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{p.name}</h3>
                <span className="text-[10px] px-3 py-1 bg-white/5 rounded-full">{p.status}</span>
              </div>
              <p className="opacity-50 text-sm leading-loose">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Socials Section */}
      <section id="socials" className="h-screen flex flex-col justify-center items-center text-center px-10">
        <h2 className="text-sm uppercase tracking-[0.4em] opacity-40 mb-20">Find Me Online</h2>
        <div className="space-y-10">
          {[
            { label: 'Twitch', handle: '@cloudiit_v' },
            { label: 'YouTube', handle: '@cloudiit_V' },
            { label: 'GitHub', handle: 'morkelchristan-cpu' }
          ].map(s => (
            <a key={s.label} href="#" className="block group">
              <span className="text-6xl font-bold group-hover:text-blue-400 transition">{s.label}</span>
              <p className="opacity-30 mt-2 tracking-widest">{s.handle}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}