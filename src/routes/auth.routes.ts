import AuthController from "@/controllers/auth.controller";
import { Router } from "express";

const router = Router();
const authController = new AuthController();

router.post('/register', authController.createUser)
router.post('/login', authController.loginUser)
router.post('/refresh-token', authController.refreshToken)
router.post('/logout', authController.logoutUser)
router.get('/verify', authController.verifyUser)

export default router;