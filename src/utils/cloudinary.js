import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Make-Sure we use try-catch block because uploading files is as difficult as Databases
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // If file path exsits, upload it on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // File has been uploaded successfully
        console.log(`File has been successfully uploaded at: ${response.url}`);
        fs.unlinkSync(localFilePath); // If file is uploaded sucessfully to CLoduinary, we unlink it as well
        return response;
    } catch (error) {
        // If file is not uploaded successfully, we need to remove the temporary file stored in our server
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary };
