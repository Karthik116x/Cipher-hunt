import { motion } from "motion/react";
import { useState } from "react";
import { Trophy, Clock, User, RotateCcw, Home } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  time: number;
  date: string;
}

interface LeaderboardProps {
  playerName: string;
  completionTime: number;
  onPlayAgain: () => void;
  onBackHome: () => void;
}

export function Leaderboard({ playerName, completionTime, onPlayAgain, onBackHome }: LeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: "CYPHER_KING", time: 142, date: "2025-10-07" },
    { rank: 2, name: "GHOST_HACK3R", time: 158, date: "2025-10-07" },
    { rank: 3, name: "NEO_DECODE", time: 167, date: "2025-10-06" },
    { rank: 4, name: playerName || "MYSTERY_SOLVER", time: completionTime, date: "2025-10-07" },
    { rank: 5, name: "DIGITAL_SPY", time: 189, date: "2025-10-06" },
    { rank: 6, name: "CODE_BREAKER", time: 203, date: "2025-10-05" },
    { rank: 7, name: "PHANTOM_404", time: 215, date: "2025-10-05" },
    { rank: 8, name: "MATRIX_WALKER", time: 228, date: "2025-10-04" },
    { rank: 9, name: "VOID_RUNNER", time: 241, date: "2025-10-04" },
    { rank: 10, name: "CYBER_NINJA", time: 256, date: "2025-10-03" },
  ].sort((a, b) => a.time - b.time).map((entry, index) => ({ ...entry, rank: index + 1 }));

  const filteredData = searchQuery
    ? leaderboardData.filter((entry) =>
        entry.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : leaderboardData;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Trophy className="w-16 h-16 text-[#FFD700] mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl text-[#00FFFF] tracking-wider mb-4">LEADERBOARD</h1>
          <p className="text-[#888888]">TOP CYBER INVESTIGATORS</p>
        </motion.div>

        {/* Player Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="border-2 border-[#00FF88] bg-black bg-opacity-80 p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <User className="w-8 h-8 text-[#00FF88] mx-auto mb-2" />
              <p className="text-[#888888] text-sm mb-1">YOUR NAME</p>
              <p className="text-[#00FFFF] text-xl">{playerName || "MYSTERY_SOLVER"}</p>
            </div>
            <div>
              <Clock className="w-8 h-8 text-[#C77DFF] mx-auto mb-2" />
              <p className="text-[#888888] text-sm mb-1">COMPLETION TIME</p>
              <p className="text-[#00FFFF] text-xl">{formatTime(completionTime)}</p>
            </div>
            <div>
              <Trophy className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
              <p className="text-[#888888] text-sm mb-1">YOUR RANK</p>
              <p className="text-[#00FFFF] text-xl">
                #{leaderboardData.findIndex((e) => e.name === (playerName || "MYSTERY_SOLVER")) + 1}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="border border-[#00FFFF] border-opacity-50 bg-black bg-opacity-70 p-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH PLAYER NAME..."
              className="w-full bg-transparent border-none outline-none text-[#00FFFF] placeholder-[#888888] px-4 py-3"
            />
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border border-[#00FFFF] border-opacity-30 bg-black bg-opacity-80 overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-4 border-b-2 border-[#00FFFF] bg-[#0f0f0f]">
            <div className="text-[#00FFFF] text-sm">RANK</div>
            <div className="text-[#00FFFF] text-sm">PLAYER</div>
            <div className="text-[#00FFFF] text-sm">TIME</div>
            <div className="text-[#00FFFF] text-sm">DATE</div>
          </div>

          {/* Table Rows */}
          <div className="max-h-[500px] overflow-y-auto">
            {filteredData.map((entry, index) => {
              const isCurrentPlayer = entry.name === (playerName || "MYSTERY_SOLVER");
              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`grid grid-cols-4 gap-4 p-4 border-b border-[#00FFFF] border-opacity-10 hover:bg-[#00FFFF] hover:bg-opacity-5 transition-all ${
                    isCurrentPlayer ? "bg-[#C77DFF] bg-opacity-10 border-[#C77DFF]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {entry.rank <= 3 ? (
                      <Trophy
                        className={`w-5 h-5 ${
                          entry.rank === 1
                            ? "text-[#FFD700]"
                            : entry.rank === 2
                            ? "text-[#C0C0C0]"
                            : "text-[#CD7F32]"
                        }`}
                      />
                    ) : (
                      <span className="text-[#888888] text-sm">#{entry.rank}</span>
                    )}
                  </div>
                  <div className={isCurrentPlayer ? "text-[#C77DFF]" : "text-[#00FFFF]"}>
                    {entry.name}
                    {isCurrentPlayer && <span className="ml-2 text-xs text-[#00FF88]">← YOU</span>}
                  </div>
                  <div className="text-[#888888]">{formatTime(entry.time)}</div>
                  <div className="text-[#888888] text-sm">{entry.date}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 grid md:grid-cols-2 gap-4"
        >
          <button
            onClick={onBackHome}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] tracking-wider hover:bg-[#00FFFF] hover:text-[#0A0A0A] transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            BACK TO START
          </button>
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#C77DFF] text-[#C77DFF] tracking-wider hover:bg-[#C77DFF] hover:text-[#0A0A0A] transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            PLAY AGAIN
          </button>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-[#888888] text-sm">
            [CLASSIFIED] DATA UPDATED IN REAL-TIME
          </p>
        </motion.div>
      </div>
    </div>
  );
}
