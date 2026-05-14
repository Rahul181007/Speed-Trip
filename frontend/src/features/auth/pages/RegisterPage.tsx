import { Link, useNavigate } from "react-router-dom"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
import useRegister from "../hooks/useRegister"
import { useForm } from "react-hook-form"
import { registerSchema, type RegisterSchemaType } from "../validations/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"


const RegisterPage = () => {
    const { registerUser, loading, error } = useRegister()
    const navigate=useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterSchemaType) => {
        await registerUser(data);
        navigate("/login")
    }
    return (
        <div>

    <h1
        className="
            text-2xl
            font-semibold
            text-center
            mb-8
            text-gray-900
        "
    >
        Create Account
    </h1>

    <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
    >

        <div>

            <label
                className="
                    block
                    text-sm
                    font-medium
                    mb-2
                    text-gray-700
                "
            >
                Name
            </label>

            <Input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
            />

            {errors.name && (

                <p
                    className="
                        text-red-500
                        text-sm
                        mt-1
                    "
                >
                    {errors.name.message}
                </p>
            )}
        </div>

        <div>

            <label
                className="
                    block
                    text-sm
                    font-medium
                    mb-2
                    text-gray-700
                "
            >
                Email
            </label>

            <Input
                type="email"
                placeholder="example@email.com"
                {...register("email")}
            />

            {errors.email && (

                <p
                    className="
                        text-red-500
                        text-sm
                        mt-1
                    "
                >
                    {errors.email.message}
                </p>
            )}
        </div>

        <div>

            <label
                className="
                    block
                    text-sm
                    font-medium
                    mb-2
                    text-gray-700
                "
            >
                Password
            </label>

            <Input
                type="password"
                placeholder="At least 6 characters"
                {...register("password")}
            />

            {errors.password && (

                <p
                    className="
                        text-red-500
                        text-sm
                        mt-1
                    "
                >
                    {errors.password.message}
                </p>
            )}
        </div>

        {error && (

            <p
                className="
                    text-red-500
                    text-sm
                "
            >
                {error}
            </p>
        )}

        <Button
            type="submit"
            disabled={loading}
        >
            {loading
                ? "Loading..."
                : "Sign Up"}
        </Button>

    </form>

    <p
        className="
            text-center
            mt-8
            text-sm
            text-gray-600
        "
    >
        Already have an account?{" "}

        <Link
            to="/login"
            className="
                text-blue-500
                font-medium
            "
        >
            Login
        </Link>
    </p>

</div>
    )
}

export default RegisterPage
