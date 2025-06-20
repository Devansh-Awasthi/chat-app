import Message from "../model/db.message";
import User from "../model/db.user";

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
    } catch (error) {
       console.log('Internal sever Error getMessage:', error);
      res.status(500).json({message:'An Error Occured'});
    
        
    }
}