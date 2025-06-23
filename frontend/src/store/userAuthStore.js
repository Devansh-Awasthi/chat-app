import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
export const useAuthStore = create((stat) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const backendHit = await axiosInstance.get("/auth/check");
      stat({ authUser: backendHit.data });
    } catch (error) {
      console.log(" Error in checkAuth:", error);
      stat({ authUser: null });
    } finally {
      stat({ isCheckingAuth: false });
    }
  },
  sigup:async(data)=>{

  }
}));
