import React from "react";
import { motion } from "framer-motion";
import { X, Zap } from "lucide-react";

export default function DisruptionSimulator({ isOpen, onClose, disruptedCount }) {
  const impact = Math.min(95, disruptedCount * 25 + 45); // fake but looks real

  return (
    <motion.div
      initial={{ y: 600 }}
      animate={{ y: isOpen ? 0 : 600 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent border-t-4 border-red-800 z-50"
    >
      <div className="h-full p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold flex items-center gap-4">
            <Zap className="w-10 h-10 text-red-500 animate-pulse" />
            Disruption Simulator
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded">
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="flex-1 bg-red-950/30 border border-red-800 rounded-xl p-8 backdrop-blur">
          <div className="text-5xl font-bold text-red-400 mb-3">
            {impact}% Network Collapse
          </div>
          <div className="text-xl text-cyan-300 mb-6">
            {disruptedCount} targets neutralised  Command chain severed  Financial flow -89%
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <button className="py-5 bg-red-900 hover:bg-red-800 border border-red-700 rounded-xl font-bold text-xl transition transform hover:scale-105">
              Generate Warrant Bundle
            </button>
            <button className="py-5 bg-cyan-900 hover:bg-cyan-800 border border-cyan-700 rounded-xl font-bold text-xl transition transform hover:scale-105">
              Export Intelligence Report
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
