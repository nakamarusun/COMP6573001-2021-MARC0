import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useRef, useState } from 'react';
import { useAuth } from '../services/firebase/AuthContext';

const LoginCard = (props) => {

    let isRegister = props.isRegister;
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')

    // for sign in
    const { signin } = useAuth()
    const [loginLoading, setLoginLoading] = useState(false)

    //  for sign up
    const confirmPasswordRef = useRef()
    const usernameRef = useRef()
    const { signup } = useAuth()
    const [registerLoading, setRegisterLoading] = useState(false)
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    async function handleLogin(e) {
        e.preventDefault()
        try {
            setError('')
            setLoginLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            alert('Logged in successfully')
            setError('')
            setLoginLoading(false)
            navigate("/pairMarc1")
        } catch (err) {
            setError('Invalid email or password')
            console.log(err)
            setLoginLoading(false)
        }
    }

    async function handleRegister(e) {
        e.preventDefault()

        if (!emailRef.current.value.match(emailRegEx)) {
            return setError('Invalid email format')
        }

        if (passwordRef.current.value.length < 6) {
            return setError('Password should be at least 6 characters')
        }

        if (passwordRef.current.value !==
            confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setRegisterLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value,
                usernameRef.current.value)
            alert('Signed up successfully')
            setError('')
            setRegisterLoading(false)
            navigate("/pairMarc1")
        } catch (err) {
            setError('Failed to create an account')
            console.log(err)
            setRegisterLoading(false)
        }

    }

    return (
        <div className="w-full px-6 py-8 shadow-md rounded sm:w-1/2 md:w-7/12 lg:w-4/12">
            <form id="loginForm" onSubmit={isRegister ? (e) => handleRegister(e) : (e) => handleLogin(e)} className="flex flex-col items-center justify-center ">
                {/* email */}
                <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded mb-5" type="text" ref={emailRef} placeholder="&#xf199;  Email address" required />
                {/* username */}
                {isRegister && <input type="text" className='w-full shadow-sm p-2 ring-1 ring-gray-200 rounded mb-5' ref={usernameRef} placeholder="&#xF007;  Username" required />}
                {/* password */}
                <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded mb-5" type="password" ref={passwordRef} placeholder="&#xF023;  Password" required />
                {/* confirm password */}
                {isRegister && <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded mb-3" type="password" ref={confirmPasswordRef} placeholder="&#xf01e;  Confirm Password" required />}
                {/* error */}
                {error && <div className="mb-3">{error}</div>}
                {!isRegister && <Link className='text-french-sky-blue -mt-2 mb-3' to="/">Forgot your password?</Link>}
                {isRegister ? <button disabled={registerLoading} className='w-full bg-blue-crayola text-cultured p-2 rounded-md mt-3' type='submit' value="LSign Up">Sign Up</button> : <button disabled={loginLoading} className='w-full bg-blue-crayola text-cultured p-2 rounded-md' type='submit' value="Login">Sign In</button>}
                {!isRegister ? <p className='mt-3 text-xs'>Don't have an account yet? <Link to="/register" disabled={loginLoading} className='underline'>Register</Link></p> : <p className='mt-3 text-xs'>Already have an account? <Link to="/" disabled={registerLoading} className='underline'>Sign in</Link></p>}
            </form>
        </div>
    );
}

export default LoginCard;