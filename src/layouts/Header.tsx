import { Link } from "@tanstack/react-router"


function Header() {
    return (
        <header className="h-12 px-10 py-12 border-b border-slate-300 flex items-center justify-between">
            <div className="flex justify-between">
                <Link to="/">
                    <span className="bg-blue-500 text-lg rounded-lg p-2.5">📚</span>
                    <span className="text-xl px-2.5 font-semibold text-zinc-600 hover:text-zinc-800 transition-all">Mints</span>
                </Link>
            </div>
            <div>
                <span>Hello User!</span>
                <img src="" alt="" />
            </div>
        </header>
    )
}

export default Header