import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../../shared/errors/AppError";
import { HttpStatus } from "../../shared/constants/HttpStatus";
import { ZodType } from "zod";


export const validate=(schema:ZodType)=>{
    return(
        req:Request,
        _res:Response,
        next:NextFunction
    ):void=>{
        try{
            schema.parse(req.body);
            next();
        }catch(error:unknown){
            if(error instanceof ZodError){
                const message=error.issues[0].message;
                next(
                    new AppError(message,HttpStatus.BAD_REQUEST)
                );
                return;
            }
            next(error);
        }
    }
}
