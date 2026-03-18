import { Link, useLocation} from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {

    const location = useLocation()

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/"
        }
        return location.pathname.startsWith(path)
    }

    const navItems = [
        { path: "/", label: "Dashboard", icon: "🏠", "linksTo": "/"},
        { path: "/grades", label: "Grades", icon: "🏆", "linksTo": "/grades"},
        { path: "/profile", label: "Profile", icon: "👤", "linksTo": "/profile" }
    ]

    return (
        <aside className="sidebar">
            <nav>
                {navItems.map((item, index) => (
                    <Link key={index} to={item.linksTo} className={isActive(item.path) ? "nav-link active" : "nav-link"}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}