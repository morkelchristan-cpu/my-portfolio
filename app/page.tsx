'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techStack = [
  { name: 'Discord Dev', icon: '/dev.png' },
  { name: 'VsCode.js', icon: '/vscode.png' },
  { name: 'Next.js', icon: '/nextjs.png' }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('Home');
  const [entered, setEntered] = useState(false);
  const [visitors, setVisitors] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/chris-io/visits/?count=1')
      .then(res => res.json())
      .then(data => setVisitors(data.count))
      .catch(() => setVisitors(100));
  }, []);

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="h-screen w-full overflow-hidden text-white cursor-custom bg-black">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10 opacity-40" src="/Background1.mp4" />
      <audio ref={audioRef} src="/music.mp3" loop />

      {!entered ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl cursor-pointer" onClick={() => { setEntered(true); audioRef.current?.play(); setIsPlaying(true); }}>
          <h1 className="text-4xl tracking-widest font-light hover:scale-105 transition">click to enter</h1>
        </div>
      ) : (
        <>
          {/* Top Right UI */}
          <div className="fixed top-6 right-6 z-40 flex flex-col gap-4">
            <div className="glass p-4 rounded-2xl w-64 text-center">
              <p className="text-[10px] uppercase tracking-widest opacity-60">Now Playing</p>
              <p className="font-bold text-sm">Music Track</p>
              <button onClick={togglePlay} className="text-xs mt-2 opacity-70 hover:opacity-100">{isPlaying ? "Pause" : "Play"}</button>
            </div>
            <div className="glass p-2 px-4 rounded-2xl text-center text-xs opacity-70">
              {visitors} total views
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6">
            {['Home', 'About', 'Projects', 'Connect'].map(sec => (
              <button key={sec} onClick={() => setActiveSection(sec)} className={`text-sm uppercase tracking-widest transition ${activeSection === sec ? 'text-blue-400' : 'opacity-50 hover:opacity-100'}`}>
                {sec}
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <div className="h-full flex items-center justify-center p-20">
            <AnimatePresence mode="wait">
              {activeSection === 'Home' && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <img src="/your-profile.gif" alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 border border-white/10 object-cover" />
                  <h1 className="text-6xl font-bold">Chris.io</h1>
                </motion.div>
              )}

              {activeSection === 'About' && (
                <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xl text-center glass p-8 rounded-3xl">
                  <h2 className="text-3xl font-bold mb-4">Who I Am</h2>
                  <p className="opacity-80">18-year-old developer from Africa. Passionate about automated digital ecosystems and high-traffic communities.</p>
                </motion.div>
              )}
              
              {activeSection === 'Projects' && (
                <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl text-center">
                  <h2 className="text-4xl font-bold mb-8">Projects & Games</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-6 rounded-2xl"><h3>Web Portals</h3><p className="text-sm opacity-70">Developing ZHPD Nexus</p></div>
                    <div className="glass p-6 rounded-2xl"><h3>Blender</h3><p className="text-sm opacity-70">Vehicle mesh rigging</p></div>
                  </div>
                  <p className="mt-8 opacity-60">Games I enjoy: Valorant, GTA V, Minecraft</p>
                </motion.div>
              )}

              {activeSection === 'Connect' && (
                <motion.div key="connect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-80">
                  <h2 className="text-4xl font-bold mb-8">Connect</h2>
                  <div className="flex flex-col gap-4">
                    <a href="https://www.youtube.com/@cloudiit_V" target="_blank" className="glass p-4 rounded-2xl hover:bg-white/10 transition">YouTube</a>
                    <a href="https://twitch.tv/cloudiit_" target="_blank" className="glass p-4 rounded-2xl hover:bg-white/10 transition">Twitch</a>
                    <a href="https://discord.com/users/590893917587898369" target="_blank" className="glass p-4 rounded-2xl hover:bg-white/10 transition">Discord</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </main>
  );
}