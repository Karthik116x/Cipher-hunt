import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Lock, Terminal, Code2, Shield } from "lucide-react";

interface HomePageProps {
  onStartInvestigation: () => void;
  setPlayerName: (name: string) => void;
  playerName: string;
}

export function HomePage({ onStartInvestigation, setPlayerName, playerName }: HomePageProps) {
  const [showCursor, setShowCursor] = useState(true);
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const chars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setMatrixChars(chars);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {matrixChars.map((char) => (
          <motion.div
            key={char.id}
            className="absolute text-[#00FFFF] opacity-50"
            style={{ left: `${char.left}%` }}
            initial={{ y: -100 }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: char.delay,
              ease: "linear",
            }}
          >
            {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
          </motion.div>
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Icons floating */}
        <div className="absolute top-20 left-10 md:left-20">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Lock className="w-8 h-8 text-[#C77DFF] opacity-40" />
          </motion.div>
        </div>
        <div className="absolute top-32 right-10 md:right-20">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Terminal className="w-8 h-8 text-[#00FFFF] opacity-40" />
          </motion.div>
        </div>
        <div className="absolute bottom-32 left-20">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-8 h-8 text-[#C77DFF] opacity-40" />
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-32">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <Code2 className="w-8 h-8 text-[#00FFFF] opacity-40" />
          </motion.div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl"
        >
          {/* Title with Glitch Effect */}
          <motion.div className="mb-6">
            <h1 className="text-5xl md:text-7xl tracking-wider mb-2 text-[#00FFFF] relative inline-block">
              <span className="relative z-10">THE CYBER MYSTERY</span>
              <motion.span
                className="absolute top-0 left-0 text-[#C77DFF] opacity-70"
                animate={{ x: [0, -2, 2, 0], y: [0, 2, -2, 0] }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
              >
                THE CYBER MYSTERY
              </motion.span>
            </h1>
          </motion.div>

          {/* Tagline with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl text-[#C77DFF] tracking-wide">
              The Truth Lies in the Code
              {showCursor && <span className="text-[#00FFFF]">▮</span>}
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-8 border border-[#00FFFF] border-opacity-30 bg-black bg-opacity-50 p-6 backdrop-blur-sm"
          >
            <p className="text-[#00FFFF] mb-4 opacity-80">
              Welcome, investigator. You've been granted access to a classified digital investigation.
            </p>
            <p className="text-[#888888] text-sm">
              Navigate through 5 levels of encrypted challenges. Solve ciphers, decode messages, and uncover hidden truths.
              Only the most skilled hackers will reach the revelation.
            </p>
          </motion.div>

          {/* Player Name Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mb-8 max-w-md mx-auto"
          >
            <div className="border border-[#C77DFF] border-opacity-50 bg-black bg-opacity-70 p-1">
              <div className="flex items-center">
                <span className="text-[#C77DFF] px-3">{'>'}</span>
                <input
                  type="text"
                  placeholder="ENTER CODENAME..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[#00FFFF] placeholder-[#888888] px-2 py-3"
                />
              </div>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <button
              onClick={onStartInvestigation}
              className="group relative px-12 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] tracking-widest overflow-hidden transition-all duration-300 hover:text-[#0A0A0A]"
            >
              <span className="relative z-10">START INVESTIGATION</span>
              <motion.div
                className="absolute inset-0 bg-[#00FFFF]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
            <motion.div
              className="absolute inset-0 border-2 border-[#C77DFF] opacity-0 group-hover:opacity-100 pointer-events-none"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 text-center"
        >
          <p className="text-[#888888] text-sm">
            [CLASSIFIED] ACCESS LEVEL: RESTRICTED
          </p>
        </motion.div>
      </div>
    </div>
  );
}
