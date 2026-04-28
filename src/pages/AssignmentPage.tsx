import Card from "#/components/Card"
import AssignmentInfo from "#/features/assignment-content/components/AssignmentInfo"
import AssignmentSubmission from "#/features/assignment-content/components/AssignmentSubmission"
import SubmitAssignment from "#/features/assignment-content/components/SubmitAssignment"
import { assignmentQueryOptions } from "#/features/assignment-content/queries/assignmentQueries"
import { Route } from "#/routes/course/assignment/$assignmentId"
import { useSuspenseQuery } from "@tanstack/react-query"


function AssignmentPage() {
    const {assignmentId} = Route.useParams()
    const {data: assignment} = useSuspenseQuery(assignmentQueryOptions(assignmentId))


    return (
        <div className="max-w-[800px]">
            <AssignmentInfo assignment={assignment}/>

            <Card className="p-6 mb-6">
                <h2 className="text-2xl mb-4 font-bold">Описание задания</h2>
                <p className="text-[#666] leading-relaxed whitespace-pre-line">{assignment.description}</p>
            </Card>

            <Card className="p-6">
                <h2 className="text-xl mb-4 font-bold">Your Submittion / Submit Assignment</h2>
                <AssignmentSubmission/>
                {/* or (implement later) */}
                <SubmitAssignment/>
            </Card>
        </div>
    )
}


export default AssignmentPage