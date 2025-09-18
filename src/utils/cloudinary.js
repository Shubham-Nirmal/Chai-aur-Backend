import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });



    const uploadCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null
            // Upload file to Cloudinary
           const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type:'auto',
            })
            // file has been uploaded successfully
            console.log('File uploaded to Cloudinary successfully', response.url);
            return response;
        } catch (error) {
           fs.unlinkSync(localFilePath);
           return null;
        }
    };
export { uploadCloudinary };