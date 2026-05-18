import logo from "../../assets/logo.png"
interface NavbarProps{
    onLogout:()=>void
}

const Navbar = ({
    onLogout
}: NavbarProps) => {

    return (

        <div
            className="
                h-14
                bg-white
                border-b
                flex
                items-center
                justify-between
                px-6
            "
        >

            {/* Left */}
            <div className="flex items-center gap-2">

                <img
                    src={logo}
                    alt="logo"
                    className="w-7 h-7 object-contain"
                />

                <h1 className="font-bold text-sm">
                    Speedo
                </h1>

            </div>

            {/* Right */}
            <button
                onClick={onLogout}
                className="
                    text-sm
                    border
                    px-4
                    py-1.5
                    rounded-md
                    hover:bg-gray-100
                    transition
                "
            >
                Logout
            </button>

        </div>
    );
};

export default Navbar;