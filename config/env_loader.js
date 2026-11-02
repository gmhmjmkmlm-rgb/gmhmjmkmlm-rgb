/**
 * env_loader.js - Token & Environment Loader for gmhmjmkmlm
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_PATH = path.join(ROOT_DIR, '.env');
const JSON_PATH = path.join(ROOT_DIR, 'tokens.json');

function loadTokens() {
  if (fs.existsSync(JSON_PATH)) {
    try {
      const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
      return data.tokens;
    } catch (e) {
      console.warn('Failed to parse tokens.json:', e.message);
    }
  }

  // Fallback to .env
  if (fs.existsSync(ENV_PATH)) {
    const lines = fs.readFileSync(ENV_PATH, 'utf-8').split('\n');
    const env = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=');
        env[k.trim()] = v.join('=').trim();
      }
    }
    return {
      github: { token: env.GITHUB_TOKEN },
      huggingface: { token: env.HUGGINGFACE_TOKEN || env.HF_TOKEN },
      gitlab: { token: env.GITLAB_TOKEN }
    };
  }

  return null;
}

module.exports = { loadTokens, ENV_PATH, JSON_PATH };

if (require.main === module) {
  const tokens = loadTokens();
  console.log('Successfully loaded tokens:');
  console.log('- GitHub Token:', tokens.github?.token ? 'OK (' + tokens.github.token.slice(0, 10) + '...)' : 'Missing');
  console.log('- HuggingFace Token:', tokens.huggingface?.token ? 'OK (' + tokens.huggingface.token.slice(0, 10) + '...)' : 'Missing');
  console.log('- GitLab Token:', tokens.gitlab?.token ? 'OK (' + tokens.gitlab.token.slice(0, 10) + '...)' : 'Missing');
}
