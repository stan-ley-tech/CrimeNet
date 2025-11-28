import React from "react";
import { Shield, Menu, X, Bell } from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen, onViewThreatFeed }) {
  return (
    <div className="h-20 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-6 z-50">
      {/* Left: Logo + tagline */}
      <div className="flex items-center gap-3">
        <Shield className="w-9 h-9 text-cyan-500" />
        <div className="flex flex-col leading-tight">
          <h1 className="text-2xl font-bold tracking-wider">CrimeNet AI</h1>
          <span className="text-[11px] text-cyan-300/80 tracking-[0.18em] uppercase">
            Predict · Expose · Disrupt
          </span>
        </div>
      </div>

      {/* Right: Agency + notifications + Hamburger for LeftSidebar */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-[11px]">
          <span className="px-3 py-1 rounded-full border border-emerald-500/60 bg-emerald-500/10 text-emerald-300 uppercase tracking-wide">
            Agency: DCI
          </span>
          <button
            type="button"
            className="relative p-2 rounded-full bg-zinc-900 border border-zinc-700 hover:border-emerald-500/70 hover:bg-zinc-800 transition-colors flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-200" />
            <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white px-1">
              3
            </span>
          </button>
        </div>
        <button
          onClick={() => setSidebarOpen && setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-zinc-800 rounded transition"
        >
          {sidebarOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>
    </div>
  );
}