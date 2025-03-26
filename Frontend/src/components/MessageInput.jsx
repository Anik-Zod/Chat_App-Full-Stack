import React, { useRef, useState, useEffect } from "react";
import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages, startTyping, stopTyping } = useChatStore();
  const typingTimeoutRef = useRef(null);

  // Handle user typing
  useEffect(() => {
    if (text.trim()) {
      startTyping();
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        stopTyping();
      }, 2000); // Stops typing after 2 seconds of inactivity
    } else {
      stopTyping();
    }

    return () => clearTimeout(typingTimeoutRef.current);
  }, [text]);

  // Handle file change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove image preview
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle sending message (either text or image)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (text.trim() || imagePreview) {
      sendMessages({ text, image: imagePreview });
      setText("");
      setImagePreview(null);
      stopTyping();
    }
  };

  return (
    <div>
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-700"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="m-5 flex items-center gap-3 bg-gray-800 p-3 rounded-full shadow-lg border border-gray-700"
      >
        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 text-gray-200 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
          id="file-upload"
        />

        {/* File Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 rounded-full text-gray-400 hover:bg-gray-600 transition duration-200 ${
            imagePreview ? "text-emerald-500" : "text-gray-400"
          }`}
        >
          <Image size={22} />
        </button>

        {/* Send Button (Disabled if no text or image) */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}
