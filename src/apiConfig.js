let apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Ensure the URL starts with http:// or https:// to avoid relative path issues
if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
    apiUrl = `https://${apiUrl}`;
}

// Remove trailing slash if present to standardize
if (apiUrl.endsWith('/')) {
    apiUrl = apiUrl.slice(0, -1);
}

const API_URL = apiUrl;
export default API_URL;
