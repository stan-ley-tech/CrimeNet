import React from 'react'

export default function LogEntryForm() {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 flex flex-col gap-2">
      <div className="flex gap-2">
        <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 w-32">
          <option>Person</option>
          <option>Vehicle</option>
          <option>Cargo</option>
          <option>Passport</option>
          <option>Patrol note</option>
        </select>
        <input
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          placeholder="Name / Plate / Manifest / Document number"
        />
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          placeholder="Origin"
        />
        <input
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          placeholder="Destination"
        />
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          placeholder="Officer name"
        />
        <input
          className="w-36 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          placeholder="Time"
        />
      </div>
      <textarea
        rows={2}
        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500 resize-none"
        placeholder="Notes, observations, or cross-reference to CrimeNet entity..."
      />
      <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
        <span>Linked to CrimeNet entity: none</span>
        <div className="flex gap-2">
          <button className="px-2 py-0.5 rounded border border-slate-700 hover:border-emerald-500/70 hover:bg-emerald-500/10">
            Attach to node
          </button>
          <button className="px-2 py-0.5 rounded bg-emerald-500/90 hover:bg-emerald-400 text-slate-900 font-semibold">
            Add entry
          </button>
        </div>
      </div>
    </div>
  )
}
