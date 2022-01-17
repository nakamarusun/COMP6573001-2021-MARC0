import { ForgetPasswordCard, LoginHeader } from '../services/export/exportComponents';

const ForgetPassword = () => {
    return (
        <div className="w-full mt-20">
            <div className="w-4/5 m-auto text-center flex flex-col items-center justify-center divide-y">
                <LoginHeader title="Reset Password" />
                <ForgetPasswordCard />
            </div>
        </div>
    );
}

export default ForgetPassword;