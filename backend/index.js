import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import env from "dotenv";
// import { connectDB } from "./db/db.js"
import authRoutes from "./routes/authRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import { upload } from "./middlewares/multer.js";
import uploadOnCloudinary from "./utils/Cloudinary.js";

env.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

export const connectDB = async () => {
  try {
    console.log("Coming");

    const conn = await mongoose.connect(
      "mongodb+srv://umer:123@cluster0.nszpwqv.mongodb.net/ecom?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
console.log({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.apikey,
  api_secret: process.env.apisecret,
});

app.listen(5000, () => console.log("server running on port 5000"));

app.post("/test", upload.array("images", 10), async (req, res) => {
  const cloudinaryURLs = [];
  const images = req.files;

  for (let img of images) {
    const res = await uploadOnCloudinary(img.path);
    cloudinaryURLs.push(res.url);
  }
  console.log(cloudinaryURLs);
  res.json({ url: cloudinaryURLs });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/user", userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 501;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: "false",
    message,
    statusCode,
  });
});
