import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = "http://localhost:5001/"

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  socket:null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket()
    } catch (error) {
      console.error("Auth Check Error:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  SignUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully!");
      set({ authUser: res.data });

      get().connectSocket()
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout:async ()=>{
    try {
        await axiosInstance.post("/auth/logout")
        set({authUser:null})
        toast.success("logged out successfully")

        get().disconnectSocket()
    } catch (error) {
        toast.error(error.message)
    }
  },

  login: async (data) =>{
    set({isLoggingIn:true})
    try {
        const res = await  axiosInstance.post("/auth/login",data)
        set({authUser:res.data})
        toast.success("Login successfully")

        get().connectSocket()
    } catch (error) {
        toast.error(error.response?.data?.message || "login failed. Try again.")
    } finally{
        set({isLoggingIn:false})
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket:()=>{
    const{authUser} = get()
    if(!authUser || get().socket?.connected) return ;


    const socket = io(BASE_URL,{
      query:{
        userId:authUser._id,
      }
    })
    socket.connect();
    set({socket:socket})

    socket.on("getOnlineUsers",(userIds)=>{
      set({onlineUsers:userIds})
    })
   },

   disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });  // Ensure socket is fully cleared
    }
  }

}));
