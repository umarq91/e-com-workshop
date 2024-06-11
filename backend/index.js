import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import env from "dotenv"
import { connectDB } from "./db/db.js"
import authRoutes from "./routes/authRoutes.js"
import ProductRoutes from "./routes/ProductRoutes.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js"

env.config()


const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(bodyParser.json())
app.use(cookieParser())


connectDB()

app.listen(5000, () => console.log("server running on port 5000"))


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/products',ProductRoutes);
app.use('/api/v1/cart',cartRoutes)
app.use('/api/v1/orders',orderRoutes)
app.use('/api/v1/user',userRoutes)

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
