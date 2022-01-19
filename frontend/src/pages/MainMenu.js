const MainMenu = () => {
    return (
        <div className="w-full h-full min-h-screen text-center flex flex-col items-center justify-start ">
            <div className="flex flex-row text-center items-center h-auto">
                <div className="flex items-center h-full">
                    <i class="fas fa-robot text-blue-crayola text-4xl "></i>
                </div>
                <div className="h-full text-center flex items-center">
                    <p className="text-2xl">
                        Welcome to Marc1</p>
                </div>
            </div>
            {/* first box ( background )*/}
            <div className="h-1/4 w-5/6 bg-blue-200 w-full h-full rounded-3xl mt-8 flex flex-row items-center ">
                {/* section one */}
                <div className="text-7xl p-4 text-gray-500">
                    <i class="fas fa-gamepad"></i>
                </div>
                {/* section two */}
                <div className="flex flex-col h-56 " >
                    <p className="text-4xl font-bold text-left pt-5">Control</p>
                    <p className="text-left w-4/5 align-text-top pt-5">To control Marc1, you can click to this button card</p>
                </div>
            </div>
            {/* second box ( background )*/}
            <div className="h-1/4 w-5/6 bg-blue-900 w-full h-full rounded-3xl mt-8 flex flex-row items-center">
                {/* section one */}
                <div className="text-7xl p-4 text-white">
                    <i class="fas fa-video"></i>
                </div>
                {/* section two */}
                <div className="flex flex-col h-56 " >
                    <p className="text-4xl font-bold text-left pt-5 text-white">Control</p>
                    <p className="text-left w-4/5 align-text-top pt-5 text-white">To access video that were recorded. You cal click this video card</p>
                </div>
            </div>
        </div>
    );
}

export default MainMenu;