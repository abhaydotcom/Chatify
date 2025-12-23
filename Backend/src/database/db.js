import mongoose from "mongoose";

export const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/chatApp`);
        console.log("MongoDb connected successfully")
        
    } catch (error) {
        console.log("Error in connect database")
        console.log(error)
        process.exit(1);
    }
}