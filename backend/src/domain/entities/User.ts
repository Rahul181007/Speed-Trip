export interface User {
   
    name:string;
    email:string;
    password:string;
}

export interface PersistedUser extends User {

    id: string;
}