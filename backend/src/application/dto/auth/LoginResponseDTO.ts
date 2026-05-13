export interface LoginResponseDTO{
    user:{
        id:string;
        name:string;
        email:string;
    },
    accessToken:string;
    refreshToken:string
}