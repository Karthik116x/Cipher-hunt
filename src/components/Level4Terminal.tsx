import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface Level4TerminalProps {
  onComplete: () => void;
}

export function Level4Terminal({ onComplete }: Level4TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ command: string; output: string[] }>>([]);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const correctPassword = "MATRIX";

  useEffect(() => {
    const initialMessages = [
      "> SYSTEM BOOT SEQUENCE INITIATED...",
      "> LOADING KERNEL MODULES...",
      "> ESTABLISHING SECURE CONNECTION...",
      "> CONNECTION ESTABLISHED",
      "> TYPE 'help' FOR AVAILABLE COMMANDS",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < initialMessages.length) {
        setHistory((prev) => [...prev, { command: "", output: [initialMessages[index]] }]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string[] = [];

    switch (trimmedCmd) {
      case "help":
        output = [
          "AVAILABLE COMMANDS:",
          "  ls          - List files in current directory",
          "  cat [file]  - Display file contents",
          "  unlock      - Attempt to unlock terminal",
          "  clear       - Clear terminal screen",
          "  hint        - Display a helpful hint",
        ];
        break;
      case "ls":
        output = [
          "total 5",
          "-rw-r--r-- 1 user user  256 Oct 07 23:47 readme.txt",
          "-rw-r--r-- 1 user user  128 Oct 07 23:48 secrets.log",
          "-rwxr-xr-x 1 user user 1024 Oct 07 23:49 unlock.sh",
        ];
        break;
      case "cat readme.txt":
        output = [
          "CLASSIFIED DOCUMENT",
          "==================",
          "This terminal is locked.",
          "The password is hidden in the system.",
          "Look deeper into the files...",
        ];
        break;
      case "cat secrets.log":
        output = [
          "[LOG] System initialized",
          "[LOG] User authentication required",
          "[LOG] Password hint: You're in one right now",
          "[LOG] Hint: 6 letters, starts with M",
          "[LOG] End of log file",
        ];
        setShowPassword(true);
        break;
      case "cat unlock.sh":
        output = [
          "#!/bin/bash",
          "# Unlock script",
          "echo 'Enter password to unlock terminal'",
          "# Password verification routine",
          "if [ $PASSWORD == 'REDACTED' ]; then",
          "  echo 'Access granted'",
          "fi",
        ];
        break;
      case "unlock":
        output = ["Enter password when prompted."];
        setShowPassword(true);
        break;
      case "hint":
        output = [
          "💡 HINT: Try reading the secrets.log file",
          "Use: cat secrets.log",
        ];
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        output = [`Command not found: ${cmd}`, `Type 'help' for available commands`];
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (showPassword && input.toUpperCase() === correctPassword) {
      setHistory((prev) => [
        ...prev,
        { command: input, output: ["✓ PASSWORD ACCEPTED", "ACCESS GRANTED", "PROCEEDING TO NEXT LEVEL..."] },
      ]);
      setTimeout(() => onComplete(), 1500);
    } else if (showPassword) {
      setHistory((prev) => [
        ...prev,
        { command: input, output: ["✗ ACCESS DENIED - INCORRECT PASSWORD"] },
      ]);
    } else {
      executeCommand(input);
    }

    setInput("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-[#00FFFF] bg-black shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="bg-[#0f0f0f] border-b-2 border-[#00FFFF] px-4 py-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF0033]" />
              <div className="w-3 h-3 rounded-full bg-[#FFA500]" />
              <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
            </div>
            <div className="flex items-center gap-2 ml-4">
              <TerminalIcon className="w-4 h-4 text-[#00FFFF]" />
              <span className="text-[#00FFFF] text-sm">root@cyberMystery:~#</span>
            </div>
            <div className="ml-auto">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[#00FF88] text-xs"
              >
                [LEVEL 04: THE TERMINAL]
              </motion.div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 h-[600px] overflow-y-auto font-mono text-sm bg-black bg-opacity-90">
            {/* Command History */}
            {history.filter(entry => entry).map((entry, index) => (
              <div key={index} className="mb-3">
                {entry.command && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#00FF88]">user@terminal:~$</span>
                    <span className="text-[#00FFFF]">{entry.command}</span>
                  </div>
                )}
                {entry.output.filter(line => line).map((line, lineIndex) => (
                  <motion.div
                    key={lineIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: lineIndex * 0.05 }}
                    className={`${
                      line.includes("✓") || line.includes("ACCESS GRANTED")
                        ? "text-[#00FF88]"
                        : line.includes("✗") || line.includes("DENIED")
                        ? "text-[#FF0033]"
                        : line.includes("💡")
                        ? "text-[#C77DFF]"
                        : "text-[#888888]"
                    } pl-4`}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Current Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-[#00FF88]">{showPassword ? "password:" : "user@terminal:~$"}</span>
              <input
                ref={inputRef}
                type={showPassword ? "password" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[#00FFFF] uppercase"
                autoFocus
              />
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-[#00FFFF]"
              >
                ▮
              </motion.span>
            </form>
          </div>

          {/* Terminal Footer */}
          <div className="bg-[#0f0f0f] border-t-2 border-[#00FFFF] px-4 py-2 flex items-center justify-between text-xs">
            <div className="text-[#888888]">
              Commands entered: {history.filter((h) => h.command).length}
            </div>
            <div className="text-[#00FFFF]">
              {showPassword ? "PASSWORD MODE ACTIVE" : "TYPE 'help' FOR COMMANDS"}
            </div>
          </div>
        </motion.div>

        {/* Instruction Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 border border-[#C77DFF] border-opacity-30 bg-black bg-opacity-50 p-4 text-center"
        >
          <p className="text-[#C77DFF] text-sm">
            🔐 OBJECTIVE: Navigate the terminal and find the password to unlock access
          </p>
        </motion.div>
      </div>
    </div>
  );
}
