import { useState } from "react"
import type { RegisterSchemaType } from "../validations/authSchema";
import { registerService } from "../services/authService";

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const registerUser = async (
        data: RegisterSchemaType
    ) => {
        try {
            setLoading(true);
            setError("");
            const response = await registerService(data);
            return response;
        } catch (error: unknown) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Registration failed"
            )
            
        } finally {
            setLoading(false)
        }
    }
    return {
        registerUser,
        loading,
        error
    }
}

export default useRegister
