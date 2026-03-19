import { Link, useParams } from "react-router-dom";
import api from "../../../api.js"
import { useCallback, useEffect, useState } from "react";

export default function CoursePage() {

    const [course, setCourse] = useState()

    const {id} = useParams()

    const fetchCourse = useCallback(async () => {
        try {
            const response = await api.get(`/courses/${id}`)
            setCourse(response.data)
        } catch (error) {
            console.error("Error", error)
        }

    }, [id])

    useEffect(() => {
        fetchCourse()
    }, [fetchCourse])


    const getActivityIcon = (type) => {
        switch (type) {
            case "video": return "🎥";
            case 'assignment': return '📝';
            case 'quiz': return '✅';
            case 'resource': return '📄';
            case 'forum': return '💬';
            default: return '📄';
        }
    }

    return (
        <div className="course-page">
            <Link to="/" className="back-link">
                <span>←</span>
                <span>Return to Dashboard</span>
            </Link>


            <div className="card">
                <div>
                    <img src="" alt="" />
                    <div></div>
                    <div>
                        <div className="badge">
                            Код курса
                        </div>
                        <h1>{course?.name}</h1>
                        <p>{course?.description}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}