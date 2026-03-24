// RunAnywhere SDK bridge (flexible placeholder)
// Reads configuration from ./config/runAnywhereConfig.js

const config = require('./config/runAnywhereConfig');

let initialized = false;
let client = null; // placeholder for SDK client

const isEnabled = () => config?.enabled === true;

const init = async () => {
  if (initialized) return;

  if (isEnabled()) {
    try {
      const Lib = (() => {
        try {
          return require('run-anywhere-sdk');
        } catch (e) {
          return null;
        }
      })();

      if (Lib && typeof Lib === 'object') {
        client = Lib;
      }
    } catch (e) {
      console.error('RunAnywhere SDK init error:', e);
    }
  }

  initialized = true;
};

const runLLM = async (message) => {
  await init();

  if (isEnabled()) {
    try {
      if (client && typeof client.runLLM === 'function') {
        return await client.runLLM(message);
      }

      if (client && client.LLM && typeof client.LLM.run === 'function') {
        return await client.LLM.run(message);
      }
    } catch (e) {
      console.error('RunAnywhere LLM error:', e);
    }
  }

  console.log('Running in Offline Mode');
  return `AstraOS: ${message}`;
};

const runSTT = async (audioInput) => {
  await init();

  if (isEnabled()) {
    try {
      const Lib = (() => {
        try {
          return require('run-anywhere-sdk');
        } catch (e) {
          return null;
        }
      })();

      if (Lib && typeof Lib.runSTT === 'function') {
        return await Lib.runSTT(audioInput);
      }
    } catch (e) {
      console.error('RunAnywhere STT error:', e);
    }
  }

  console.log('Running in Offline Mode');
  return 'Plan my day';
};

const runTTS = async (text) => {
  await init();

  if (isEnabled()) {
    try {
      const Lib = (() => {
        try {
          return require('run-anywhere-sdk');
        } catch (e) {
          return null;
        }
      })();

      if (Lib && typeof Lib.runTTS === 'function') {
        return await Lib.runTTS(text);
      }
    } catch (e) {
      console.error('RunAnywhere TTS error:', e);
    }
  }

  console.log('Running in Offline Mode');
  return {
    audioPath: '/audio/dummy.wav',
    durationMs: 1000,
    text
  };
};

const runVision = async (imageInput) => {
  await init();

  if (isEnabled()) {
    try {
      const Lib = (() => {
        try {
          return require('run-anywhere-sdk');
        } catch (e) {
          return null;
        }
      })();

      if (Lib && typeof Lib.runVision === 'function') {
        return await Lib.runVision(imageInput);
      }
    } catch (e) {
      console.error('RunAnywhere Vision error:', e);
    }
  }

  console.log('Running in Offline Mode');
  return 'This looks like an image with objects';
};

module.exports = {
  isEnabled,
  init,
  runLLM,
  runSTT,
  runTTS,
  runVision
};