import React, { useState } from 'react'

const AGENCIES = [
  'DCI',
  'Financial Reporting Centre (FRC)',
  'Immigration',
  'Cybercrime Unit',
  'NPS / NIS (mock)'
]

export default function LoginModal({ onLogin }) {
  const [role, setRole] = useState(AGENCIES[0])
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    setError('')
    if (onLogin) {
      onLogin({ role, username: username.trim() })
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-emerald-400">CrimeNet AI Access</h2>
        <p className="text-sm text-slate-300 mb-4">
          Select your agency and enter a handle. This is a local-only login for the demo; no real auth.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Agency</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {AGENCIES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Analyst username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. analyst.kariuki"
            />
          </div>
          {error && <div className="text-xs text-red-400">{error}</div>}
          <button
            type="submit"
            className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold py-2 rounded text-sm transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
