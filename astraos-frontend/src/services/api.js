// Frontend API service for AstraOS (offline-first; talks to local backend)

export async function sendMessage(message) {
  const res = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  if (!res.ok) throw new Error('Chat API error');
  return await res.json();
}

export async function speechToText(audioBlob) {
  const form = new FormData();
  form.append('audio', audioBlob, 'recording.webm');
  const res = await fetch('http://localhost:5000/api/stt', { method: 'POST', body: form });
  if (!res.ok) throw new Error('STT API error');
  return await res.json();
}

export async function textToSpeech(text) {
  const res = await fetch('http://localhost:5000/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error('TTS API error');
  return await res.json();
}

export async function getMemory() {
  const res = await fetch('http://localhost:5000/api/memory');
  if (!res.ok) throw new Error('Memory API error');
  return await res.json();
}

export async function saveMemory(data) {
  const res = await fetch('http://localhost:5000/api/memory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Memory save error');
  return await res.json();
}
