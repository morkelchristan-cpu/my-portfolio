'use client';
import { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Replace with your real 18-digit ID
  const DISCORD_ID = 'YOUR_DISCORD_ID_HERE'; 
  const { data } = useSWR(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, fetcher, { refreshInterval: 5000 });

  const status = data?.data?.discord_status || 'offline';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const enterSite = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 7.008;
      audioRef.current.play();
    }
  };

  return (
    <main className="h-screen w-full overflow-hidden text-white cursor-none">
      {/* Mouse Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white/20 blur-xl pointer-events-none z-[9999]"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
      />

      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* Gate Screen */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl cursor-pointer"
            onClick={enterSite}
          >
            <h1 className="text-6xl tracking-widest text-white/90">click to enter</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio (Visible after enter) */}
      {entered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <section className="h-screen flex flex-col items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-10 text-center w-80 shadow-2xl">
              <div className="relative inline-block mb-4">
                <img src="/pfp.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white/20" />
                <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-black ${
                  status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>
              <h1 className="text-4xl font-bold mb-2">Chris.io</h1>
              <p className="text-xl opacity-90 mb-6">full-stack developer.</p>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/30 px-6 py-2 rounded-full">About Me</button>
            </div>
          </section>

          <section id="about" className="h-screen flex items-center justify-center p-10">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-10 max-w-2xl text-center">
              <h2 className="text-4xl font-bold mb-6">Introduction</h2>
              <p>I am a full-stack developer focusing on FiveM infrastructure and Discord automation, ensuring high-performance community management.</p>
            </div>
          </section>
        </motion.div>
      )}
    </main>
  );
}