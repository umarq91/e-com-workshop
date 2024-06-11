import { UserModel } from "../models/UserModel.js";

export const updateUser = async (req, res) => {
  
    const { id } = req.user;
    try {
      const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
      console.log("successs");
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
    res.end()
  };