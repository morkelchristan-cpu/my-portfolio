'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Your live infrastructure data
const PROJECT_DETAILS = [
  { name: "ZHPD Bot", status: "Active", desc: "Automatic callsign requester, formal complaints, and anonymous reporting system." },
  { name: "Bridger.io", status: "Active", desc: "Manages seamless message/log bridging between multiple Discord servers." },
  { name: "Sentinel", status: "Active", desc: "Officer-focused BOLO system for real-time tracking and dispatch intelligence." },
  { name: "LSPD Punishments", status: "Active", desc: "Automated community moderation and punishment tracking system." },
  { name: "3D Environments", status: "Idle", desc: "Creative 3D modeling and environment rigging experiments." }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="text-white selection:bg-blue-500/30">
      {/* Background Media - Persistent */}
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <div className="fixed inset-0 bg-black/40 -z-10" />
      <audio ref={audioRef} src="/music.mp3" loop />

      {!entered ? (
        // Guard Gate
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xl cursor-pointer" 
             onClick={() => { setEntered(true); audioRef.current?.play(); }}>
          <motion.h1 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} 
                     className="tracking-[0.5em] uppercase text-sm font-light">Click to Enter</motion.h1>
        </div>
      ) : (
        <>
          {/* Nav */}
          <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 flex gap-8 text-[10px] uppercase tracking-[0.2em]">
            {['home', 'about', 'projects', 'socials'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="hover:text-blue-400 transition">{item}</button>
            ))}
          </nav>

          {/* Home */}
          <section id="home" className="h-screen flex flex-col items-center justify-center text-center">
            <img src="/your-profile.gif" className="w-32 h-32 rounded-full mb-8 border border-white/10" alt="Profile" />
            <h1 className="text-8xl font-bold tracking-tighter">Chris.io</h1>
            <p className="mt-6 text-blue-300 font-mono tracking-widest text-sm uppercase">Digital Architect & Streamer</p>
          </section>

          {/* About */}
          <section id="about" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
            <h2 className="text-5xl font-bold mb-12">The Architect.</h2>
            <div className="space-y-8 text-lg opacity-80 leading-relaxed">
              <p>At 18, I am building the digital infrastructure I once dreamed of using. Born in Africa, my journey started with a simple passion for gaming, which evolved into a career in system architecture and automation.</p>
              <p>I believe in "clean code" and "love-first design." Every project I touch is aimed at creating a seamless, glass-themed experience that respects the user's journey. I am a firm believer that the best tools are the ones that disappear—leaving only functionality and elegance.</p>
            </div>
          </section>

          {/* Projects (Live Infrastructure) */}
          <section id="projects" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
            <h2 className="text-5xl font-bold mb-16">Active Infrastructure.</h2>
            <div className="grid gap-8">
              {PROJECT_DETAILS.map(p => (
                <motion.div key={p.name} whileHover={{ x: 10 }} className="p-10 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">{p.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                        {p.status === 'Active' && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />}
                        {p.status === 'Idle' && <span className="text-blue-200">🌙</span>}
                        {p.status}
                    </div>
                  </div>
                  <p className="opacity-70 text-sm leading-loose">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Socials */}
          <section id="socials" className="h-screen flex flex-col justify-center items-center text-center px-10">
            <h2 className="text-sm uppercase tracking-[0.4em] opacity-50 mb-20">Find Me Online</h2>
            <div className="space-y-10">
              {[
                { label: 'Twitch', handle: '@cloudiit_v' },
                { label: 'YouTube', handle: '@cloudiit_V' },
                { label: 'GitHub', handle: 'morkelchristan-cpu' }
              ].map(s => (
                <a key={s.label} href="#" className="block group">
                  <span className="text-6xl font-bold group-hover:text-blue-400 transition">{s.label}</span>
                  <p className="opacity-50 mt-2 tracking-widest">{s.handle}</p>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}