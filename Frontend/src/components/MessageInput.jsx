import React, { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();

  // Handle file change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if the file type is an image
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
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle sending message (either text or image)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (text.trim() || imagePreview) {
      sendMessages({ text, image: imagePreview });
      setText("");
      setImagePreview(null);
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
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
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
      <form onSubmit={handleSendMessage} className="m-5 flex items-center gap-3 bg-white p-3 rounded-full shadow-lg border border-gray-200">
        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className={`p-2 rounded-full text-gray-600 hover:bg-gray-200 transition duration-200 ${imagePreview ? 'text-emerald-500' : 'text-gray-400'}`}
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
