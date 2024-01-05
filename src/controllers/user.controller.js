import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userRegister = asyncHandler(async (req, res, next) => {
    // Take data from User (frontend)
    // Check if data send is correct or not - Empty Field Check
    // Check if user already exists or not
    // Take images from user, Avatar image is required
    // Upload the image(s) to Cloudinary
    // Check if image(s) has been successfully uploaded on Cloudinary
    // If everything is ok, create an entry of User object to DB
    // Remove password(encrypted), email and refreshToken before sending response back to the frontend

    // In request-body, we get all the data in the form of JSON entered by the user through forms [Not through URL]
    // File Handling is done seperately in user.routes.js
    const { username, fullName, email, password } = req.body;

    // Arrays.some() is specifically used to check for validation very easily
    if (
        [username, fullName, email, password].some(
            (field) => field.trim() === ""
        )
    ) {
        throw new ApiError(400, "Empty Fields are not allowed");
    }

    // findOne({query})  returns the first Object that matches the query
    const existedUser = User.findOne({
        $or: [{ username }, { email }],
    });

    // If User already exists, we cannot make them register again
    if (existedUser) {
        throw new ApiError(409, "User-Name or Email already exists");
    }

    // Middlewares, in general, add more options to our Response-body
    // Multer gives us the option to files that has been uploaded temporarily into our local server
    const avatarLocalFilePath = req.files?.avatar[0]?.path;
    const coverImageLocalFilePath = req.files?.coverImage[0]?.path;

    // Avatar-Image is neccessary for our application
    if (!avatarLocalFilePath) {
        throw ApiError(400, "Avatar Image is compulsory");
    }

    // To intentionally wait before our image is uploaded to cloudinary, we have declared our registerUser as an asynchronous function
    const avatar = await uploadOnCloudinary(avatarLocalFilePath);
    const coverImage = await uploadOnCloudinary(coverImageLocalFilePath);

    if (!avatar) {
        throw ApiError(400, "Avatar Image is compulsory");
    }

    // We create an object in MongoDB using create({object}) method
    // Since DB is in different continent, we always use async-await for any interaction with the DB
    // Password & Refresh-Access tokens will be created at the time of User Object creation only by their respective functions

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        username: username.toLowerCase(),
    });

    // findById() searches for an user by its unique ID created by MongoDB at the time of object creation
    // Using select() we can remove all those fields which we don't want to send back to the User
    const newUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!newUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the User to the DataBase"
        );
    }

    // If everything went successfully, we can now send the response back confirming that the User has been successfully registered!!!
    res.status(200).json(
        new ApiResponse(
            201,
            newUser,
            "User has been registered Successfully!!!"
        )
    );
});

export default userRegister;
