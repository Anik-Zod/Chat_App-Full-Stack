import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ProfilePage from "./ProfilePage";
import ChatContainer from "../components/ChatContainer";

export default function HomePage() {
  const { selectedUser } = useChatStore();
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div className="flex h-screen">

      {/* Sidebar - Fixed width */}
      <div className="w-[310px] flex-none ">
        <Sidebar />
      </div>

      {/* ChatContainer - Takes remaining space */}
      <div className="flex-1">
        <ChatContainer setOpenDetail={setOpenDetail} />
      </div>

      {/* ProfilePage - Fixed width, only shows when openDetail is true */}
      {openDetail && (
        <div className="w-[350px] flex-none border-l border-gray-300 bg-white">
          <ProfilePage />
        </div>
      )}
    </div>
  );
}
