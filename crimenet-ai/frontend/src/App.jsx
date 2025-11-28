import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import GraphView from './components/GraphView.jsx'
import AlertsPanel from './components/AlertsPanel.jsx'
import LoginModal from './components/LoginModal.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NodeDetails from './components/NodeDetails.jsx'
import FiltersSidebar from './components/FiltersSidebar.jsx'
import LeftSidebar from './components/LeftSidebar.jsx'
import GraphCanvas from './components/GraphCanvas.jsx'
import RightInspector from './components/RightInspector.jsx'
import DisruptionSimulator from './components/DisruptionSimulator.jsx'
import JIIXHome from './pages/JIIXHome.jsx'

export default function App() {
  const [role, setRole] = useState(null)
  const [username, setUsername] = useState('')
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [graphFilters, setGraphFilters] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedWepesiNode, setSelectedWepesiNode] = useState(null)
  const [disruptedCount, setDisruptedCount] = useState(0)
  const [simulatorOpen, setSimulatorOpen] = useState(false)
  const [view, setView] = useState('dashboard') // 'dashboard' | 'graph' | 'alerts' | 'simulation' | 'report' | 'liveThreat' | 'jiix'

  const [liveEvents, setLiveEvents] = useState([])
  const [liveAutoRefresh, setLiveAutoRefresh] = useState(true)
  const [liveSeverityFilter, setLiveSeverityFilter] = useState('all')

  const handleLogin = ({ role: selectedRole, username: enteredUsername }) => {
    setRole(selectedRole)
    setUsername(enteredUsername)
  }

  const handleExploreGraph = () => {
    setView('graph')
  }
  const handleViewAlerts = () => {
    setView('alerts')
  }
  const handleRunSimulation = () => {
    setView('simulation')
  }
  const handleGenerateReport = () => {
    setView('report')
  }
  const handleViewThreatFeed = () => {
    setView('liveThreat')
  }
  const handleOpenJIIX = () => {
    setView('jiix')
  }
  const handleOpenCollaborationRooms = () => {
    setView('jiix')
  }
  const handleAddEvidence = () => {
    setView('jiix')
  }
  const handleAddLogEntry = () => {
    setView('jiix')
  }

  let content
  if (!role) {
    content = <LoginModal onLogin={handleLogin} />
  } else if (view === 'dashboard') {
    content = (
      <>
        {/* Dashboard only (no embedded backend graph) */}
        <Dashboard
          onExploreGraph={handleExploreGraph}
          onViewAlerts={handleViewAlerts}
          onRunSimulation={handleRunSimulation}
          onGenerateReport={handleGenerateReport}
          onViewThreatFeed={handleViewThreatFeed}
          onOpenJIIX={handleOpenJIIX}
          onOpenCollaborationRooms={handleOpenCollaborationRooms}
          onAddEvidence={handleAddEvidence}
          onAddLogEntry={handleAddLogEntry}
        />
      </>
    )
  } else if (view === 'graph') {
    content = (
      <>
        {/* Dedicated Network Graph view */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-100">Network Graph – Analyst View</h2>
            <button
              className="text-xs px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
              onClick={() => setView('dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Full interactive crime network visualization: zoom, pan, filter by domain and risk, click nodes
            for details, and read linked alerts.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 p-4 transition-all duration-300">
          <div className="col-span-12 lg:hidden bg-slate-800 rounded shadow p-3 mb-4">
            <FiltersSidebar filters={graphFilters} onChange={setGraphFilters} />
          </div>
          <div className="col-span-12 lg:col-span-9 grid grid-cols-12 gap-4">
            <div className="hidden lg:block col-span-3 bg-slate-800 rounded shadow p-3">
              <FiltersSidebar filters={graphFilters} onChange={setGraphFilters} />
            </div>
            <div className="col-span-12 lg:col-span-9 bg-slate-800 rounded shadow p-2">
              <GraphView onNodeClick={setSelectedNodeId} filters={graphFilters} />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            <div className="bg-slate-800 rounded shadow p-3 h-64 lg:h-full">
              <NodeDetails selectedNodeId={selectedNodeId} />
            </div>
            <div className="bg-slate-800 rounded shadow p-2 hidden lg:block">
              <AlertsPanel />
            </div>
          </div>
        </div>
      </>
    )
  } else if (view === 'alerts') {
    content = (
      <>
        {/* Dedicated Alerts view */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-100">Alerts – Analyst View</h2>
            <button
              className="text-xs px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
              onClick={() => setView('dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Full list of alerts detected by CrimeNet AI, ranked by severity and risk. Click an alert to open
            the related node in the inspector.
          </p>
        </div>

        <div className="p-4 pt-0">
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="p-3 border-b border-slate-700 text-xs text-slate-200 flex items-center justify-between">
              <span>Active Alerts</span>
              <span className="text-[11px] text-slate-400">
                Use filters in the Network Graph view for advanced domain filtering.
              </span>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              <div className="p-3">
                <AlertsPanel />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else if (view === 'simulation') {
    content = (
      <>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-100">The Simulation Panel</h2>
            <button
              className="text-xs px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
              onClick={() => setView('dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Run "what-if" interventions on the crime network before acting in the real world. Select a node type
            and an intervention action, then run the simulation to see the projected impact.
          </p>
        </div>

        <div className="p-4 pt-0 grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5 bg-slate-800 rounded-lg border border-slate-700 p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-100 tracking-wide uppercase">
                Target node type
              </label>
              <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100">
                <option>Person</option>
                <option>Account</option>
                <option>SIM</option>
                <option>Company</option>
                <option>Device</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-100 tracking-wide uppercase">
                Intervention action
              </label>
              <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100">
                <option>Freeze account</option>
                <option>Disable SIM</option>
                <option>Arrest target</option>
                <option>Intercept cargo</option>
                <option>Shut down company</option>
              </select>
            </div>

            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center text-xs font-medium px-3 py-1.5 rounded bg-emerald-500/90 hover:bg-emerald-400 text-slate-900 shadow-sm"
            >
              Run Simulation
            </button>

            <p className="text-[11px] text-slate-400">
              Use this panel to experiment with interventions before acting. In a full implementation, the
              selections above would be linked to the live crime network graph.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 bg-slate-800 rounded-lg border border-slate-700 p-4 flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Simulation Output (mock)</h3>
            <p className="text-xs text-slate-300">
              This section shows the kind of insights CrimeNet would generate after running a simulation.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="bg-slate-900/60 rounded p-2 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Impact Score</div>
                <div className="text-sm font-semibold">— % network disruption</div>
              </div>
              <div className="bg-slate-900/60 rounded p-2 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Collapsed subgraphs</div>
                <div className="text-sm">Highlighted cells and clusters at risk</div>
              </div>
              <div className="bg-slate-900/60 rounded p-2 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Fallback routes</div>
                <div className="text-sm">Predicted movement and alternative channels</div>
              </div>
              <div className="bg-slate-900/60 rounded p-2 border border-slate-700/70 col-span-2">
                <div className="text-[11px] text-slate-400 mb-1">Why this action is effective</div>
                <div className="text-sm">
                  Narrative explanation tying the chosen action to specific vulnerabilities and key nodes in the
                  network.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else if (view === 'report') {
    content = (
      <>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-100">Generate Report</h2>
            <button
              className="text-xs px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
              onClick={() => setView('dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Prepare an intelligence report for sharing, case handoff, or briefing. This panel summarizes the selected
            node or operation together with alerts, evidence, reasoning, and suggested next steps.
          </p>
        </div>

        <div className="p-4 pt-0 grid grid-cols-12 gap-4">
          {/* Left: report configuration and metadata */}
          <div className="col-span-12 lg:col-span-5 bg-slate-800 rounded-lg border border-slate-700 p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Report title</label>
              <input
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 placeholder-slate-500"
                placeholder="e.g. Network disruption assessment for Node-42"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Scope</label>
              <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100">
                <option>Selected node</option>
                <option>Current operation</option>
                <option>Full cell / subgraph</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Include sections</label>
              <div className="space-y-1 text-xs text-slate-200">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-emerald-500" />
                  <span>Summary of selected node / operation</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-emerald-500" />
                  <span>Full alert log</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-emerald-500" />
                  <span>Evidence bundle (IDs + hashed references)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-emerald-500" />
                  <span>AI explanation and reasoning</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-emerald-500" />
                  <span>Network snapshot (image)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-emerald-500" />
                  <span>Suggested next steps</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-emerald-500" />
                  <span>Confidence markers</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Export options</label>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
                >
                  Export JSON
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
                >
                  Export PDF (stub)
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
                >
                  Download evidence bundle
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                For the hackathon, these exports are visual placeholders; a production deployment would generate real
                files and evidence packages.
              </p>
            </div>
          </div>

          {/* Right: preview-style layout of what the report contains */}
          <div className="col-span-12 lg:col-span-7 bg-slate-800 rounded-lg border border-slate-700 p-4 flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Report preview (mock)</h3>
            <p className="text-xs text-slate-300">
              This preview shows how CrimeNet would structure the generated report for sharing with other analysts or
              enforcement partners.
            </p>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="bg-slate-900/60 rounded p-3 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Summary</div>
                <div className="text-sm">
                  High-level description of the selected node or operation, key roles, and current risk posture.
                </div>
              </div>

              <div className="bg-slate-900/60 rounded p-3 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Alert log</div>
                <div className="text-sm">Chronological list of relevant alerts, with severity, time, and domain.</div>
              </div>

              <div className="bg-slate-900/60 rounded p-3 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Evidence bundle</div>
                <div className="text-sm">
                  Compact set of evidence IDs and hashed references that can be cross-checked in source systems.
                </div>
              </div>

              <div className="bg-slate-900/60 rounded p-3 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">AI explanation &amp; reasoning</div>
                <div className="text-sm">
                  Narrative explanation that connects the data, graph patterns, and alerts into a human-readable
                  assessment.
                </div>
              </div>

              <div className="bg-slate-900/60 rounded p-3 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Network snapshot</div>
                <div className="text-sm">Static image or thumbnail of the current network view for quick context.</div>
              </div>

              <div className="bg-slate-900/60 rounded p-3 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Suggested next steps</div>
                <div className="text-sm">
                  Prioritized actions for investigators or enforcement, based on current risk and leverage points.
                </div>
              </div>

              <div className="bg-slate-900/60 rounded p-3 border border-slate-700/70">
                <div className="text-[11px] text-slate-400 mb-1">Confidence markers</div>
                <div className="text-sm">
                  Confidence scores and caveats that indicate where the AI is certain, and where human review is
                  critical.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else if (view === 'liveThreat') {
    useEffect(() => {
      if (!liveAutoRefresh) return

      const interval = setInterval(() => {
        setLiveEvents((prev) => {
          const id = prev.length + 1
          const severities = ['critical', 'high', 'medium']
          const sev = severities[Math.floor(Math.random() * severities.length)]
          const now = new Date()
          const timeLabel = now.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })

          const samples = [
            {
              title: 'Cross-border route anomaly – Namanga',
              desc: 'High-risk convoy pattern detected on Nairobi–Namanga road with repeated SIM/plate reuse.',
            },
            {
              title: 'Suspicious cash-in network – Eastleigh',
              desc: 'Clustered micro-deposits into linked accounts around Eastleigh flagged as laundering pattern.',
            },
            {
              title: 'SIM coordination spike – CBD',
              desc: 'Sharp increase in short-burst telecom activity between known risk SIMs around Nairobi CBD.',
            },
            {
              title: 'Port manifest mismatch – Mombasa',
              desc: 'Container manifest metadata inconsistent with declared cargo; linked to prior risk entity.',
            },
          ]

          const sample = samples[Math.floor(Math.random() * samples.length)]

          const event = {
            id,
            severity: sev,
            time: timeLabel,
            title: sample.title,
            desc: sample.desc,
          }

          const next = [event, ...prev]
          return next.slice(0, 20)
        })
      }, 10000)

      return () => clearInterval(interval)
    }, [liveAutoRefresh])

    const filteredEvents = liveEvents.filter((e) => {
      if (liveSeverityFilter === 'all') return true
      if (liveSeverityFilter === 'critical') return e.severity === 'critical'
      if (liveSeverityFilter === 'high') return e.severity === 'high'
      if (liveSeverityFilter === 'medium') return e.severity === 'medium'
      return true
    })

    content = (
      <>
        {/* Live Threat Feed header */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-100">Live Threat Feed</h2>
            <button
              className="text-xs px-3 py-1 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
              onClick={() => setView('dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Real-time stream of high-priority alerts and incidents. Use this view to monitor live threats as they
            appear across the network.
          </p>
        </div>

        {/* Live Threat feed content (dynamic mock events) */}
        <div className="p-4 pt-0 flex flex-col gap-4">
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="p-3 border-b border-slate-700 text-xs text-slate-200 flex items-center justify-between">
              <span>Live Threat Feed</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <input
                    id="auto-refresh-toggle"
                    type="checkbox"
                    className="accent-emerald-500"
                    checked={liveAutoRefresh}
                    onChange={(e) => setLiveAutoRefresh(e.target.checked)}
                  />
                  <label htmlFor="auto-refresh-toggle">Auto-refresh (mock)</label>
                </div>
                <button
                  type="button"
                  className="text-[11px] px-2 py-0.5 rounded border border-slate-600 hover:border-emerald-500/70 hover:bg-emerald-500/10"
                  onClick={() => {
                    setLiveEvents((prev) => {
                      const id = prev.length + 1
                      const event = {
                        id,
                        severity: 'high',
                        time: 'Now',
                        title: 'Manual inject – analyst test event',
                        desc: 'Analyst injected a sample threat item to test workflow and downstream triage.',
                      }
                      const next = [event, ...prev]
                      return next.slice(0, 20)
                    })
                  }}
                >
                  Inject sample event
                </button>
              </div>
            </div>

            <div className="px-3 pt-2 pb-1 flex items-center gap-2 text-[11px] text-slate-300 border-b border-slate-800 bg-slate-900/60">
              <span className="text-slate-400">Severity filter:</span>
              {['all', 'critical', 'high', 'medium'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLiveSeverityFilter(lvl)}
                  className={`px-2 py-0.5 rounded-full border text-[11px] capitalize ${
                    liveSeverityFilter === lvl
                      ? 'border-emerald-500/80 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-700 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="max-h-[260px] overflow-y-auto">
              <div className="p-3 space-y-1 text-xs">
                {filteredEvents.length === 0 && (
                  <div className="text-[11px] text-slate-400">
                    Waiting for live events. Auto-refresh will inject mock items every few seconds.
                  </div>
                )}
                {filteredEvents.map((e) => (
                  <div
                    key={e.id}
                    className="border border-slate-800 rounded-md px-2 py-1.5 flex justify-between gap-2 bg-slate-950/60"
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full ${
                            e.severity === 'critical'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                              : e.severity === 'high'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {e.severity}
                        </span>
                        <span className="text-[11px] text-slate-100 truncate">{e.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-300">{e.desc}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 whitespace-nowrap">{e.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero-style network snapshot above simulation */}
          <div className="bg-black rounded-lg border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Network snapshot</h3>
              <span className="text-[11px] text-slate-400">Interactive view of the active crime network.</span>
            </div>
            <div className="relative h-96">
              <GraphCanvas onNodeClick={setSelectedWepesiNode} />
              <RightInspector
                node={selectedWepesiNode}
                isOpen={!!selectedWepesiNode}
                onClose={() => setSelectedWepesiNode(null)}
                onDisrupt={() => {
                  /* no-op in this view for now */
                }}
              />
            </div>
          </div>

          {/* Simulation context and panel below the network snapshot */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 flex flex-col gap-4 mb-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-100 tracking-wide uppercase mb-1">
                Intervene from the threat feed
              </h3>
              <p className="text-xs text-slate-300">
                Use the same simulation controls below to test how disrupting key nodes from the live feed would
                impact the wider network before acting.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-100 tracking-wide uppercase">
                    Target node type
                  </label>
                  <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100">
                    <option>Person</option>
                    <option>Account</option>
                    <option>SIM</option>
                    <option>Company</option>
                    <option>Device</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-100 tracking-wide uppercase">
                    Intervention action
                  </label>
                  <select className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100">
                    <option>Freeze account</option>
                    <option>Disable SIM</option>
                    <option>Arrest target</option>
                    <option>Intercept cargo</option>
                    <option>Shut down company</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="mt-2 inline-flex items-center justify-center text-xs font-medium px-3 py-1.5 rounded bg-emerald-500/90 hover:bg-emerald-400 text-slate-900 shadow-sm"
                >
                  Run Simulation
                </button>

                <p className="text-[11px] text-slate-400">
                  Here the analyst can quickly test interventions against threats they see in the live feed before
                  committing to real-world action.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-7 bg-slate-900/60 rounded-lg border border-slate-700/70 p-4 flex flex-col gap-3">
                <h4 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Simulation impact (mock)</h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
                  <div className="bg-slate-900 rounded p-2 border border-slate-700">
                    <div className="text-[11px] text-slate-400 mb-1">Impact Score</div>
                    <div className="text-sm font-semibold">— % network disruption</div>
                  </div>
                  <div className="bg-slate-900 rounded p-2 border border-slate-700">
                    <div className="text-[11px] text-slate-400 mb-1">Collapsed subgraphs</div>
                    <div className="text-sm">Highlighted cells and clusters at risk</div>
                  </div>
                  <div className="bg-slate-900 rounded p-2 border border-slate-700">
                    <div className="text-[11px] text-slate-400 mb-1">Fallback routes</div>
                    <div className="text-sm">Predicted movement and alternative channels</div>
                  </div>
                  <div className="bg-slate-900 rounded p-2 border border-slate-700 col-span-2">
                    <div className="text-[11px] text-slate-400 mb-1">Why this action is effective</div>
                    <div className="text-sm">
                      Narrative explanation tying the action to weaknesses in the active threat pathways.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else if (view === 'jiix') {
    content = (
      <>
        <JIIXHome />
      </>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onViewThreatFeed={handleViewThreatFeed}
      />
      <LeftSidebar isOpen={sidebarOpen} />
      {content}
    </div>
  )
}
