import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
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
       const receiverSocketId = getReceiverSocketId(receiverId);
     
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage)
    } catch (error) {
          console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
}
export const deleteMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    const result = await Message.deleteMany({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId }
      ]
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "No conversation found"
      });
    }

    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("conversationDeleted", myId);
    }

    res.status(200).json({
      message: "Conversation deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.log("Error in deleteConversation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
