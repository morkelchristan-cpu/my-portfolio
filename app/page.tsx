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
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [entered, phraseIndex, charIndex, isDeleting]);

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="h-screen w-full overflow-hidden text-white cursor-custom">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio ref={audioRef} src={MUSIC_TRACKS[trackIndex].path} />

      {!entered ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl cursor-pointer" onClick={() => { setEntered(true); setIsPlaying(true); audioRef.current?.play(); }}>
          <motion.h1 
            animate={{ opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl tracking-[0.5em] font-light uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          >
            Click to Enter
          </motion.h1>
        </div>
      ) : (
        <>
          <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-48 text-center shadow-2xl">
            <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Now Playing</p>
            <p className="font-bold text-sm mb-3">{MUSIC_TRACKS[trackIndex].name}</p>
            <button onClick={togglePlay} className="hover:text-blue-300 transition">{isPlaying ? "Pause" : "Play"}</button>
          </div>

          <div className="fixed top-6 right-6 z-40 flex gap-4">
            {['Home', 'About', 'Projects', 'Socials'].map(s => (
              <button key={s} onClick={() => setActiveSection(s)} className="text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition">{s}</button>
            ))}
          </div>

          <div className="h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeSection === 'Home' && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 text-center w-80 shadow-2xl">
                  <img src="/your-profile.gif" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border border-white/10 object-cover" />
                  <h1 className="text-4xl font-bold mb-2">Chris.io</h1>
                  <p className="text-lg h-8 mb-6">{text}<span className="animate-pulse">|</span></p>
                  <div className="flex justify-center gap-6 mt-4">
                    <a href="https://discord.com/users/590893917587898369" target="_blank"><img src="/discord.png" className="w-8 h-8 opacity-70 hover:opacity-100" /></a>
                    <a href="https://github.com/morkelchristan-cpu" target="_blank"><img src="/github.png" className="w-8 h-8 opacity-70 hover:opacity-100" /></a>
                  </div>
                </motion.div>
              )}
              
              {activeSection === 'About' && (
                <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white/5 p-8 rounded-3xl max-w-lg text-center backdrop-blur-md border border-white/10">
                  <h2 className="text-3xl font-bold mb-4">About</h2>
                  <p className="opacity-80">18-year-old developer from Africa. Architecting the future of community management and web experiences.</p>
                </motion.div>
              )}

              {activeSection === 'Projects' && (
                <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <h2 className="text-4xl font-bold mb-8">Projects</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">ZHPD Nexus</div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">Bot Ecosystems</div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'Socials' && (
                <motion.div key="socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                  <a href="https://www.youtube.com/@cloudiit_V" className="bg-white/5 p-6 rounded-2xl border border-white/10 text-xl font-bold">YouTube</a>
                  <a href="https://twitch.tv/cloudiit_v" className="bg-white/5 p-6 rounded-2xl border border-white/10 text-xl font-bold">Twitch</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </main>
  );
}