import jwt from "jsonwebtoken"
import {customError} from "../utils/CustomError.js"
import {UserModel} from "../models/UserModel.js"
export const verifyToken = async(req,res,next)=>{
    const token =req.cookies.token
    console.log("comign");
    if(!token) return next(customError(404,"you are not authenticated!"))
    try {
        const usertoken = jwt.verify(token, process.env.jwtSecret);
        const user = await UserModel.findById(usertoken.id);
    
        // Attach user information to the request object for use in subsequent middleware or routes
        req.user = user;
        console.log("coming2");
        next();
    } catch (error) {
        next(customError(500,"Something is Wrong"))
    }
}