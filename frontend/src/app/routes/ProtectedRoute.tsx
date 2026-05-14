import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"


const ProtectedRoute = () => {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const isInitializing = useAuthStore(
        (state) => state.isInitializing
    );
    if (isInitializing) {

        return null;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <Outlet />
}

export default ProtectedRoute
