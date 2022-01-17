import { Navigate } from "react-router-dom";
import { useAuth } from "../services/firebase/AuthContext";
const ProtectedRoute = ({ children }) => {

    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;