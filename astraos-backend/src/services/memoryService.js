// Memory service using local JSON file (async version)
const fs = require('fs');
const path = require('path');

const MEMORY_FILE = path.join(__dirname, '../../data/memory.json');
const dataDir = path.dirname(MEMORY_FILE);

let initialized = false;
const init = async () => {
  if (initialized) return;
  await fs.promises.mkdir(dataDir, { recursive: true }).catch(() => {});
  try {
    await fs.promises.access(MEMORY_FILE);
  } catch {
    await fs.promises.writeFile(MEMORY_FILE, JSON.stringify([], null, 2));
  }
  initialized = true;
};

const readMemories = async () => {
  await init();
  const data = await fs.promises.readFile(MEMORY_FILE, 'utf8');
  return JSON.parse(data);
};

const writeMemories = async (memories) => {
  await init();
  await fs.promises.writeFile(MEMORY_FILE, JSON.stringify(memories, null, 2));
  return true;
};

const getAllMemories = async () => {
  return await readMemories();
};

const addMemory = async (memoryData) => {
  const memories = await readMemories();
  const newMemory = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...memoryData
  };
  memories.push(newMemory);
  await writeMemories(memories);
  return newMemory;
};

const getMemoryById = async (id) => {
  const memories = await readMemories();
  return memories.find(m => m.id === id) || null;
};

const updateMemoryById = async (id, updateData) => {
  const memories = await readMemories();
  const idx = memories.findIndex(m => m.id === id);
  if (idx === -1) return null;
  memories[idx] = {
    ...memories[idx],
    ...updateData,
    id: memories[idx].id,
    timestamp: memories[idx].timestamp
  };
  await writeMemories(memories);
  return memories[idx];
};

const deleteMemoryById = async (id) => {
  const memories = await readMemories();
  const idx = memories.findIndex(m => m.id === id);
  if (idx === -1) return false;
  memories.splice(idx, 1);
  await writeMemories(memories);
  return true;
};

module.exports = {
  getAllMemories,
  addMemory,
  getMemoryById,
  updateMemoryById,
  deleteMemoryById
};
