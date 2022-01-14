const LoginHeader = (props) => {
    return ( 
        <div className="w-fit mb-6 text-3xl flex flex-col items-center justify-center">
            <i class="fas fa-robot text-blue-crayola text-5xl"></i>
            <h2 className="mt-4 font-extrabold text-gray-900">{props.title}</h2>
        </div>
    );
}
 
export default LoginHeader;