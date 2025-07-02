import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
export const useMessageStore = create((stat,get) => ({
  isMessageLoading: false,
  isUserLoading: false,
  selectedUser: null,
  messages: [],
  users: [],
  getUser: async () => {
    stat({ isUserLoading: true });
    try {
      const backendHit = await axiosInstance.get("/message/user");
      stat({ users: backendHit.data });
    } catch (error) {
      toast.error("getUser Failed ", error.response.data.message);
      console.log(" Error in getUser:", error);
    } finally {
      stat({ isUserLoading: false });
    }
  },
  getMessage:async (userId) => {
    stat({ isMessageLoading: true });
    try {
      const backendHit = await axiosInstance.get(`/message/${userId}`);
      stat({ messages: backendHit.data });
    } catch (error) {
      toast.error("getMessage Failed ", error.response.data.message);
      console.log(" Error in getMessage:", error);
    } finally {
      stat({ isMessageLoading: false });
    }
  },
  sendMessage:async (messageData) => {
    const {messages,selectedUser} = get();
    try {
      const backendHit = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
      stat({messages:[...messages,backendHit.data]});
    } catch (error) {
      toast.error("sendMessage Failed ", error.response.data.message);
      console.log(" Error in sendMessage:", error);
    } 
  },

  setSelectedUser : (selectedUser)=>{stat({selectedUser})}
}));
