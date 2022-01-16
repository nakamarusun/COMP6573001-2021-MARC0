import { LoginCard, LoginHeader } from '../services/export/exportComponents';

const Login = () => {
    return (
        <div className="w-full mt-20">
            <div className="w-4/5 m-auto text-center flex flex-col items-center justify-center divide-y">
                <LoginHeader title="Sign in for M4RC1 :D"/>
                <LoginCard isRegister={false}/>
            </div>
        </div>
    );
}

export default Login;