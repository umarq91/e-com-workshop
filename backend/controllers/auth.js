import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { customError } from "../utils/CustomError.js";
let salt = bcrypt.genSaltSync(10);
export const createUser =async(req,res)=>{
    const {name,email,password,phone,addresses}=req.body
try {
    
    let hashedpassword = bcrypt.hashSync(password, salt);
    const data= await UserModel.create({...req.body,password:hashedpassword})

res.json({success:true,data}).status(200)
} catch (error) {
    console.log(error);
}
}


export const signIn = async (req, res, next) => {

    let { email, password } = req.body;
    try {
        console.log(email,password);
      let validUser = await UserModel.findOne({ email });
      // TODO : error Handling
      if (!validUser) return next(customError(400, "User not Found"));
      
     
  
      let validpassword = bcrypt.compareSync(password, validUser.password);
      if (!validpassword) return next(customError(401, "passord did not matched"));
      const { password: hashedpassword, ...rest } = validUser._doc;
  
      const token = jwt.sign({ id: validUser._id }, process.env.jwtSecret, {
        expiresIn: "1d",
      });
      
      res
        .cookie("token", token, {
          sameSite: "None",
          httpOnly: true,
          secure: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
  

  
export const userVerification = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.jwtSecret, {}, async (err, usertoken) => {
      if (err) throw err;
      const { name, email, _id,isAdmin,addresses } = await UserModel.findById(
        usertoken.id
      );

      res.json({ name, email, _id,isAdmin,addresses });
    });
  }
};

export const userLogout = (req, res) => {
  console.log(req.cookies);
  console.log("Logout Req coming");
  res
    .clearCookie("token", { secure: true, httpOnly: true, sameSite: "none" })
    .send({ message: "Cookies Cleared Successfully" });
};