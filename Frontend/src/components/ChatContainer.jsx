import React, { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useChatStore } from "../store/useChatStore";
import { Trash2 } from "lucide-react";

export default function ChatContainer({ setOpenDetail }) {
  const { messages, getMessages, isMessagesLoading, selectedUser, deleteMessage } = useChatStore();
  const messagesEndRef = useRef(null);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return <p className="text-center text-gray-500 mt-4">Loading messages...</p>;
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Chat Header */}
      <ChatHeader setOpenDetail={setOpenDetail} />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.map((message) => {
          const isSentByUser = message.senderId !== selectedUser._id;

          return (
            <div key={message._id} className={`relative flex items-center ${isSentByUser ? "justify-end" : "justify-start"}`}>
              {/* Delete Icon */}
              {isSentByUser && (
                <Trash2
                  onClick={() => deleteMessage(message._id)}
                  size={18}
                  className="mr-2 text-gray-500 cursor-pointer transition-transform hover:scale-125"
                />
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow break-words ${isSentByUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
              >
                <p>{message.text}</p>

                {/* Message Image */}
                {message.image && (
                  <img src={message.image} alt="Message attachment" className="max-w-full h-auto mt-2 rounded" />
                )}

                {/* Timestamp */}
                <span className={`block text-xs mt-1 ${message.senderId !== selectedUser._id ? "text-gray-300" : "text-gray-500"}`}>
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
                    : "N/A"}
                </span>
              </div>

              {/* Delete Icon for received messages */}
              {!isSentByUser && (
                <Trash2
                  onClick={() => deleteMessage(message._id)}
                  size={18}
                  className="ml-2 text-gray-500 cursor-pointer transition-transform hover:scale-125"
                />
              )}
            </div>
          );
        })}

        {/* Invisible div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
}
