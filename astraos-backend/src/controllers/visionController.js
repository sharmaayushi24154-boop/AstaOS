// Vision controller
const visionService = require('../services/visionService');

const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const result = await visionService.runVision(req.file);
    res.status(200).json({ success: true, analysis: result });
  } catch (error) {
    console.error('Error in vision analyze:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { analyzeImage };
