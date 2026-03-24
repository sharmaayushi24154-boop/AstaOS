import React from 'react'

export default function TopBar(){
  return (
    <header className="w-full h-14 bg-black/90 border-b border-blue-500/60" style={{ boxShadow: '0 0 18px #00e5ff' }}>
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="text-2xl font-semibold" style={{ color: '#9af0ff', textShadow: '0 0 6px #00e5ff' }}>AstraOS</div>
        <div className="text-sm text-blue-300" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          Offline Mode Active
        </div>
      </div>
    </header>
  )
}
