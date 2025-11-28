import React, { useEffect, useState } from 'react'
import { getGraph, getAlerts } from '../services/api'
import MetricsCards from '../components/MetricsCards.jsx'
import QuickActions from '../components/QuickActions.jsx'
import AlertsPanel from '../components/AlertsPanel.jsx'
import GeoThreatMapPreview from '../components/GeoThreatMapPreview.jsx'

export default function Dashboard({
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
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const [graph, alerts] = await Promise.all([
          getGraph(),
          getAlerts()
        ])
        if (cancelled) return

        const nodes = graph.nodes || []
        const alertsList = alerts.alerts || []

        const totalEntities = nodes.length
        const alertsCount = alertsList.length

        // High-risk threshold: risk_score >= 70
        const highRiskNodeIds = new Set(
          alertsList
            .filter(a => (a.risk_score || 0) >= 70)
            .map(a => a.node_id)
        )

        const riskScores = alertsList.map(a => Number(a.risk_score) || 0)
        const networkRiskIndex = riskScores.length
          ? riskScores.reduce((sum, v) => sum + v, 0) / riskScores.length
          : 0

        // Domain counts from node label or props.domain if present
        const domainCounts = {}
        nodes.forEach(n => {
          const domain = (n.props && (n.props.domain || n.props.sector)) || n.label || 'Unknown'
          domainCounts[domain] = (domainCounts[domain] || 0) + 1
        })

        const topDomains = Object.entries(domainCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => ({ name, count }))

        setMetrics({
          totalEntities,
          highRiskNodes: highRiskNodeIds.size,
          alertsCount,
          networkRiskIndex,
          topDomains
        })
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  if (loading) return <div className="p-4 text-sm text-slate-300">Loading dashboard...</div>
  if (error) return <div className="p-4 text-sm text-red-400">{error}</div>

  return (
    <div className="p-4 space-y-4">
      <MetricsCards metrics={metrics} />

      {/* Multi-Domain Risk Overview */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Multi-Domain Risk Overview</h2>
          <span className="text-[11px] text-slate-400">National threat posture across CrimeNet domains</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {[ 
            { name: 'Financial intelligence', score: 'High', anomalies: 42, flagged: 128, updated: '2 min ago' },
            { name: 'Telecom intelligence', score: 'Critical', anomalies: 31, flagged: 96, updated: '5 min ago' },
            { name: 'Mobility / border intelligence', score: 'High', anomalies: 18, flagged: 54, updated: '7 min ago' },
            { name: 'Corporate intelligence', score: 'Moderate', anomalies: 12, flagged: 37, updated: '12 min ago' },
            { name: 'Cyber intelligence', score: 'Moderate', anomalies: 9, flagged: 22, updated: '15 min ago' },
            { name: 'OSINT / external intel', score: 'Low', anomalies: 5, flagged: 11, updated: '20 min ago' },
          ].map((d) => (
            <div
              key={d.name}
              className="bg-slate-900 border border-slate-800 rounded-md px-2 py-2 flex flex-col gap-1"
            >
              <div className="text-[10px] uppercase tracking-wide text-slate-300">{d.name}</div>
              <div className="text-xs text-emerald-400 font-semibold">Risk: {d.score}</div>
              <div className="text-[11px] text-slate-300">Anomalies: {d.anomalies}</div>
              <div className="text-[11px] text-slate-300">Flagged entities: {d.flagged}</div>
              <div className="text-[10px] text-slate-500 mt-1">Updated {d.updated}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Health Snapshot */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-slate-100">Network Health Snapshot</h2>
          <span className="text-[11px] text-slate-400">Mini overview of the crime graph state</span>
        </div>
        <p className="text-xs text-slate-300">
          12 clusters detected · 3 high-risk hubs · 241 live edges · strong cross-domain linkage between financial,
          telecom, and mobility layers.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[11px] text-slate-200">
          <div className="bg-slate-900 border border-slate-800 rounded-md px-2 py-2 flex flex-col gap-0.5">
            <span className="uppercase tracking-wide text-slate-400">Network size</span>
            <span className="text-xs font-semibold text-emerald-400">{metrics?.totalEntities ?? 0} entities</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-md px-2 py-2 flex flex-col gap-0.5">
            <span className="uppercase tracking-wide text-slate-400">Active sub-networks</span>
            <span className="text-xs font-semibold text-emerald-400">12 clusters (mock)</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-md px-2 py-2 flex flex-col gap-0.5">
            <span className="uppercase tracking-wide text-slate-400">Threat centrality</span>
            <span className="text-xs font-semibold text-emerald-400">3 high-risk hubs (mock)</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-md px-2 py-2 flex flex-col gap-0.5">
            <span className="uppercase tracking-wide text-slate-400">Cross-domain links</span>
            <span className="text-xs font-semibold text-emerald-400">Dense FIU–telecom–border links</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-md px-2 py-2 flex flex-col gap-0.5">
            <span className="uppercase tracking-wide text-slate-400">Suspicious density</span>
            <span className="text-xs font-semibold text-emerald-400">High (mock)</span>
          </div>
        </div>
      </div>

      {/* Cross-Border Operations Strip */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Cross-Border Operations</h2>
          <span className="text-[11px] text-slate-400">Key Kenyan border posts and active interdictions</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[11px] text-slate-200">
          {[ 
            { name: 'Namanga', activeOps: 3, intercepts: 5, risk: 'High' },
            { name: 'Busia', activeOps: 2, intercepts: 3, risk: 'Medium' },
            { name: 'Malaba', activeOps: 4, intercepts: 6, risk: 'High' },
            { name: 'Lunga Lunga', activeOps: 1, intercepts: 2, risk: 'Medium' },
            { name: 'Lokichogio', activeOps: 1, intercepts: 1, risk: 'Elevated' },
          ].map((p) => (
            <div
              key={p.name}
              className="bg-slate-900 border border-slate-800 rounded-md px-2 py-2 flex flex-col gap-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-wide text-slate-300">{p.name}</span>
                <span className="text-[10px] text-emerald-400">{p.risk}</span>
              </div>
              <span className="text-[11px] text-slate-300">Active ops: {p.activeOps}</span>
              <span className="text-[11px] text-slate-300">Intercepts (24h): {p.intercepts}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-slate-800 rounded-lg border border-slate-700 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-100">Analyst Console</h2>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Quick controls to explore the network, drill into alerts, and test interventions.
          </p>
          <QuickActions
            onExploreGraph={onExploreGraph}
            onViewAlerts={onViewAlerts}
            onRunSimulation={onRunSimulation}
            onGenerateReport={onGenerateReport}
            onOpenJIIX={onOpenJIIX}
            onViewThreatFeed={onViewThreatFeed}
            onOpenCollaborationRooms={onOpenCollaborationRooms}
            onAddEvidence={onAddEvidence}
            onAddLogEntry={onAddLogEntry}
          />
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-3 flex flex-col gap-2">
          <h2 className="text-sm font-semibold mb-1 text-slate-100">Recent Alerts</h2>
          <div className="text-xs text-slate-300 mb-1">
            Live feed from the alerts engine, with a summary of the most critical items.
          </div>

          {/* Alerts Summary Panel */}
          <div className="bg-slate-900/70 border border-slate-700 rounded-md p-2 text-xs text-slate-200 flex flex-col gap-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">Top critical alerts</span>
              <button
                type="button"
                className="text-[11px] px-2 py-0.5 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
              >
                View all alerts
              </button>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
              {[ 
                { entity: 'Toyota Probox KDA 432X', type: 'Border anomaly', risk: 92, time: '2 min ago' },
                { entity: 'Account 0192-884233', type: 'Laundering pattern', risk: 88, time: '6 min ago' },
                { entity: 'SIM 2547xxxx321', type: 'Coordination cluster', risk: 81, time: '9 min ago' },
                { entity: 'Container MSKU1234567', type: 'Cargo mismatch', risk: 79, time: '15 min ago' },
                { entity: 'Cross-border route A3', type: 'Route anomaly', risk: 76, time: '19 min ago' },
              ].map((a) => (
                <div
                  key={a.entity + a.time}
                  className="flex items-center justify-between gap-2 border-b border-slate-800/60 last:border-b-0 pb-0.5"
                >
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-100 truncate">{a.entity}</span>
                    <span className="text-[10px] text-slate-400">{a.type}</span>
                  </div>
                  <div className="flex flex-col items-end text-[10px] text-slate-400 min-w-[72px]">
                    <span className="text-emerald-400 font-semibold">Risk {a.risk}</span>
                    <span>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto pr-1 mt-1">
            <AlertsPanel compact />
          </div>
        </div>
      </div>

      {/* Geographic Threat Map Preview (live map) */}
      <GeoThreatMapPreview />

      {/* Recent Activities Feed */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 mt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-slate-100">Recent Activities Feed</h2>
          <span className="text-[11px] text-slate-400">Last 10–20 system and analyst events</span>
        </div>
        <div className="text-xs text-slate-300 mb-1">
          Combined stream of alerts, AI findings, JIIX updates, border anomalies, dispatch actions, and financial
          pattern shifts.
        </div>
        <div className="max-h-64 overflow-y-auto pr-1 text-[11px] text-slate-200 space-y-1">
          {[
            {
              time: 'Just now',
              type: 'AI model finding',
              desc: 'Graph model flagged a new high-centrality hub linking telecom and financial nodes.',
            },
            {
              time: '2 min ago',
              type: 'New alert',
              desc: 'Critical laundering pattern detected on account 0192-884233 (linked to Wepesi cell).',
            },
            {
              time: '5 min ago',
              type: 'JIIX log entry',
              desc: 'Border unit at Namanga added vehicle KDA 432X to digital logbook and linked to CrimeNet node.',
            },
            {
              time: '9 min ago',
              type: 'Evidence added',
              desc: 'CCTV still from Mombasa Port uploaded to Evidence Vault and attached to container MSKU1234567.',
            },
            {
              time: '12 min ago',
              type: 'Border anomaly',
              desc: 'Repeated passport ID detected across two border posts within 24 hours.',
            },
            {
              time: '15 min ago',
              type: 'Dispatch action',
              desc: 'Unit Alpha-2 dispatched to intercept convoy near Thika based on route risk score.',
            },
            {
              time: '18 min ago',
              type: 'Financial pattern shift',
              desc: 'Spike in micro-deposits linked to suspected shell company cluster.',
            },
          ].map((e, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 border-b border-slate-800/70 last:border-b-0 pb-1"
            >
              <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500/80 flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wide text-slate-400">{e.type}</span>
                  <span className="text-[10px] text-slate-500">{e.time}</span>
                </div>
                <span className="text-[11px] text-slate-200">{e.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
