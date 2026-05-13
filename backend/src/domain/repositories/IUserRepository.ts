import { PersistedUser, User } from "../entities/User";

export interface IuserRepository {
    createUser(user:User):Promise<PersistedUser>;
    getUserByEmail(email:string):Promise<PersistedUser | null>;
}