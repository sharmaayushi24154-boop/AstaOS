import React from 'react'
import { useNavigate } from 'react-router-dom'

// Simple landing page mimicking the provided hero/features layout
const Landing: React.FC<{onGetStarted?: ()=>void}> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-4 flex justify-between items-center border-b border-blue-500/50 sticky top-0 bg-black/60 backdrop-blur">
        <div className="text-2xl font-bold" style={{ color: '#58a6ff' }}>AstraOS</div>
        <nav className="space-x-6 text-sm text-gray-300"><a href="#" className="hover:text-blue-300">Home</a><a href="#features" className="hover:text-blue-300">Features</a><a href="#about" className="hover:text-blue-300">About</a></nav>
      </header>

      <section className="hero grid grid-cols-1 md:grid-cols-2 py-20 px-8 items-center gap-8">
        <div className="hero-text space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold" style={{ color: '#58a6ff' }}>Your Offline AI Operating System</h1>
          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl">
            AstraOS is a fully offline AI-powered personal assistant that runs entirely on-device. Experience fast, private, and intelligent interactions without internet dependency.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg" onClick={onGetStarted}>Get Started</button>
        </div>
        <div className="flex justify-center">
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 saturate-150 shadow-neon" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span className="text-6xl">🤖</span>
          </div>
        </div>
      </section>

      <section id="features" className="px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#58a6ff' }}>Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Voice Interaction', text: 'Speak naturally and control your system using real-time speech-to-text processing.' },
            { title: 'Local LLM', text: 'All AI processing happens on-device for privacy and speed.' },
            { title: 'Text-to-Speech', text: 'Get natural spoken responses for a seamless conversational experience.' },
            { title: 'Offline First', text: 'No internet needed. AstraOS works anytime, anywhere.' },
            { title: 'Context Memory', text: 'Remembers interactions and provides context-aware responses.' },
            { title: 'OS-like Commands', text: 'Execute tasks like planning, summarizing, and more with simple commands.' },
          ].map((f, idx) => (
            <div key={idx} className="card bg-[#1f2a3a] rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300" >
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#58a6ff' }}>{f.title}</h3>
              <p className="text-slate-200">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="px-8 py-12">
        <div className="max-w-4xl mx-auto text-center text-slate-200 leading-relaxed">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#58a6ff' }}>About AstraOS</h2>
          <p>
            AstraOS is built using the RunAnywhere SDK to showcase the power of fully local AI systems. It integrates speech recognition, local LLM reasoning, and speech synthesis to create a real-time assistant that behaves like an operating system.
          </p>
        </div>
      </section>

      <footer className="py-6 text-sm text-slate-400 text-center">
        © 2026 AstraOS | Offline AI Revolution
      </footer>
    </div>
  )
}
