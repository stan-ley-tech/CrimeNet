import React from 'react'

export default function PopupModal({ title, description }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-slate-100">{title}</span>
        <button className="text-[11px] text-emerald-300 hover:text-emerald-200">View details</button>
      </div>
      <div className="text-[11px] text-slate-300 mb-1">{description}</div>
      <div className="text-[10px] text-slate-500">
        Linked alerts, evidence, last known location, and recommended actions would appear here.
      </div>
    </div>
  )
}
