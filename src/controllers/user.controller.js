import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError}from"../utils/ApiError.js";
import {User} from"../models/user.model.js";
import {uploadCloudinary} from"../utils/cloudinary.js";
import {ApiiResponse} from"../utils/ApiiResponse.js";

const registerUser = asyncHandler(async (req, res, )=>{
//    get user details from frontend

// validation- not empty

// check if user already exists : email, username
// check for Images , check for avtar
// Upload them to cloudinary,avatar
// create user Object - create entry in db
// remove password and refresh token field from response
// check for user creation
// reurn res          

const { username, email, fullName, password } = req.body
console.log("email",email)

if (
    [ username, email, fullName, password].some((field => field?.trim() === ""))
) {
    throw new ApiError("All fields are required", 400);
}
// check if user already exists
 const existedUser = User.findOne({ 
    $or: [{ email }, { username }] 
})
if (existedUser) {
    throw new ApiError("User already exists with this email or username", 409);
}
// check for images
const avatarLocalPath  = req.files?.avatar[0]?.path;
const coverImagesLocalPath = req.files?.coverImages[0]?.path;
if (!avatarLocalPath) {
    throw new ApiError("Avatar image is required", 400);
}
if (!coverImagesLocalPath) {
    throw new ApiError("Cover image is required", 400);
}

// upload images to cloudinary
const avatar = await uploadCloudinary(avatarLocalPath);
const coverImages = await uploadCloudinary(coverImagesLocalPath);
if (!avatar) {
    throw new ApiError("Avatar image upload failed", 400);
}

const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    fullName,
    password,
    avatar: avatar.url,
    coverImages: coverImages?.url || "",
})

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken "
  )
  if (!createdUser) {
    throw new ApiError("Something went wrong", 500);
  }
    return res.status(201).json(new ApiiResponse(
        200, createdUser,
    "User created successfully")
    )
})


export { 
    registerUser,
}
