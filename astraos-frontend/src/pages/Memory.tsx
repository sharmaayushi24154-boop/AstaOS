import React, { useEffect, useState } from 'react'
import MemoryCard from '../components/MemoryCard'

type MemoryItem = { id: string; timestamp: string; content: string; source?: string }

const MemoryPage: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/memory')
      .then(res => res.json())
      .then((d) => {
        const items = (d?.data ?? d) || []
        const arr = Array.isArray(items) ? items : [items]
        const parsed = arr.map((m: any) => ({
          id: m.id ?? String(Math.random()),
          timestamp: m.timestamp ?? new Date().toISOString(),
          content: m.content ?? '' ,
          source: m.source ?? 'local'
        }))
        setMemories(parsed)
      })
  }, [])

  return (
    <div className="p-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {memories.map(mem => (
        <MemoryCard key={mem.id} memory={mem} />
      ))}
    </div>
  )
}

export default MemoryPage
