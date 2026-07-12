'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techStack = [
  { name: 'Discord Dev', icon: '/dev.png' },
  { name: 'VsCode.js', icon: '/vscode.png' },
  { name: 'Next.js', icon: '/nextjs.png' }
];

const PHRASES = ["building immersive web experiences.", "automating discord communities.", "18 y/o developer from Africa."];
const MUSIC_TRACKS = [
  { name: "I like the way you kiss me", path: "/music.mp3" },
  { name: "Dakati", path: "/dakati.mp3" }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!entered) return;
    const timer = setTimeout(() => {
      const currentPhrase = PHRASES[phraseIndex];
      if (isDeleting) {
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) { setIsDeleting(false); setPhraseIndex((prev) => (prev + 1) % PHRASES.length); }
      } else {
        setText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentPhrase.length) setTimeout(() => setIsDeleting(true), 1500);
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [entered, phraseIndex, charIndex, isDeleting]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10 brightness-[0.2]" src="/Background1.mp4" />
      
      {!entered ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
            <h1 className="text-2xl font-light tracking-[0.6em] uppercase opacity-80 hover:opacity-100 transition-opacity">Click to enter portal</h1>
          </motion.div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6 py-20">
          <audio ref={audioRef} src={MUSIC_TRACKS[0].path} loop />

          {/* Hero Profile */}
          <section className="flex flex-col items-center mb-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <img src="/your-profile.gif" alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-8 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
              <h1 className="text-5xl font-bold mb-4">Chris.io</h1>
              <p className="text-blue-400 font-mono text-lg">{text}<span className="animate-pulse">_</span></p>
            </motion.div>
          </section>

          {/* Featured Works with Content */}
          <section id="projects" className="mb-32">
            <h3 className="text-xs uppercase tracking-[0.3em] opacity-50 mb-10">Featured Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "ZHPD Nexus", desc: "Advanced LEO management portal." },
                { title: "Bot Ecosystem", desc: "Automated high-traffic Discord logic." },
                { title: "3D Assets", desc: "Complex mesh & rigging experiments." }
              ].map((p, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl h-64 flex flex-col justify-end backdrop-blur-md">
                  <h4 className="font-bold text-xl">{p.title}</h4>
                  <p className="text-sm opacity-50 mt-2">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Socials & Status */}
          <section id="socials" className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/[0.03] p-10 rounded-3xl border border-white/5">
              <h3 className="text-xs uppercase tracking-[0.3em] opacity-50 mb-8">Stay Connected</h3>
              <div className="space-y-4">
                <a href="https://www.youtube.com/@cloudiit_V" className="block text-2xl font-light hover:text-red-400 transition">YouTube</a>
                <a href="https://twitch.tv/cloudiit_v" className="block text-2xl font-light hover:text-purple-400 transition">Twitch</a>
              </div>
            </div>
            
            <div className="bg-white/[0.03] p-10 rounded-3xl border border-white/5">
              <h3 className="text-xs uppercase tracking-[0.3em] opacity-50 mb-8">Live Status</h3>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm opacity-70">Currently developing new bot features.</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}