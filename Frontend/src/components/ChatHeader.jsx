import { Phone, Video, Ellipsis,PanelRight} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";


export default function ChatHeader({setOpenDetail}) {
  const { logout, onlineUsers } = useAuthStore();
  const { selectedUser } = useChatStore();

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 bg-gray-900 text-white py-3">
      {/* Left Side - Profile Info */}
      <div className="flex items-center gap-3">
        <>
          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt={selectedUser?.fullName || "User"}
            className="w-10 h-10 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {selectedUser?.fullName || "Select User"}
            </h2>
            <p className="text-sm text-gray-400">
              {onlineUsers.includes(selectedUser?._id) ? "online" : "offline"}
            </p>
          </div>
        </>
      </div>

      {/* Right Side - Icons */}
      <div className="flex gap-3 text-gray-400">
        <IconButton
          icon={<Phone aria-hidden="true" />}
          label="Start Voice Call"
        />
        <IconButton
          icon={<Video aria-hidden="true" />}
          label="Start Video Call"
        />
        <IconButton
          icon={<PanelRight  aria-hidden="true" />}
          label="Logout"
          onClick={() => setOpenDetail(prev => !prev)}
        />
      </div>
    </div>
  );
}

function IconButton({ icon, label, onClick }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="hover:bg-gray-600 rounded-full cursor-pointer p-3 hover:text-white transition duration-200"
    >
      {icon}
    </button>
  );
}
