import Course from "../Course/Course";
import "./Dashboard.css"
import { Link } from "react-router";

export default function Dashboard() {
    return (
        <div>
            <div className="dashboard-header">
                <h1>Мои курсы</h1>
            </div>
            <div className="grid">
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
                <Course></Course>
            </div>
        </div>

    )
}