import { PersistedUser, User } from "../../../domain/entities/User";
import { IuserRepository } from "../../../domain/repositories/IUserRepository";
import { UserMapper } from "../../mappers/UserMapper";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements IuserRepository{
 async createUser(user: User): Promise<PersistedUser> {
     const newUser=await UserModel.create(user);
     return UserMapper.toDomain(newUser);
 }

 async getUserByEmail(email: string): Promise<PersistedUser | null> {
     const user=await UserModel.findOne({email});
     if(!user){
        return null;
     }
     return UserMapper.toDomain(user);
 }
}