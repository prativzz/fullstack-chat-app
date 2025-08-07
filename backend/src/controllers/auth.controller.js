import { generatetoken } from "../lib/util.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"
export const signup = async(req,res)=>{
   const {fullName,email,password}=req.body
   if(!fullName || !password || !email)
   {
      return res.status(400).json({message:"Please fill up everything"});
   }
    try{
      if (password.length<6){
         return res.status(400).json({message:"Password should be atleast 6 characters"});
      }
      const user = await User.findOne({email})
      if(user)          return res.status(400).json({message:"Email already exists"});

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)
 
const newUser= new User({
   fullName:fullName,
   email:email,
   password:hashedPassword
})
if (newUser){
   generatetoken(newUser._id,res)
   await newUser.save();
   res.status(201).json({
      _id:newUser._id,
      fullName:newUser.fullName,
      email:newUser.email,
profilePic: newUser.profilePic
   })
      
   
}
} 
    
    catch(error){
console.log(error.message)
res.status(500).json({message:"server error"})
    }
 }
 export const login = async (req,res)=>{
    const {email,password}=req.body;
    try{
      const user = await User.findOne({email})
     if(!user){return res.status(400).json({message:"invalid creds"})}
     const ispwcorrect = await bcrypt.compare(password,user.password)
     if(!ispwcorrect){
        return res.status(400).json({message:"invalid creds"});
     }

   // Update user status to online
   await User.findByIdAndUpdate(user._id, {
     isOnline: true,
     lastSeen: new Date()
   });
   
   generatetoken(user._id,res)
   await user.save();
   res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
       profilePic:user.profilePic,
       isOnline: true
   })
      
   

   } catch(error){
console.log(error.message)
res.status(500).json({message:"server error"})
   }
 }
export const logout = async (req,res)=>{
   try{
    const userId = req.user?._id;
    
    // Update user status to offline
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date()
      });
    }
    
    // Clear the JWT cookie with exact same options as when it was set
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/", // Explicitly set path to root
    });
    
    return res.status(200).json({message:"logged out"})
   }catch(error){
    console.log(error.message)
    res.status(500).json({message:"server error"})
   }
 }
 export const checkAuth= (req,res)=>{
   try{
res.status(200).json(req.user)
   }
   catch(error){
 console.log("error in check auth:",error.message)
res.status(500).json({message:"internal server error"})
   }
  }
  export const updateprofile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (profilePic === "") {
  await User.findByIdAndUpdate(userId, { profilePic: "" }, { new: true });
  return res.status(200).json({ message: "Profile picture removed" });
}

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    if (!uploadResponse?.secure_url) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateprofile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
