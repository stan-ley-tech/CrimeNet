import React from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle } from "lucide-react";

const alerts = [
  {
    level: "HIGH",
    text: "New mule account cluster detected (6 accounts, 94% match)",
    time: "2 min ago",
  },
  {
    level: "MED",
    text: "SIM 0798213344 → 47 calls to known trafficker in 24h",
    time: "18 min ago",
  },
  {
    level: "MED",
    text: "Swift Logistics Ltd registered 3 days after vehicle sighting",
    time: "1 hour ago",
  },
];

export default function LeftSidebar({ isOpen }) {
  return (
    <motion.div
      initial={{ x: -400 }}
      animate={{ x: isOpen ? 0 : -400 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-96 bg-zinc-950 border-r border-zinc-800 flex flex-col fixed inset-y-14 left-0 z-40"
    >
      {/* Search */}
      <div className="p-5 border-b border-zinc-800">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search people, phones, accounts, companies, vehicles…"
            className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-cyan-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Alerts */}
      <div className="flex-1 overflow-y-auto p-5">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Active Alerts ({alerts.length})
        </h3>

        <div className="space-y-4">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                alert.level === "HIGH"
                  ? "bg-red-950/30 border-red-800"
                  : "bg-amber-950/20 border-amber-800"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="text-sm font-medium leading-tight">
                  {alert.text}
                </div>
                <span
                  className={`ml-3 px-2 py-0.5 text-xs rounded font-bold ${
                    alert.level === "HIGH" ? "bg-red-800" : "bg-amber-800"
                  }`}
                >
                  {alert.level}
                </span>
              </div>
              <div className="text-xs opacity-60 mt-2">{alert.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Temporal Slider */}
      <div className="p-5 border-t border-zinc-800">
        <div className="text-sm font-bold mb-3">Temporal Focus</div>
        <input
          type="range"
          className="w-full h-2 accent-cyan-500"
          defaultValue={85}
        />
        <div className="flex justify-between text-xs opacity-60 mt-2">
          <span>Jan 2025</span>
          <span className="text-cyan-400">14 Mar 2025</span>
          <span>Today</span>
        </div>
      </div>
    </motion.div>
  );
}