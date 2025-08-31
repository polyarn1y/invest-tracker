import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    user_id: req.user?.id,
    user_role: req.user?.role,
  })
})

export default router;