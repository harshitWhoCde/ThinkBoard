import mongoose from "mongoose"
export const connectDb= async()=>{

    try {
       await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected successfully");
    } catch (error) {
        console.error("errror in connecting db");
        process.exit(1);//exit when falier
    }
}