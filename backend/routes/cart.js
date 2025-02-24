import { Router } from "express";
import { addToCart, deleteFromCart, emptyCart, fetchCart, updateCart } from "../controllers/Cart.js";
import { verifyToken } from "../middlewares/userVerification.js";


const router = Router();

router.get('/',verifyToken,fetchCart)
.post('/',verifyToken,addToCart)
.patch('/:id',verifyToken,updateCart)
.delete('/:id',verifyToken,deleteFromCart)
.put('/empty',verifyToken,emptyCart)


export default router