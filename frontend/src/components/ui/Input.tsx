import type {
    InputHTMLAttributes
} from "react";

type InputProps =
    InputHTMLAttributes<
        HTMLInputElement
    >;

const Input = ({
    className = "",
    ...props
}: InputProps) => {

    return (

        <input
            {...props}
            className={`
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                bg-white
                transition-all
                duration-200
                focus:ring-2
                focus:ring-black
                focus:border-black
                placeholder:text-gray-400
                ${className}
            `}
            required
        />
    );
};

export default Input;
