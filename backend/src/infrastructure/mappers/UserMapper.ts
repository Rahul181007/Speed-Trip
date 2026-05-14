import {  User } from "../../domain/entities/User";
import { IUserDocument } from "../database/models/UserModel";



export class UserMapper {

    static toDomain(user: IUserDocument): User {

     return new User(
        user._id.toString(),
        user.name,
        user.email,
        user.password,
        user.createdAt,
        user.updatedAt
     )
    }
}