import { User } from "../../domain/entities/User";
import { RegisterUserDTO } from "../dto/auth/RegisterUserDTO";

export class UserDTOMapper {

    static toEntity(data: RegisterUserDTO): User {

        return {
        
            name: data.name,
            email: data.email,
            password: data.password,
        };
    }
}