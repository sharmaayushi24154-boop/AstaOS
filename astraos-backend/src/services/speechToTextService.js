// Service layer for speech-to-text functionality (async placeholder)
const convertSpeechToText = async (audioData) => {
  // simulate processing delay
  await new Promise(r => setTimeout(r, 20));
  if (!audioData) return 'No audio data provided';
  const dummyTranscriptions = [
    'Hello, how can I assist you today?',
    'What is the weather like today?',
    'Can you help me with this task?',
    'Thank you for your help.',
    'Goodbye for now.'
  ];
  const idx = Math.abs((audioData.length || 0)) % dummyTranscriptions.length;
  return dummyTranscriptions[idx];
};

module.exports = {
  convertSpeechToText
};
