import React from 'react'
import RoomCard from './RoomCard.jsx'

export default function CollaborationRooms() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Collaboration Rooms</h3>
        <p className="text-xs text-slate-300">
          Case-focused workspaces where agencies coordinate investigations, share evidence, and track actions.
        </p>
      </div>
      <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-3">
        <RoomCard
          title="Operation Wepesi"
          agencies={["DCI", "NPS", "KRA / Customs"]}
          messages={128}
          updated="10 min ago"
        />
        <RoomCard
          title="Port Watchlist"
          agencies={["KRA / Customs", "Immigration"]}
          messages={64}
          updated="32 min ago"
        />
      </div>
    </div>
  )
}
