import { Navigate } from "react-router-dom";
import { useAuth } from "../services/firebase/AuthContext";

const Marc1IsPairedRoute = ({ children }) => {
    
    const { isPaired } = useAuth();

    if (!isPaired){
        <Navigate to="/pairMarc1"/>
    }
    return children
}
 
export default Marc1IsPairedRoute;