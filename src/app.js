import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// CORS * : Allow all cross origin requests
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Limit the json files upto 16kb on the server
app.use(express.json({limit: "16kb"}));

// URLencoded used to decode the url encoded by brower when url contains some space or other special characters
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// use public folder for tempory saving of files on server
app.use(express.static("public"));

// cookie parser for safely perform CRUD operatin in client cookies
app.use(cookieParser());

// import routes
import userRoutes from "./routes/user.routes.js";

// all user routes are directed to user.routes.js
// so inorder to register use we have to goto --> http://localhost:8000/api/v1/users/register
app.use("/api/v1/users", userRoutes);

export { app };