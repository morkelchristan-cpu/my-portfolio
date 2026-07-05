'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techStack = [
  { name: 'Discord Dev', icon: '/dev.png' },
  { name: 'VsCode.js', icon: '/vscode.png' },
  { name: 'Next.js', icon: '/nextjs.png' }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [text, setText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const phrases = ["building cool stuff on the web.", "discord.", "17 y/o from Canada"];
  
  useEffect(() => {
    if (!entered) return;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      setText(isDeleting ? currentPhrase.substring(0, charIndex - 1) : currentPhrase.substring(0, charIndex + 1));
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(type, isDeleting ? 50 : 100);
    };
    type();
  }, [entered]);

  const enterSite = () => {
    setEntered(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 7.008;
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }, 100);
  };

  return (
    <main className="h-screen w-full overflow-y-auto text-white cursor-custom scroll-smooth">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio ref={audioRef} loop src="/music.mp3" preload="auto" />

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

      {/* Page 1: Original Layout */}
      <section className="h-screen flex items-center justify-center">
        {entered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 text-center w-80 shadow-2xl"
          >
            <img src="/pfp.jpg" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border border-white/10" />
            <h1 className="text-4xl font-bold mb-2">Chris.io</h1>
            
            <div className="flex justify-center gap-3 bg-white/5 p-2 rounded-full mb-4 w-fit mx-auto border border-white/5">
              {techStack.map((t) => (
                <div key={t.name} className="relative group cursor-custom-pointer">
                  <img src={t.icon} alt={t.name} className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap border border-white/20 pointer-events-none">
                    {t.name}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-lg h-8 mb-6 opacity-90">{text}<span className="animate-pulse">|</span></p>

            <div className="flex justify-center gap-6 text-2xl">
              <a href="https://discord.com/users/590893917587898369" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition"><img src="/discord.png" className="w-6 h-6" /></a>
              <a href="https://github.com/morkelchristan-cpu" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition"><img src="/github.png" className="w-6 h-6" /></a>
            </div>
          </motion.div>
        )}
      </section>

      {/* Page 2: Professional Introduction */}
      <section id="about" className="h-screen flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 max-w-3xl shadow-2xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-2">Hi, I'm Chris.</h2>
            <p className="text-xl opacity-70 italic">Full-Stack Developer & Community Architect</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-2 text-blue-300">Why I Develop</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                I started in 2024 to solve complex community management issues. I build automation tools for LEO roleplay servers because I believe high-performance code makes for better communities.
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-2 text-purple-300">Continuous Growth</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                I am always learning. Currently, I am deepening my knowledge in Next.js and backend integrations to ensure my tools—like ZHPD Nexus—remain industry-leading.
              </p>
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm opacity-60"
          >
            Feel free to reach out via Discord or GitHub if you'd like to collaborate or chat.
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}