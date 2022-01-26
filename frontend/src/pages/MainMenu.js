import MenuCard from "../components/MenuCard";
import { Username } from '../services/export/exportComponents'
import { Link } from "react-router-dom";
import { SignOutButton } from "../services/export/exportComponents"


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
            desc: 'To access the notes marc1 made, you can click this notes card.',
        },
    ]

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-row items-center h-auto gap-3 my-5">
                <div className="flex items-center h-full">
                    <i className="fas fa-robot text-blue-crayola text-3xl "></i>
                </div>
                <div className="h-full flex items-center">
                    <p className="text-md">Welcome to Marc1, {<Username />}</p>
                </div>
            </div>
            <SignOutButton title="Unpair Marc1"></SignOutButton>

            <div className="flex flex-col justify-center items-center w-screen mt-8">
                {menus.map(menu => (
                    <Link to={`/mainmenu/${menu.title}`} className="flex items-center text-center justify-center w-11/12
                    sm:w-1/2 lg:w-1/3">
                        <MenuCard
                            title={menu.title}
                            icon={menu.icon}
                            desc={menu.desc}
                        ></MenuCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MainMenu;