import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env",
});

connectDB();

/*
One approach is to write the connectDB() function inside our index.js only!
const connectDB = async ()  => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) ;
        console.log("DataBase is connected successfully");
    } catch (error) {
        console.log(`Error is ${error}`);
        throw error ;
    }
}
connectDB() ;
*/
