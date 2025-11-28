import React, { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PopupModal from './PopupModal.jsx'

export default function MapView() {
  const center = [-0.1, 37.9] // Kenya focus

  const hotspots = [
    { id: 'nairobi', name: 'Nairobi CBD', coords: [-1.286389, 36.817223], severity: 'critical', domains: ['Financial', 'Telecom'] },
    { id: 'eastleigh', name: 'Eastleigh node', coords: [-1.2833, 36.85], severity: 'high', domains: ['Financial', 'OSINT'] },
    { id: 'mombasa', name: 'Mombasa Port', coords: [-4.043477, 39.668206], severity: 'high', domains: ['Cargo', 'Maritime'] },
    { id: 'namanga', name: 'Namanga Border', coords: [-2.541, 36.787], severity: 'medium', domains: ['Border', 'Mobility'] },
    { id: 'busia', name: 'Busia Border', coords: [0.46, 34.11], severity: 'medium', domains: ['Border'] },
  ]

  const routes = [
    {
      id: 'mombasa-corridor',
      name: 'Mombasa → Nairobi → Nakuru → Eldoret corridor',
      positions: [
        [-4.043477, 39.668206], // Mombasa
        [-1.286389, 36.817223], // Nairobi
        [-0.3031, 36.0800],     // Nakuru
        [0.5204, 35.2698],      // Eldoret
      ],
      risk: 'High',
    },
    {
      id: 'nairobi-namanga',
      name: 'Nairobi → Namanga cross-border route',
      positions: [
        [-1.286389, 36.817223], // Nairobi
        [-2.541, 36.787],       // Namanga
      ],
      risk: 'Critical',
    },
  ]

  const [selectedFeature, setSelectedFeature] = useState(null)

  const getSeverityColor = (severity) => {
    if (severity === 'critical') return '#f97373'
    if (severity === 'high') return '#fb923c'
    if (severity === 'medium') return '#facc15'
    return '#22c55e'
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">Map View</h2>
        <span className="text-[11px] text-slate-400">Kenya geospatial intelligence overlays</span>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px]">
        <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100">
          <option>All domains</option>
          <option>Financial</option>
          <option>Telecom</option>
          <option>Mobility / Border</option>
          <option>Corporate</option>
          <option>Cyber</option>
          <option>OSINT</option>
        </select>
        <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100">
          <option>All layers</option>
          <option>Hotspots</option>
          <option>Routes</option>
          <option>Border crossings</option>
        </select>
        <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100">
          <option>All risk bands</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
        </select>
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-lg h-80 overflow-hidden">
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
              radius={7}
              pathOptions={{
                color: getSeverityColor(h.severity),
                fillColor: getSeverityColor(h.severity),
                fillOpacity: 0.9,
              }}
              eventHandlers={{
                click: () => setSelectedFeature({ type: 'hotspot', ...h }),
              }}
            />
          ))}

          {routes.map((r) => (
            <Polyline
              key={r.id}
              positions={r.positions}
              pathOptions={{ color: '#38bdf8', weight: 3, dashArray: '4 4' }}
              eventHandlers={{
                click: () => setSelectedFeature({ type: 'route', ...r }),
              }}
            />
          ))}
        </MapContainer>
      </div>

      <PopupModal
        isOpen={!!selectedFeature}
        title={selectedFeature?.name || 'Location details'}
        onClose={() => setSelectedFeature(null)}
      >
        {selectedFeature && selectedFeature.type === 'hotspot' && (
          <div className="space-y-1 text-xs text-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-400">Type</span>
              <span className="text-slate-100">Hotspot</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Domains</span>
              <span className="text-slate-100">{selectedFeature.domains.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Severity</span>
              <span className="text-emerald-400 capitalize">{selectedFeature.severity}</span>
            </div>
            <p className="mt-2 text-slate-300">
              In a full deployment this pane would show linked alerts, entities, and historical incidents connected to
              this location in the CrimeNet graph.
            </p>
          </div>
        )}
        {selectedFeature && selectedFeature.type === 'route' && (
          <div className="space-y-1 text-xs text-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-400">Type</span>
              <span className="text-slate-100">Route / corridor</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Risk band</span>
              <span className="text-emerald-400">{selectedFeature.risk}</span>
            </div>
            <p className="mt-2 text-slate-300">
              This represents a corridor where CrimeNet has detected repeated suspicious movements, cargo patterns or
              coordination across multiple domains.
            </p>
          </div>
        )}
      </PopupModal>
    </div>
  )
}