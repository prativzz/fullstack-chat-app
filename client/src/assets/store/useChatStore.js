import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers: async()=>{
           set ({isUsersLoading:true})
    try{
const res = await axiosInstance.get("/messages/users")
console.log(res.data)
set({users:res.data})
    }catch(error){
toast.error(error.response.data.message)
    }
    finally {
      set({ isUsersLoading: false });
    }
    },


     getMessages: async(userId)=>{
           set ({isMessagesLoading:true})
    try{
 const res = await axiosInstance.get(`/messages/${userId}`);
set({messages:res.data})
    }catch(error){
toast.error(error.response.data.message)
    }
    finally {
      set({ isMessagesLoading: false });
    }
    },
sendMessage: async(messageData)=>{
const {selectedUser , messages}=get();
try{
const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
set({messages:[...messages,res.data]})
}catch(error){
toast.error(error.response.data.message)
}
},
deleteMessage: async (id) => {
  try {
    await axiosInstance.delete(`/messages/${id}`);
    // Fetch updated messages from database instead of just filtering local state
    const { selectedUser } = get();
    if (selectedUser) {
      await get().getMessages(selectedUser._id);
    }
  } catch (err) {
    console.error("Failed to delete message", err);
  }
},

subscribeToMessages:()=>{
  const {selectedUser}= get()
  if(!selectedUser)return
const socket= useAuthStore.getState().socket;
  
  socket.on("newMessage",(newMessage)=>{
    if(newMessage.senderId !=selectedUser._id)return;
    set({
      messages:[...get().messages,newMessage]
    })
  })
  
  // Handle real-time message deletion
  socket.on("messageDeleted",(deletedMessageId)=>{
    set({
      messages: get().messages.filter((msg) => msg._id !== deletedMessageId)
    })
  })
},
unsubscribeFromMessages:()=>{
  const socket= useAuthStore.getState().socket;
  socket.off("newMessage")
  socket.off("messageDeleted")
},
    setSelectedUser:(selectedUser)=> set({selectedUser})
}))