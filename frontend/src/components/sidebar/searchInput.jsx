import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";

function searchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered rounded-full bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-circle bg-blue-600 hover:bg-blue-700 text-white border-none"
        >
          <IoSearchSharp className="w-5 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
}

export default searchInput;
