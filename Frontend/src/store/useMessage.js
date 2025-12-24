import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiox";
import { useAuth } from "./useAuth";

export const useMessage=create((set,get)=>({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUser:async()=>{
    set({isUsersLoading:true})
    try {
        const res=await axiosInstance.get('/message/users')
        set({users:res.data})
        
    } catch (error) {
         toast.error(error.response.data.message);
    }finally{
        set({isUsersLoading:false})
    }
  },

  getMessage:async(userId)=>{
    set({ isMessagesLoading:true })
    try {
        const res=await axiosInstance.get(`/message/${userId}`)
        set({messages:res.data})
        
    } catch (error) {
         toast.error(error.response.data.message);
    }finally{
        set({isMessagesLoading:false})
    }
  },

  sendMessage:async(data)=>{
    const {messages,selectedUser}=get();

    try {
      const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,data)
     
        set({messages:[...messages,res.data]})
        
    } catch (error ) {
         toast.error(error.response.data.message);
    }
  }, 

  setSelectedUser:(selectedUser)=>set({selectedUser}),
 subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuth.getState().socket; 
 

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
       
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuth.getState().socket;
    socket.off("newMessage");
  },


})) 