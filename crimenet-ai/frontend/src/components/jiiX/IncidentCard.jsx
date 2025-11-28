import React from 'react'

export default function IncidentCard({ title, summary, severity, time }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-slate-100">{title}</span>
        <span className="text-[10px] text-slate-500">{time}</span>
      </div>
      <div className="text-[11px] text-slate-300 mb-1">{summary}</div>
      <div className="flex justify-between items-center text-[11px]">
        <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">{severity}</span>
        <button className="text-emerald-300 hover:text-emerald-200">Open details</button>
      </div>
    </div>
  )
}
