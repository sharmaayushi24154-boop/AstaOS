// Text-To-Speech service: RunAnywhere TTS with offline fallback
const sdk = require('../runAnywhereSDK');

const runTTS = async (text) => {
  if (sdk && typeof sdk.runTTS === 'function' && sdk.isEnabled()) {
    try {
      return await sdk.runTTS(text);
    } catch (err) {
      console.error('RunAnywhere TTS error, falling back offline:', err);
    }
  }
  // Offline fallback
  const durationMs = Math.max(200, text.length * 20);
  return {
    audioPath: `/audio/tts_offline_${Date.now()}.wav`,
    durationMs,
    text
  };
};

module.exports = {
  runTTS
};
