import { v2 as cloudinary } from "cloudinary";
import fs from "fs";



const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.apikey,
        api_secret: process.env.apisecret
    });
    
    try {
        
        if (!localFilePath) return null;
    
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
    
       
        fs.unlinkSync(localFilePath) // delete the file from local storage
        return response;

    } catch (error) {
        console.log(error);
        
        fs.unlinkSync(localFilePath); // delete the file if it is not uploaded on cloudinary
    }
}

export default uploadOnCloudinary