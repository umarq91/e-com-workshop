import { Router } from "express";
import { addToCart, deleteFromCart, fetchCart, updateCart } from "../controllers/Cart.js";


const router = Router();

router.post('/',addToCart).get('/',fetchCart).patch('/:id',updateCart).delete('/:id',deleteFromCart)


export default router