'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techStack = [
  { name: 'Discord Dev', icon: '/dev.png' },
  { name: 'VsCode.js', icon: '/vscode.png' },
  { name: 'Next.js', icon: '/nextjs.png' }
];

const PHRASES = ["building cool stuff on the web.", "discord.", "18 y/o from Africa"];
const MUSIC_TRACKS = [
  { name: "I like the way you kiss me", path: "/music.mp3" },
  { name: "Dakati", path: "/dakati.mp3" }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.title = 'Chris.io';
    setTrackIndex(Math.floor(Math.random() * MUSIC_TRACKS.length));
  }, []);

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
    <main className="h-screen w-full overflow-y-auto scroll-smooth text-white selection:bg-blue-500/30">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10 brightness-[0.25]" src="/Background1.mp4" />
      <audio ref={audioRef} src={MUSIC_TRACKS[trackIndex].path} />

      {!entered ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); setIsPlaying(true); }}>
          <motion.h1 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-3xl tracking-[0.5em] font-light uppercase">Click to Enter</motion.h1>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6 py-20">
          
          {/* Main Hero & Profile */}
          <section id="home" className="min-h-screen flex flex-col items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-10 rounded-[3rem] text-center w-80 shadow-2xl">
              <img src="/your-profile.gif" alt="Profile" className="w-28 h-28 rounded-full mx-auto mb-6 border-2 border-white/10 object-cover" />
              <h1 className="text-4xl font-bold mb-2">Chris.io</h1>
              <p className="text-blue-300 font-mono text-sm h-8">{text}<span className="animate-pulse">|</span></p>
              
              <div className="flex justify-center gap-3 mt-6">
                {techStack.map((t) => (
                  <div key={t.name} className="bg-white/5 p-3 rounded-xl border border-white/5"><img src={t.icon} className="w-5 h-5 opacity-70" /></div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Detailed Story Section */}
          <section id="about" className="py-32">
            <h2 className="text-sm uppercase tracking-[0.4em] text-blue-400 mb-12">My Story</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-4xl font-bold mb-6">Born to build, <br />raised by code.</h3>
                <p className="opacity-60 leading-loose">At 18, I've transformed from a curious teenager in Africa to a digital architect. I don't just write scripts; I build ecosystems that manage thousands of users seamlessly.</p>
              </div>
              <div className="space-y-6">
                <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition">
                  <h4 className="font-bold mb-2">The Vision</h4>
                  <p className="text-sm opacity-50">Bridging the gap between manual administration and high-performance automation.</p>
                </div>
                <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition">
                  <h4 className="font-bold mb-2">The Approach</h4>
                  <p className="text-sm opacity-50">Everything I build is glass-themed, data-driven, and designed for maximum scalability.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Project Showcase */}
          <section id="projects" className="py-32">
            <h2 className="text-sm uppercase tracking-[0.4em] text-blue-400 mb-12">Featured Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['ZHPD Nexus', 'Bot Infrastructure', '3D Environments'].map((p, i) => (
                <div key={i} className="h-64 bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col justify-end group hover:bg-white/[0.05] transition">
                  <span className="text-xl font-bold">{p}</span>
                  <span className="text-xs opacity-40 uppercase tracking-widest mt-2">Active Project</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}