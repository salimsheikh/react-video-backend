import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register user controller function wrapped with asyncHandler
const registerUser = asyncHandler(async (req, res) => {
    // Respond with a 200 status code and a JSON message
    /**
    res.status(200).json({
        message: "ok, User" // Message confirming user registration
    });
    */

    /**
     * Steps to reigster user
     * get user details form frontend
     * validation - not empty
     * check if user alrady exists: username, email
     * check for images, check for avatar
     * upload theme to cloudinary, avatar check on cloudinary
     * Create user object - create entry in db
     * remove password and refresh token filed from response
     * check for user creation
     * return response
     */

    // Extract user details from the request body
    const { fullname, email, username, password } = req.body;

    console.log("email: ", email);

    /*
    if(fullname === ""){
        throw new ApiError(400, "fullname is required");
    }
    */    

    // Log the email to the console for debugging
    console.log("email: ", email);

    // Validate that all required fields are present and not empty
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.");
    }

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Enter a valid email address.");
    }

    // Check if a user with the same email or username already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    // If user already exists, throw a conflict error
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists.");
    }

    // Get the local paths for avatar and cover images (if provided)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // Ensure an avatar file is provided
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.");
    }

    // Upload the avatar to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    // Upload the cover image to Cloudinary (optional)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // If avatar upload fails, throw an error
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.");
    }

    // Create a new user object and save it to the database
    const user_res = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // Retrieve the created user from the database, excluding the password and refresh token fields
    const createdUser = await User.findById(user_res._id).select(
        "-password -refreshToken"
    );

    // If user creation fails, throw a server error
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating the user.");
    }

    // Return a success response with the created user data
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully.")
    );
});

// Export the registerUser function for use in routes
export { registerUser };