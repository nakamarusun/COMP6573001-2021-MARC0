import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react';
import { useAuth } from '../services/firebase/AuthContext';

const LoginCard = (props) => {

    let isRegister = props.isRegister;

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')

    // for sign in
    const { signin } = useAuth()
    const [loginLoading, setLoginLoading] = useState(false)

    //  for sign up
    const confirmPasswordRef = useRef()
    const usernameRef = useRef()
    const { signup, currentUser } = useAuth()
    const [registerLoading, setRegisterLoading] = useState(false)
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    async function handleLogin(e) {
        e.preventDefault()
        console.log('cum1')
        try {
            setError('')
            setLoginLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            alert('Logged in successfully')
            setError('')
        } catch {
            setError('Invalid email or password')
        }
        setLoginLoading(false)
    }

    async function handleRegister(e) {
        e.preventDefault()
        console.log('cum')

        // check if password is in correct format
        if (!emailRef.current.value.match(emailRegEx)) {
            return setError('Invalid email format')
        }
        // check if password is atleast 6 length
        if (passwordRef.current.value.length < 6) {
            return setError('Password should be at least 6 characters')
        }

        // check if confirmPassword field is the same as password field
        if (passwordRef.current.value !==
            confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setRegisterLoading(true)
            // call signup function from firebase
            await signup(emailRef.current.value, passwordRef.current.value,
                usernameRef.current.value)
            alert('Signed up successfully')
            setError('')
        } catch (err) {
            setError(err)
        }
        setRegisterLoading(false)
    }

    return (
        <div className="w-full px-6 py-8 shadow-md rounded ">
            <form id="loginForm" onSubmit={isRegister ? (e) => handleRegister(e) : (e) => handleLogin(e)} className="flex flex-col items-center justify-center">
                <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded mb-5" type="text" ref={emailRef} placeholder="&#xf199;  Email address" required />
                {isRegister && <input type="text" className='w-full shadow-sm p-2 ring-1 ring-gray-200 rounded mb-5' ref={usernameRef} placeholder="&#xF007;  Username" required />}
                <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded" type="password" ref={passwordRef} placeholder="&#xF023;  Password" required />
                {props.isRegister && <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded my-6" type="password" ref={confirmPasswordRef} placeholder="&#xf01e;  Confirm Password" required />}
                {error && <div className="mt-3">{error}</div>}
                {!isRegister && <Link className='text-french-sky-blue my-3' to="/">Forgot your password?</Link>}
                {isRegister ? <button disabled={registerLoading} className='w-full bg-blue-crayola text-cultured p-2 rounded-md' type='submit' value="LSign Up">Sign Up</button> : <button disabled={loginLoading} className='w-full bg-blue-crayola text-cultured p-2 rounded-md' type='submit' value="Login">Sign In</button>}
                {!isRegister ? <p className='mt-3 text-xs'>Don't have an account yet? <Link to="/register" disabled={loginLoading} className='underline'>Register</Link></p> : <p className='mt-3 text-xs'>Already have an account? <Link to="/" disabled={registerLoading} className='underline'>Sign in</Link></p>}
                
                

            </form>

        </div>
    );
}

export default LoginCard;