// LLM Service: Integrates with RunAnywhere SDK if enabled; otherwise fallback offline
const sdk = require('./runAnywhereSDK');

const formatAiResponse = (text) => {
  const t = (text ?? '').trim();
  // Take first sentence for conciseness
  const firstSentence = t.match(/[^.!?]+[.!?]?/);
  let core = firstSentence ? firstSentence[0].trim() : t;
  // Cap length for conciseness
  if (core.length > 180) core = core.slice(0, 180).trim() + '...';
  // Ensure Jarvis style prefix
  if (!/^Jarvis[:\s]/i.test(core)) {
    core = 'Jarvis: ' + core;
  }
  return core;
};

const runLLM = async (message) => {
  if (sdk && typeof sdk.runLLM === 'function' && sdk.isEnabled()) {
    try {
      const resp = await sdk.runLLM(message);
      return formatAiResponse(String(resp));
    } catch (err) {
      console.error('RunAnywhere LLM error, falling back offline:', err);
    }
  }
  // Offline fallback
  console.log('Running in Offline Mode: LLM');
  const offline = `Offline AI response to: "${message}"`;
  return formatAiResponse(offline);
};

const getLLMResponse = async (message) => {
  return await runLLM(message);
};

module.exports = {
  getLLMResponse,
  runLLM
};
