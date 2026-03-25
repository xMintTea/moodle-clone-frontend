import { Link, useParams } from "react-router-dom";
import api from "../../../api.js"
import { useCallback, useEffect, useState } from "react";
import Module from "../../UI/Module/Module.jsx";

import styled from "styled-components"
import NotFoundBlock from "../../UI/NotFoundBlock/NotFoundBlock.jsx";


const CourseDescriptionBlock = styled.div`
    padding: 24px;

    p {
    color: #666;
    margin-bottom: 16px;
    }
`;


const ModuleBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`


const CourseBadge = styled.div.attrs({ className : "badge"})`
    margin-bottom: '8px';
`

const CourseHeaderBlock = styled.div`
    position: relative;
    height: 200px;
`

const CourseHeaderImg = styled.img`
    width: 100%;
    height: 100%;
    objectFit: cover;
`

const CourseHeaderGradient = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
`

const CourseNameField = styled.h1`
    font-size: 28px;
    margin-bottom: 4px;
`

const CourseTeacher = styled.p`
    opacity: 0.9
`


const CourseInfoBlock = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    color: white;
`

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

            <div className="card" style={{ marginBottom: '24px' }}>
                <CourseHeaderBlock>
                    <CourseHeaderImg src="" alt=""/>
                    <CourseHeaderGradient/>
                    <CourseInfoBlock>
                        <CourseBadge>Код курса</CourseBadge>
                        <CourseNameField>{course?.name}</CourseNameField>
                        <CourseTeacher>{course.teachers?.[0]?.first_name} {course.teachers?.[0]?.middle_name}</CourseTeacher>
                    </CourseInfoBlock>
                </CourseHeaderBlock>

                <CourseDescriptionBlock>
                    <p>{course.description}</p>
                </CourseDescriptionBlock>
            </div>

            <ModuleBlock>
                {course.sections.map((section) => (
                    <Module section={section}></Module>
                ))}
            </ModuleBlock>
        </div>
    )
}