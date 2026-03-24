import React, { useState } from 'react'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import Landing from './pages/Landing'
import ChatPanel from './components/ChatPanel'
import Memory from './pages/Memory'
import Tasks from './pages/Tasks'
import HomeIntro from './pages/HomeIntro'

export default function App(){
  const [page, setPage] = useState<'home'|'memory'|'tasks'|'landing'>('landing')
  const [showChat, setShowChat] = useState(false)
  const goToChat = () => { setShowChat(true); setPage('home'); }
  return (
    <div className="min-h-screen bg-black text-slate-100">
      <TopBar />
      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar active={page} onNavigate={setPage} />
        <main className="flex-1 p-6 overflow-auto" style={{ background: 'radial-gradient(circle at 50% -20%, rgba(0,226,255,0.15), transparent 40%), #000' }}>
          {page === 'landing' && <Landing onGetStarted={goToChat} />}
          {showChat && (
            <div className="h-full">
              <ChatPanel />
            </div>
          )}
          {page === 'memory' && <Memory/>}
          {page === 'tasks' && <Tasks/>}
        </main>
      </div>
    </div>
  )
}
