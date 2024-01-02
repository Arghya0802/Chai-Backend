import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env",
});

const PORT = process.env.PORT;

// Promise is returned from an asynchronous function
connectDB()
    .then(() => {
        // To catch any error we might get while running Express app()
        // App.on() is an event-listner so we need to give the name of the event it's listening to!!
        app.on("error", () => {
            console.log(`Express App crashed due to Error: ${error}`);
            throw error;
        });

        // App.listen() takes two arguements: PORT Number and callback()
        app.listen(PORT || 5000, () => {
            console.log(`App is listening at PORT ${PORT} successfully`);
        });
    })
    .catch((error) => {
        console.log(`MongoDB connection failed due to Error: ${error}`);
        throw error;
    });

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
