import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import MessageContainer from "../../components/messages/messageContainer";

function home() {
  return (
    <div className="flex h-full w-full rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border border-gray-700 shadow-xl">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default home;
