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

// Project status data
const projectStatus = [
  { name: "ZHPD Nexus", status: "Active" },
  { name: "Bot Infrastructure", status: "Updating" },
  { name: "3D Environments", status: "Idle" }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.title = 'Chris.io';
    setTrackIndex(Math.floor(Math.random() * MUSIC_TRACKS.length));
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

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
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); }}>
          <motion.h1 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-3xl tracking-[0.5em] font-light uppercase">Click to Enter</motion.h1>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6 py-20">
          
          {/* HUD: Project Status & Volume */}
          <div className="fixed top-8 right-8 z-50 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 w-72">
            <h4 className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Project Status</h4>
            <div className="space-y-2 mb-6">
              {projectStatus.map((p) => (
                <div key={p.name} className="flex justify-between text-xs">
                  <span className="opacity-70">{p.name}</span>
                  <span className={`font-mono ${p.status === 'Active' ? 'text-green-400' : p.status === 'Updating' ? 'text-yellow-400' : 'text-gray-500'}`}>{p.status}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <span className="text-[10px] opacity-40">VOL</span>
              <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>

          <section id="home" className="min-h-screen flex flex-col items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-10 rounded-[3rem] text-center w-80 shadow-2xl">
              <img src="/your-profile.gif" alt="Profile" className="w-28 h-28 rounded-full mx-auto mb-6 border-2 border-white/10 object-cover" />
              <h1 className="text-4xl font-bold mb-2">Chris.io</h1>
              <p className="text-blue-300 font-mono text-sm h-8">{text}<span className="animate-pulse">|</span></p>
            </motion.div>
          </section>

          {/* ... (Keep other sections as before) */}
        </div>
      )}
    </main>
  );
}