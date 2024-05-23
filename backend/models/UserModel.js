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

// _id to .id
const virtualId  = UserSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

UserSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

export const UserModel = mongoose.model("User",UserSchema)

