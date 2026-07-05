'use client';
import { useState, useRef } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const DISCORD_ID = '590893917587898369';
  const { data } = useSWR(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, fetcher, { refreshInterval: 5000 });
  const audioRef = useRef<HTMLAudioElement>(null);

  const status = data?.data?.discord_status || 'offline';
  const [entered, setEntered] = useState(false); // State to track if user has clicked "enter"

  const enterSite = () => {
    setEntered(true); // Remove the gate screen
    if (audioRef.current) {
      audioRef.current.currentTime = 7.008; // Start at 7s 8ms
      audioRef.current.play();
    }
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative h-screen w-full overflow-hidden text-white">
      {/* Background elements that are always there */}
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* AnimatePresence handles the exit animation of the gate */}
      <AnimatePresence mode="wait">
        {!entered && (
          <motion.div
            key="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }} // Fades out and un-blurs
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl cursor-pointer"
            onClick={enterSite} // Clicking anywhere on the gate plays audio and exits
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl font-extralight tracking-widest text-white/80 select-none"
            >
              click to enter
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Content - shown AFTER entering */}
      {entered && (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="h-full w-full"
        >
          {/* Hero Section */}
          <section className="h-screen flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-10 text-center w-80 shadow-2xl"
            >
              <div className="relative inline-block mb-4">
                <img src="/pfp.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white/20" />
                <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-black ${status === 'online' ? 'bg-green-500' : status === 'idle' ? 'bg-yellow-500' : status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'}`} />
              </div>
              <h1 className="text-3xl font-bold mb-2">Chris.io</h1>
              <p className="text-sm opacity-90 mb-6">full-stack developer.</p>
              <div className="flex justify-center gap-6 text-2xl mb-8">
                <span>👾</span><span>🐙</span><span>🌐</span>
              </div>
              <button onClick={scrollToAbout} className="bg-white/30 hover:bg-white/40 px-6 py-2 rounded-full transition text-sm font-bold">
                About Me
              </button>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="h-screen flex items-center justify-center p-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-10 max-w-2xl text-center shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-6">Introduction</h2>
              <div className="text-lg opacity-90 space-y-4">
                <p>I am a full-stack developer dedicated to building high-performance infrastructure for FiveM roleplay communities.</p>
                <p>My work involves creating robust Discord automation tools, managing complex server databases, and developing custom web portals like ZHPD Nexus.</p>
              </div>
            </motion.div>
          </section>
        </motion.div>
      )}
    </main>
  );
}