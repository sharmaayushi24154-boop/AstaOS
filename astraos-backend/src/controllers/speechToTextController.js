// Speech-to-text controller
const speechToTextService = require('../services/speechToTextService');

const transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No audio file provided' });
    }
    const transcription = await speechToTextService.runSTT(req.file.buffer);
    res.status(200).json({
      success: true,
      transcription: transcription,
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in transcribeAudio:', error);
    res.status(500).json({ success: false, message: 'Internal server error during transcription' });
  }
};

module.exports = {
  transcribeAudio
};
