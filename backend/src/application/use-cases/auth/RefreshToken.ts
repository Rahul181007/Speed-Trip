import { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../../../shared/constants/HttpStatus";
import { Messages } from "../../../shared/constants/Messages";
import { AppError } from "../../../shared/errors/AppError";
import { ITokenService } from "../../interface/services/ITokenService";
import { IRefreshToken } from "../../interface/use-cases/IRefreshToken";

export class RefreshToken implements IRefreshToken {
    constructor(
        private _tokenService: ITokenService
    ) { }

    async execute(refreshToken: string): Promise<string> {
        if (!refreshToken) {
            throw new AppError(
                Messages.AUTH.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED
            )
        }

        const decoded = await this._tokenService.verifyToken(refreshToken) as JwtPayload;

        const newAceesToken = await this._tokenService.generateAceessToken({ userId: decoded.userId });

        return newAceesToken
    }
}