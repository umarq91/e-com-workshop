import { Router } from "express";
import { createUser, signIn, userLogout, userVerification } from "../controllers/auth.js";


const router = Router();

router.post('/sign-up',createUser)
router.post('/sign-in',signIn)
router.get('/user',userVerification)
router.get('/logout',userLogout)


export default router