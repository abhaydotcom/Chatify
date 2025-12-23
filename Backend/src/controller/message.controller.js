import cloudinary from "../lib/cloudinary.js";
import Message from "../model/message.model.js";
import { User } from "../model/user.model.js";


export const getAllUsers=async(req,res)=>{
    try {
        const loggedInUser=req.user._id
        const filterUser=await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filterUser)
    } catch (error) {
          console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessage=async(req,res)=>{

    try {
        const {id:userToChatID}=req.params
        const myId=req.user._id;

         const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatID },
        { senderId: userToChatID, receiverId: myId },
      ],
    });

    console.log(messages)

    res.status(200).json(messages)

    } catch (error) {
          console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }

}

export const sendMessage=async(req,res)=>{
    try {
            const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text,image } = req.body;

    
    let imageUrl;

    if(image){
        const uploadResponse=await cloudinary.uploader.upload(image)
        imageUrl=uploadResponse.secure_url
    }

    const newMessage = await Message({
      senderId,
      receiverId,
      text,
      image:imageUrl
    });

    await newMessage.save()
    res.status(201).json(newMessage)
    } catch (error) {
          console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
}