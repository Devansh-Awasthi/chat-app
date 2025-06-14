import mongoose from "mongoose";
const messageSchema =new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        
        },
        name:{
            type:String,
            required:true,
        },
         password:{
            type:String,
            required:true,
            minlength:8,
        }
        ,
         profilePic:{
            type:String, 
            default:''
        }
        
    },{
        timestamps:true
    }
)
const Message = mongoose.model('Message' , messageSchema);
export default Message  ;