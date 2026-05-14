import type {
    ButtonHTMLAttributes
} from "react";

type ButtonProps =
    ButtonHTMLAttributes<
        HTMLButtonElement
    >;

const Button = ({
    children,
    className = "",
    ...props
}: ButtonProps) => {

    return (

        <button
            {...props}
            className={`
                w-full
                bg-black
                text-white
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-200
                hover:opacity-90
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;