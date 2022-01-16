import { Navigate } from "react-router-dom";
import { useAuth } from "../services/firebase/AuthContext";
const ProtectedRoute = ({ children }) => {

    const { user } = useAuth();
    console.log("Check user in Private: ", user);
    
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;