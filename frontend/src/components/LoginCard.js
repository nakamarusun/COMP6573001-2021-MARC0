import { Link } from 'react-router-dom'

const LoginCard = () => {
    return ( 
        <div className="w-full px-6 py-8 shadow-md rounded">
            <form id="loginForm" className="flex flex-col items-center justify-center">
                <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded mb-5" type="text" placeholder="&#xF007;  Email address" required />
                <input className="w-full shadow-sm p-2 ring-1 ring-gray-200 rounded" type="password" placeholder="&#xF023;  Password" required />
                <Link className='text-french-sky-blue my-3' to="/">Forgot your password?</Link>
                <button className='w-full bg-blue-crayola text-cultured p-2 rounded-md' type='submit' value="Login">Login</button>
            </form>
        </div>
    );
}
 
export default LoginCard;