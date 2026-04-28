import { Link } from "@tanstack/react-router"
import AssignmentCard from "./AssignmentCard"


function CourseSection( {section} ) {
    return (
        <div>
            <div>{section.title}</div>
            <div>
                {section.pages.map(assignment => (
                    <Link to="/course/assignment/$assignmentId" params={{assignmentId : assignment.id}}>
                        <AssignmentCard assignment={assignment}></AssignmentCard>
                    </Link>
                ))}
            </div>
        </div>
    )
}


export default CourseSection