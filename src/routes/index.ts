import authRouter from '@/routes/auth.routes';
import profileRouter from '@/routes/user.routes'
import { Router } from "express";

const router = Router();

router.use('/auth', authRouter)
router.use('/user', profileRouter)

router.get('/status', (req, res) => {
  res.status(200).json({
    success: true
  })
})

export default router;