import { Link } from "@tanstack/react-router"
import AssignmentCard from "./AssignmentCard"
import TestCard from "./TestCard"
import Card from "#/components/Card"


function CourseSection( {section} ) {
    return (
        <Card className="p-4">
            <h1 className="text-2xl font-semibold">{section.title}</h1>
            <p className="text-stone-600">{section.description}</p>
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
        </Card>
    )
}


export default CourseSection