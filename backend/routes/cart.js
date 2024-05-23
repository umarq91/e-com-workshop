import { Router } from "express";
import { addToCart } from "../controllers/Cart.js";


const router = Router();

router.post('/',addToCart)


export default router