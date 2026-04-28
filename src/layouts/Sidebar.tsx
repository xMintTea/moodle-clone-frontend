import SidebarItem from "#/features/sidebar/components/SidebarItem"
import { Link } from "@tanstack/react-router"


function Sidebar() {
    return (
        <aside className="h-full w-52 bg-white border-r border-gray-200 flex flex-col gap-3">
            <Link to="/" className="" 
            activeProps={{className : "bg-blue-300"}}>
                <SidebarItem>Мои курсы</SidebarItem>
            </Link>
            <Link to="/profile"
            activeProps={{className : "bg-blue-300"}}>
                <SidebarItem>Профиль</SidebarItem>
            </Link>
            <Link to="/grades"
            activeProps={{className : "bg-blue-300"}}>
                <SidebarItem>Оценки</SidebarItem>
            </Link>
        </aside>
    )
}

export default Sidebar