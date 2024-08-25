import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Enable CORS with specific origin and allow credentials
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Set allowed origin from environment variable
    credentials: true // Allow cookies to be sent with requests
}));

// Parse incoming JSON requests with a size limit
app.use(express.json({ limit: "16kb" }));

// Parse incoming URL-encoded data with a size limit and extended support
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Parse cookies from incoming requests
app.use(cookieParser());

// Import user-related routes
import userRouter from './routes/user.routes.js';

// Use the user router for routes starting with '/api/v1/users'
app.use("/api/v1/users", userRouter);

// Example URL for the register route
// http://localhost:8000/api/v1/users/registers

// Export the app for use in other modules
export default app ;
