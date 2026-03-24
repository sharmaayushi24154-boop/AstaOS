// Speech-to-Text controller (STT) - routes: /api/stt
const sttService = require('../services/sttService');

const transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No audio file provided' });
    }
    const input = (req.file.buffer || req.file.path || req.file.filename);
    const transcription = await sttService.runSTT(input);
    res.status(200).json({
      success: true,
      transcription,
      filename: req.file.originalname,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in stt transcribe:', error);
    res.status(500).json({ success: false, message: 'Internal server error during transcription' });
  }
};

module.exports = { transcribeAudio };
