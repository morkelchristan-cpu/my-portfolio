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
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center hidden md:flex"
      animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
      transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.2 }}
    >
      <div className="relative w-6 h-6">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-400/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gray-400/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      </div>
    </motion.div>
  );
};

// --- Live Synced Spotify-Style Lyrics Component ---
const LiveLyrics = ({ audioRef, currentSongIndex }: { audioRef: React.RefObject<HTMLAudioElement | null>, currentSongIndex: number }) => {
  const trackLyrics: { [key: number]: { time: number; text: string }[] } = {
    0: [ // Love Me Not -> Ravyn Lenae (Spot-on tuned timestamps)
      { time: 0.1, text: "How did I get here?" },
      { time: 6.5, text: "Hey Ray Ray" },
      { time: 17.2, text: "Hey, come home..." },
      { time: 21.5, text: "See right now I need you" },
      { time: 24.2, text: "I'll meet you somewhere now" },
      { time: 26.5, text: "You up now, I see you" },
      { time: 28.2, text: "I get you, take care now" },
      { time: 29.8, text: "Slow down, be cool, I miss you" },
      { time: 32.5, text: "Come here now, it's yours now" },
      { time: 35.1, text: "Keep it, I'll hold on until now" },
      { time: 37.6, text: "I need you right now, once I leave you" },
      { time: 41.5, text: "I'm straight out, if I get you I'm slowly breaking down" },
      { time: 46.8, text: "And I know it's hard to see you" },
      { time: 49.5, text: "But I wish you were right here" },
      { time: 51.6, text: "Oh it's hard to leave you when I get you everywhere" },
      { time: 56.5, text: "All this time I'm thinking we could never be" },
      { time: 62.2, text: "Oh no I don't need you, but I miss you, come here" },
      { time: 66.5, text: "And oh it's hard to see you, but I wish you over here" },
      { time: 72.0, text: "Oh it's hard to leave you when I get you everywhere" },
      { time: 77.2, text: "All this time I'm thinking I'm strong enough to sink it" },
      { time: 81.5, text: "Oh no I don't need you, but I miss you, come here" },
      { time: 88.0, text: "He loves me now, he loves me..." },
      { time: 93.2, text: "He holds me tight, then lets me go" },
      { time: 97.5, text: "He loves me now, he loves me" },
      { time: 103.0, text: "He holds me tight, then lets me go" },
      { time: 107.5, text: "Soon as you leave me, we always lose connection" },
      { time: 113.5, text: "It's getting messy, I feel your affection" },
      { time: 117.5, text: "Don't loosen your grip, got to hold on me now" },
      { time: 123.5, text: "Forever let's get back together" },
      { time: 127.5, text: "Lord take it so far away" },
      { time: 132.5, text: "I pray that God we don't break" },
      { time: 139.0, text: "I want you to take, take me up and down and around" },
      { time: 151.2, text: "And know it's hard to say, but I wish you were right here" },
      { time: 158.0, text: "Oh it's hard to leave you when I get you everywhere" },
      { time: 164.2, text: "All this time I'm thinking we could never be" },
      { time: 169.0, text: "Oh no I don't need you, but I miss you, come here" },
      { time: 174.2, text: "And oh it's hard to see you, but I wish you were right here" },
      { time: 180.5, text: "Oh it's hard to leave you when I get you everywhere" },
      { time: 185.5, text: "Oh this time I'm thinking I'm strong enough to sink it" },
      { time: 190.5, text: "Oh no I don't need you, but I miss you, come here" },
      { time: 197.2, text: "He loves me, he loves me" },
      { time: 200.5, text: "He holds me tight, then let me go" },
      { time: 203.5, text: "He loves me, he loves me" },
      { time: 207.2, text: "He holds me tight, then let me go" },
      { time: 211.5, text: "He loves me not, he loves me" },
      { time: 215.2, text: "He holds me tight, then let me go" },
      { time: 219.5, text: "He loves me not, he loves me" },
      { time: 223.2, text: "He holds me tight, then let me go" },
      { time: 226.5, text: "You got to say that you're sorry at the end of the night" },
      { time: 232.5, text: "Wake up in the morning, everything's all right" },
      { time: 237.5, text: "At the end of the story you're holding me tight" },
      { time: 250.5, text: "And it's hard to see you, but I wish you were here" },
      { time: 256.5, text: "Oh it's hard to leave you when I get you everywhere" },
      { time: 262.5, text: "All this time I'm thinking I'm strong enough to sink it" },
      { time: 267.5, text: "Oh no I don't need you, but I miss you, come here" }
    ],
    1: [ // Groovy Freestyle -> Brenno, Taylor Wells (Spot-on tuned timestamps)
      { time: 0.1, text: "Your passion, this ain't make believe" },
      { time: 2.9, text: "This ain't a movie, this that real life" },
      { time: 5.8, text: "This my who's taking out demons" },
      { time: 7.0, text: "Let's get groovy..." },
      { time: 8.9, text: "Praising my Jesus, let's get groovy" },
      { time: 14.5, text: "Yeah, run off, pull up to the studio" },
      { time: 18.5, text: "Right at the church, feeling inspired to pull out it first" },
      { time: 21.8, text: "Feel the bass bumping, whole crew jumping" },
      { time: 24.8, text: "Carry that tempo, I don't need a purse" },
      { time: 27.0, text: "With my community they got my back" },
      { time: 28.9, text: "Devil in trouble when he on my turf" },
      { time: 30.8, text: "Firm foundation right on my shirt" },
      { time: 32.8, text: "Firm foundation, we got it firm" },
      { time: 34.0, text: "Thank you Jesus, I love my life" },
      { time: 36.2, text: "Thank you Jesus, I got my wife" },
      { time: 38.0, text: "They be like how did you find you a keeper" },
      { time: 40.8, text: "I had to lock in and pay off a price" },
      { time: 42.9, text: "I know some brothers who said that they want it" },
      { time: 44.8, text: "But don't want to listen to any advice" },
      { time: 46.9, text: "Then I got brothers who got damn a blessing" },
      { time: 49.0, text: "Amazing where you gonna follow the Light" },
      { time: 51.2, text: "Flow being terrible, my future level" },
      { time: 53.8, text: "I don't want the riches, I just want my heaven" },
      { time: 55.9, text: "I turn if I get it outside with my bread" },
      { time: 58.0, text: "And we take out a demon when we in a session" },
      { time: 60.8, text: "Living the spirit, I don't need the rest" },
      { time: 63.0, text: "My walk is authentic, the proof in the bridge" },
      { time: 65.9, text: "Y'all talking too much, I'll be trapping your list" },
      { time: 68.8, text: "It's time to let go of the wheel..." },
      { time: 91.8, text: "There ain't no evidence, thought it was evident" },
      { time: 94.8, text: "How you gonna question it" },
      { time: 97.0, text: "Hop on the track and eat blessing and keep the word strapped" },
      { time: 100.8, text: "I ain't stressing when saying pull up and he messing with me" },
      { time: 105.8, text: "And the things I might wrestle with" },
      { time: 108.9, text: "Sorry no room, don't get settled in" },
      { time: 111.0, text: "Sorry no room, I hear the queue, hop on the track" },
      { time: 114.8, text: "I'm gonna settle this, know that I got it" },
      { time: 117.9, text: "Like I'm Batman and Robin, I stay in a word and I study like college" },
      { time: 122.8, text: "Explaining my goals, I'm expanding my knowledge" },
      { time: 125.9, text: "I follow my God and I follow my calling" },
      { time: 128.8, text: "I know it's my destiny, how you gonna hate" },
      { time: 132.8, text: "But you say that you next to me" },
      { time: 135.0, text: "Sound like I'm fake or going price on me" },
      { time: 138.8, text: "Try to do nothing but less than me" },
      { time: 141.0, text: "Wait, they don't really matter" }
    ]
  };

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const lyrics = trackLyrics[currentSongIndex] || trackLyrics[0];
      
      const currentIndex = lyrics.findIndex((item, index) => {
        const nextItem = lyrics[index + 1];
        return currentTime >= item.time && (!nextItem || currentTime < nextItem.time);
      });

      if (currentIndex !== -1 && currentIndex !== currentLineIndex) {
        setCurrentLineIndex(currentIndex);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audioRef, currentSongIndex, currentLineIndex]);

  useEffect(() => {
    setCurrentLineIndex(0);
  }, [currentSongIndex]);

  const currentLyrics = trackLyrics[currentSongIndex] || trackLyrics[0];
  const activeText = currentLyrics[currentLineIndex]?.text || "Playing...";

  return (
    <div className="h-16 overflow-hidden relative mt-8 flex justify-center items-center w-full max-w-xl mx-auto">
      {/* Subtle clean neutral atmospheric glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl pointer-events-none" />
      
      <AnimatePresence mode="wait">
        <motion.p
          key={`${currentSongIndex}-${currentLineIndex}`}
          initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-gray-100 font-mono tracking-widest text-sm md:text-base uppercase absolute text-center px-6 drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] font-semibold"
        >
          {activeText}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// --- Data ---
const PROJECT_DETAILS = [
  { name: "ZHPD Bot", status: "Active", desc: "Automatic callsign requester, formal complaints, and anonymous reporting system." },
  { name: "Bridger.io", status: "Active", desc: "Manages seamless message/log bridging between multiple Discord servers." },
  { name: "Sentinel", status: "Active", desc: "Officer-focused BOLO system for real-time tracking and dispatch intelligence." },
  { name: "LSPD Punishments", status: "Active", desc: "Automated community moderation and punishment tracking system." },
  { name: "3D Environments", status: "Idle", desc: "Creative 3D modeling and environment rigging experiments." },
  { name: "Legacy Archives", status: "Inactive", desc: "Deprecated systems and archival data logs." }
];

const SONGS = [
  { src: '/ibiza.mp3', title: 'Love Me Not', subtitle: 'Ravyn Lenae' },
  { src: '/dakati.mp3', title: 'Groovy Freestyle', subtitle: 'Brenno, Taylor Wells' }
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(e => console.log("Playback error:", e));
    }, 50);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="text-white selection:bg-gray-500/30 overflow-x-hidden cursor-none">
      <CustomCursor />
      
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/background_v2.mp4" />
      <div className="fixed inset-0 bg-black/75 -z-10" />
      
      <audio 
        ref={audioRef} 
        src={SONGS[currentSongIndex].src} 
        loop={isLooping}
        preload="auto"
        onEnded={() => {
          if (!isLooping) handleNext();
        }}
      />

      {!entered ? (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-3xl cursor-pointer" 
          onClick={() => { 
            setEntered(true); 
            if (audioRef.current) {
              audioRef.current.volume = volume;
              audioRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(err => console.log("Audio play blocked:", err));
            }
          }}
        >
          <motion.h1 animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="tracking-[0.8em] uppercase text-xs font-light text-gray-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">Click to Access Secure Terminal</motion.h1>
        </div>
      ) : (
        <>
          {/* Music Player Widget */}
          <div className="fixed top-8 right-60 z-50 bg-black/50 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-6 shadow-2xl">
            <div className="flex flex-col overflow-hidden w-36">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">Now Playing</span>
              <div className="h-5 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSongIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <p className="text-xs font-semibold text-white truncate">{SONGS[currentSongIndex].title}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="h-4 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSongIndex + '-sub'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <p className="text-[10px] text-gray-400 truncate tracking-tight">{SONGS[currentSongIndex].subtitle}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-white/10 pl-4">
              <button 
                onClick={() => setIsLooping(!isLooping)} 
                className={`text-xs transition ${isLooping ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'text-gray-600'}`}
                title="Toggle Repeat"
              >
                🔁
              </button>
              <button 
                onClick={() => {
                  if (audioRef.current) {
                    if (isPlaying) {
                      audioRef.current.pause();
                      setIsPlaying(false);
                    } else {
                      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
                    }
                  }
                }} 
                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition text-xs text-white shadow-sm"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button 
                onClick={handleNext} 
                className="text-xs hover:text-gray-300 transition"
                title="Skip Track"
              >
                ⏭
              </button>
            </div>
          </div>

          <div className="fixed top-8 right-8 z-50 bg-black/50 backdrop-blur-xl p-4 rounded-2xl border border-white/10 w-48 shadow-2xl">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-2 block font-medium">Audio Volume</span>
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolume} className="w-full h-1 accent-gray-400 cursor-pointer" />
          </div>

          <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 flex gap-8 text-[10px] uppercase tracking-[0.2em] shadow-2xl">
            {['home', 'about', 'projects', 'socials'].map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="hover:text-gray-400 transition">{item}</button>
            ))}
          </nav>

          <section id="home" className="h-screen flex flex-col items-center justify-center text-center">
            <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src="/your-profile.gif" className="w-40 h-40 rounded-full mb-8 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)]" alt="Profile" />
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-8xl font-bold tracking-tighter">Chris.io</motion.h1>
            
            <div className="flex gap-4 mt-6">
              {['Java.script', 'Next.js', 'Discord.js', 'Blender'].map(badge => (
                <span key={badge} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-widest uppercase text-gray-300">{badge}</span>
              ))}
            </div>
            
            <LiveLyrics audioRef={audioRef} currentSongIndex={currentSongIndex} />
          </section>

          <section id="about" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
            <h2 className="text-6xl font-bold mb-20 text-white">The Architect.</h2>
            <div className="space-y-20">
              {[
                { title: "The Origin", text: "At 18, I am building the digital infrastructure I once dreamed of using. Born in Africa, my journey started with a simple passion for gaming, which evolved into a career in system architecture and automation." },
                { title: "Why I Build", text: "I believe great software is more than just code—it's about solving real problems through thoughtful design. If it isn't intuitive and visually elegant, it isn't finished." },
                { title: "Technical Focus", text: "My expertise lies in Discord development, Next.js, and high-concurrency Node.js environments. I specialize in building custom bots that bridge manual administration gaps with performance." },
                { title: "Future Vision", text: "I am constantly pushing the boundaries of what is possible on the web, experimenting with 3D environments and crafting automated ecosystems that stand the test of time." }
              ].map((item, i) => (
                <motion.div key={i} initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
                  <h3 className="text-xl font-bold mb-4 text-gray-400">{item.title}</h3>
                  <p className="text-lg opacity-70 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="projects" className="min-h-screen py-32 max-w-4xl mx-auto px-10">
            <h2 className="text-6xl font-bold mb-16 text-white">Active Infrastructure.</h2>
            <div className="grid gap-6">
              {PROJECT_DETAILS.map(p => (
                <motion.div key={p.name} whileHover={{ scale: 1.02 }} className="p-10 bg-black/40 backdrop-blur-lg border border-white/5 rounded-[2rem] hover:border-white/20 transition shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">{p.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full text-gray-300">
                      {p.status === 'Active' && <><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" /> Active</>}
                      {p.status === 'Idle' && <>🌙 Idle</>}
                      {p.status === 'Inactive' && <><div className="w-2 h-2 rounded-full bg-red-400" /> Inactive</>}
                    </div>
                  </div>
                  <p className="opacity-60 text-md leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="socials" className="h-screen flex flex-col justify-center items-center text-center px-10">
            <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 font-medium mb-20">Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              {[
                { label: 'Twitch', desc: 'Live Coding', href: 'https://twitch.tv/cloudiit_v' },
                { label: 'YouTube', desc: 'Dev Vids', href: 'https://www.youtube.com/@cloudiit_V' },
                { label: 'GitHub', desc: 'Open Source', href: 'https://github.com/morkelchristan-cpu' }
              ].map(s => (
                <motion.a 
                  key={s.label} 
                  whileHover={{ y: -10 }} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-12 bg-black/40 border border-white/5 rounded-3xl hover:border-white/30 transition shadow-xl"
                >
                  <span className="text-4xl font-bold block hover:text-gray-300 transition">{s.label}</span>
                  <span className="text-[10px] opacity-40 uppercase tracking-widest mt-6 block">{s.desc}</span>
                </motion.a>
              ))}
            </div>
          </section>

          <footer className="py-20 text-center border-t border-white/5 bg-black/40">
            <div className="text-sm tracking-widest uppercase mb-2">Chris.io - Made with ❤️ by me</div>
            <div className="text-[10px] opacity-40 uppercase tracking-widest">Last updated: July 27th, 2026</div>
          </footer>
        </>
      )}
    </main>
  );
}