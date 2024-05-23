import { Router } from "express";
import { addToCart, fetchCart } from "../controllers/Cart.js";


const router = Router();

router.post('/',addToCart).get('/',fetchCart)


export default router