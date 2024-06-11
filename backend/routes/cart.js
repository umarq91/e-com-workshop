import { Router } from "express";
import { addToCart, deleteFromCart, emptyCart, fetchCart, updateCart } from "../controllers/Cart.js";
import { verifyToken } from "../middlewares/userVerification.js";


const router = Router();

router.post('/',verifyToken,addToCart)
.get('/',verifyToken,fetchCart)
.patch('/:id',verifyToken,updateCart)
.delete('/:id',verifyToken,deleteFromCart)
.put('/empty',verifyToken,emptyCart)


export default router