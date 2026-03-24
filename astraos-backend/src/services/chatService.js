// Service layer for chat functionality
// AI logic moved to llmService.js and invoked via runLLM
// chatService.js

const { runLLM } = require('./llmService');

const getLLMResponse = async (message) => {
  const response = await runLLM(message);
  return response;
};

module.exports = {
  getLLMResponse
};