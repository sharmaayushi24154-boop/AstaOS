// llmService.js

async function runLLM(message) {
  return `AstraOS Response: ${message}`;
}

module.exports = { runLLM };