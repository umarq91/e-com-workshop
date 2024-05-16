import mongoose, { Schema } from "mongoose";

const UserSchema  = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    phone:{type:Number},
    isAdmin:{type:Boolean, default:false},
    addresses:{type:[mongoose.Schema.Types.Mixed]},
},{
    timestamps:true
})

export const UserModel = mongoose.model("User",UserSchema)

