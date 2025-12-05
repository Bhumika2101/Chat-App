import React, { useEffect } from "react";
import Messages from "./messages";
import MessageInput from "./messageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/authContext";
import { useSocketContext } from "../../context/socketContext";

function messageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers, typingUsers } = useSocketContext();

  const isOnline =
    selectedConversation && onlineUsers.includes(selectedConversation._id);
  const isTyping =
    selectedConversation &&
    typingUsers &&
    typingUsers[selectedConversation._id];

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-gray-700 px-3 md:px-4 py-3 mb-2 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Back button for mobile */}
                <button
                  className="md:hidden text-gray-300 hover:text-white mr-2"
                  onClick={() => setSelectedConversation(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-gray-300 hidden sm:inline">To : </span>
                <span className="text-white font-bold text-sm md:text-base">
                  {selectedConversation.fullName}
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: isOnline ? "#22c55e" : "#ef4444" }}
                  title={isOnline ? "Online" : "Offline"}
                ></div>
              </div>
              {isTyping && (
                <span className="text-xs text-green-400 italic">typing...</span>
              )}
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default messageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} *</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
