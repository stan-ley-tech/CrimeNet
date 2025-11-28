import React from 'react'
import FeedItem from './FeedItem.jsx'

export default function LiveFeed() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-100 uppercase tracking-wide">Share update</label>
          <textarea
            rows={3}
            placeholder="Post real-time intelligence, field updates, or coordination notes across agencies..."
            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-500 resize-none"
          />
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
            <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100">
              <option>All agencies</option>
              <option>DCI</option>
              <option>NPS</option>
              <option>KRA / Customs</option>
              <option>Immigration</option>
            </select>
            <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100">
              <option>Alert</option>
              <option>Field report</option>
              <option>Note</option>
              <option>Dispatch</option>
              <option>Border event</option>
            </select>
            <button
              type="button"
              className="ml-auto inline-flex items-center justify-center px-3 py-1.5 rounded bg-emerald-500/90 hover:bg-emerald-400 text-slate-900 font-semibold"
            >
              Post to JIIX
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[220px] text-[11px]">
          <input
            type="text"
            placeholder="Search feed..."
            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500"
          />
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">All agencies</span>
            <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">High severity</span>
            <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">Border events</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-[11px] text-slate-400">
        <span>Real-time multi-agency intelligence feed</span>
        <button className="px-2 py-0.5 rounded border border-slate-700 hover:border-emerald-500/70 hover:bg-emerald-500/10">
          Pin latest alert
        </button>
      </div>

      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        <FeedItem
          agency="DCI"
          type="Alert"
          severity="High"
          time="2 min ago"
          message="Suspicious Toyota Probox detected at Namanga border. Linked to Wepesi network."
          tags={["Border", "Vehicle", "Wepesi"]}
        />
        <FeedItem
          agency="NPS"
          type="Field report"
          severity="Medium"
          time="8 min ago"
          message="Patrol unit Bravo-3 reports unregistered motorbike convoy diverting from usual route near Thika."
          tags={["Patrol", "Movement"]}
        />
        <FeedItem
          agency="KRA / Customs"
          type="Border event"
          severity="High"
          time="15 min ago"
          message="Container manifest mismatch flagged at Mombasa Port. Possible contraband linked to Wepesi suppliers."
          tags={["Cargo", "Port", "Manifest"]}
        />
      </div>
    </div>
  )
}
