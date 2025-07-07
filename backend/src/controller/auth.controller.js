import User from "../model/db.user.js";
import bcrypt from "bcryptjs";
import { generator } from "../utils/jwt.generator.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }
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
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "wrong Information" });
    }
  } catch (error) {
    console.log("Internal sever in Sign Up:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    //   return res.status(400).json({ message: "wrong Information" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await User.findOne({ email });
    if (!userLogin) {
      res.status(500).json({ message: "Invalid information" });
    }
    const isPassCorrect = await bcrypt.compare(password, userLogin.password);
    if (!isPassCorrect) {
      res.status(500).json({ message: "Invalid information" });
    }
    generator(userLogin._id, res);
    res.status(200).json({
      _id: userLogin._id,
      email: userLogin.email,
      name: userLogin.name,
      profilePic: userLogin.profilePic,
    });
  } catch (error) {
    console.log("Internal sever Log IN:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("JWTtoken", "", { maxAge: 0 });
    res.status(200).json({
      message: "logged Out",
    });
  } catch (e) {
    console.log("Internal sever Error in Logout:", e);
    res.status(500).json({ message: "An Error Occured" });
  }
};
export const profileUpdate = async (req, res) => {
  try {
    const user = req.user._id;
    const { profilePic } = req.body;
    if (!profilePic) {
      res.status(400).json({ message: "Profile Pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedResponse = await User.findByIdAndUpdate(
      user,
      {
        profilePic: uploadResponse.secure_url,
      },
      {
        new: true,
      }
    );
  } catch (error) {
    console.log("Internal sever Error in profileUpdate:", error);
    res.status(500).json({ message: "An Error Occured" });
  }
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Internal sever Error in check:", error);
    res.status(500).json({ message: "An Error Occured" });
  }
};
