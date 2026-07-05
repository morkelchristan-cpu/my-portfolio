'use client';
import useSWR from 'swr';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const DISCORD_ID = '590893917587898369';
  const { data } = useSWR(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, fetcher, { refreshInterval: 5000 });

  const status = data?.data?.discord_status || 'offline';
  const avatarUrl = data?.data?.discord_user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.data.discord_user.avatar}.png`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen text-white">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover -z-10" src="/Background1.mp4" />
      <audio autoPlay loop src="/music.mp3" />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 text-center w-80 shadow-2xl"
        >
          <div className="relative inline-block mb-4">
            <img src={avatarUrl} alt="PFP" className="w-24 h-24 rounded-full border-4 border-white/10" />
            <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-black ${
              status === 'online' ? 'bg-green-500' : status === 'idle' ? 'bg-yellow-500' : status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
            }`} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Chris.io</h1>
          <p className="text-sm opacity-80 mb-6">full-stack developer.</p>
          <div className="flex justify-center gap-6 text-2xl mb-8">
            <span>👾</span><span>🐙</span><span>🌐</span>
          </div>
          <button onClick={scrollToAbout} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full transition text-sm">
            About Me
          </button>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section id="about" className="h-screen flex items-center justify-center p-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Introduction</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            I specialize in full-stack development and FiveM infrastructure. 
            I build to solve problems, focusing on performance, clean architecture, 
            and creating seamless experiences for community management.
          </p>
        </div>
      </section>
    </main>
  );
}