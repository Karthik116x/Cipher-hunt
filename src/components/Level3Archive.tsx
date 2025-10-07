import { motion } from "motion/react";
import { useState } from "react";
import { FolderOpen, File, Image, HardDrive } from "lucide-react";

interface Level3ArchiveProps {
  onComplete: () => void;
}

export function Level3Archive({ onComplete }: Level3ArchiveProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [foundClues, setFoundClues] = useState<Set<string>>(new Set());
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const correctPassword = "ECHO";
  const requiredClues = ["clue1", "clue2", "clue3"];

  const files = [
    { id: "file1", name: "system_log_2024.txt", type: "text", clue: "clue1", hint: "E" },
    { id: "file2", name: "encrypted_data.dat", type: "data", clue: null, hint: null },
    { id: "file3", name: "backup_image.png", type: "image", clue: "clue2", hint: "C-H" },
    { id: "file4", name: "config.json", type: "text", clue: null, hint: null },
    { id: "file5", name: "metadata.xml", type: "text", clue: "clue3", hint: "O" },
    { id: "file6", name: "archive.zip", type: "archive", clue: null, hint: null },
  ];

  const handleFileClick = (fileId: string, clue: string | null) => {
    setSelectedFile(fileId);
    if (clue && !foundClues.has(clue)) {
      setFoundClues(new Set([...foundClues, clue]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === correctPassword) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const selectedFileData = files.find((f) => f.id === selectedFile);
  const allCluesFound = requiredClues.every((clue) => foundClues.has(clue));

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-l-4 border-[#00FFFF] pl-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="w-6 h-6 text-[#00FFFF]" />
            <h1 className="text-3xl md:text-4xl text-[#00FFFF] tracking-wider">LEVEL 03: THE ARCHIVE</h1>
          </div>
          <p className="text-[#888888]">INVESTIGATE THE DIGITAL LIBRARY</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* File Browser */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 border border-[#00FFFF] border-opacity-30 bg-black bg-opacity-80 p-6"
          >
            <div className="flex items-center gap-2 mb-6 border-b border-[#00FFFF] border-opacity-30 pb-3">
              <FolderOpen className="w-5 h-5 text-[#00FFFF]" />
              <h2 className="text-xl text-[#00FFFF]">FILE SYSTEM</h2>
              <span className="ml-auto text-[#888888] text-sm">{files.length} FILES</span>
            </div>

            <div className="space-y-3">
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleFileClick(file.id, file.clue)}
                  className={`group border ${
                    selectedFile === file.id ? "border-[#C77DFF]" : "border-[#00FFFF]"
                  } border-opacity-30 bg-black bg-opacity-50 p-4 cursor-pointer hover:border-opacity-100 hover:bg-opacity-70 transition-all`}
                >
                  <div className="flex items-center gap-3">
                    {file.type === "image" ? (
                      <Image className="w-5 h-5 text-[#C77DFF]" />
                    ) : (
                      <File className="w-5 h-5 text-[#00FFFF]" />
                    )}
                    <span className={`flex-1 ${selectedFile === file.id ? "text-[#C77DFF]" : "text-[#00FFFF]"}`}>
                      {file.name}
                    </span>
                    {file.clue && foundClues.has(file.clue) && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[#00FF88] text-xs"
                      >
                        ✓ CLUE FOUND
                      </motion.span>
                    )}
                    {file.clue && !foundClues.has(file.clue) && (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[#C77DFF] text-xs"
                      >
                        [HIDDEN DATA]
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating data particles */}
            <div className="mt-6 flex gap-2">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-[#00FF88] rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* File Preview & Clue Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* File Preview */}
            <div className="border border-[#C77DFF] border-opacity-30 bg-black bg-opacity-80 p-6">
              <h3 className="text-lg text-[#C77DFF] mb-4 border-b border-[#C77DFF] border-opacity-30 pb-2">
                FILE PREVIEW
              </h3>
              
              {selectedFileData ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-[#888888] text-sm mb-1">FILENAME:</p>
                    <p className="text-[#00FFFF] text-sm break-all">{selectedFileData.name}</p>
                  </div>
                  <div>
                    <p className="text-[#888888] text-sm mb-1">TYPE:</p>
                    <p className="text-[#00FFFF] text-sm uppercase">{selectedFileData.type}</p>
                  </div>
                  
                  {selectedFileData.clue && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-[#C77DFF] bg-[#C77DFF] bg-opacity-10 p-4 mt-4"
                    >
                      <p className="text-[#C77DFF] text-sm mb-2">METADATA FOUND:</p>
                      <p className="text-[#00FFFF] text-2xl tracking-widest text-center py-2">
                        {selectedFileData.hint}
                      </p>
                    </motion.div>
                  )}
                  
                  {!selectedFileData.clue && (
                    <p className="text-[#888888] text-sm italic">No hidden data detected</p>
                  )}
                </div>
              ) : (
                <p className="text-[#888888] text-sm text-center py-8">
                  Select a file to preview
                </p>
              )}
            </div>

            {/* Clues Collected */}
            <div className="border border-[#00FF88] border-opacity-30 bg-black bg-opacity-80 p-6">
              <h3 className="text-lg text-[#00FF88] mb-4 border-b border-[#00FF88] border-opacity-30 pb-2">
                CLUES COLLECTED
              </h3>
              <p className="text-[#888888] text-sm mb-3">
                {foundClues.size} / {requiredClues.length} FOUND
              </p>
              <div className="space-y-2">
                {Array.from(foundClues).map((clue, index) => {
                  const file = files.find((f) => f.clue === clue);
                  return (
                    <motion.div
                      key={clue}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[#00FF88] text-sm"
                    >
                      ✓ {file?.hint}
                    </motion.div>
                  );
                })}
              </div>

              {allCluesFound && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 border border-[#C77DFF] bg-[#C77DFF] bg-opacity-10 p-3"
                >
                  <p className="text-[#C77DFF] text-sm text-center">
                    💡 ALL CLUES FOUND! Combine them in order.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Password Input */}
            <div className="border border-[#00FFFF] border-opacity-30 bg-black bg-opacity-80 p-6">
              <form onSubmit={handleSubmit}>
                <label className="block mb-3 text-[#00FFFF] text-sm">ENTER KEYWORD:</label>
                <div className={`border ${error ? 'border-[#FF0033]' : 'border-[#00FFFF]'} bg-[#0A0A0A] p-1 mb-3`}>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="COMBINE CLUES..."
                    className="w-full bg-transparent border-none outline-none text-[#00FFFF] placeholder-[#888888] px-3 py-2 uppercase"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FF0033] text-xs mb-3"
                  >
                    ⚠ INCORRECT
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] text-sm hover:bg-[#00FFFF] hover:text-[#0A0A0A] transition-all"
                >
                  UNLOCK
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
