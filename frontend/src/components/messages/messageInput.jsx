import React, { useState, useEffect, useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { Smile, Paperclip } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/socketContext";

function messageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const typingTimeoutRef = useRef(null);

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!socket || !selectedConversation) return;

    // Emit typing event
    socket.emit("typing", {
      receiverId: selectedConversation._id,
      isTyping: true,
    });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", {
        receiverId: selectedConversation._id,
        isTyping: false,
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    // Stop typing indicator when sending
    if (socket && selectedConversation) {
      socket.emit("typing", {
        receiverId: selectedConversation._id,
        isTyping: false,
      });
    }

    await sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    // Cleanup typing timeout on unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <form className="px-2 sm:px-4 py-2 sm:py-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm sm:text-base rounded-lg block w-full p-2 sm:p-2.5 pr-10 sm:pr-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          placeholder="Send a message"
          value={message}
          onChange={handleTyping}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-2 sm:pe-3 text-blue-400 hover:text-blue-300"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend className="text-lg" />
          )}
        </button>
      </div>
    </form>
  );
}

export default messageInput;
