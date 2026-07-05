'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techStack = [
  { name: 'Discord Dev', icon: '/dev.png' },
  { name: 'VsCode.js', icon: '/vscode.png' },
  { name: 'Next.jr', icon: '/nextjs.png' }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [text, setText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const fullText = "Full-stack Developer";

  // Typing Animation
  useEffect(() => {
    if (entered) {
      let i = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [entered]);

  const enterSite = () => {
    setEntered(true);
    // Reliable audio trigger
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 7.008;
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }, 100);
  };

  return (
    <main className="h-screen w-full overflow-y-auto text-white cursor-custom">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio ref={audioRef} loop src="/music.mp3" preload="auto" />

      {/* Gate Screen */}
      <AnimatePresence>
        {!entered && (
          <motion.div 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl cursor-custom-pointer" 
            onClick={enterSite}
          >
            <h1 className="text-4xl tracking-widest font-light">click to enter</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 text-center w-80 shadow-2xl"
        >
          <img src="/pfp.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white/20 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">twizzy</h1>

          {/* Tech Stack Icons */}
          <div className="flex justify-center gap-4 bg-white/10 p-4 rounded-full mb-6 border border-white/10">
            {techStack.map((t) => (
              <div key={t.name} className="relative group cursor-custom-pointer">
                <img src={t.icon} alt={t.name} className="w-8 h-8 object-contain" />
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/80 px-3 py-1 rounded text-sm whitespace-nowrap border border-white/20">
                  {t.name}
                </div>
              </div>
            ))}
          </div>

          <p className="text-2xl mb-6 h-8">{text}<span className="animate-pulse">|</span></p>

          {/* Social Links */}
          <div className="flex justify-center gap-8 text-4xl mb-6">
            <a href="https://discord.com/users/590893917587898369" target="_blank" rel="noopener noreferrer" className="cursor-custom-pointer hover:opacity-70 transition">
              <img src="/discord.png" alt="Discord" className="w-10 h-10" />
            </a>
            <a href="https://github.com/morkelchristan-cpu" target="_blank" rel="noopener noreferrer" className="cursor-custom-pointer hover:opacity-70 transition">
              <img src="/github.png" alt="GitHub" className="w-10 h-10" />
            </a>
          </div>

          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} 
            className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition cursor-custom-pointer"
          >
            About Me
          </button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex items-center justify-center p-10">
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 max-w-2xl text-center shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6">Introduction</h2>
          <p className="text-xl leading-relaxed">
            Full-stack developer specializing in FiveM infrastructure, Discord automation, and custom web portals like ZHPD Nexus. 
            I build to solve complex community management problems with clean, high-performance code.
          </p>
        </motion.div>
      </section>
    </main>
  );
}