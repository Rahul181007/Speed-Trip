import { NextFunction, Request } from "express";
import { IRegisterUser } from "../../application/interface/use-cases/IRegisterUser";
import { HttpStatus } from "../../shared/constants/HttpStatus";
import { Response } from "express";
import { Messages } from "../../shared/constants/Messages";
import { UserResponseMapper } from "../../application/mappers/UserResponseMapper";
import { ILoginUser } from "../../application/interface/use-cases/ILoginUser";
import { IRefreshToken } from "../../application/interface/use-cases/IRefreshToken";
import { ILogout } from "../../application/interface/use-cases/ILogout";

export class AuthController {
    constructor(
        private _registerUserUseCase: IRegisterUser,
        private _loginUserUseCase: ILoginUser,
        private _refreshTokenUseCase: IRefreshToken,
        private _logout: ILogout
    ) { }

    registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const user = await this._registerUserUseCase.execute(req.body);
            res.status(HttpStatus.CREATED).json({
                success: true,
                message: Messages.AUTH.USER_REGISTERED_SUCCESSFULLY,
                data: UserResponseMapper.toRegisterResponseDTO(user)
            })

        } catch (error: unknown) {
            next(error);
        }
    }

    loginUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const data = await this._loginUserUseCase.execute(req.body);
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(HttpStatus.OK).json({
                success: true,
                data: {
                    user: data.user,
                    accessToken: data.accessToken
                },
            })
        } catch (error: unknown) {
            next(error);
        }
    }

    me = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        res.status(HttpStatus.OK).json({
            success: true,
            user: req.user
        })
    }

    refreshAcessToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const refreshToken = req.cookies.refreshToken
            const accessToken = await this._refreshTokenUseCase.execute(refreshToken);

            res.status(HttpStatus.OK).json({
                success: true,
                accessToken
            })
        } catch (error: unknown) {
            next(error)
        }
    }

    logoutUser=async(
        _req:Request,
        res:Response,
        next:NextFunction
    ):Promise<void>=>{
        try {
            await this._logout.execute();
            res.clearCookie("refreshToken",{
                httpOnly:true,
                secure:false,
                sameSite:"strict"
            })

            res.status(HttpStatus.OK).json({
                success:true,
                message:Messages.AUTH.LOGOUT_SUCCESS
            })
        } catch (error:unknown) {
            next(error)
        }
    }
}