import React from 'react'
import LogEntryForm from './LogEntryForm.jsx'

export default function BorderLogbooks() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Digital Border Logbooks</h3>
        <p className="text-xs text-slate-300">
          Structured digital logbooks for people, vehicles, cargo, and documentation across border points and stations.
        </p>
        <LogEntryForm />
      </div>
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Recent entries</span>
          <span>Synced across stations</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg max-h-[380px] overflow-y-auto">
          <table className="w-full text-[11px] text-slate-200">
            <thead className="bg-slate-900/60 text-slate-400">
              <tr>
                <th className="px-2 py-1 text-left">Type</th>
                <th className="px-2 py-1 text-left">Name / Plate / ID</th>
                <th className="px-2 py-1 text-left">Origin</th>
                <th className="px-2 py-1 text-left">Destination</th>
                <th className="px-2 py-1 text-left">Officer</th>
                <th className="px-2 py-1 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-800/80">
                <td className="px-2 py-1">Vehicle</td>
                <td className="px-2 py-1">KDA 432X (Toyota Probox)</td>
                <td className="px-2 py-1">Arusha, TZ</td>
                <td className="px-2 py-1">Nairobi, KE</td>
                <td className="px-2 py-1">Cpl. Wanjiku</td>
                <td className="px-2 py-1">09:32</td>
              </tr>
              <tr className="border-t border-slate-800/80">
                <td className="px-2 py-1">Person</td>
                <td className="px-2 py-1">John Doe / P1234567</td>
                <td className="px-2 py-1">Kampala</td>
                <td className="px-2 py-1">Mombasa</td>
                <td className="px-2 py-1">Sgt. Otieno</td>
                <td className="px-2 py-1">08:47</td>
              </tr>
              <tr className="border-t border-slate-800/80">
                <td className="px-2 py-1">Cargo</td>
                <td className="px-2 py-1">Container MSKU1234567</td>
                <td className="px-2 py-1">Dubai</td>
                <td className="px-2 py-1">Mombasa Port</td>
                <td className="px-2 py-1">Insp. Mwikali</td>
                <td className="px-2 py-1">07:15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
