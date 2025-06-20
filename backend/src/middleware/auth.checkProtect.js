import jwt from 'jsonwebtoken';
import User from '../model/db.user.js';


export const checkProtect = async(req,res,next) =>{
    const token = req.cookies.JWTtoken
    try{
        if(!token) {
            //error
            return res.status(401).json({message:'Token Absent'})
        }
        const isCorrect = jwt.verify(token,process.env.JWT_KEY);
    if(!isCorrect) {
            //error
            return res.status(401).json({message:'Invalid Token'})
        }
        // console.log(isCorrect.id)
        const userInfo =await User.findById(isCorrect.id).select('-password');
    if(!userInfo){
            return res.status(401).json({message:'User Not Found'});
    }
    req.user = userInfo
    next(); 
    }
    catch(error){
    console.log('Internal Error in checkProtect middleware:', error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
}