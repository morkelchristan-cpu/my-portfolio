export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/Background1.mp4"
      />

      {/* Background Music */}
      <audio autoPlay loop src="/music.mp3" className="hidden" />

      {/* Hero Section */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">Chris.io</h1>
        <p className="text-white/80">full-stack developer.</p>
      </div>

      {/* Introduction Section */}
      <div className="mt-20 w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 text-white">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p>
          Welcome to my portfolio. I specialize in full-stack development, 
          Discord bot architecture, and managing FiveM server infrastructure.
        </p>
      </div>
    </main>
  );
}