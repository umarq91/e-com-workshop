import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import env from "dotenv"
import { connectDB } from "./db/db.js"
import userRoutes from "./routes/UserRoutes.js"
import ProductRoutes from "./routes/ProductRoutes.js"
env.config()


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

connectDB()

app.listen(5000, () => console.log("server running on port 5000"))


app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/products',ProductRoutes);

app.use((err,req,res,next)=>{
// 
    const statusCode = err.statusCode || 501;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success:"false",
        message,
        statusCode
    })

})
