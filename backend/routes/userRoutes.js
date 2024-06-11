import {Router} from 'express'
import { updateUser } from '../controllers/userController.js'
import { verifyToken } from '../middlewares/userVerification.js'

const router = Router()


router.put('/',verifyToken,updateUser)

export default router