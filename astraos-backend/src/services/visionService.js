// Vision service: RunAnywhere vision model integration (async)
const sdk = require('../runAnywhereSDK');

const runVision = async (imageInput) => {
  if (sdk && typeof sdk.runVision === 'function' && sdk.isEnabled()) {
    try {
      return await sdk.runVision(imageInput);
    } catch (e) {
      console.error('RunAnywhere Vision error, falling back offline:', e);
    }
  }
  // Offline fallback
  console.log('Running in Offline Mode: Vision');
  await new Promise(r => setTimeout(r, 20));
  return 'This looks like a chart or object';
};

module.exports = {
  runVision
};
