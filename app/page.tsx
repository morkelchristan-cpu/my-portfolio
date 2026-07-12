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
  const [activeSection, setActiveSection] = useState('Home');
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
    <main className="h-screen w-full overflow-hidden text-white cursor-custom bg-black">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10 opacity-50" src="/Background1.mp4" />
      <audio ref={audioRef} src={MUSIC_TRACKS[trackIndex].path} />

      {!entered ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); setIsPlaying(true); }}>
          <h1 className="text-4xl tracking-widest font-light">click to enter</h1>
        </div>
      ) : (
        <>
          {/* Top-Right Music UI (Fixed) */}
          <div className="fixed top-6 right-6 z-40 glass p-4 rounded-2xl w-64 text-center">
            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Now Playing</p>
            <p className="font-bold text-sm mb-2">{MUSIC_TRACKS[trackIndex].name}</p>
            <button onClick={togglePlay} className="text-xs hover:text-blue-300 transition">{isPlaying ? "Pause" : "Play"}</button>
          </div>

          {/* Navigation */}
          <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6">
            {['Home', 'About', 'Projects', 'Connect'].map(sec => (
              <button key={sec} onClick={() => setActiveSection(sec)} className={`text-sm uppercase tracking-widest transition ${activeSection === sec ? 'text-blue-400' : 'opacity-50 hover:opacity-100'}`}>
                {sec}
              </button>
            ))}
          </nav>

          <div className="h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeSection === 'Home' && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass rounded-[2rem] p-10 text-center w-80">
                  <img src="/your-profile.gif" alt="PFP" className="w-24 h-24 rounded-full mx-auto mb-4 border border-white/10" />
                  <h1 className="text-4xl font-bold mb-2">Chris.io</h1>
                  <p className="text-lg h-8 mb-6">{text}<span className="animate-pulse">|</span></p>
                </motion.div>
              )}
              {activeSection === 'About' && (
                <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass p-8 rounded-3xl max-w-lg text-center">
                  <h2 className="text-3xl font-bold mb-4">About</h2>
                  <p>18-year-old developer from Africa. I specialize in bot development, web architecture, and 3D modeling.</p>
                </motion.div>
              )}
              {activeSection === 'Projects' && (
                <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xl text-center">
                  <h2 className="text-3xl font-bold mb-6">Current Projects</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-xl"><h3>ZHPD Nexus</h3></div>
                    <div className="glass p-4 rounded-xl"><h3>Blender Assets</h3></div>
                  </div>
                </motion.div>
              )}
              {activeSection === 'Connect' && (
                <motion.div key="connect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-80 flex flex-col gap-4">
                  <a href="https://www.youtube.com/@cloudiit_V" className="glass p-4 rounded-xl hover:bg-white/10 transition">YouTube</a>
                  <a href="https://twitch.tv/cloudiit_" className="glass p-4 rounded-xl hover:bg-white/10 transition">Twitch</a>
                  <a href="https://discord.com/users/590893917587898369" className="glass p-4 rounded-xl hover:bg-white/10 transition">Discord</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </main>
  );
}