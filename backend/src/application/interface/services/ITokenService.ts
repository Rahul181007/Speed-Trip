import { JwtPayload } from "jsonwebtoken";

export interface ITokenService{
    generateAceessToken(
        payload:object
    ):Promise<string>;
    generateRefreshToken(
        payload:object
    ):Promise<string>;   

    verifyToken(
        token:string
    ):Promise<JwtPayload>
}