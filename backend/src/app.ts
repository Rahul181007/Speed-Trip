import express from 'express';
import cors from "cors";
import { errorMiddleware } from './presentation/middleware/errorMiddleware';
import authRoutes from './presentation/routes/authRoutes';
import cookieParser from "cookie-parser";
import tripRoutes from "./presentation/routes/tripRoutes";
const app=express();

app.use(cors({

    origin: process.env.FRONTEND_URL,

    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/trips",tripRoutes)
app.use(errorMiddleware);

export default app;
