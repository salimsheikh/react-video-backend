//require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
dotenv.config({
    path: './env'
});
import connectDB from "./db/index.js";

connectDB();
/*
First approach to connect to db
import express from "express";
const app = express();
//The code snippet ;(()=>{})() is a self-invoking (or immediately invoked) function expression (IIFE) written in JavaScript.
; (async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        app.on("error", (error) => {
            console.log("Error on connection:- ", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.log("ERROR:- ", error);
        throw error
    }
})()

*/