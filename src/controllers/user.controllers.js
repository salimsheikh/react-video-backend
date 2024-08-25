import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"

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

    const { fullname, email, username, password } = req.body

    console.log("email: ", email);

    /*
    if(fullname === ""){
        throw new ApiError(400, "fullname is required");
    }
    */

    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Enter valid email address");
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists.")
    }

});

// Export the registerUser function for use in routes
export { registerUser };