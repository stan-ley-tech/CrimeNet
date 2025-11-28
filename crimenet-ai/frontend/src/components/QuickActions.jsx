import React from 'react'

export default function QuickActions({
  onExploreGraph,
  onViewAlerts,
  onRunSimulation,
  onGenerateReport,
  onOpenJIIX,
  onViewThreatFeed,
  onOpenCollaborationRooms,
  onAddEvidence,
  onAddLogEntry,
}) {
  const btnBase =
    'text-xs md:text-sm px-3 py-2 rounded-md font-medium border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10 transition-colors'

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <button className={btnBase} onClick={onExploreGraph}>Explore Network Graph</button>
      <button className={btnBase} onClick={onViewAlerts}>Open Alerts Workspace</button>
      <button className={btnBase} onClick={onRunSimulation}>Run Simulation</button>
      <button className={btnBase} onClick={onGenerateReport}>Generate Report</button>
      <button className={btnBase} onClick={onViewThreatFeed}>Open Live Threat Feed</button>
      <button className={btnBase} onClick={onOpenJIIX}>Joint Intelligence &amp; Information Exchange Layer</button>
      <button className={btnBase} onClick={onOpenCollaborationRooms}>Open Collaboration Rooms</button>
      <button className={btnBase} onClick={onAddEvidence}>Add Evidence</button>
      <button className={btnBase} onClick={onAddLogEntry}>Add Log Entry</button>
    </div>
  )
}
