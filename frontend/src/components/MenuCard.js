const MenuCard = (props) => {
    return (
        <div className="w-10/12 bg-blue-900 rounded-3xl mb-8 flex flex-row items-center py-8 sm:w-1/2 lg:w-3/12">
            {/* section one */}
            <div className="text-7xl w-9/12 text-white">
                <i class={props.icon}></i>
            </div>
            {/* section two */}
            <div className="flex flex-col" >
                <p className="text-3xl font-bold text-left text-white">{props.title}</p>
                <p className="text-left w-4/5 align-text-top mt-2 text-white">{props.desc}</p>
            </div>
        </div>
    );
}

export default MenuCard;