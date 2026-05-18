import { Link, useNavigate } from "react-router-dom"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
import useLogin from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaType } from "../validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";



const LoginPage = () => {

    const { login, loading, error } = useLogin();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginSchemaType) => {

        const response =
            await login(data);

        if (response) {

            navigate("/trips");
        }

    }
    return (
        <div>
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
                    Welcome Back
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
                            : "Sign In"}
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
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="
                text-blue-500
                font-medium
            "
                    >
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage
