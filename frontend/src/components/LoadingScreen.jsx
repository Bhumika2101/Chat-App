import React from "react";

const LoadingScreen = ({ message = "Connecting to server..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-95 z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Spinning outer ring */}
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          {/* Inner pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">{message}</h2>
          <p className="text-gray-400 text-sm">
            Please wait while we establish connection...
          </p>
          <div className="flex gap-1 justify-center mt-3">
            <span
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
