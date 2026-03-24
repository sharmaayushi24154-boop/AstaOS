// STT service: RunAnywhere Whisper integration with offline fallback
const sdk = require('../runAnywhereSDK');

// Public alias for compatibility: transcribe(audioInput) -> calls runSTT
const transcribe = async (audioInput) => {
  return await runSTT(audioInput);
};

const runSTT = async (audioInput) => {
  if (sdk && typeof sdk.runSTT === 'function' && sdk.isEnabled()) {
    try {
      return await sdk.runSTT(audioInput);
    } catch (err) {
      console.error('RunAnywhere STT error, falling back offline:', err);
    }
  }
  // Offline fallback: return a generic transcription
  if (!audioInput) return 'No audio data provided';
  return 'Transcribed text (offline)';
};

module.exports = {
  transcribe,
  runSTT
};
