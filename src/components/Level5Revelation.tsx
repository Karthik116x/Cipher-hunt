import { motion } from "motion/react";
import { useState } from "react";
import { Eye, Lock, Unlock } from "lucide-react";

interface Level5RevelationProps {
  onComplete: (time: number) => void;
  playerName: string;
}

export function Level5Revelation({ onComplete, playerName }: Level5RevelationProps) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const correctAnswer = "TRUTH";
  const clues = [
    "Level 1: FIREWALL - Protection",
    "Level 2: HELLO WORLD - Communication",
    "Level 3: ECHO - Repetition",
    "Level 4: MATRIX - Reality",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toUpperCase() === correctAnswer) {
      setUnlocked(true);
      setTimeout(() => {
        const completionTime = Math.floor(Math.random() * 300) + 180; // Random time 3-8 min
        onComplete(completionTime);
      }, 3000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(199, 125, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {!unlocked ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Eye className="w-16 h-16 text-[#C77DFF]" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl text-[#C77DFF] tracking-wider mb-4">
                LEVEL 05: THE REVELATION
              </h1>
              <p className="text-[#888888]">THE FINAL TRUTH AWAITS</p>
            </motion.div>

            {/* Clues Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-2 border-[#00FFFF] bg-black bg-opacity-80 p-8 mb-8"
            >
              <h2 className="text-2xl text-[#00FFFF] mb-6 text-center border-b border-[#00FFFF] border-opacity-30 pb-4">
                YOUR JOURNEY SO FAR
              </h2>

              <div className="space-y-4 mb-8">
                {clues.map((clue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="border border-[#C77DFF] border-opacity-30 bg-black bg-opacity-50 p-4"
                  >
                    <p className="text-[#00FFFF]">{clue}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center border-t border-[#C77DFF] border-opacity-30 pt-6"
              >
                <p className="text-[#C77DFF] mb-2">💡 FINAL RIDDLE:</p>
                <p className="text-[#888888] italic text-lg mb-4">
                  "What is sought by all, hidden in plain sight,<br />
                  The answer to mysteries, revealed by light?"
                </p>
                <p className="text-[#00FFFF] text-sm">5 letters. What binds all your discoveries?</p>
              </motion.div>
            </motion.div>

            {/* Final Answer Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="border-2 border-[#C77DFF] bg-black bg-opacity-80 p-8"
            >
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Lock className="w-8 h-8 text-[#C77DFF]" />
                  <h3 className="text-2xl text-[#C77DFF]">FINAL PASSPHRASE</h3>
                </div>

                <div className={`border-2 ${error ? "border-[#FF0033]" : "border-[#00FFFF]"} bg-[#0A0A0A] p-1 mb-6`}>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="ENTER THE TRUTH..."
                    className="w-full bg-transparent border-none outline-none text-[#00FFFF] text-center text-2xl placeholder-[#888888] px-6 py-4 uppercase tracking-widest"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 border border-[#FF0033] bg-[#FF0033] bg-opacity-10 p-4 text-center"
                  >
                    <p className="text-[#FF0033]">⚠ INCORRECT - THE TRUTH REMAINS HIDDEN</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full px-8 py-5 bg-transparent border-2 border-[#C77DFF] text-[#C77DFF] tracking-widest hover:bg-[#C77DFF] hover:text-[#0A0A0A] transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">DECRYPT TRUTH</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#C77DFF] opacity-0 group-hover:opacity-20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </button>
              </form>
            </motion.div>
          </>
        ) : (
          // Success State
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              className="mb-8"
            >
              <Unlock className="w-24 h-24 text-[#00FF88] mx-auto" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl text-[#00FF88] tracking-wider mb-6"
            >
              MISSION COMPLETE
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="border-2 border-[#00FF88] bg-black bg-opacity-80 p-8 mb-8"
            >
              <p className="text-[#00FFFF] text-xl mb-4">
                Congratulations, {playerName || "Investigator"}!
              </p>
              <p className="text-[#888888]">
                You have successfully navigated through all layers of The Cyber Mystery.
                The truth has been revealed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="space-y-4"
            >
              {[
                "FIREWALL BREACHED",
                "CIPHER DECODED",
                "ARCHIVE INVESTIGATED",
                "TERMINAL UNLOCKED",
                "TRUTH DISCOVERED",
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  className="text-[#00FF88]"
                >
                  ✓ {achievement}
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-[#C77DFF] mt-8"
            >
              Redirecting to leaderboard...
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
