const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const speechToTextController = require('../controllers/speechToTextController');
const sttController = require('../controllers/sttController');
const visionController = require('../controllers/visionController');
const memoryController = require('../controllers/memoryController');
const ttsController = require('../controllers/ttsController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Example route
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from AstraOS API!' });
});

// Chat routes
router.post('/chat', chatController.sendMessage);

// Speech-to-text routes
router.post('/speech-to-text', upload.single('audio'), speechToTextController.transcribeAudio);
// Simple STT route (POST /api/stt)
router.post('/stt', upload.single('audio'), sttController.transcribeAudio);

// Vision route (POST /api/vision)
router.post('/vision', upload.single('image'), visionController.analyzeImage);

// Text-to-Speech route (POST /api/tts)
router.post('/tts', ttsController.synthesizeAudio);

// Memory routes
router.get('/memory', memoryController.getMemories);
router.post('/memory', memoryController.createMemory);
router.get('/memory/:id', memoryController.getMemoryById);
router.put('/memory/:id', memoryController.updateMemory);
router.delete('/memory/:id', memoryController.deleteMemory);

// You can add more routes here

// Demo health test endpoint
router.get('/test', (req, res) => {
  res.status(200).json({ ok: true, message: 'AstraOS test route' });
});

// Test health endpoint
router.get('/test', (req, res) => {
  res.status(200).type('text/plain').send('AstraOS backend running');
});

module.exports = router;
