import { useAuth } from '../services/firebase/AuthContext';
import { useNavigate } from 'react-router'
import { useLocation } from "react-router-dom"

const SignOutButton = (props) => {

    const { isPaired, setIsPaired } = useAuth()
    const { signout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleUnpair(e) {
        e.preventDefault()
        setIsPaired(false)
        navigate("/pairMarc1")
    }

    async function handleSignOut(e) {
        e.preventDefault()
        try {
            // call signout function
            await signout()
            navigate("/")
        } catch (err) {
            console(err)
        }
    }

    return (
        <div onClick={location.pathname === '/mainmenu' ? handleUnpair : handleSignOut} className="cursor-pointer w-5/12 p-3 bg-blue-crayola text-white text-center rounded-lg sm:w-1/3 lg:w-1/6">{props.title}</div>
    );
}

export default SignOutButton;