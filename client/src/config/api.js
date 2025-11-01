// Get API URL from environment variables, fallback to development URL if not set
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Validate API URL format
if (!API_BASE_URL.startsWith('http://') && !API_BASE_URL.startsWith('https://')) {
  console.error('Invalid API_BASE_URL format. Must start with http:// or https://');
}