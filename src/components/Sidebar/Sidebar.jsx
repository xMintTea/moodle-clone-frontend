import './Sidebar.css'

export default function Sidebar() {

    const navItems = [
        { path: "/", label: "Dashboard", icon: "🏠" },
        { path: "/grades", label: "Grades", icon: "🏆" },
        { path: "/profile", label: "Profile", icon: "👤" }
    ]

    return (
        <aside className="sidebar">
            <nav>
                {navItems.map((item) => (
                    <a href="" className="nav-link">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>
        </aside>
    )
}