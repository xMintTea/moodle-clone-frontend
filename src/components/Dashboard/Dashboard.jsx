import { useCallback, useEffect, useState } from "react";
import Course from "../Course/Course";
import "./Dashboard.css"
import { Link } from "react-router";
import api from "../../api.js"

export default function Dashboard() {

    const [courses, setCourses] = useState([])


    const fetchCourses = useCallback(async () => {


        try {
            const response = await api.get("/courses")
            setCourses(response.data)
        } catch (error) {
            console.error("Error fetching courses", error)
        }


    
    },[])

    useEffect(() => {
        fetchCourses()

    }, [fetchCourses])



    return (
        <div>
            <div className="dashboard-header">
                <h1>Мои курсы</h1>
            </div>
            <div className="grid">
                {courses.map((course, index) => {
                    if (course.visibility == 3) return;
                        return <Course key={index} course={course}></Course>
                    })}
            </div>
        </div>

    )
}