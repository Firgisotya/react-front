import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    let token = localStorage.getItem("authToken");
    const user = token ? { loggedIn: true } : null;
    return user;
}

const ProtectedRoute = () => {
    const user = useAuth();
    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
}

export default ProtectedRoute;

    