import User from "../model/db.user.js";
import bcrypt from "bcryptjs";
import { generator } from "../utils/jwt.generator.js";
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (password.length < 8) {
      return res.status(400).json({ message: "password must be > 8" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new User({
      email: email,
      name: name,
      password: hashed,
    });
    if (newUser) {
      //Jwt Gen
      generator(newUser._id, res);
      await newUser.save();
      res.status(500).json({
        _id:newUser._id,
        email: newUser.email,
      name: newUser.name,
      profilePic:newUser.profilePic
      })
    } else {
      return res.status(400).json({ message: "wrong Information" });
    }
  } catch (error) {
        console.log('Internal sever Error:', error);
      return res.status(500).json({ message: "Internal Server Error" });
    //   return res.status(400).json({ message: "wrong Information" });
  }

};

export const login = (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};
