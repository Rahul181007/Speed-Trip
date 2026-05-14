import { Outlet } from "react-router-dom"
import logo from "../assets/logo.png"

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from bg-green-300 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white  rounded-3xl shadow-lg px-10 py-12">
        <div
          className="
            flex
            items-center
            justify-center
            mb-8
          "
        >

          <img
            src={logo }
            alt="Speed Drive Logo"
            className="w-13 h-13 object-contain"
          />

          <h1
            className="
              text-1xl
              font-bold
              mt-4
            "
          >
            Speedo
          </h1>

        </div>

        <Outlet />

      </div>
    </div>
  )
}

export default AuthLayout
