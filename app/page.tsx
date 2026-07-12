'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const PROJECT_DETAILS = [
  { name: "ZHPD Bot", status: "Active", desc: "Automatic callsign requester, formal complaints, and anonymous reporting system." },
  { name: "Bridger.io", status: "Active", desc: "Manages seamless message/log bridging between multiple Discord servers." },
  { name: "Sentinel", status: "Active", desc: "Officer-focused BOLO system for real-time tracking and dispatch intelligence." },
  { name: "LSPD Punishments", status: "Active", desc: "Automated community moderation and punishment tracking system." },
  { name: "3D Environments", status: "Idle", desc: "Creative 3D modeling and environment rigging experiments." }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="text-white selection:bg-blue-500/30">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <div className="fixed inset-0 bg-black/50 -z-10" />
      <audio ref={audioRef} src="/music.mp3" loop />

      {!entered ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-3xl cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); }}>
          <motion.h1 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="tracking-[0.5em] uppercase text-sm font-light">Click to Enter</motion.h1>
        </div>
      ) : (
        <>
          {/* HUD: Persistent Volume & Nav */}
          <div className="fixed top-8 right-8 z-50 flex flex-col gap-4">
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 w-48">
              <span className="text-[9px] opacity-40 uppercase tracking-widest mb-2 block">Audio Volume</span>
              <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolume} className="w-full h-1 accent-blue-500 cursor-pointer" />
            </div>
          </div>

          <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 flex gap-8 text-[10px] uppercase tracking-[0.2em]">
            {['home', 'about', 'projects', 'socials'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="hover:text-blue-400 transition">{item}</button>
            ))}
          </nav>

          {/* Home Section with Badges */}
          <section id="home" className="h-screen flex flex-col items-center justify-center text-center">
            <img src="/your-profile.gif" className="w-32 h-32 rounded-full mb-6 border border-white/10" alt="Profile" />
            <h1 className="text-7xl font-bold tracking-tighter">Chris.io</h1>
            {/* Badges */}
            <div className="flex gap-3 mt-4">
              {['Discord Dev', 'Fullstack', '3D Artist'].map(badge => (
                <span key={badge} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] tracking-widest uppercase text-blue-300">{badge}</span>
              ))}
            </div>
            <p className="mt-6 text-blue-300/50 font-mono tracking-widest text-sm uppercase">Digital Architect</p>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
            <h2 className="text-5xl font-bold mb-12">The Architect.</h2>
            <div className="space-y-8 text-lg opacity-80 leading-relaxed">
              <p>At 18, I am building the digital infrastructure I once dreamed of using. My work is defined by performance, clean architecture, and a love-first approach to UI.</p>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
            <h2 className="text-5xl font-bold mb-16">Active Infrastructure.</h2>
            <div className="grid gap-8">
              {PROJECT_DETAILS.map(p => (
                <motion.div key={p.name} whileHover={{ x: 10 }} className="p-8 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase bg-white/5 px-3 py-1 rounded-full">
                        {p.status === 'Active' && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                        {p.status}
                    </div>
                  </div>
                  <p className="opacity-60 text-sm">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Socials Page: Pro Style */}
          <section id="socials" className="h-screen flex flex-col justify-center items-center text-center px-10">
            <h2 className="text-sm uppercase tracking-[0.4em] opacity-40 mb-20">Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { label: 'Twitch', desc: 'Live Coding' },
                { label: 'YouTube', desc: 'Dev Logs' },
                { label: 'GitHub', desc: 'Open Source' }
              ].map(s => (
                <a key={s.label} href="#" className="p-10 bg-white/5 border border-white/5 rounded-3xl hover:border-blue-500/50 transition group">
                  <span className="text-3xl font-bold block group-hover:text-blue-400">{s.label}</span>
                  <span className="text-[10px] opacity-30 uppercase tracking-widest mt-4 block">{s.desc}</span>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}