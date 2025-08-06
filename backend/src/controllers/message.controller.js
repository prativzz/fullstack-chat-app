import User from "../models/user.model.js"
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId , io } from "../lib/socket.js";


export const getUsersforSidebar=async(req,res)=>{
    console.log("req.cookies.jwt:", req.cookies.jwt);
console.log("req.user:", req.user);
    try{
        

        const loggedinUserId= req.user._id
        const filteredUsers=await User.find({_id:{$ne:loggedinUserId}}).select("-password")



        res.status(200).json(filteredUsers)
    }
    catch(error){
 console.log("error",error.message)
res.status(500).json({message:"internal server error"})
    }
}
export const getMessages=async(req,res)=>{
    try {
         
     const {id:userToChatId} = req.params
    const myId=req.user._id;
const messages = await Message.find({
$or:[
{senderId:myId , recieverId:userToChatId},
{senderId:userToChatId, recieverId:myId}
]
})
res.status(200).json(messages)
    } catch (error) {
        console.log("error",error.message)
res.status(500).json({message:"internal server error"})
    }
}
export const sendMessages=async(req,res)=>{
    try {
        const {text,image}=req.body
        const {id:recieverId}=req.params
        const senderId=req.user._id
        let imageUrl;
        if (image){
            const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            senderId:senderId,
            recieverId:recieverId,
            text:text,
            image:imageUrl

        })
        await newMessage.save()

const receiverSocketId = getReceiverSocketId(recieverId)
if (receiverSocketId){
    io.to(receiverSocketId).emit("newMessage", newMessage)
}

        res.status(201).json(newMessage)
    } catch (error) {
          console.log("error",error.message)
res.status(500).json({message:"internal server error"})
    }
}



export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId; // 👈 must match your route param
    const deleted = await Message.findByIdAndDelete(messageId);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

