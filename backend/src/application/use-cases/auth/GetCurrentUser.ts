import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { HttpStatus } from "../../../shared/constants/HttpStatus";
import { Messages } from "../../../shared/constants/Messages";
import { AppError } from "../../../shared/errors/AppError";
import { UserResponseDTO } from "../../dto/auth/UserResponseDTO";
import { IGetCurrentUser } from "../../interface/use-cases/IGetCurrentUser";
import { UserResponseMapper } from "../../mappers/UserResponseMapper";

export class GetCurrentUser implements IGetCurrentUser{
    constructor(
        private _userRepository:IUserRepository
    ){}

    async execute(userId: string): Promise<UserResponseDTO> {
        const user=await this._userRepository.getUserById(userId);
        if(!user){
            throw new AppError(Messages.AUTH.USER_NOT_FOUND,HttpStatus.NOT_FOUND);
        }

        return UserResponseMapper.toUserResponse(user)
    }
}