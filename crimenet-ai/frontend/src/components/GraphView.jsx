import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import { getGraph, getAlerts } from '../services/api'

export default function GraphView({ onNodeClick, filters }) {
  const ref = useRef(null)
  const cyRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let destroyed = false
    async function load() {
      try {
        setLoading(true)
        const [graph, alerts] = await Promise.all([
          getGraph(),
          getAlerts()
        ])
        if (destroyed) return

        const nodeRisk = {}
        ;(alerts.alerts || []).forEach(a => {
          const id = a.node_id
          const score = Number(a.risk_score) || 0
          if (!(id in nodeRisk) || score > nodeRisk[id]) {
            nodeRisk[id] = score
          }
        })

        const domainForNode = (n) => {
          const props = n.props || {}
          const raw = (props.domain || props.sector || n.label || '').toLowerCase()
          if (raw.includes('bank') || raw.includes('acct') || raw.includes('account')) return 'Finance'
          if (raw.includes('tel') || raw.includes('msisdn') || raw.includes('sim')) return 'Telecom'
          if (raw.includes('vehicle') || raw.includes('plate') || raw.includes('route')) return 'Mobility'
          if (raw.includes('company') || raw.includes('corp') || raw.includes('ltd')) return 'Corporate'
          if (raw.includes('forensic') || raw.includes('device')) return 'Forensics'
          return 'Other'
        }

        const entityTypeForNode = (n) => {
          const label = (n.label || '').toLowerCase()
          if (label.includes('person') || label.includes('individual')) return 'Person'
          if (label.includes('account')) return 'Account'
          if (label.includes('company') || label.includes('org')) return 'Company'
          if (label.includes('device') || label.includes('phone')) return 'Device'
          if (label.includes('vehicle') || label.includes('car')) return 'Vehicle'
          return 'Other'
        }

        const elements = []
        const nodes = graph.nodes || []
        const edges = graph.edges || []

        const activeFilters = filters || {}

        nodes.forEach(n => {
          const domain = domainForNode(n)
          const entityType = entityTypeForNode(n)
          const risk = nodeRisk[n.id] || 0

          if (activeFilters.domain && activeFilters.domain !== 'All' && activeFilters.domain !== domain) return
          if (activeFilters.entityType && activeFilters.entityType !== 'All' && activeFilters.entityType !== entityType) return
          if (activeFilters.riskBand && activeFilters.riskBand !== 'All') {
            if (activeFilters.riskBand === 'Low' && risk >= 40) return
            if (activeFilters.riskBand === 'Medium' && (risk < 40 || risk >= 70)) return
            if (activeFilters.riskBand === 'High' && risk < 70) return
          }

          const baseSize = 20
          const maxExtra = 20
          const size = baseSize + (risk / 100) * maxExtra

          elements.push({
            data: {
              id: n.id,
              label: n.props?.name || n.label,
              domain,
              risk,
              size,
              entityType
            }
          })
        })

        const nodeIds = new Set(elements.filter(el => el.data && el.data.id).map(el => el.data.id))

        edges.forEach(e => {
          if (!nodeIds.has(e.source) || !nodeIds.has(e.target)) return
          const weight = Number(e.props?.amount || e.props?.frequency || 1) || 1
          elements.push({
            data: {
              id: `${e.source}-${e.target}-${e.type}`,
              source: e.source,
              target: e.target,
              label: e.type,
              weight
            }
          })
        })

        const domainColors = {
          Finance: '#ef4444',
          Telecom: '#3b82f6',
          Mobility: '#22c55e',
          Corporate: '#eab308',
          Forensics: '#a855f7',
          Other: '#6b7280'
        }

        cyRef.current = cytoscape({
          container: ref.current,
          elements,
          style: [
            {
              selector: 'node',
              style: {
                'label': 'data(label)',
                'background-color': (ele) => domainColors[ele.data('domain')] || '#6b7280',
                'width': 'data(size)',
                'height': 'data(size)',
                'color': '#e5e7eb',
                'font-size': '8px',
                'text-valign': 'center',
                'text-halign': 'center'
              }
            },
            {
              selector: 'edge',
              style: {
                'line-color': '#6b7280',
                'target-arrow-shape': 'triangle',
                'target-arrow-color': '#6b7280',
                'width': 'mapData(weight, 1, 10, 1, 6)',
                'curve-style': 'bezier'
              }
            }
          ],
          layout: { name: 'cose' }
        })

        cyRef.current.on('tap', 'node', (evt) => {
          const id = evt.target.id()
          if (onNodeClick) onNodeClick(id)
        })
      } catch (e) {
        setError(String(e))
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { destroyed = true; if (cyRef.current) { cyRef.current.destroy() } }
  }, [onNodeClick, filters])

  if (loading) return <div className="text-xs text-slate-300">Loading graph...</div>
  if (error) return <div className="text-xs text-red-400">{error}</div>
  return <div ref={ref} className="w-full h-[70vh]" />
}
