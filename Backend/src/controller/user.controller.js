import { verifyEmail } from "../email/verifyEmail.js";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


export const Signup=async(req,res)=>{

   try {

     const {fullName,email,password}=req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({
            message:"All fields are required" 
        })
    }
      if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user=await User.findOne({email})

    if(user){
        return res.status(400).json({
            message:"User already exist"
        })
    }
     const hashPassword=await bcrypt.hash(password,10)
        const newUser=await User.create({
            fullName,
            email,
            password:hashPassword
        })

        let token;
        if(newUser){
           token= generateToken(newUser._id,res)
           verifyEmail(token,email)
           await newUser.save()

        }
      
        res.status(201).json({
            message:"User created successfully",
            data:newUser
        })
    
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server Error"
    })
    
   }


}

export const login =async(req,res)=>{

  try {

      const {email,password}=req.body;
    
    if(!email || !password){
        return res.status(400).json({message:"All fileds required"})

    }

    const user=await User.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }

    const passwordCheck=await bcrypt.compare(password,user.password)
      if(!passwordCheck){
            return res.status(400).json({
                message:"Unauthorized Access"
            })
        }

        generateToken(user._id,res)

        res.status(200).json({
            message:"Login Successfully",
            data:user
        })
    
  } catch (error) {
     console.log(error)
    res.status(500).json({
        message:"Internal Server Error"
    })
    
  }


} 


export const logout=async(req,res)=>{
    try {
        
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logout successfully"})
    } catch (error) {
            console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
}



export const verification=async(req,res)=>{
    try {
         const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }
    
    let decode
 
        try {
        
            decode=jwt.verify(token,process.env.JWT_SECRET)
          
        } catch (error) {
            if(error.name=="TokenExpiredError"){
                return res.status(400).json({
                    success:false,
                    message:"Token is expired"
                })
            }
            return res.status(400).json({
                success:false,
                message:"Token Verification Failed"
            })
        }
 
        const user=await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        console.log(user)
        user.isVerified=true

        await user.save();
          res.clearCookie("jwt");

        return res.status(200).json({
            success:true,
            message:"Email Verified Successfully"
        })

        
    } catch (error) {
         return res.status(500).json({
        success:false ,
        message:error.message
    })
    }
}

export const checkAuth = (req, res) => {
  try {
    console.log(req.user)
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile=async(req,res)=>{
    try {
        
        const {profilePic}=req.body
        const userId=req.user._id
           if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse=await cloudinary.uploader.upload(profilePic);
    const updatedUser=await User.findByIdAndUpdate(userId,
        {profilePic:uploadResponse.secure_url},
        {new:true}
    )

    res.status(200).json(updatedUser)
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
    } catch (error) {
        
    }
}
