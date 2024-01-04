import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use() is used for Middlewares OR to configure our App
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// Allowing data and forms to get stored in JSON format into our Backend Server
app.use(express.json({ limit: "16kb" }));

// Allows encoding of all different types of URLs into our server
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

// Allows images and other things to be availed publicly inside public folder
app.use(express.static("public"));

// Cookie-Parser allows us to perform CRUD operations on User Cookies
app.use(cookieParser());

// Importing User Routes is done after declaring Middlewares
import userRouter from "./routes/user.routes.js";

// Using Middlewares to modularise our code
// Whenever user visits the URL "/users", we will activate userRouter and then we will use the corresponding controller
// URL looks like: "https::localhost:8000/api/v1/users"
// /api/v1/users --> Now becomes our BASE URL or Home-Page for userRouter
// Standard practice is to use /api/version-number as the
app.use("/api/v1/users", userRouter);

export { app };
