import React, { useContext } from "react";
import { useAuthContext } from "../../context/authContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-8 sm:w-10 rounded-full ring-2 ring-gray-600">
          <img src={profilePic} alt="Tailwind CSS chat bubble component" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white text-sm sm:text-base max-w-[85%] sm:max-w-md ${
          bubbleBgColor ? bubbleBgColor : "bg-gray-700"
        } ${shakeClass}`}
      >
        {message.message}
      </div>
      <div className="chat-footer text-gray-400 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default message;
