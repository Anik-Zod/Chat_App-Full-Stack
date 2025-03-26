import { useEffect, useState } from "react";
import { Search, Circle, Edit } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import GroupForm from "./GroupForm";
import { useGroupStore } from "../store/useGroupStore";

const stories = [
  { id: 1, name: "Happy Hour", img: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Game Night", img: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Concert", img: "https://i.pravatar.cc/40?img=3" },
];

export default function Sidebar() {
  const { onlineUsers } = useAuthStore();
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { groups, getGroups,setSelectedGroup,selectedGroup } = useGroupStore();

  const [search, setSearch] = useState("");
  

  useEffect(() => {
    getUsers();
    getGroups();
  }, [getGroups, getUsers]);

  const [openGroup, setOpenGroup] = useState(false);

  if (isUsersLoading) return <p className="text-white">User Loading ...</p>;

  return (
    <div className="w-80 h-screen bg-gray-900 text-white p-4 flex flex-col">
      {/* Header & Search */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold flex-1">Messenger</h2>
        <Edit
          onClick={() => setOpenGroup((state) => !state)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-800 pl-10 pr-4 py-2 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stories Section */}
      <div className="flex gap-3 overflow-x-auto mb-4 scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={story.img}
              alt={story.name}
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />
            <span className="text-xs mt-1">{story.name}</span>
          </div>
        ))}
      </div>
      {/*Groups section*/}
      {/* Groups Section */}
      <hr className="my-1 border-gray-700" />
      <h3 className="text-sm font-semibold mb-2">Groups</h3>

      {groups.length > 0 ? (
        <div className="grid grid-cols-5 gap-2 mb-4">
          {groups.map((group) => (
            <div onClick={()=>setSelectedGroup(group)} key={group._id} className="flex flex-col items-center cursor-pointer">
              <img
                className="ring-2 ring-cyan-400 w-12 h-12 rounded-full object-cover border border-gray-500"
                src={group.image || "/default-group.png"}
                alt={group.name}
              />
              <span className="text-xs text-gray-300 mt-1 truncate w-full text-center">
                {group.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No groups available.</p>
      )}

      {openGroup && (
        <div className="-mt-20">
          <GroupForm setOpenGroup={setOpenGroup} />
        </div>
      )}

      {/* Friends List */}
      <hr className="my-1 border-gray-700" />
      <h3 className="text-sm font-semibold mb-2">Friends</h3>
      <div className="flex-1 overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-2 my-1 rounded-lg hover:bg-gray-800 cursor-pointer ${
              selectedUser?._id === user._id
                ? "bg-gray-800 ring-1 ring-gray-300"
                : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{user?.fullName}</span>
                <span className="text-xs text-gray-400">{user?.time}</span>
              </div>
              <span className="text-sm text-gray-400">{user.message}</span>
            </div>
            {user.unread && <Circle className="w-3 h-3 text-blue-500" />}
          </div>
        ))}
      </div>
    </div>
  );
}
