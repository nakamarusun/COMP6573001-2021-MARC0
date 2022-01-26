import { useAuth } from "../services/firebase/AuthContext";
import { useNavigate } from 'react-router'
import { useEffect } from "react";
const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate()
    const { currentUser } = useAuth();

    useEffect(() =>{
        if (!currentUser) {
            navigate("/")
        }
    }, [])
    return children;
};

export default ProtectedRoute;