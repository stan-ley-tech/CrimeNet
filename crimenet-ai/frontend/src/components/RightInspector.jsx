import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function RightInspector({ node, isOpen, onClose, onDisrupt }) {
  if (!node) return null;

  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{ x: isOpen ? 0 : 500 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute right-0 top-0 h-full w-96 bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
        <h2 className="text-2xl font-bold leading-tight">{node.label}</h2>
        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Risk Score */}
        <div>
          <div className="text-sm opacity-70">Risk Score</div>
          <div className="text-5xl font-bold text-red-500 mt-1">
            {Math.round(node.risk || 0)}/100 {node.risk > 90 && "Very Hot"}
          </div>
        </div>

        {/* Role */}
        <div>
          <div className="text-sm opacity-70">Inferred Role</div>
          <div className="text-xl font-bold text-cyan-400 mt-1">
            {node.role || "Unknown / Mule"}
          </div>
        </div>

        {/* AI Insight */}
        <div>
          <div className="text-sm opacity-70 mb-2">AI Insight</div>
          <div className="p-4 bg-zinc-900 rounded-lg text-sm leading-relaxed border border-zinc-700">
            {node.id === "king"
              ? "This individual exhibits command-and-control patterns identical to 4 known syndicate leaders: call bursts before major shipments, financial control over 67% of network flow."
              : node.type === "company"
              ? "Shell company registered 72 hours after suspicious cargo movement. Classic trade-based laundering pattern."
              : "High centrality + sudden transaction volume spike. Likely operational lieutenant or money mule coordinator."}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onDisrupt && onDisrupt(node.id)}
          className="w-full py-4 bg-red-900/80 hover:bg-red-800 border border-red-700 rounded-lg font-bold text-lg transition"
        >
          Mark for Disruption
        </button>
      </div>
    </motion.div>
  );
}
