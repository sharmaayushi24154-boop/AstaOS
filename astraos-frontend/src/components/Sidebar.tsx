import React from 'react'

type Props = { active: string, onNavigate: (p: string)=>void }

const Sidebar: React.FC<Props> = ({ active, onNavigate }) => {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'memory', label: 'Memory' }
  ]
  return (
    <aside className="w-64 bg-black/90 border-r border-blue-700 p-4 h-screen flex-shrink-0">
      <div className="mb-6 text-2xl font-bold" style={{ color: '#7ee8ff' }}>AstraOS</div>
      <nav className="flex flex-col space-y-2">
        {items.map(it => (
          <button key={it.id} onClick={()=>onNavigate(it.id)} className={`w-full text-left px-3 py-2 rounded-lg ${active===it.id ? 'bg-blue-700/60 text-white' : 'text-slate-200 hover:bg-blue-900'}`}>
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
