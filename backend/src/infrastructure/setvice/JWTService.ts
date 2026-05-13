import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { ITokenService } from "../../application/interface/services/ITokenService";

export class JWTService implements ITokenService{
    async generateAceessToken(payload: object): Promise<string> {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]});
    }

    async generateRefreshToken(payload: object): Promise<string> {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"] });
    }

    async verifyToken(token: string): Promise<JwtPayload> {
        return jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET as string
        )as JwtPayload
    }
}