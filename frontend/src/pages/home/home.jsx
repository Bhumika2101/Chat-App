import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import MessageContainer from "../../components/messages/messageContainer";
import useConversation from "../../zustand/useConversation";

function home() {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex h-full w-full rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border border-gray-700 shadow-xl">
      {/* Show sidebar on desktop, or on mobile when no conversation selected */}
      <div
        className={`${
          selectedConversation ? "hidden" : "flex"
        } md:flex w-full md:w-auto md:min-w-[300px] md:max-w-[400px]`}
      >
        <Sidebar />
      </div>

      {/* Show message container on desktop, or on mobile when conversation selected */}
      <div
        className={`${selectedConversation ? "flex" : "hidden"} md:flex w-full`}
      >
        <MessageContainer />
      </div>
    </div>
  );
}

export default home;
