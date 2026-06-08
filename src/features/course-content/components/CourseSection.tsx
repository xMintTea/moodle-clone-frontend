import { Link } from "@tanstack/react-router"
import AssignmentCard from "./AssignmentCard"
import TestCard from "./TestCard"


function CourseSection( {section} ) {
    return (
        <div>
            <div>{section.title}</div>
            <div>
                {section.pages.map(assignment => (
                    <Link to="/course/assignment/$assignmentId" params={{assignmentId : assignment.id}}>
                        <AssignmentCard assignment={assignment}/>
                    </Link>
                ))}
                {section.tests.map(test => (
                    <Link to="/course/test/$testId" params={{testId : test.id}}>
                        <TestCard test={test}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}


export default CourseSection