import { Router } from "express";
import { getProducts, addProduct, fetchSingleProduct, searchProduct, updateProduct } from "../controllers/Products.js";


const router = Router();

router.get('/search',searchProduct)
router.post('/',addProduct)
.get('/',getProducts)
.get('/:id',fetchSingleProduct)
.patch('/:id',updateProduct)

export default router