import { Outlet } from "react-router";
import "./RootLayout.css"
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";


export function RootLayout() {
    return (
        <div>
            <Header></Header>

            <div className="layout">
                <Sidebar></Sidebar>
                <main className="main-content">
                    <Dashboard></Dashboard>
                </main>
            </div>
        </div>
    )
}