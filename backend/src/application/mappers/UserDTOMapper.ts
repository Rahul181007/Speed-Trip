import { User } from "../../domain/entities/User";
import { RegisterUserDTO } from "../dto/auth/RegisterUserDTO";

export class UserDTOMapper {

    static toEntity(data: RegisterUserDTO): User {

        return new User(
            "",
            data.name,
            data.email,
            data.password,
            new Date(),
            new Date()
        )
    }
}