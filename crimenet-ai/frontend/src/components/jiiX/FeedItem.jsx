import React from 'react'

export default function FeedItem({ agency, type, severity, time, message, tags = [] }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full border border-slate-700 text-[10px] text-slate-300">
            {agency}
          </span>
          <span className="text-[11px] text-slate-400">{type}</span>
        </div>
        <span className="text-[10px] text-slate-500">{time}</span>
      </div>
      <div className="text-xs mb-1">{message}</div>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
          {tags.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 rounded-full border border-slate-700/80 bg-slate-900/60"
            >
              #{t}
            </span>
          ))}
        </div>
        <button className="text-[10px] text-amber-300 hover:text-amber-200">Pin</button>
      </div>
    </div>
  )
}
