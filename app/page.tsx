'use client';
import { useState, useRef } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // REPLACE 'YOUR_DISCORD_ID_HERE' with your actual 18-digit ID
  const DISCORD_ID = 'YOUR_DISCORD_ID_HERE'; 
  const { data } = useSWR(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, fetcher, { refreshInterval: 5000 });
  
  const status = data?.data?.discord_status || 'offline';

  const enterSite = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 7.008;
      audioRef.current.play();
    }
  };

  return (
    <main className="h-screen w-full overflow-y-auto text-white cursor-custom">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio ref={audioRef} loop src="/music.mp3" />

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 text-center w-80 shadow-2xl"
        >
          <div className="relative inline-block mb-4">
            <img src="/pfp.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white/20 mx-auto" />
            <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-black ${
              status === 'online' ? 'bg-green-500' : 'bg-gray-500'
            }`} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Chris.io</h1>
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Introduction</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Full-stack developer specializing in FiveM infrastructure, Discord automation, and custom web portals like ZHPD Nexus. 
            I build to solve complex community management problems with clean, high-performance code.
          </p>
        </motion.div>
      </section>
    </main>
  );
}