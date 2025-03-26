import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  typingUsers: {}, // Store typing users as { userId: true }


  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) return;

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },


  deleteMessage: async (messageId) => {
    try {
      const res = await axiosInstance.delete(`/messages/delete/${messageId}`);
      set({ messages: get().messages.filter((msg) => msg._id !== messageId) });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  },

  startTyping: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.emit("typing", {
      senderId: useAuthStore.getState().authUser._id,
      receiverId: selectedUser._id,
    });
  },

  stopTyping: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.emit("stopTyping", {
      senderId: useAuthStore.getState().authUser._id,
      receiverId: selectedUser._id,
    });
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage"); // Prevent duplicate listeners
    socket.off("receiveReaction");

    // Handle new message
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
    // Handle typing event
    socket.on("userTyping", ({ senderId }) => {
      set((state) => ({
        typingUsers: { ...state.typingUsers, [senderId]: true },
      }));
    });

    // Handle stop typing event
    socket.on("userStoppedTyping", ({ senderId }) => {
      set((state) => {
        const updatedTypingUsers = { ...state.typingUsers };
        delete updatedTypingUsers[senderId];
        return { typingUsers: updatedTypingUsers };
      });
    });

  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Unsubscribe from all relevant events
    ["newMessage", "userTyping", "userStoppedTyping"].forEach((event) => {
        socket.off(event);
    });
},

}));
