import { Link } from 'react-router-dom'
import { useRef, useState } from 'react';
import { useAuth } from '../services/firebase/AuthContext';

const ForgetPasswordCard = () => {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            // call reset password function
            await resetPassword(emailRef.current.value)
            alert('Check your email for further instructions')
            setError('')
            setLoading(false)
        } catch(err) {
            setError('Please enter a registered email')
            console.log(err)
            setLoading(false)
        }
    }

    return ( 
        <div className="w-full px-6 py-8 shadow-md rounded ">
            <form id="loginForm" onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded mb-5" type="text" ref={emailRef} placeholder="&#xf199;  Email address" required />
                {error && <div className="mt-3">{error}</div>}
                <button disabled={loading} className='w-full bg-blue-crayola text-cultured p-2 rounded-md' type='submit'>Reset Password</button>
            </form>

        </div>
    );
}
 
export default ForgetPasswordCard;