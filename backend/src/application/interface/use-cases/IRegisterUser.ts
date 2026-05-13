import { PersistedUser, User } from "../../../domain/entities/User";
import { RegisterUserDTO } from "../../dto/auth/RegisterUserDTO";

export interface IRegisterUser{
    execute(data:RegisterUserDTO):Promise<PersistedUser>;
}