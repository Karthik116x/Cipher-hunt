import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HomePage } from "./components/HomePage";
import { Level1Breach } from "./components/Level1Breach";
import { Level2Cipher } from "./components/Level2Cipher";
import { Level3Archive } from "./components/Level3Archive";
import { Level4Terminal } from "./components/Level4Terminal";
import { Level5Revelation } from "./components/Level5Revelation";
import { Leaderboard } from "./components/Leaderboard";

type Page = "home" | "level1" | "level2" | "level3" | "level4" | "level5" | "leaderboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [playerName, setPlayerName] = useState("");
  const [completionTime, setCompletionTime] = useState(0);

  const handleStartInvestigation = () => {
    setCurrentPage("level1");
  };

  const handleLevel1Complete = () => {
    setCurrentPage("level2");
  };

  const handleLevel2Complete = () => {
    setCurrentPage("level3");
  };

  const handleLevel3Complete = () => {
    setCurrentPage("level4");
  };

  const handleLevel4Complete = () => {
    setCurrentPage("level5");
  };

  const handleLevel5Complete = (time: number) => {
    setCompletionTime(time);
    setCurrentPage("leaderboard");
  };

  const handlePlayAgain = () => {
    setCurrentPage("level1");
  };

  const handleBackHome = () => {
    setCurrentPage("home");
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  return (
    <div className="size-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <HomePage
              onStartInvestigation={handleStartInvestigation}
              setPlayerName={setPlayerName}
              playerName={playerName}
            />
          </motion.div>
        )}

        {currentPage === "level1" && (
          <motion.div
            key="level1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Level1Breach onComplete={handleLevel1Complete} />
          </motion.div>
        )}

        {currentPage === "level2" && (
          <motion.div
            key="level2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Level2Cipher onComplete={handleLevel2Complete} />
          </motion.div>
        )}

        {currentPage === "level3" && (
          <motion.div
            key="level3"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Level3Archive onComplete={handleLevel3Complete} />
          </motion.div>
        )}

        {currentPage === "level4" && (
          <motion.div
            key="level4"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Level4Terminal onComplete={handleLevel4Complete} />
          </motion.div>
        )}

        {currentPage === "level5" && (
          <motion.div
            key="level5"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Level5Revelation onComplete={handleLevel5Complete} playerName={playerName} />
          </motion.div>
        )}

        {currentPage === "leaderboard" && (
          <motion.div
            key="leaderboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Leaderboard
              playerName={playerName}
              completionTime={completionTime}
              onPlayAgain={handlePlayAgain}
              onBackHome={handleBackHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
