import React from 'react'

export default function MetricsCards({ metrics }) {
  const {
    totalEntities = 0,
    highRiskNodes = 0,
    alertsCount = 0,
    networkRiskIndex = 0,
    topDomains = []
  } = metrics || {}

  const formatDomains = () => {
    if (!topDomains.length) return '—'
    return topDomains
      .slice(0, 3)
      .map(d => `${d.name} (${d.count})`)
      .join(', ')
  }

  // Map existing metrics into CrimeNet theme-aligned cards. Some values are placeholders
  // that can later be wired to richer backend metrics.
  const cards = [
    {
      label: 'Total criminal network entities',
      value: totalEntities,
    },
    {
      label: 'High-risk network nodes',
      value: highRiskNodes,
    },
    {
      label: 'Active organized crime alerts',
      value: alertsCount,
    },
    {
      label: 'Network threat level',
      value: networkRiskIndex >= 75 ? 'Critical' : networkRiskIndex >= 50 ? 'High' : networkRiskIndex >= 25 ? 'Moderate' : 'Low',
    },
    {
      label: 'Financial laundering exposure (KES)',
      value: 'KES — (placeholder)',
    },
    {
      label: 'Telecom coordination activity',
      value: 'Spikes & clusters (placeholder)',
    },
    {
      label: 'Cross-border movement flags',
      value: '— (placeholder)',
    },
    {
      label: 'Active criminal sub-networks',
      value: formatDomains(),
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-slate-800 border border-emerald-500/30 rounded-lg px-3 py-2 flex flex-col justify-between"
        >
          <div className="text-[11px] uppercase tracking-wide text-slate-300 mb-1">{c.label}</div>
          <div className="text-sm font-semibold text-emerald-400 truncate">{c.value}</div>
        </div>
      ))}
    </div>
  )
}
