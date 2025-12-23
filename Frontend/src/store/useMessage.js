import { create } from "zustand";

export const useMessage=create((set,get)=>({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  

})) 