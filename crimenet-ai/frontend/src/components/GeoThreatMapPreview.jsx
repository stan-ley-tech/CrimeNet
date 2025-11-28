import React, { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function GeoThreatMapPreview() {
  const center = [-0.1, 37.9] // Focus on Kenya

  const hotspots = [
    { id: 'nairobi', name: 'Nairobi hotspot', coords: [-1.286389, 36.817223], severity: 'high', domain: 'Financial · Telecom' },
    { id: 'mombasa', name: 'Mombasa Port', coords: [-4.043477, 39.668206], severity: 'high', domain: 'Cargo · Maritime' },
    { id: 'namanga', name: 'Namanga border', coords: [-2.541, 36.787], severity: 'medium', domain: 'Border · Mobility' },
  ]

  const routes = [
    {
      id: 'mombasa-nairobi-namanga',
      name: 'Mombasa → Nairobi → Namanga corridor',
      positions: [
        [-4.043477, 39.668206], // Mombasa
        [-1.286389, 36.817223], // Nairobi
        [-2.541, 36.787], // Namanga
      ],
    },
  ]

  const [selected, setSelected] = useState(null)

  const getColor = (severity) => {
    if (severity === 'high') return '#f97373'
    if (severity === 'medium') return '#facc15'
    return '#22c55e'
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 mt-2 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-slate-100">Geographic Threat Map Preview</h2>
        <span className="text-[11px] text-slate-400">Kenya hotspots, routes, and border risk zones</span>
      </div>

      <div className="h-48 rounded-md overflow-hidden border border-slate-800">
        <MapContainer
          center={center}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {hotspots.map((h) => (
            <CircleMarker
              key={h.id}
              center={h.coords}
              radius={6}
              pathOptions={{
                color: getColor(h.severity),
                fillColor: getColor(h.severity),
                fillOpacity: 0.85,
              }}
              eventHandlers={{
                click: () => setSelected({ type: 'hotspot', ...h }),
              }}
            />
          ))}

          {routes.map((r) => (
            <Polyline
              key={r.id}
              positions={r.positions}
              pathOptions={{ color: '#38bdf8', weight: 3, dashArray: '4 4' }}
              eventHandlers={{
                click: () => setSelected({ type: 'route', ...r }),
              }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="flex justify-between mt-1 text-[10px] text-slate-400">
        <span>
          Hotspots: {hotspots.length} · Cross-border risk zones: 3 · Active incidents: 4
        </span>
        <span>Routes flagged: {routes.length}</span>
      </div>

      {selected && (
        <div className="mt-1 text-[11px] bg-slate-900 border border-slate-800 rounded px-2 py-1.5 flex justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-slate-100 font-medium truncate">{selected.name}</span>
            <span className="text-slate-400 truncate">
              {selected.type === 'hotspot'
                ? `Hotspot · ${selected.domain}`
                : 'Key corridor · Multi-domain risk'}
            </span>
          </div>
          <span className="text-emerald-400 whitespace-nowrap">
            View full context in JIIX
          </span>
        </div>
      )}

      <div className="flex justify-end mt-1">
        <button
          type="button"
          className="text-[11px] px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
        >
          Open full Map View in JIIX
        </button>
      </div>
    </div>
  )
}
