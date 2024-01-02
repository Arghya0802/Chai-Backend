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

export { app };
