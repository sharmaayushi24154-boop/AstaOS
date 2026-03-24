const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

// Create a clean, modular app instance
const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Global response formatter: attach mode to every JSON response
  app.use((req, res, next) => {
    const oldJson = res.json;
    res.json = function(payload) {
      let body = payload;
      if (typeof payload !== 'object' || payload === null) {
        body = { data: payload };
      }
      // Override or inject mode as offline to indicate local runs
      body = { mode: 'offline', ...body };
      if (!('mode' in body)) {
        body.mode = 'offline';
      } else {
        body.mode = 'offline';
      }
      console.log('Running in Offline Mode');
      return oldJson.call(this, body);
    };
    next();
  });

  // ===== Route wiring (modular, explicit) =====
  // Import controllers (kept local to app for simplicity and explicit wiring)
const chatController = require('./controllers/chatController');
const sttController = require('./controllers/sttController');
const speechToTextController = require('./controllers/speechToTextController');
const ttsController = require('./controllers/ttsController');
const memoryController = require('./controllers/memoryController');
const visionController = require('./controllers/visionController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

  // Endpoints
  app.post('/api/chat', chatController.sendMessage);
  app.post('/api/speech-to-text', upload.single('audio'), speechToTextController.transcribeAudio);
  app.post('/api/stt', upload.single('audio'), sttController.transcribeAudio);
  app.post('/api/tts', ttsController.synthesizeAudio);
  app.get('/api/memory', memoryController.getMemories);
  app.post('/api/memory', memoryController.createMemory);
  app.get('/api/memory/:id', memoryController.getMemoryById);
  app.put('/api/memory/:id', memoryController.updateMemory);
  app.delete('/api/memory/:id', memoryController.deleteMemory);
  app.post('/api/vision', upload.single('image'), visionController.analyzeImage);

  // Health check / root route
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'AstraOS Backend is running' });
  });
  // Demo test route for offline mode verification
  app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'AstraOS backend running in offline mode' });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  // Error handler (centralized)
  app.use((err, req, res, next) => {
    console.error(err?.stack || err);
    const status = err?.status || 500;
    const message = err?.message || 'Internal server error';
    res.status(status).json({ success: false, message });
  });

  return app;
};

module.exports = createApp;
