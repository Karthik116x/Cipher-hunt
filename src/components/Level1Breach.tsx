import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { AlertTriangle, Shield } from "lucide-react";

interface Level1BreachProps {
  onComplete: () => void;
}

export function Level1Breach({ onComplete }: Level1BreachProps) {
  const [revealedHint, setRevealedHint] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const correctPassword = "FIREWALL";

  useEffect(() => {
    const initialLogs = [
      "[SYSTEM] Breach detected at 23:47:13",
      "[WARNING] Unauthorized access attempt",
      "[ERROR] Security protocol violated",
      "[INFO] Analyzing intrusion vector...",
      "[TRACE] Connection from IP: 192.168.xxx.xxx",
      "[DEBUG] Decrypting access logs...",
      "[SYSTEM] Password hint: The barrier that protects - ALL CAPS",
      "[WARNING] Multiple failed authentication attempts",
      "[INFO] Time remaining: UNLIMITED",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === correctPassword) {
      onComplete();
    } else {
      setError(true);
      setLogs((prev) => [...prev, `[ERROR] Invalid password: "${password}"`]);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-l-4 border-[#FF0033] pl-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-[#FF0033]" />
            <h1 className="text-3xl md:text-4xl text-[#FF0033] tracking-wider">LEVEL 01: THE BREACH</h1>
          </div>
          <p className="text-[#888888]">SECURITY STATUS: COMPROMISED</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Server Breach Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-[#FF0033] border-opacity-30 bg-black bg-opacity-80 p-6"
          >
            <div className="flex items-center justify-between mb-4 border-b border-[#FF0033] border-opacity-30 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF0033] animate-pulse" />
                <span className="text-[#FF0033] text-sm">SERVER_BREACH.LOG</span>
              </div>
              <span className="text-[#888888] text-xs">LIVE</span>
            </div>

            {/* Console Logs */}
            <div className="h-96 overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-[#FF0033] scrollbar-track-transparent">
              {logs.filter(log => log).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-1 ${
                    log.includes("[ERROR]")
                      ? "text-[#FF0033]"
                      : log.includes("[WARNING]")
                      ? "text-[#FFA500]"
                      : log.includes("[INFO]")
                      ? "text-[#00FFFF]"
                      : log.includes("hint")
                      ? "text-[#C77DFF]"
                      : "text-[#888888]"
                  }`}
                >
                  {log}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block text-[#00FFFF]"
              >
                ▮
              </motion.div>
            </div>
          </motion.div>

          {/* Access Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="border border-[#00FFFF] border-opacity-30 bg-black bg-opacity-80 p-6"
          >
            <div className="flex items-center gap-2 mb-6 border-b border-[#00FFFF] border-opacity-30 pb-2">
              <Shield className="w-5 h-5 text-[#00FFFF]" />
              <h2 className="text-xl text-[#00FFFF]">ACCESS CONTROL PANEL</h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[#888888] mb-4">
                  The system has been breached. Analyze the server logs to find the security keyword.
                </p>
                <p className="text-[#C77DFF] text-sm mb-4">
                  💡 TIP: Look for clues in the console output
                </p>
              </div>

              {/* Hidden Clue Section */}
              <div
                className="border border-dashed border-[#C77DFF] border-opacity-30 p-4 cursor-pointer hover:border-opacity-100 transition-all"
                onMouseEnter={() => setRevealedHint(true)}
              >
                <p className="text-[#888888] text-sm mb-2">
                  {revealedHint ? "REVEALED HINT:" : "[ HOVER TO REVEAL HIDDEN HINT ]"}
                </p>
                {revealedHint && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#C77DFF]"
                  >
                    What protects a network from unauthorized access?
                  </motion.p>
                )}
              </div>

              {/* Password Input */}
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-[#00FFFF]">ENTER ACCESS CODE:</label>
                <div className={`border ${error ? 'border-[#FF0033]' : 'border-[#00FFFF]'} border-opacity-50 bg-[#0A0A0A] p-1`}>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="TYPE PASSWORD..."
                    className="w-full bg-transparent border-none outline-none text-[#00FFFF] placeholder-[#888888] px-3 py-2 uppercase"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FF0033] text-sm mt-2"
                  >
                    ⚠ ACCESS DENIED - INCORRECT PASSWORD
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full mt-4 px-6 py-3 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] tracking-wider hover:bg-[#00FFFF] hover:text-[#0A0A0A] transition-all duration-300"
                >
                  SUBMIT ACCESS CODE
                </button>
              </form>

              {/* Flashing Alert */}
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="border border-[#FF0033] bg-[#FF0033] bg-opacity-10 p-3 text-center"
              >
                <p className="text-[#FF0033] text-sm">⚠ SECURITY ALERT ACTIVE ⚠</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
