import React from 'react'
import EvidenceCard from './EvidenceCard.jsx'

export default function EvidenceVault() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-slate-100 tracking-wide uppercase">Evidence Vault</h3>
        <p className="text-xs text-slate-300">
          Shared repository for documents, media, and seized items, with chain-of-custody aware views.
        </p>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <input
            type="text"
            placeholder="Search ID, keyword, entity..."
            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-100 placeholder-slate-500 w-full"
          />
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">Documents</span>
            <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">Images</span>
            <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">Videos</span>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
        <div className="bg-slate-950 border border-slate-800 rounded-lg max-h-[380px] overflow-y-auto p-3 grid grid-cols-12 gap-3 text-xs">
          <EvidenceCard
            id="EV-2025-001"
            type="Document"
            description="Container manifest MSKU1234567"
            uploadedBy="KRA / Customs"
            time="Today 09:12"
          />
          <EvidenceCard
            id="EV-2025-002"
            type="Image"
            description="CCTV still of Probox at Namanga gate"
            uploadedBy="NPS"
            time="Today 09:27"
          />
        </div>
      </div>
    </div>
  )
}
