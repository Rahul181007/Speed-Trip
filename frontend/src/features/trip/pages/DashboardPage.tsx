import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../app/store/authStore"
import { logoutService } from "../../auth/services/authService"


const DashboardPage = () => {

    const {user,isAuthenticated,logout}=useAuthStore()
    const navigate=useNavigate()

    const handleLogout=async()=>{
      try {
        await logoutService();
        logout()
        navigate("/login")
      } catch (error:unknown) {
        console.log(error)
      }
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
       <h1 className="text-4xl font-bold">Spee d Drive</h1>

       {isAuthenticated?(
        <div className="text-center">
            <p className="text-xl">
                Welcome,
                {" "}
                {user?.name}
            </p>

            <p className="text-gray-600">{user?.email}</p>
        </div>
       ):(
        <p>user not found</p>
       )}
       <button
    onClick={handleLogout}
    className="
        bg-black
        text-white
        px-6
        py-2
        rounded-lg
        mt-4
    "
>
    Logout
</button>
    </div>
  )
}

export default DashboardPage
