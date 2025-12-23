import {create} from 'zustand'
import { axiosInstance } from '../lib/axiox'
import toast from 'react-hot-toast'






export const useAuth=create((set)=>({
      authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,



  checkAuth:async()=>{
    
    try {
        const res=await axiosInstance.get("/auth/check-auth")
        set({authUser:res.data})

    } catch (error) {
        set({authUser:null})
        console.log("error in check auth store",error)
    }finally{
        set({isCheckingAuth:false})
    }
  },

  signup:async(data)=>{
    set({isSigningUp:true})

    try {
        
        const res=await axiosInstance.post("/auth/signup",data)
        set({authUser:res.data})
         toast.success("Account created successfully");
        return {success:true}

        
    } catch (error) {
        console.log(error)
         toast.error(error.response.data.message);
        return {success:false}
    }finally{
        set({isSigningUp:false})
    }

  },

  login:async(data)=>{
    set({isLoggingIn:true})
    try {
        const res=await axiosInstance.post("/auth/login",data)
        set({authUser:res.data})
              toast.success("Logged in successfully");
         return {success:true}
        
    } catch (error) {
        console.log(error)
          toast.error(error.response.data.message);
         return {success:false}
    }finally{
        set({isLoggingIn:false})
    }
  },

   logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
          toast.success("Logged out successfully");
     
    } catch (error) {
     console.log(error)
        toast.error(error.response.data.message);
    }
  },

  updateProfile:async(data)=>{
    set({isUpdatingProfile:true})
    try {
      
      const res=await axiosInstance.put('/auth/update-profile',data)
      set({authUser:res.data})
           toast.success("Profile updated successfully");

    } catch (error) {
        console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    }finally {
      set({ isUpdatingProfile: false });
    }
  }




}))