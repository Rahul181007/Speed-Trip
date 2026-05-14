export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

export interface LoginResponse {
    success: boolean;
    data: {
        user: AuthUser;
        accessToken: string;
    }
}