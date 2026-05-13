import { NextFunction, Request, Response } from "express";

import { HttpStatus } from "../../shared/constants/HttpStatus";

import { AppError } from "../../shared/errors/AppError";

export const errorMiddleware = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {

    if (error instanceof AppError) {

        res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });

        return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
    });
};