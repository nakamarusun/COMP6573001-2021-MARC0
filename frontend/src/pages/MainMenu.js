import MenuCard from "../components/MenuCard";

const MainMenu = () => {

    const menus = [
        {
            title: 'Control',
            icon: 'fas fa-gamepad',
            desc: 'To control Marc1, you can click to this button card.',
        },
        {
            title: 'Videos',
            icon: 'fas fa-video',
            desc: 'To access video that were recorded, you can click this video card.',
        },
        {
            title: 'Notes',
            icon: 'fas fa-clipboard',
            desc: 'To access the notes marc1 made, you can click this notes card',
        },
    ]
    

    return (
        <div className="min-h-screen text-center flex flex-col items-center justify-start">
            <div className="flex flex-row text-center items-center h-auto gap-3 my-5">
                <div className="flex items-center h-full">
                    <i class="fas fa-robot text-blue-crayola text-4xl "></i>
                </div>
                <div className="h-full text-center flex items-center">
                    <p className="text-2xl">Welcome to Marc1</p>
                </div>
            </div>
            {menus.map((menu) => (
                <MenuCard
                    title={menu.title}
                    icon={menu.icon}
                    desc={menu.desc}
                ></MenuCard>

            ))}
        </div>
    );
}

export default MainMenu;