import { PersistedUser, User } from "../entities/User";

export interface IUserRepository {
    createUser(user:User):Promise<PersistedUser>;
    getUserByEmail(email:string):Promise<PersistedUser | null>;
    getUserById(userId:string):Promise<PersistedUser|null>
}