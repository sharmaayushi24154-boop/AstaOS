import React from 'react'
import ChatPanel from '../components/ChatPanel'

const Home: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-black/60 border border-blue-700 rounded-xl p-6 shadow-neon" style={{ backdropFilter: 'blur(6px)' }}>
        <ChatPanel />
      </div>
    </div>
  )
}
export default Home
