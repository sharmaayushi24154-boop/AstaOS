import React, { useEffect, useRef, useState } from 'react'
import { sendMessage, speechToText, textToSpeech } from '../services/api'

type Msg = {
  id: string
  sender: 'user' | 'ai'
  text: string
  typing?: boolean
  audioUrl?: string
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState<string>("")
  const [mode, setMode] = useState<string>('offline')
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const recordTimeout = useRef<number | null>(null)

  // Auto-scroll when new messages arrive
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages.length])

  // Helpers
  const playAudio = (url?: string) => { if (!url) return; try { new Audio(url).play().catch(()=>{}); } catch {} }

  // Microphone controls
  const startRecording = async () => {
    if (!('mediaDevices' in navigator) || !navigator.mediaDevices?.getUserMedia) {
      console.warn('Microphone not supported')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new (window as any).MediaRecorder(stream, { mimeType: 'audio/webm' })
      chunksRef.current = []
      mr.ondataavailable = (e: any) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
      }
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        try {
          const resp = await speechToText(blob)
          const transcription = resp?.text ?? resp?.transcription ?? ''
          if (transcription) setInput(transcription)
          setMode(resp?.mode ?? 'offline')
        } catch (err) {
          console.error('STT error', err)
        }
        setIsListening(false)
        setIsRecording(false)
      }
      mr.start()
      mediaRecorderRef.current = mr
      setIsRecording(true)
      setIsListening(true)
      recordTimeout.current = window.setTimeout(() => mr.stop(), 10000)
    } catch (e) {
      console.error('Error starting mic', e)
    }
  }
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop()
    if (recordTimeout.current) window.clearTimeout(recordTimeout.current)
    setIsRecording(false)
    setIsListening(false)
  }
  const toggleRecording = () => isRecording ? stopRecording() : startRecording()

  // Memory autosave when detecting "remember" phrases
  const rememberIfNeeded = async (text: string) => {
    const m = text.match(/remember(?:\s+that)?\s+(.+)/i)
    if (!m) return
    const content = m[1]?.trim() ?? text
    if (!content) return
    try {
      const res = await fetch('http://localhost:5000/api/memory', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, source: 'chat' })
      })
      const data = await res.json(); const mem = data?.data ?? data
      if (mem) {
        try { const arr = JSON.parse(localStorage.getItem('astraos_memories') || '[]'); arr.push(mem); localStorage.setItem('astraos_memories', JSON.stringify(arr)); } catch {}
      }
    } catch (err) {
      console.error('Memory autosave failed', err)
    }
  }

  // Send user message
  const handleSend = async () => {
    const userText = input.trim(); if (!userText) return
    // User message on the right
    setMessages(m => [...m, { id: Date.now().toString(), sender: 'user', text: userText }])
    setInput('')
    // AI typing placeholder on left
    const aiId = Date.now().toString()
    setMessages(m => [...m, { id: aiId, sender: 'ai', text: '', typing: true }])
    setLoading(true)
    try {
      const chat = await sendMessage(userText)
      const aiText = chat?.response ?? ''
      const apiMode = chat?.mode ?? 'offline'
      setMode(apiMode)
      // TTS after AI response
      let audioPath: string | undefined
      try { const tts = await textToSpeech(aiText); audioPath = tts?.data?.audioPath ?? tts?.audioPath } catch {}
      setMessages(prev => prev.map(m => m.typing ? { ...m, text: aiText, typing: false, audioUrl: audioPath } : m))
      if (audioPath) playAudio(audioPath)
      await rememberIfNeeded(userText)
    } catch (err) {
      setMessages(prev => prev.map(m => m.typing ? { ...m, text: 'Jarvis: offline', typing: false } : m))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  // Vision drop (image drag)
  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const f = e.dataTransfer?.files?.[0]
    if (f && f.type.startsWith('image/')) {
      const form = new FormData(); form.append('image', f)
      const res = await fetch('http://localhost:5000/api/vision', { method: 'POST', body: form })
      const data = await res.json(); const analysis = data?.analysis ?? data?.data?.analysis ?? null
      if (analysis) setMessages(m => [...m, { id: Date.now().toString(), sender: 'ai', text: analysis }])
    }
  }
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true) }

  // Render
  return (
    <section className="flex-1 rounded-xl border border-cyan-600 bg-black/60 p-4 w-full" aria-label="chat">
      <div className="flex items-center justify-between mb-2 text-xs text-slate-300" aria-label="system-status">
        <span>AstraOS Listening…</span>
        <span className={`px-2 py-1 rounded ${mode==='offline' ? 'bg-gray-800' : 'bg-blue-700'}`}>mode: {mode}</span>
      </div>
      <div className={`dropzone mb-2 p-2 border-dashed border-2 rounded-lg text-center text-slate-400 ${dragOver ? 'border-blue-500' : ''}`} onDrop={onDrop} onDragOver={onDragOver} onDragLeave={()=>setDragOver(false)}>
        Drag & drop image here for Vision (optional)
      </div>
      <div className="h-72 overflow-auto p-2" style={{ scrollBehavior: 'smooth' }}>
        {messages.map((m) => (
          <div key={m.id} className={`mb-2 ${m.sender==='user' ? 'flex justify-end' : 'flex justify-start'}`}>
            <div className={`px-3 py-2 rounded-lg ${m.sender==='user' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-white'}`}>
              {m.typing ? (
                <span className="inline-flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                </span>
              ) : (
                <span>
                  {m.text}
                  {m.audioUrl && (
                    <button className="ml-2 text-blue-300" onClick={()=>{ new Audio(m.audioUrl).play().catch(()=>{}); }} title="Play audio">🔊</button>
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <textarea className="flex-1 resize-none bg-black border border-blue-600 rounded px-3 py-2 text-white" rows={2} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a command..." />
        <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSend} disabled={loading}>Send</button>
        <button onClick={toggleRecording} aria-label="Record audio" className={`p-2 rounded-full ${isRecording ? 'bg-pink-500 animate-pulse ring-2 ring-pink-300' : 'bg-blue-600'}`} title="Record audio" disabled={isRecording}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3a3 3 0 013 3v6a3 3 0 11-6 0V6a3 3 0 013-3zm0 15a4 4 0 01-4-4V8a4 4 0 118 0v6a4 4 0 01-4 4z"/>
            <path d="M11 14h2v5h-2z"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
