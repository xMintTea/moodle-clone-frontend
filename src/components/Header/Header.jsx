import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
            <header className="header">
                <div className="header-content">
                    <Link to={"/"} className="nav-link">
                        <div className="logo-icon">📚</div>
                        <span className="logo-text">Mints</span>
                    </Link>
                    <div className="user-info">
                        <span>Welcome, Mint!</span>
                        <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                        alt="Profile"
                        className="user-avatar"
                        />
                    </div>
                </div>
            </header>
    )
}