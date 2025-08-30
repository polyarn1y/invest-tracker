import { Router } from "express";
import authRouter from "@/routes/auth.router"

const router = Router()

router.use('/auth', authRouter)

router.get('/status', (req, res) => {
  res.status(200).json({message: "ok"})
})

export default router;