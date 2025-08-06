import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import { app, server } from "./lib/socket.js";
import path from "path"
import cookieParser from "cookie-parser"
dotenv.config()

const PORT =process.env.PORT
const __dirname=path.resolve()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));



console.log("Mounting auth routes...");
app.use("/api/auth", authRoutes);

console.log("Mounting message routes...");
app.use("/api/messages", messageRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.all("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}



server.listen(PORT, ()=>{
    console.log("hello listening" + PORT)
    connectDB()
})