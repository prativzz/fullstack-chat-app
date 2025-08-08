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
            try {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    resource_type: "auto",
                    chunk_size: 6000000 // 6MB chunk size for large files
                });
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(400).json({ message: "Image upload failed. Please try a smaller image." });
            }
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
    const messageId = req.params.messageId;
    const deleted = await Message.findByIdAndDelete(messageId);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Emit socket event to notify other users
    const { senderId, recieverId } = deleted;
    const receiverSocketId = getReceiverSocketId(recieverId);
    const senderSocketId = getReceiverSocketId(senderId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }
    if (senderSocketId && senderSocketId !== receiverSocketId) {
      io.to(senderSocketId).emit("messageDeleted", messageId);
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

