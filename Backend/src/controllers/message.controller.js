import cloudinary from '../lib/cloudinary.js';
import Message from '../models/message.model.js'
import User from "../models/user.model.js";

//get all user instead me 
export const getUserForSidebar = async(req,res,next)=>{
     try {
        const currentUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:currentUserId}}).select("-password")
        res.status(200).json(filteredUsers)
     } catch (error) {
        next(error)
     }
}

//get message
export const getMessages = async (req,res,next)=>{
   try {
    const {id:userToChatId} = req.params;
    const myId = req.user._id

    const message = await Message.find({
        $or:[
            {senderId:myId, receiverId:userToChatId},
            {senderId:userToChatId, receiverId:myId}
        ]
    })
    res.status(200).json(message)
   } catch (error) {
    next(error)
   }
}

export const sendMessage = async (req,res,next)=>{
    try {
        const{image,text} = req.body;
        const{id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save();

        //todo: realtime functionality goes here => Socket.io
        
        res.status(200).json(newMessage)

    } catch (error) {
        next(error)
    }
}



