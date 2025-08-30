// import { errorMiddleware } from '@/middlewares/error.middleware';
import express from "express";
import cors from "cors";
import rootRouter from "@/routes"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
  origin: ["http://localhost:3001"],
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api', rootRouter)

// app.use(errorMiddleware)

export default app;