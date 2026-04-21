import { Link, useParams } from "react-router-dom";
import api from "../../api.js";
import { useCallback, useEffect, useState } from "react";
import NotFoundBlock from "../../components/UI/NotFoundBlock/NotFoundBlock.jsx"
import Module from "../../components/UI/Module/Module.jsx"


import styled from "styled-components"
import Card from "../../components/UI/Card/Card.jsx";
import Badge from "../../components/UI/Badge/Badge.jsx";
import "./CoursePage.css"



export default function CoursePage( {courseObj} ) {

    const modules = [
    {
      id: "mod1",
      title: "Week 1: Introduction to Programming",
      activities: [
        { id: 1, type: "video", title: "Welcome to CS 101", completed: true },
        { id: 2, type: "resource", title: "Course Syllabus", completed: true },
        { id: 3, type: "assignment", title: "Hello World Assignment", dueDate: "2026-01-15", completed: true, grade: 95 }
      ]
    },
    {
      id: "mod2",
      title: "Week 2: Variables and Data Types",
      activities: [
        { id: "a4", type: "video", title: "Introduction to Variables", completed: true },
        { id: "a5", type: "quiz", title: "Data Types Quiz", dueDate: "2026-01-22", completed: true, grade: 88 },
        { id: "a6", type: "assignment", title: "Variables Practice", dueDate: "2026-01-25", completed: false }
      ]
    },
    {
      id: "mod3",
      title: "Week 3: Control Structures",
      activities: [
        { id: "a7", type: "video", title: "If Statements and Loops", completed: false },
        { id: "a8", type: "forum", title: "Discussion: Best Practices", completed: false },
        { id: "a9", type: "assignment", title: "Control Flow Assignment", dueDate: "2026-02-01", completed: false }
      ]
    }
  ]

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
        if (courseObj) {
            setCourse(courseObj)
        } else {
            fetchCourse()
        }

    }, [])



    if (!course) {
        return (
            <NotFoundBlock
                header="Course not found"
                body="Return to Dashboard"
                to="/"
            />
        );
    }


    return (
        <div className="course-page">
            <Link to="/" className="back-link">
                <span>←</span>
                <span>Return to Dashboard</span>
            </Link>

            <Card style={{ marginBottom: '24px' }}>
                <div className="course-header">
                    <img className="course-header-img" src="" alt=""/>
                    <div className="course-gradient"/>
                    <div className="course-info">
                        <Badge className="course-badge">{course?.id}</Badge>
                        <h1 className="course-name">{course?.name}</h1>
                        <p className="course-teacher">{course.teachers?.[0]?.first_name} {course.teachers?.[0]?.middle_name}</p>
                    </div>
                </div>

                <div className="course-description">
                    <p>{course.description}</p>
                </div>
            </Card>

            <div className="module-block">
                {course.sections.map((section) => (
                    <Module section={section}></Module>
                ))}
            </div>
        </div>
    )
}