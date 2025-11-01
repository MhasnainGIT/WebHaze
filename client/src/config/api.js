// Resolve API URL from Vite env, with a safe production fallback to the Render URL
const envApi = import.meta.env.VITE_API_URL;
const mode = import.meta.env.MODE; // 'production' or 'development'

export const API_BASE_URL = envApi || (mode === 'production' ? 'https://webhaze.onrender.com' : 'http://localhost:4000');

// Validate API URL format and warn if it looks invalid
if (!API_BASE_URL.startsWith('http://') && !API_BASE_URL.startsWith('https://')) {
  console.error('Invalid API_BASE_URL format. Must start with http:// or https:// —', API_BASE_URL);
}