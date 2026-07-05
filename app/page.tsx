'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'Discord Dev', icon: '/dev.png' },
  { name: 'VsCode.js', icon: '/vscode.png' },
  { name: 'Next.js', icon: '/nextjs.png' }
];

const PHRASES = ["building cool stuff on the web.", "discord.", "17 y/o from Canada"];

function runTypeEffect(
  phraseIndex: number, 
  charIndex: number, 
  isDeleting: boolean, 
  setText: (text: string) => void
) {
  const currentPhrase = PHRASES[phraseIndex];
  if (isDeleting) {
    setText(currentPhrase.substring(0, charIndex - 1));
    if (charIndex - 1 === 0) {
      setTimeout(() => runTypeEffect((phraseIndex + 1) % PHRASES.length, 0, false, setText), 500);
    } else {
      setTimeout(() => runTypeEffect(phraseIndex, charIndex - 1, true, setText), 50);
    }
  } else {
    setText(currentPhrase.substring(0, charIndex + 1));
    if (charIndex + 1 === currentPhrase.length) {
      setTimeout(() => runTypeEffect(phraseIndex, currentPhrase.length, true, setText), 1500);
    } else {
      setTimeout(() => runTypeEffect(phraseIndex, charIndex + 1, false, setText), 100);
    }
  }
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [text, setText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (entered) runTypeEffect(0, 0, false, setText);
  }, [entered]);

  const enterSite = () => {
    setEntered(true);
    audioRef.current?.play().catch(e => console.error(e));
  };

  return (
    <main className="h-screen w-full overflow-y-auto text-white scroll-smooth cursor-custom">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio ref={audioRef} loop src="/music.mp3" preload="auto" />

      {!entered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl cursor-pointer" onClick={enterSite}>
          <h1 className="text-4xl tracking-widest font-light">click to enter</h1>
        </div>
      )}

      {entered && (
        <>
          <nav className="fixed top-0 w-full z-40 flex justify-center p-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex gap-8">
              {['Home', 'About'].map((item) => (
                <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-300 transition-colors font-medium">
                  {item}
                </button>
              ))}
            </div>
          </nav>

          <section id="home" className="h-screen flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 text-center w-80 shadow-2xl">
              <img src="/pfp.jpg" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border border-white/10" />
              <h1 className="text-4xl font-bold mb-2">Chris.io</h1>
              <div className="flex justify-center gap-3 bg-white/5 p-2 rounded-full mb-4 w-fit mx-auto border border-white/5">
                {techStack.map((t) => (
                  <div key={t.name} className="relative group cursor-pointer">
                    <img src={t.icon} alt={t.name} className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/80 px-3 py-1 rounded text-xs whitespace-nowrap border border-white/20 pointer-events-none">
                      {t.name}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-lg h-8 mb-6">{text}<span className="animate-pulse">|</span></p>
            </motion.div>
          </section>

          <section id="about" className="min-h-screen p-20 flex flex-col items-center">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-6xl font-bold mb-16">The Developer Profile</motion.h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-7xl">
              <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-white/5 p-8 rounded-3xl backdrop-blur-lg border border-white/10">
                <h3 className="text-3xl font-bold mb-6 text-blue-300">My Philosophy</h3>
                <p className="leading-relaxed opacity-80">I architect ecosystems. From optimizing BOLO logging in FiveM to full-stack portals, my goal is to shave seconds off admin workflows.</p>
              </motion.div>
              <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-white/5 p-8 rounded-3xl backdrop-blur-lg border border-white/10">
                <h3 className="text-3xl font-bold mb-6 text-green-300">Current Focus</h3>
                <ul className="space-y-4 opacity-80">
                  <li>🚀 <b>ZHPD Nexus</b>: Next-gen police operations portal.</li>
                  <li>🤖 <b>Bot Infrastructure</b>: High-uptime Node.js automation.</li>
                  <li>🎨 <b>3D Assets</b>: Environment design in Blender.</li>
                </ul>
              </motion.div>
            </div>
          </section>

          <footer className="fixed bottom-0 w-full p-6 flex justify-center gap-6 z-40">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="/discord.png" alt="Discord" className="w-8 h-8 opacity-70 hover:opacity-100" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <img src="/github.png" alt="GitHub" className="w-8 h-8 opacity-70 hover:opacity-100" />
            </a>
          </footer>
        </>
      )}
    </main>
  );
}