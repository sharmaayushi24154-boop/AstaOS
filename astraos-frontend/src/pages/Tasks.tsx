import React from 'react'

const Tasks: React.FC = () => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-semibold" style={{ color: '#7df7ff' }}>Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="p-4 border border-blue-700 rounded bg-black/60">Plan sprint</div>
        <div className="p-4 border border-blue-700 rounded bg-black/60">Review memory</div>
      </div>
    </div>
  )
}
export default Tasks
