import { createContext, useContext, useEffect, useState } from "react";

const BackendConnectionContext = createContext();

export const useBackendConnection = () => {
  return useContext(BackendConnectionContext);
};

export const BackendConnectionProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState(null);

  const checkBackendConnection = async () => {
    setIsChecking(true);
    setError(null);

    try {
      // Try to ping the backend health endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // In development, Vite proxy handles /api routes
      // In production, we need the full URL
      const isDev = import.meta.env.DEV;
      const healthUrl = isDev
        ? "/api/health"
        : `${
            import.meta.env.VITE_API_URL || "http://localhost:8000"
          }/api/health`;

      const response = await fetch(healthUrl, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setIsConnected(true);
        setError(null);
      } else {
        throw new Error("Backend is not responding correctly");
      }
    } catch (err) {
      console.error("Backend connection check failed:", err);

      // If it's an abort error, the backend is taking too long
      if (err.name === "AbortError") {
        setError(
          "Backend is taking too long to respond. It might be waking up from sleep on Render."
        );
      } else {
        setError(err.message);
      }

      // Retry after 3 seconds
      setTimeout(() => {
        checkBackendConnection();
      }, 3000);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkBackendConnection();
  }, []);

  return (
    <BackendConnectionContext.Provider
      value={{ isConnected, isChecking, error, checkBackendConnection }}
    >
      {children}
    </BackendConnectionContext.Provider>
  );
};
