'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---
const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none w-6 h-6 border border-blue-400 rounded-full flex items-center justify-center hidden md:flex"
      animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
    >
      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
    </motion.div>
  );
};

// --- Data ---
const PROJECT_DETAILS = [
  { name: "ZHPD Bot", status: "Active", desc: "Automatic callsign requester, formal complaints, and anonymous reporting system." },
  { name: "Bridger.io", status: "Active", desc: "Manages seamless message/log bridging between multiple Discord servers." },
  { name: "Sentinel", status: "Active", desc: "Officer-focused BOLO system for real-time tracking and dispatch intelligence." },
  { name: "LSPD Punishments", status: "Active", desc: "Automated community moderation and punishment tracking system." },
  { name: "3D Environments", status: "Idle", desc: "Creative 3D modeling and environment rigging experiments." }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="text-white selection:bg-blue-500/30 overflow-x-hidden cursor-none">
      <CustomCursor />
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <div className="fixed inset-0 bg-black/60 -z-10" />
      <audio ref={audioRef} src="/music.mp3" loop />

      {!entered ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-3xl cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); }}>
          <motion.h1 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="tracking-[0.8em] uppercase text-xs font-light">Click to Access Secure Terminal</motion.h1>
        </div>
      ) : (
        <>
          <div className="fixed top-8 right-8 z-50 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 w-48 shadow-2xl">
            <span className="text-[9px] opacity-40 uppercase tracking-widest mb-2 block">Audio Volume</span>
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolume} className="w-full h-1 accent-blue-500 cursor-pointer" />
          </div>

          <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 flex gap-8 text-[10px] uppercase tracking-[0.2em] shadow-2xl">
            {['home', 'about', 'projects', 'socials'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="hover:text-blue-400 transition">{item}</button>
            ))}
          </nav>

          <section id="home" className="h-screen flex flex-col items-center justify-center text-center">
            <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src="/your-profile.gif" className="w-40 h-40 rounded-full mb-8 border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.3)]" alt="Profile" />
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-8xl font-bold tracking-tighter">Chris.io</motion.h1>
            <div className="flex gap-4 mt-6">
              {['Java.script', 'Next.js', 'Discord.js', 'Blender'].map(badge => (
                <span key={badge} className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] tracking-widest uppercase text-blue-300">{badge}</span>
              ))}
            </div>
            <p className="mt-6 text-blue-300/50 font-mono tracking-widest text-sm uppercase">Digital Architect</p>
          </section>

          <section id="about" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-6xl font-bold mb-20">The Architect.</motion.h2>
            <div className="space-y-20">
              {[
                { title: "The Origin", text: "At 18, I am building the digital infrastructure I once dreamed of using. Born in Africa, my journey started with a simple passion for gaming, which evolved into a career in system architecture and automation." },
                { title: "Why I Build", text: "I believe great software is more than just code—it's about solving real problems through thoughtful design. If it isn't intuitive and visually elegant, it isn't finished." },
                { title: "Technical Focus", text: "My expertise lies in Discord development, Next.js, and high-concurrency Node.js environments. I specialize in building custom bots that bridge manual administration gaps with performance." },
                { title: "Future Vision", text: "I am constantly pushing the boundaries of what is possible on the web, experimenting with 3D environments and crafting automated ecosystems that stand the test of time." }
              ].map((item, i) => (
                <motion.div key={i} initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">{item.title}</h3>
                  <p className="text-lg opacity-70 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="projects" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
            <h2 className="text-6xl font-bold mb-16">Active Infrastructure.</h2>
            <div className="grid gap-6">
              {PROJECT_DETAILS.map(p => (
                <motion.div key={p.name} whileHover={{ scale: 1.02 }} className="p-10 bg-white/[0.03] backdrop-blur-lg border border-white/5 rounded-[2rem] hover:border-blue-500/20 transition">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">{p.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase bg-white/5 px-4 py-2 rounded-full">
                        {p.status === 'Active' && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                        {p.status}
                    </div>
                  </div>
                  <p className="opacity-60 text-md leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="socials" className="h-screen flex flex-col justify-center items-center text-center px-10">
            <h2 className="text-sm uppercase tracking-[0.4em] opacity-40 mb-20">Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              {[{ label: 'Twitch', desc: 'Live Coding' }, { label: 'YouTube', desc: 'Dev Vids' }, { label: 'GitHub', desc: 'Open Source' }].map(s => (
                <motion.a key={s.label} whileHover={{ y: -10 }} href="#" className="p-12 bg-white/5 border border-white/5 rounded-3xl hover:border-blue-500/50 transition">
                  <span className="text-4xl font-bold block hover:text-blue-400">{s.label}</span>
                  <span className="text-[10px] opacity-40 uppercase tracking-widest mt-6 block">{s.desc}</span>
                </motion.a>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}