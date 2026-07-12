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
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10 brightness-[0.25]" src="/Background1.mp4" />

      {!entered ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); }}>
          <h1 className="text-2xl font-light tracking-[0.4em] uppercase opacity-70 hover:opacity-100 transition">Enter</h1>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6 py-20">
          
          {/* Main Profile Block */}
          <section id="home" className="flex justify-center mb-32">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-8 rounded-[2rem] text-center w-72 shadow-2xl">
              <img src="/your-profile.gif" alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-5 border border-white/10" />
              <h1 className="text-2xl font-bold mb-3 tracking-tight">Chris.io</h1>
              
              <div className="flex justify-center gap-2 mb-5">
                {techStack.map((t) => (
                  <div key={t.name} className="group relative bg-white/5 p-2 rounded-lg border border-white/5">
                    <img src={t.icon} alt={t.name} className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
              
              <p className="text-sm font-mono opacity-60 h-6 mb-6">{text}<span className="animate-pulse">|</span></p>
              
              <div className="flex justify-center gap-4 pt-4 border-t border-white/5">
                <a href="https://discord.com/users/590893917587898369" target="_blank"><img src="/discord.png" className="w-6 h-6 opacity-50 hover:opacity-100 transition" /></a>
                <a href="https://github.com/morkelchristan-cpu" target="_blank"><img src="/github.png" className="w-6 h-6 opacity-50 hover:opacity-100 transition" /></a>
              </div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-32">
            <h3 className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-10">Architecting Ecosystems</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Mission", desc: "Automating administrative logic for high-traffic LEO communities." },
                { title: "Stack", desc: "Expertise in Next.js, Supabase, and advanced Node.js architecture." }
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.05]">
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm opacity-50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects & Socials */}
          <section id="footer" className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.05]">
              <h4 className="text-sm uppercase tracking-widest opacity-40 mb-6">Current Projects</h4>
              <ul className="space-y-4 text-sm opacity-70">
                <li>• ZHPD Nexus Portal</li>
                <li>• Bot Ecosystem Development</li>
                <li>• 3D Asset Rigging</li>
              </ul>
            </div>
            <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.05]">
              <h4 className="text-sm uppercase tracking-widest opacity-40 mb-6">Socials</h4>
              <div className="flex gap-4">
                <a href="https://www.youtube.com/@cloudiit_V" className="text-sm hover:text-red-400 transition">YouTube</a>
                <a href="https://twitch.tv/cloudiit_v" className="text-sm hover:text-purple-400 transition">Twitch</a>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}