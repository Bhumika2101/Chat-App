import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketUrl =
        import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";

      const socket = io(socketUrl, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        query: {
          userId: authUser._id,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on("connect", () => {
        console.log("Socket Connected!", socket.id);
      });

      socket.on("connect_error", (error) => {
        console.log("Socket Connection Error:", error);
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Listen for typing events
      socket.on("userTyping", ({ userId, isTyping }) => {
        setTypingUsers((prev) => ({
          ...prev,
          [userId]: isTyping,
        }));
      });

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, typingUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
