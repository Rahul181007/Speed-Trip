import { PersistedUser } from "../../domain/entities/User";
import { LoginResponseDTO } from "../dto/auth/LoginResponseDTO";
import { RegisterResponseDTO } from "../dto/auth/RegisterResponseDTO";
import { UserResponseDTO } from "../dto/auth/UserResponseDTO";

export class UserResponseMapper {
  static toRegisterResponseDTO(
    user:PersistedUser,
  ):RegisterResponseDTO{
    return {
        id:user.id,
        name:user.name,
        email:user.email,
    }
  }

  static toLoginResponseDTO(
    user:PersistedUser,
    accessToken:string,
    refreshToken:string
  ):LoginResponseDTO{
    return {
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
        },
        accessToken,
        refreshToken
    }
  }

  static toUserResponse(
    user:PersistedUser
  ):UserResponseDTO{
    return {
      id:user.id,
      name:user.name,
      email:user.email,
      
    }
  }
}