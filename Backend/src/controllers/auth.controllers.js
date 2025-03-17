import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { createError } from "../middleware/createError.js";
import cloudinary from "../lib/cloudinary.js";

export async function signup(req, res, next) {
  try {
    const { fullName, email, password, profilePic } = req.body;

    // Check for missing fields
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      fullName,
      profilePic,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT Token
    generateToken(newUser._id, res);

    // Send response without password
    const { password: pwd, ...others } = newUser._doc;

    res.status(201).json({
      message: "Signup successful",
      user: others, // Send user details except password
    });
  } catch (error) {
    next(error);
  }
}


//login route
export async function login(req, res, next) {
    const{email,password} = req.body;
    if(!email||!password) return res.status(401).json({message:"fill all fields"})
    try {
      const user = await User.findOne({email})
      if(!user)return res.status(400).json("Wrong Credentials")

      const matched = await bcrypt.compare(password,user.password)
      if(!matched) return res.status(400).json("Wrong Credentials")
      
        
        generateToken(user._id,res);
        const { password:_, ...otherDetails } = user._doc;
        res.status(200).json({
            message: "Login successful",
            user: otherDetails,
      });
    } catch (error) {
        next(error)
    }
}



//logout route
export function logout(req, res, next) {
    try {
        res.cookie("jwt","",{maxAge:0},)
        res.status(200).json({message:"Logout successfully"})
    } catch (error) {
        next(error)
    }
}


export  async function updateProfile(req,res,next){
    try {
        const{profilePic} = req.body;
        if(!profilePic)return next(createError(400,"Picutre required"))

        const userId = req.user._id;
        
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const upadateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
        
        res.status(200).json(upadateUser)

    } catch (error) {
        next(error)
    }
}

export function checkAuth(req,res,next){
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error)
    }
}