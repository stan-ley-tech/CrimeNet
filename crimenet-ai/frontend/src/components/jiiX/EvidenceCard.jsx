import React from 'react'

export default function EvidenceCard({ id, type, description, uploadedBy, time }) {
  return (
    <div className="col-span-12 md:col-span-6 bg-slate-900/70 border border-slate-800 rounded p-3 text-xs text-slate-200 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-slate-100">{id}</span>
        <span className="text-[10px] text-slate-500">{type}</span>
      </div>
      <div className="text-[11px] text-slate-300">{description}</div>
      <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
        <span>Uploaded by: {uploadedBy}</span>
        <span>{time}</span>
      </div>
      <div className="flex justify-between items-center text-[10px] mt-1">
        <button className="px-2 py-0.5 rounded border border-slate-700 hover:border-emerald-500/70 hover:bg-emerald-500/10">
          Attach to node/case
        </button>
        <span className="text-slate-500">Hash: 0x1234...abcd</span>
      </div>
    </div>
  )
}
