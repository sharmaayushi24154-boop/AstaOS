import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendMessage, speechToText, textToSpeech } from '../src/services/api'

describe('Voice flow (offline)', () => {
  beforeEach(() => {
    // Mock fetch responses
    global.fetch = vi.fn((url, opts) => {
      if (typeof url === 'string' && url.endsWith('/api/chat')) {
        return Promise.resolve({ ok: true, json: async () => ({ mode: 'offline', response: 'Jarvis: test response' }) })
      }
      if (typeof url === 'string' && url.endsWith('/api/stt')) {
        return Promise.resolve({ ok: true, json: async () => ({ transcription: 'test transcription', text: undefined }) })
      }
      if (typeof url === 'string' && url.endsWith('/api/tts')) {
        return Promise.resolve({ ok: true, json: async () => ({ data: { audioPath: '/audio/tts_test.wav', durationMs: 100, text: 'test' } }) })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })
  })

  it('sendMessage should call chat endpoint and return AI response', async () => {
    const res = await sendMessage('Hello')
    expect(res).toHaveProperty('response')
  })

  it('speechToText should submit audio and return transcription', async () => {
    const blob = new Blob(['audio'], { type: 'audio/webm' })
    const res = await speechToText(blob)
    expect(res).toHaveProperty('transcription')
  })

  it('textToSpeech should return audioPath for given text', async () => {
    const res = await textToSpeech('Hello AI')
    expect(res).toHaveProperty('data')
  })
})
