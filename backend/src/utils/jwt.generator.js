import jwt from "jsonwebtoken";
export const generator = (userId, res) => {
    const token = jwt.sign({id:userId},process.env.JWT_KEY,{
        expiresIn:'7d',
    })
    res.cookie('JWTtoken',token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== 'developement'
    })
    return token;
};
