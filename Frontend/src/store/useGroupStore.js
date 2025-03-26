import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useGroupStore = create((set, get) => ({
   groups:[],// To store groups
   groupMessages: [], // For group messages
   selectedGroup: null, // To store the selected group
   isGroupsLoading: false, // Track loading state for group messages
    
   createGroup: async ({ members, name, image }) => {
    set({ isGroupsLoading: true }); // Track loading state for group creation
    try {
      const res = await axiosInstance.post("/groups", { members, name, image });
      toast.success("Group created successfully");
  
      set((state) => ({
        groups: [...state.groups, res.data.newGroup], // Append new group
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create group");
    } finally {
      set({ isGroupsLoading: false }); // Ensure loading state is reset
    }
  },

  setSelectedGroup : (data)=>{
     set({selectedGroup:data})
  },
  
  
   getGroups: async () => {
    try {
      const res = await axiosInstance.get("/groups/getGroups");
      set({ groups: res.data }); // Update the state with the fetched groups
    } catch (error) {
      toast.error(error.message);
    }
   },


  

}))