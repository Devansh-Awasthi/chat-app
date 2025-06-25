import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
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
    stat({isSigningUp:true})
    try {
          const backendHit = await axiosInstance.get("/auth/signup");
      stat({ authUser: backendHit.data });
        toast.success('Account Created successfully');


    } catch (error) {
      
        toast.error('Account creation failed',error.response.data.message);

    }
  }
}));
