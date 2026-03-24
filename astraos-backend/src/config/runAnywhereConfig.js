// RunAnywhere configuration
// This file centralizes configuration for the RunAnywhere SDK integration.
// Set environment variables to customize behavior without code changes.

const config = {
  // Enable RunAnywhere integration (true/false)
  enabled: process.env.RUNANYWHERE_ENABLED === '1' || process.env.RUNANYWHERE_ENABLED === 'true',
  // Optional keys for SDK initialization (placeholders for now)
  apiKey: process.env.RUNANYWHERE_API_KEY || null,
  endpoint: process.env.RUNANYWHERE_ENDPOINT || null,
  modelPath: process.env.RUNANYWHERE_MODEL_PATH || null,
  // Additional fields can be added as needed
};

module.exports = config;
