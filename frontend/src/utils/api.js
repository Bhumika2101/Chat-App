// API Configuration utility
// This helps ensure all API calls use the correct base URL from environment variables

export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || "http://localhost:8000";
};

export const getSocketUrl = () => {
  return import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";
};

// Helper function for making API calls with proper base URL
export const apiCall = async (endpoint, options = {}) => {
  const baseUrl = getApiUrl();

  // For relative paths that already start with /api, just use them
  // For absolute URLs or socket.io paths, use them as is
  const url =
    endpoint.startsWith("http") || endpoint.startsWith("/")
      ? endpoint
      : `${baseUrl}${endpoint}`;

  return fetch(url, options);
};

export default {
  getApiUrl,
  getSocketUrl,
  apiCall,
};
