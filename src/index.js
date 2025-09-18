// import   mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import express from "express";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT }`);
        });
    })
    .catch((err) => {
        console.error("MONGO DB connection error:", err);
    });

/*

import express from "express"
const app = express()


(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("Error :",error)
        throw error
       })

       app.listen(process.env.port, () => {
           console.log(`Server is running on port ${process.env.port}`)
       })
    }catch (error) {
        console.error("Error connecting to MongoDB:", error)
        throw err
        
    }
})();

*/