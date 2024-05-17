import { Router } from "express";
import { createUser, signIn } from "../controllers/auth.js";


const router = Router();

router.post('/',createUser)
router.post('/sign-in',signIn)

export default router