import React from "react";
import SearchInput from "./searchInput";
import Conversations from "./conversations";
import LogoutButton from "./logoutButton";

function sidebar() {
  return (
    <div className="w-full border-r border-gray-600 p-3 md:p-4 flex flex-col bg-gray-800 bg-opacity-50">
      <SearchInput />
      <div className="divider px-3 before:bg-gray-600 after:bg-gray-600"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
}

export default sidebar;
