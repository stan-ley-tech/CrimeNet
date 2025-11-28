import React, { useState } from 'react'
import LiveFeed from '../components/jiiX/LiveFeed.jsx'
import BorderLogbooks from '../components/jiiX/BorderLogbooks.jsx'
import OperationsCenter from '../components/jiiX/OperationsCenter.jsx'
import CollaborationRooms from '../components/jiiX/CollaborationRooms.jsx'
import EvidenceVault from '../components/jiiX/EvidenceVault.jsx'
import MapView from '../components/jiiX/MapView.jsx'

const TABS = [
  'Live Feed',
  'Digital Logbooks',
  'Operations Center',
  'Collaboration Rooms',
  'Evidence Vault',
  'Map View',
]

export default function JIIXHome() {
  const [activeTab, setActiveTab] = useState('Live Feed')

  const renderActive = () => {
    switch (activeTab) {
      case 'Live Feed':
        return <LiveFeed />
      case 'Digital Logbooks':
        return <BorderLogbooks />
      case 'Operations Center':
        return <OperationsCenter />
      case 'Collaboration Rooms':
        return <CollaborationRooms />
      case 'Evidence Vault':
        return <EvidenceVault />
      case 'Map View':
        return <MapView />
      default:
        return <LiveFeed />
    }
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Joint Intelligence &amp; Information Exchange</h2>
          <p className="text-xs text-slate-400 mt-1">
            Multi-agency coordination layer for sharing intelligence, operations, evidence, and tactical views.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1 rounded-full border border-emerald-500/60 bg-emerald-500/10 text-emerald-300">
            Role: Inter-Agency Analyst
          </div>
          <div className="px-3 py-1 rounded-full border border-amber-500/60 bg-amber-500/10 text-amber-300">
            Global notifications: 3
          </div>
        </div>
      </header>

      <div className="border-b border-slate-700 flex flex-wrap gap-2 text-xs">
        {TABS.map((tab) => {
          const active = tab === activeTab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-t ${
                active
                  ? 'bg-slate-800 border-b-2 border-emerald-500 text-slate-100'
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-100'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 min-h-[320px]">
        {renderActive()}
      </div>
    </div>
  )
}
