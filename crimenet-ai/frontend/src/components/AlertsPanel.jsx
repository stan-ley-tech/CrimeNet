import React, { useEffect, useState } from 'react'
import { getAlerts } from '../services/api'

export default function AlertsPanel({ compact = false }) {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const data = await getAlerts()
        if (!cancelled) setAlerts(data.alerts || [])
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  if (loading) return <div className="text-xs text-slate-300">Loading alerts...</div>
  if (error) return <div className="text-xs text-red-400">{error}</div>

  if (!alerts.length) return <div className="text-xs text-slate-400">No alerts yet.</div>

  return (
    <div>
      {!compact && <div className="font-semibold mb-2">Alerts</div>}
      <ul className="space-y-2">
        {alerts.map(a => (
          <li key={a.id} className="border border-slate-600 rounded p-2 bg-slate-900/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm">Node: <span className="font-mono">{a.node_id}</span></div>
                <div className="text-[11px] text-slate-300">{a.summary || '—'}</div>
              </div>
              <div className="text-xs md:text-sm font-semibold text-emerald-400">{Math.round(a.risk_score)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
