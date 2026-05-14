import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { HttpStatus } from "../../../shared/constants/HttpStatus";
import { Messages } from "../../../shared/constants/Messages";
import { AppError } from "../../../shared/errors/AppError";
import { LoginResponseDTO } from "../../dto/auth/LoginResponseDTO";
import { LoginUserDTO } from "../../dto/auth/LoginUserDTO";
import { IHashSevice } from "../../interface/services/IHashService";
import { ITokenService } from "../../interface/services/ITokenService";
import { ILoginUser } from "../../interface/use-cases/ILoginUser";
import { UserResponseMapper } from "../../mappers/UserResponseMapper";

export class LoginUser implements ILoginUser{
    constructor(
        private _userRepository:IUserRepository,
        private _hashService:IHashSevice,
        private _tokenService:ITokenService
    ){}

    async execute(data: LoginUserDTO): Promise<LoginResponseDTO> {
        const user= await this._userRepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError(Messages.AUTH.INVALID_CREDENTIALS,HttpStatus.UNAUTHORIZED);
        }

        const isPasswordMatch=await this._hashService.compare(data.password,user.password);
        if(!isPasswordMatch){
            throw new  AppError(Messages.AUTH.INVALID_CREDENTIALS,HttpStatus.UNAUTHORIZED);
        }

        const accessToken=await this._tokenService.generateAceessToken({userId:user.id});
        const refreshToken=await this._tokenService.generateRefreshToken({userId:user.id});
        return  UserResponseMapper.toLoginResponseDTO(user,accessToken,refreshToken);
    }
}