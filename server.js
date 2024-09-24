import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"   // for cross origin request
dotenv.config()
import authRoute from "./routes/auth.route.js"
import taskRoute from "./routes/task.route.js"
import cookieParser from "cookie-parser"

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err.message))


const app = express()
app.use(express.json())
app.use(cookieParser()) 

app.use(cors( 
    {
        origin: "http://localhost:5173",
        credentials: true, 
    }
))

const port = process.env.PORT || 5000;
 

 app.use("/api/auth", authRoute) // for login and register
 app.use("/api/task", taskRoute) // for task operations



app.listen(port, () => console.log(`server listening on port :${port}`))
