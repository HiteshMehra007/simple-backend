import { v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uplaodToCloudinary = async (localFilePath) => {
    try{
        // No file path found
        if(!localFilePath){
            console.log("No file path found !!");
            return null;
        }
        // otherwise uplaod the file
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        // file has been succesfully uploaded
        console.log("File has been uplaoded, URL: ", response.url);
        
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath); // unlink or remove the locally saved temp file
    }
}

export {uplaodToCloudinary}