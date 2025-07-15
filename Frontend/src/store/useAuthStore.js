import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =  "https://chat-app-full-stack-psi.vercel.app";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Check user authentication
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      console.error("Auth Check Error:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // User signup
  SignUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully!");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // User login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successful!");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // User logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");

      get().disconnectSocket();
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  },

  // Update user profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.response?.data?.message || "Profile update failed!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Connect to WebSocket server
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket) return; // Prevent multiple connections

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  // Disconnect WebSocket
  disconnectSocket: () => {
    const { socket } = get();
    if (!socket) return;

    socket.off("getOnlineUsers"); // Remove event listeners
    socket.disconnect();
    set({ socket: null, onlineUsers: [] }); // Also clear online users
  },
}));
