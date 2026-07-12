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
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Typewriter effect
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
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [entered, phraseIndex, charIndex, isDeleting]);

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause(); else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="h-screen w-full overflow-y-auto scroll-smooth text-white cursor-crosshair selection:bg-blue-500/30">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10 brightness-[0.3]" src="/Background1.mp4" />
      <audio ref={audioRef} src={MUSIC_TRACKS[trackIndex].path} />

      {!entered ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); setIsPlaying(true); }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-thin tracking-[0.2em] uppercase">Enter Portal</motion.h1>
          <p className="mt-4 opacity-50 text-sm">click anywhere</p>
        </div>
      ) : (
        <div className="px-6 md:px-20">
          {/* Floating HUD */}
          <div className="fixed top-8 right-8 z-40 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl w-64 shadow-2xl hover:border-white/20 transition-all">
            <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 mb-2">System Audio</p>
            <p className="font-semibold text-sm truncate">{MUSIC_TRACKS[trackIndex].name}</p>
            <button onClick={togglePlay} className="mt-4 text-xs bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition">{isPlaying ? "Pause Stream" : "Resume Stream"}</button>
          </div>

          <section id="home" className="h-screen flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[3rem] text-center w-[350px] shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all">
              <div className="absolute inset-0 rounded-[3rem] border border-white/5 group-hover:border-blue-500/30 transition-colors" />
              <img src="/your-profile.gif" alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white/5 shadow-2xl" />
              <h1 className="text-5xl font-bold mb-2 tracking-tight">Chris.io</h1>
              <p className="text-blue-300/80 font-mono text-sm h-8 mt-4">{text}<span className="animate-pulse">_</span></p>
            </motion.div>
          </section>

          <section id="about" className="py-20">
            <h2 className="text-7xl font-bold mb-16 ml-4">Architect.</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Core Focus", text: "Automating LEO community ecosystems with high-performance bot logic.", color: "border-blue-500/30" },
                { title: "Design Aesthetic", text: "Glassmorphism, deep blue tones, and minimalist cloud-themed UI.", color: "border-indigo-500/30" },
                { title: "Tech Stack", text: "Next.js, Supabase, and advanced Node.js architecture.", color: "border-purple-500/30" }
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} className={`bg-white/5 p-8 rounded-3xl border ${item.color} backdrop-blur-xl`}>
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="opacity-60 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="projects" className="py-20">
            <h2 className="text-7xl font-bold mb-16 ml-4 text-right">Projects.</h2>
            <div className="space-y-6">
              {['ZHPD Nexus Portal', 'Automated Bot Ecosystems', '3D Asset Manipulation'].map((p, i) => (
                <motion.div key={i} whileHover={{ scale: 1.01 }} className="bg-white/5 border border-white/5 p-10 rounded-[2rem] flex justify-between items-center backdrop-blur-lg group">
                  <span className="text-3xl font-light">{p}</span>
                  <span className="opacity-30 group-hover:opacity-100 transition-opacity">VIEW PROJECT →</span>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="socials" className="py-20 text-center mb-20">
            <h2 className="text-8xl font-bold mb-20 tracking-tighter">Stay Connected</h2>
            <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
              <a href="https://www.youtube.com/@cloudiit_V" className="bg-white/5 hover:bg-red-500/20 transition-all p-12 rounded-[2rem] border border-white/5">YouTube</a>
              <a href="https://twitch.tv/cloudiit_v" className="bg-white/5 hover:bg-purple-500/20 transition-all p-12 rounded-[2rem] border border-white/5">Twitch</a>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}