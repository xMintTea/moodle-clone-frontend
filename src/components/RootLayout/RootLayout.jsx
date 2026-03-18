import { Outlet } from "react-router-dom";
import "./RootLayout.css"
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";


export default function RootLayout() {
    return (
        <div>
            <Header></Header>

            <div className="layout">
                <Sidebar></Sidebar>
                <main className="main-content">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}