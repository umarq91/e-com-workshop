import { Router } from "express";
import { createOrder, getUserOrders } from "../controllers/orders.js";
import {verifyToken} from "../middlewares/userVerification.js"

const router = Router();

router.get('/own',verifyToken,getUserOrders)
.post('/',verifyToken,createOrder)

export default router