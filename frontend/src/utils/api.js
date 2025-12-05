// API Configuration utility
// This helps ensure all API calls use the correct base URL from environment variables

export const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  return apiUrl.replace(/\/$/, ""); // Remove trailing slash
};

export const getSocketUrl = () => {
  const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";
  return socketUrl.replace(/\/$/, ""); // Remove trailing slash
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => {
  const isDev = import.meta.env.DEV;

  // In development, use relative URLs (Vite proxy handles it)
  if (isDev) {
    return endpoint;
  }

  // In production, use full URL
  const baseUrl = getApiUrl();
  return `${baseUrl}${endpoint}`;
};

// Helper function for making API calls with proper base URL
export const apiCall = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);

  // Ensure credentials are included to send cookies
  const fetchOptions = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  return fetch(url, fetchOptions);
};

export default {
  getApiUrl,
  getSocketUrl,
  apiCall,
};
