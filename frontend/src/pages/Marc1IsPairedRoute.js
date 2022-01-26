import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/firebase/AuthContext";
import { useEffect } from "react";

const Marc1IsPairedRoute = ({ children }) => {

    const navigate = useNavigate()
    const { isPaired } = useAuth();

    useEffect(() =>{
        if (!isPaired) {
            navigate("/pairMarc1")
        }
    }, [])
    return children
}
 
export default Marc1IsPairedRoute;