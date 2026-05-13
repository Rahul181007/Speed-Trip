import express from 'express';
import cors from "cors";
import { errorMiddleware } from './presentation/middleware/errorMiddleware';
import authRoutes from './presentation/routes/authRoutes';
import cookieParser from "cookie-parser";
const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use(errorMiddleware);

export default app;
