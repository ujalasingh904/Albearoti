import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
},{timestamps:true})

export const Auth = mongoose.model("Auth",AuthSchema)