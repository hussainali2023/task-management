import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
   avatar : {
        type: {
            url: String,
            localpath: String
        }, 
        default : {
            url: `https://placehold.co/600x400`,
            localpath:""
        }
   },
   username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true, 
   },
   fullname: {
    type: String,
    required: true,
    trim: true, 
   }, 
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true, 
    index: true
   },
   password: {
    type: String,
    required: true,
    trim: true, 
   },
   isEmailVerified: {
    type: Boolean,
    default: false
   },
   forgotPasswordToken: {
    type: String,
    default: null
   },
    forgotPasswordTokenExpiry: {
     type: Date,
     default: null
    },
    refreshToken: {
     type: String,
     default: null
    },
    emailVerificationToken: {
     type: String,
     default: null
    },
    emailVerificationTokenExpiry: {
     type: Date,
     default: null
    },
    
}, {timestamps: true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateTemporaryToken = function(){
   const unHashedToken =  crypto.randomBytes(32).toString("hex")
   const hashedToken =  crypto.hash("sha256").update(unHashedToken).digest("hex")
   const tokenExpiry = Date.now() + 10 * 60 * 1000 // 10 minutes

   return {
        unHashedToken,
        hashedToken,
        tokenExpiry
   }
}

export const User = mongoose.model("User", userSchema);