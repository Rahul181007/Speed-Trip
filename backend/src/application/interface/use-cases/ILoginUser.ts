import { LoginResponseDTO } from "../../dto/auth/LoginResponseDTO";
import { LoginUserDTO } from "../../dto/auth/LoginUserDTO";

export interface ILoginUser{
    execute(data:LoginUserDTO):Promise<LoginResponseDTO>
}