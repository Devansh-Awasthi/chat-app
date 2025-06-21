import Message from "../model/db.message";
import User from "../model/db.user";
import cloudinary from "../lib/cloudinary.js";
export const getUserForSidebar = async(req,res) =>{
 try {
    const loggedInUser = req.user._id;
    const filteredUser = User.find({_id:{$ne:loggedInUser}}).select("-password");
    res.status(200).json(filteredUser)
 } catch (error) {
      console.log('Internal sever Error in getUserForSidebar:', error);
      res.status(500).json({message:'An Error Occured'});
 
 }
} 
export const getMessage= async(req,res) =>{
    try {
        const {id:userToChat} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChat},
               {senderId:userToChat,receiverId:myId} 
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
       console.log('Internal sever Error getMessage:', error);
      res.status(500).json({message:'An Error Occured'});
    
        
    }
}

export const sendMessage= async(req,res) =>{
   try {
    const {image,text} = req.body;
    const {id:receiverId} = req.params
    const myId = req.user._id;
    let imgUrl ;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imgUrl = uploadResponse.secure_url;
    }
    const newMessage =new Message({
        senderId:myId,
        receiverId:id,
        text:text,
        image:imgUrl

    })
await newMessage.save();



res.status(201).json(newMessage)
   } catch (error) {
      console.log('Internal sever Error sendMessage:', error);
      res.status(500).json({message:'An Error Occured'});
    

   } 
}