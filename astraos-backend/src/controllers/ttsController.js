// Text-To-Speech controller
const ttsService = require('../services/ttsService');

const synthesizeAudio = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }
    const result = await ttsService.runTTS(text.trim());
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error in synthesizeAudio:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { synthesizeAudio };
