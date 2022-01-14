import { LoginCard, LoginHeader } from '../services/export/exportComponents';

const Register = () => {
    return (  
        <div className="w-full mt-20">
            <div className="w-4/5 m-auto text-center flex flex-col items-center justify-center">
                <LoginHeader title="Register for M4RC1 :D"/>
                <LoginCard />
            </div>
        </div>
    );
}
export default Register;

