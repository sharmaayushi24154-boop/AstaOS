// Chat controller
const chatService = require('../services/chatService');
const memoryService = require('../services/memoryService');

// Chat controller
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Message is required' 
      });
    }

    // Detect intent to remember memory from user message, e.g. "remember that ..."
    const lower = (message || '').toLowerCase();
    const rememberMatch = message.match(/remember that\s*(.*)/i);
    if (rememberMatch) {
      const memoryContent = rememberMatch[1] && rememberMatch[1].trim().length > 0
        ? rememberMatch[1].trim()
        : message;
      if (memoryContent) {
        try {
          await memoryService.addMemory({ content: memoryContent, source: 'chat' });
        } catch (memErr) {
          // Do not fail the chat flow if memory storage fails
          console.error('Failed to store memory from chat:', memErr);
        }
      }
    }

    // Use the runLLM function to get a dummy AI response string
    const responseText = await chatService.runLLM(message.trim());
    
    // Return only the response as requested
    res.status(200).json({
      response: responseText
    });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  sendMessage
};
