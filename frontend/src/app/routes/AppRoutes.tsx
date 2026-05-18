import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "../../layouts/AuthLayout"
import LoginPage from "../../features/auth/pages/LoginPage"
import RegisterPage from "../../features/auth/pages/RegisterPage"
import DashboardPage from "../../features/trip/pages/DashboardPage"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"
import TripDetailsPage from "../../features/trip/pages/TripDetailsPage"


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/trips" element={<DashboardPage />} />
                    <Route
                        path="/trips/:tripId"
                        element={<TripDetailsPage />}
                    />
                </Route>

                <Route element={<PublicRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route
                            path="/login"
                            element={<LoginPage />}
                        />
                        <Route
                            path="/register"
                            element={<RegisterPage />}
                        />

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
