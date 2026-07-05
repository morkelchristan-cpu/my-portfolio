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
<section id="about" className="min-h-screen flex flex-col items-center justify-center p-10 gap-6">
  
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-6">
    <h2 className="text-5xl font-bold mb-2">Hi, I'm Chris.</h2>
    <p className="text-xl opacity-70 italic">Discord Developer & Community Architect</p>
  </motion.div>

  {/* 6-Block Grid */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
    {[
      { title: "Why Discord Dev", text: "I specialize in creating robust bot ecosystems that streamline management for high-traffic LEO communities.", color: "text-blue-300" },
      { title: "My Journey", text: "Starting in 2024, I set out to replace manual administrative tasks with automated, high-performance logic.", color: "text-green-300" },
      { title: "Technical Stack", text: "I utilize Node.js for backend automation, seamlessly integrating with web portals like ZHPD Nexus.", color: "text-yellow-300" },
      { title: "Continuous Growth", text: "I am constantly evolving my codebase, refining ticketing systems, and optimizing BOLO monitoring logic.", color: "text-purple-300" },
      { title: "Design Philosophy", text: "I believe that community tools should be as aesthetically pleasing as they are functional.", color: "text-pink-300" },
      { title: "Collaborations", text: "I enjoy building tools that solve real-world problems for friends and community leaders alike.", color: "text-indigo-300" }
    ].map((block, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, scale: 0.9 }} 
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl"
      >
        <h3 className={`text-xl font-bold mb-3 ${block.color}`}>{block.title}</h3>
        <p className="text-sm opacity-80 leading-relaxed">{block.text}</p>
      </motion.div>
    ))}
  </div>
</section>
    </main>
  );
}
