import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";
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
  signup:async(data)=>{
    stat({isSigningUp:true})
    try {
          const backendHit = await axiosInstance.post("/auth/signup",data);
      stat({ authUser: backendHit.data });
        toast.success('Account Created successfully');


    } catch (error) {
      
        toast.error('Account creation failed',error.response.data.message);

    }
    finally{
      stat({
          isSigningUp: false
      })
    }
  },
  login:async(data)=>{
    stat({isLoggingIn:true})
    try {
          const backendHit = await axiosInstance.post("/auth/login",data);
      stat({ authUser: backendHit.data });
        toast.success('Account Logged In successfully');


    } catch (error) {
      
        toast.error('Account LogIn failed',error.response.data.message);

    }
    finally{
      stat({
          isLoggingIn: false
      })
    }
  },
  logout:async()=>{
    try {
      
      await axiosInstance.post('/auth/logout')
      stat({authUser: null})
      toast.success('Logged Out successfully')
    } catch (error) {
       toast.error('Account Logout failed',error.response.data.message);
    }
  }
}));
