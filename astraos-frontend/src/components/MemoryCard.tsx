import React from 'react'

type Memory = {
  id: string
  timestamp: string
  content: string
  source?: string
}

const parseMemory = (memory: Memory) => {
  const content = memory.content || '';
  const kv = content.includes(':') ? content.split(':').map(s => s.trim()) : content.includes('=') ? content.split('=').map(s => s.trim()) : [];
  if (kv.length >= 2) {
    return { key: kv[0], value: kv.slice(1).join(':').trim() };
  }
  // Fallback
  return { key: 'Note', value: content };
};

const MemoryCard: React.FC<{ memory: Memory }> = ({ memory }) => {
  const { key, value } = parseMemory(memory);
  const ts = new Date(memory.timestamp).toLocaleString()
  return (
    <div className="bg-black/60 border border-blue-700 rounded-lg p-4 shadow-lg w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-200" title={ts}>{ts}</div>
        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{memory.source ?? 'local'}</span>
      </div>
      <div className="text-sm text-slate-100" style={{ whiteSpace: 'pre-wrap' }}>
        <strong>{key}: </strong><span>{value}</span>
      </div>
    </div>
  )
}

export default MemoryCard
