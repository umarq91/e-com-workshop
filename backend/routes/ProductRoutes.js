import { Router } from "express";
import { getProducts, addProduct } from "../controllers/Products.js";


const router = Router();

router.post('/',addProduct)
router.get('/',getProducts)

export default router