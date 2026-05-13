import { Types } from "mongoose";
import { PersistedUser, User } from "../../domain/entities/User";

interface UserDocument {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

export class UserMapper {

    static toDomain(user: UserDocument): PersistedUser {

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
}