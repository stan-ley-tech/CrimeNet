import React from 'react'

export default function RoomCard({ title, agencies, messages, updated }) {
  return (
    <div className="col-span-12 md:col-span-6 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-slate-100">{title}</span>
        <span className="text-[10px] text-slate-500">{updated}</span>
      </div>
      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
        {agencies.map((a) => (
          <span key={a} className="px-2 py-0.5 rounded-full border border-slate-700">
            {a}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-[11px] mt-1">
        <span>{messages} messages</span>
        <button className="text-emerald-300 hover:text-emerald-200">Open room</button>
      </div>
    </div>
  )
}
