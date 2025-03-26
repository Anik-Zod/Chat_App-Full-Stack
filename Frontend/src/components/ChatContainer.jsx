import React, { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useChatStore } from "../store/useChatStore";
import { SmilePlus, Trash2 } from "lucide-react";

export default function ChatContainer({ setOpenDetail }) {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    typingUsers,
    deleteMessage,
  } = useChatStore();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  if (isMessagesLoading) {
    return <p className="text-center text-gray-500 mt-4">Loading messages...</p>;
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <ChatHeader setOpenDetail={setOpenDetail} />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.map((message) => {
          const isSentByUser = message.senderId !== selectedUser._id;

          return (
            <div
              key={message._id}
              className={`relative flex items-center ${isSentByUser ? "justify-end" : "justify-start"}`}
            >
              <div className="group flex items-center">
                {!isSentByUser && (
                  <img
                    className="w-8 h-8 rounded-full mr-3 object-cover mt-5"
                    src={selectedUser.profilePic}
                    alt="User Profile"
                  />
                )}

                {isSentByUser && (
                  <div className="flex gap-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Trash2
                      onClick={() => deleteMessage(message._id)}
                      className="hover:text-red-500 cursor-pointer"
                      size={18}
                    />
                  </div>
                )}

                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow break-words ${
                    isSentByUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <p>{message.text}</p>

                  {message.image && (
                    <img
                      src={message.image}
                      alt="Message attachment"
                      className="max-w-full h-auto mt-2 rounded"
                    />
                  )}

                  <span
                    className={`block text-xs ${
                      isSentByUser ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "N/A"}
                  </span>
                </div>

                {!isSentByUser && (
                  <div className="flex gap-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Trash2
                      onClick={() => deleteMessage(message._id)}
                      size={18}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {typingUsers[selectedUser?._id] && (
          <div className="flex items-center space-x-2 text-gray-500 text-sm mt-10">
            <span>{selectedUser?.fullName} is typing</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}
