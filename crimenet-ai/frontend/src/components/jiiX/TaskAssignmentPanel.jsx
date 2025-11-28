import React from 'react'

export default function TaskAssignmentPanel() {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 flex flex-col gap-2">
      <h3 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Task Assignments</h3>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          placeholder="Task summary"
        />
        <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 w-32">
          <option>Any agency</option>
          <option>DCI</option>
          <option>NPS</option>
          <option>KRA / Customs</option>
        </select>
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          placeholder="Assign to unit / officer"
        />
        <input
          className="w-28 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          placeholder="Priority"
        />
      </div>
      <textarea
        rows={2}
        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500 resize-none"
        placeholder="Context, linked incident, or CrimeNet recommendation..."
      />
      <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
        <span>Linked to: none</span>
        <div className="flex gap-2">
          <button className="px-2 py-0.5 rounded border border-slate-700 hover:border-emerald-500/70 hover:bg-emerald-500/10">
            Attach incident
          </button>
          <button className="px-2 py-0.5 rounded bg-emerald-500/90 hover:bg-emerald-400 text-slate-900 font-semibold">
            Assign task
          </button>
        </div>
      </div>
    </div>
  )
}
