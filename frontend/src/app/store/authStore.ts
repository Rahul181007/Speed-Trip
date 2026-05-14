import { create } from "zustand";
import type { AuthUser } from "../../features/auth/types/authTypes";

interface AuthState {
    user: AuthUser | null;

    accessToken: string | null;

    isAuthenticated: boolean;

    setAuth: (
        user: AuthUser,
        accessToken: string,
    ) => void;
    logout: () => void;

isInitializing: boolean;

setInitializing: (
    value: boolean
) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    setAuth: (
        user,
        accessToken
    ) => set({
        user,
        accessToken,
        isAuthenticated: true
    }),
    logout: () => set({
        user: null,
        accessToken: null,
        isAuthenticated: false
    }),
    isInitializing: true,
    setInitializing: (
    value
) => set({
    isInitializing: value
}),
}))