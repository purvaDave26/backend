const cloudinary=require("cloudinary").v2
require("dotenv").config()

const uploadtoCloud=async(path)=>{
    cloudinary.config({
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET,
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME
    })

    const cloudinaryresponse=await cloudinary.uploader.upload(path)
    return cloudinaryresponse
}
module.exports=uploadtoCloud