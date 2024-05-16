import { Router } from "express";
import { createUser, signIn } from "../controllers/auth.js";


const router = Router();

router.post('/',createUser)
router.get('/',signIn)

export default router