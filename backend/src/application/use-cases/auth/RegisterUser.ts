import { PersistedUser, User } from "../../../domain/entities/User";
import { IuserRepository } from "../../../domain/repositories/IUserRepository";
import { HttpStatus } from "../../../shared/constants/HttpStatus";
import { Messages } from "../../../shared/constants/Messages";
import { AppError } from "../../../shared/errors/AppError";
import { RegisterUserDTO } from "../../dto/auth/RegisterUserDTO";
import { IHashSevice } from "../../interface/services/IHashService";
import { IRegisterUser } from "../../interface/use-cases/IRegisterUser";
import { UserDTOMapper } from "../../mappers/UserDTOMapper";

export class RegisterUser implements IRegisterUser{
    constructor(
        private _userRepository:IuserRepository,
        private _hashService:IHashSevice,
    ){}

    async execute(data: RegisterUserDTO): Promise<PersistedUser> {
         const existingUser=await this._userRepository.getUserByEmail(data.email);
         if(existingUser){
            throw new AppError(Messages.AUTH.USER_ALREADY_EXISTS,HttpStatus.CONFLICT)
         }


         const hashedPassword=await this._hashService.hash(data.password);

         const userEntity=UserDTOMapper.toEntity({
            ...data, 
            password: hashedPassword
        });

        const newUser=await this._userRepository.createUser(userEntity);

        return newUser;
    }
}