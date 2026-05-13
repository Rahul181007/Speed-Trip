import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/errors/AppError";
import { Messages } from "../../shared/constants/Messages";
import { HttpStatus } from "../../shared/constants/HttpStatus";
import jwt from "jsonwebtoken";

export const verifyAccessToken = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(Messages.AUTH.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        const token = authHeader.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
        req.user = decoded as {
            userId: string;
        }
        next();
    } catch (_error) {
        next(new AppError(Messages.AUTH.UNAUTHORIZED, HttpStatus.UNAUTHORIZED));
    }

}