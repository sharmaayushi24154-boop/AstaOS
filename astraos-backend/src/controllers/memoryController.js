// Memory controller
const memoryService = require('../services/memoryService');

// GET /api/memory - Get all memories
const getMemories = async (req, res) => {
  try {
    const memories = await memoryService.getAllMemories();
    res.status(200).json({
      success: true,
      data: memories,
      count: memories.length
    });
  } catch (error) {
    console.error('Error in getMemories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve memories'
    });
  }
};

// POST /api/memory - Add a new memory
const createMemory = async (req, res) => {
  try {
    const memoryData = req.body;

    if (!memoryData || Object.keys(memoryData).length === 0) {
      return res.status(400).json({ success: false, message: 'Memory content is required' });
    }

    const newMemory = await memoryService.addMemory(memoryData);
    if (!newMemory) {
      return res.status(500).json({ success: false, message: 'Memory creation failed' });
    }

    res.status(201).json({ success: true, data: newMemory, message: 'Memory created successfully' });
  } catch (error) {
    console.error('Error in createMemory:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// GET /api/memory/:id - Get memory by ID
const getMemoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const memory = await memoryService.getMemoryById(id);
    if (!memory) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }
    res.status(200).json({ success: true, data: memory });
  } catch (error) {
    console.error('Error in getMemoryById:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// PUT /api/memory/:id - Update memory by ID
const updateMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: 'Update data is required' });
    }
    const updatedMemory = await memoryService.updateMemoryById(id, updateData);
    if (!updatedMemory) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }
    res.status(200).json({ success: true, data: updatedMemory, message: 'Memory updated successfully' });
  } catch (error) {
    console.error('Error in updateMemory:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// DELETE /api/memory/:id - Delete memory by ID
const deleteMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await memoryService.deleteMemoryById(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }
    res.status(200).json({ success: true, message: 'Memory deleted successfully' });
  } catch (error) {
    console.error('Error in deleteMemory:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getMemories,
  createMemory,
  getMemoryById,
  updateMemory,
  deleteMemory
};
