import { PersistedUser, User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserMapper } from "../../mappers/UserMapper";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements IUserRepository{
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

 async getUserById(userId: string): Promise<PersistedUser | null> {
     const user=await UserModel.findById(userId);
     if(!user){
        return null;
     }
     return UserMapper.toDomain(user)
 }
}