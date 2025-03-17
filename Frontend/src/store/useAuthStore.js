import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout:async (data)=>{
    try {
        await axiosInstance.post("/auth/logout")
        set({authUser:null})
        toast.success("logged out successfully")
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
    } catch (error) {
        toast.error(error.response?.data?.message || "login failed. Try again.")
    } finally{
        set({isLoggingIn:false})
    }
  }
}));
