import authRouter from '@/routes/auth.routes';
import { Router } from "express";

const router = Router();

router.use('/auth', authRouter)

router.get('/status', (req, res) => {
  res.status(200).json({
    success: true
  })
})

export default router;