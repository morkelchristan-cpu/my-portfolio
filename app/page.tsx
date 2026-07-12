'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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

function runTypeEffect(
  phraseIndex: number,
  charIndex: number,
  isDeleting: boolean,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setPhraseIndex: React.Dispatch<React.SetStateAction<number>>,
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
  setCharIndex: React.Dispatch<React.SetStateAction<number>>
) {
  const currentPhrase = PHRASES[phraseIndex];
  if (isDeleting) {
    setText(currentPhrase.substring(0, charIndex - 1));
    setCharIndex(charIndex - 1);
    if (charIndex - 1 === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }
  } else {
    setText(currentPhrase.substring(0, charIndex + 1));
    setCharIndex(charIndex + 1);
    if (charIndex + 1 === currentPhrase.length) {
      setTimeout(() => setIsDeleting(true), 1500);
    }
  }
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.title = 'Chris.io';
    setTrackIndex(Math.floor(Math.random() * MUSIC_TRACKS.length));
  }, []);

  useEffect(() => {
    if (!entered) return;
    const timer = setTimeout(() => {
      runTypeEffect(phraseIndex, charIndex, isDeleting, setText, setPhraseIndex, setIsDeleting, setCharIndex);
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [entered, phraseIndex, charIndex, isDeleting]);

  const skipTrack = () => {
    const nextIndex = (trackIndex + 1) % MUSIC_TRACKS.length;
    setTrackIndex(nextIndex);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(console.error);
    }, 50);
  };

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="h-screen w-full overflow-y-auto text-white scroll-smooth cursor-custom">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio ref={audioRef} src={MUSIC_TRACKS[trackIndex].path} onEnded={skipTrack} />

      {!entered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl cursor-pointer" onClick={() => { setEntered(true); setIsPlaying(true); audioRef.current?.play(); }}>
          <h1 className="text-4xl tracking-widest font-light">click to enter</h1>
        </div>
      )}

      {entered && (
        <>
          <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 glass p-4 rounded-2xl w-48 text-center shadow-2xl">
            <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Now Playing</p>
            <p className="font-bold text-sm mb-3">{MUSIC_TRACKS[trackIndex].name}</p>
            <div className="flex justify-center gap-4">
              <button onClick={togglePlay} className="hover:text-blue-300 transition">{isPlaying ? "Pause" : "Play"}</button>
              <button onClick={skipTrack} className="hover:text-blue-300 transition">Skip</button>
            </div>
          </div>

          <section id="home" className="h-screen flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-[2rem] p-10 text-center w-80 shadow-2xl">
              {/* Main Profile GIF - Placed above the name */}
              <img src="/your-profile.gif" alt="Profile GIF" className="w-24 h-24 rounded-full mx-auto mb-4 border border-white/10 object-cover" />
              
              <h1 className="text-4xl font-bold mb-2">Chris.io</h1>
              <div className="flex justify-center gap-3 bg-white/5 p-2 rounded-full mb-4 w-fit mx-auto border border-white/5">
                {techStack.map((t) => (
                  <div key={t.name} className="relative group cursor-pointer">
                    <img src={t.icon} alt={t.name} className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/80 px-3 py-1 rounded text-xs whitespace-nowrap border border-white/20 pointer-events-none">{t.name}</div>
                  </div>
                ))}
              </div>
              <p className="text-lg h-8 mb-6">{text}<span className="animate-pulse">|</span></p>
              
              {/* Social Links - Discord icon restored */}
              <div className="flex justify-center gap-6 mt-4">
                <a href="https://discord.com/users/590893917587898369" target="_blank" rel="noopener noreferrer">
                    <img src="/discord.png" alt="Discord" className="w-8 h-8 opacity-70 hover:opacity-100" />
                </a>
                <a href="https://github.com/morkelchristan-cpu" target="_blank" rel="noopener noreferrer">
                    <img src="/github.png" alt="GitHub" className="w-8 h-8 opacity-70 hover:opacity-100" />
                </a>
              </div>
            </motion.div>
          </section>

          <section id="about" className="min-h-screen p-20 flex flex-col items-center">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h2 className="text-6xl font-bold mb-4">Hi, I'm Chris.</h2>
              <p className="text-2xl opacity-70 italic">Architecting the future of community management and web experiences.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
              {[
                { title: "Who I Am", text: "I am an 18-year-old developer from Africa with a deep passion for building robust digital ecosystems.", color: "text-blue-300" },
                { title: "The Mission", text: "To replace manual, tedious administrative tasks with high-performance, automated logic.", color: "text-green-300" },
                { title: "Discord Expertise", text: "I specialize in advanced bot development using Node.js to manage high-traffic LEO communities.", color: "text-yellow-300" },
                { title: "Web Architecture", text: "I build responsive, glass-morphism themed web portals like ZHPD Nexus using Next.js and Supabase.", color: "text-purple-300" },
                { title: "Design Language", text: "My aesthetic is defined by cloud themes, abstract glass effects, and clean, blue-toned palettes.", color: "text-pink-300" },
                { title: "3D Manipulation", text: "I am actively mastering Blender, focusing on car modeling and complex environment mesh manipulation.", color: "text-indigo-300" },
                { title: "Problem Solving", text: "Whether it's BOLO monitoring or ticket system cooldowns, I focus on data-driven solutions.", color: "text-teal-300" },
                { title: "Collaborative Spirit", text: "I thrive in team environments, streaming and building tools alongside my community friends.", color: "text-orange-300" },
                { title: "Future Vision", text: "I'm constantly pushing the limits of my codebase to optimize performance and user experience.", color: "text-red-300" }
              ].map((block, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ delay: i * 0.05 }} className="glass p-8 rounded-3xl">
                  <h3 className={`text-2xl font-bold mb-4 ${block.color}`}>{block.title}</h3>
                  <p className="leading-relaxed opacity-80">{block.text}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}