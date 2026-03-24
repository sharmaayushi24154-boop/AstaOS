export async function postChat(payload: { message: string }) {
  return fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(res => res.json())
}

export async function getMemories() {
  return fetch('http://localhost:5000/api/memory').then(res => res.json())
}
