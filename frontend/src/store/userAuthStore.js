import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = 'http://localhost:5001'
export const useAuthStore = create((stat,get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  socket :null,
  online:[],
  checkAuth: async () => {
    try {
      const backendHit = await axiosInstance.get("/auth/check");
      stat({ authUser: backendHit.data });
      get().connectSocket()
    } catch (error) {
      console.log(" Error in checkAuth:", error);
      stat({ authUser: null });
    } finally {
      stat({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    stat({ isSigningUp: true });
    try {
      const backendHit = await axiosInstance.post("/auth/signup", data);
      stat({ authUser: backendHit.data });
       get().connectSocket();
      toast.success("Account Created successfully");
    } catch (error) {
      toast.error("Account creation failed", error.response.data.message);
    } finally {
      stat({
        isSigningUp: false,
      });
    }
  },
  login: async (data) => {
    stat({ isLoggingIn: true });
    try {
      const backendHit = await axiosInstance.post("/auth/login", data);
      stat({ authUser: backendHit.data });
 get().connectSocket();
      toast.success("Account Logged In successfully");
    } catch (error) {
      toast.error("Account LogIn failed", error.response.data.message);
    } finally {
      stat({
        isLoggingIn: false,
      });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      stat({ authUser: null });
       get().disconnectSocket();
      toast.success("Logged Out successfully");
    } catch (error) {
      toast.error("Account Logout failed", error.response.data.message);
    }
  },
  updateprofile: async (data) => {
    stat({ isUpdatingProfile: true });
    try {
      const backendHit = await axiosInstance.put("/auth/profile-update", data);
      stat({ authUser: backendHit.data });
      toast.success("ProfilePic Changed successfully");
    } catch (error) {
      console.log(" Error in updateprofile:", error);
      toast.error("Failed to change the Profile Image", error.response.data.message);
    } finally {
      stat({
        isUpdatingProfile: false,
      });
    }
  },
  connectSocket: ()=>{
    const {authUser}=get();
    if(!authUser || get().socket?.connected) return ;
    const socket = io(BASE_URL,{
      query:{userId:authUser._id},
    });
    stat({socket:socket});
    socket.connect();
    socket.on('getOnlineUser',(user)=>{
      stat({online:user});
    });
  },
  disconnectSocket:()=>{
     if(get().socket?.connected) get().socket.disconnect();
  }
}));
