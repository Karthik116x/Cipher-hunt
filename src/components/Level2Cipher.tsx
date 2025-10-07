import { motion } from "motion/react";
import { useState } from "react";
import { Lock, Key } from "lucide-react";

interface Level2CipherProps {
  onComplete: () => void;
}

export function Level2Cipher({ onComplete }: Level2CipherProps) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const encryptedText = "KHOOR ZRUOG";
  const hint = "Caesar Cipher - Shift by 3";
  const correctAnswer = "HELLO WORLD";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toUpperCase() === correctAnswer) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-[#C77DFF]" />
            <h1 className="text-3xl md:text-5xl text-[#C77DFF] tracking-wider">LEVEL 02: THE CIPHER ROOM</h1>
          </div>
          <p className="text-[#888888]">DECRYPT THE MESSAGE TO PROCEED</p>
        </motion.div>

        {/* Cipher Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="border-2 border-[#C77DFF] bg-black bg-opacity-80 p-8 mb-8 relative overflow-hidden"
        >
          {/* Rotating background pattern */}
          <div className="absolute inset-0 opacity-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #C77DFF 0px, #C77DFF 2px, transparent 2px, transparent 10px)`,
              }}
            />
          </div>

          <div className="relative z-10">
            <p className="text-[#888888] text-sm mb-4 text-center">ENCRYPTED MESSAGE:</p>
            
            {/* Encrypted Text with Animation */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-block text-4xl md:text-6xl text-[#C77DFF] tracking-widest mb-4"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(199, 125, 255, 0.5)",
                    "0 0 20px rgba(199, 125, 255, 0.8)",
                    "0 0 10px rgba(199, 125, 255, 0.5)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {encryptedText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Cipher Visualization */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border border-[#00FFFF] border-opacity-30 p-4 bg-black bg-opacity-50">
                <p className="text-[#00FFFF] text-xs mb-2">CIPHER TYPE:</p>
                <p className="text-[#888888]">SUBSTITUTION</p>
              </div>
              <div className="border border-[#00FFFF] border-opacity-30 p-4 bg-black bg-opacity-50">
                <p className="text-[#00FFFF] text-xs mb-2">COMPLEXITY:</p>
                <p className="text-[#888888]">LEVEL 2</p>
              </div>
            </div>

            {/* Hint Section */}
            <div className="text-center">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 border border-[#C77DFF] border-opacity-50 text-[#C77DFF] text-sm hover:bg-[#C77DFF] hover:bg-opacity-10 transition-all"
              >
                {showHint ? "HIDE HINT" : "REVEAL HINT"}
              </button>
              
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 border border-[#C77DFF] border-opacity-30 bg-[#C77DFF] bg-opacity-5 p-4"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Key className="w-4 h-4 text-[#C77DFF]" />
                    <p className="text-[#C77DFF] text-sm">DECRYPTION KEY:</p>
                  </div>
                  <p className="text-[#888888] text-sm">{hint}</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Answer Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border border-[#00FFFF] border-opacity-30 bg-black bg-opacity-80 p-6"
        >
          <form onSubmit={handleSubmit}>
            <label className="block mb-4 text-[#00FFFF]">ENTER DECRYPTED MESSAGE:</label>
            
            <div className={`border-2 ${error ? 'border-[#FF0033]' : 'border-[#00FFFF]'} bg-[#0A0A0A] p-1 mb-4`}>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="TYPE YOUR ANSWER..."
                className="w-full bg-transparent border-none outline-none text-[#00FFFF] placeholder-[#888888] px-4 py-3 uppercase tracking-widest"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 border border-[#FF0033] bg-[#FF0033] bg-opacity-10 p-3 text-center"
              >
                <p className="text-[#FF0033]">⚠ INCORRECT DECRYPTION - TRY AGAIN</p>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full px-8 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] tracking-widest hover:bg-[#00FFFF] hover:text-[#0A0A0A] transition-all duration-300"
            >
              DECRYPT & CONTINUE
            </button>
          </form>
        </motion.div>

        {/* Visual Elements */}
        <div className="mt-8 flex justify-center gap-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Lock className="w-6 h-6 text-[#C77DFF] opacity-30" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Key className="w-6 h-6 text-[#00FFFF] opacity-30" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
