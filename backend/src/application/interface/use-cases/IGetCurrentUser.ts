import { UserResponseDTO } from "../../dto/auth/UserResponseDTO";

export interface IGetCurrentUser{
    execute(userId:string):Promise<UserResponseDTO>
    
}