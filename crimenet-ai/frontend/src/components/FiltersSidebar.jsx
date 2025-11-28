import React from 'react'

export default function FiltersSidebar({ filters, onChange }) {
  const current = filters || {}

  const update = (patch) => {
    if (onChange) onChange({ ...current, ...patch })
  }

  return (
    <div className="space-y-3 text-xs">
      <div>
        <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Domain</div>
        <select
          value={current.domain || 'All'}
          onChange={(e) => update({ domain: e.target.value })}
          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
        >
          <option>All</option>
          <option>Finance</option>
          <option>Telecom</option>
          <option>Mobility</option>
          <option>Corporate</option>
          <option>Forensics</option>
        </select>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Risk level</div>
        <select
          value={current.riskBand || 'All'}
          onChange={(e) => update({ riskBand: e.target.value })}
          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Entity type</div>
        <select
          value={current.entityType || 'All'}
          onChange={(e) => update({ entityType: e.target.value })}
          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
        >
          <option>All</option>
          <option>Person</option>
          <option>Company</option>
          <option>Account</option>
          <option>Device</option>
          <option>Vehicle</option>
        </select>
      </div>
    </div>
  )
}
