import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/socketContext";

function conversation({ conversation, emoji, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers, typingUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const isTyping = typingUsers && typingUsers[conversation._id];

  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-600 hover:bg-opacity-30 rounded p-2 py-1 cursor-pointer transition-colors
                ${isSelected ? "bg-blue-600 bg-opacity-40" : ""}
                `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-gray-600">
            <img
              src={conversation.profilePic}
              alt="user avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Custom online/offline status indicator */}
          <div
            className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-gray-800"
            style={{ backgroundColor: isOnline ? "#22c55e" : "#ef4444" }}
            title={isOnline ? "Online" : "Offline"}
          ></div>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex gap-2 sm:gap-3 justify-between items-center">
            <div className="flex flex-col min-w-0 flex-1">
              <p className="font-bold text-white text-sm sm:text-base truncate">
                {conversation.fullName}
              </p>
              {isTyping && (
                <p className="text-xs text-green-400 italic">typing...</p>
              )}
            </div>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && (
        <div className="divider my-0 py-0 h-1 before:bg-gray-700 after:bg-gray-700" />
      )}
    </>
  );
}

export default conversation;
