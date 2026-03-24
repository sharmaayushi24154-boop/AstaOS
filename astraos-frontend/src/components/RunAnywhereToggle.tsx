import React from 'react'

export default function RunAnywhereToggle() {
  const [enabled, setEnabled] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem('aas_runany_enabled') === 'true'
    } catch {
      return false
    }
  })

  const toggle = () => {
    const next = !enabled
    try { localStorage.setItem('aas_runany_enabled', String(next)) } catch {}
    setEnabled(next)
  }

  return (
    <button onClick={toggle} className={`ml-2 px-2 py-1 rounded text-xs ${enabled ? 'bg-green-600' : 'bg-slate-700'}`} title="Toggle RunAnywhere (demo)">
      RunAnywhere: {enabled ? 'On' : 'Off'}
    </button>
  )
}
