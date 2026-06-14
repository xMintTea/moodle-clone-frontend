import Card from "#/components/Card"
import AssignmentInfo from "#/features/assignment-content/components/AssignmentInfo"
import AssignmentSubmission from "#/features/assignment-content/components/AssignmentSubmission"
import SubmitAssignment from "#/features/assignment-content/components/SubmitAssignment"
import { assignmentQueryOptions, submissionQueryOptions } from "#/features/assignment-content/queries/assignmentQueries"
import { Route } from "#/routes/_app/course/$courseId/assignment/$assignmentId"
import { useUserStore } from "#/stores/userStore"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { ChevronLeft } from "lucide-react"


function AssignmentPage() {
    const {assignmentId, courseId} = Route.useParams()

    const {userId} = useUserStore()

    const {data: assignment} = useSuspenseQuery(assignmentQueryOptions(assignmentId))
    // const {data: submittion} = useSuspenseQuery(submissionQueryOptions(assignmentId, String(userId)))


    return (
        <div className="max-w-[800px]">
            <Link
            to="/course/$courseId"
            params={{ courseId: courseId }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
            <ChevronLeft size={20} />
            Назад к курсу
            </Link>
            <AssignmentInfo assignment={assignment}/>

            <Card className="p-6 mb-6">
                <h2 className="text-2xl mb-4 font-bold">Описание задания</h2>
                <p className="text-[#666] leading-relaxed whitespace-pre-line">{assignment.description}</p>
            </Card>

            <Card className="p-6">
                <h2 className="text-xl mb-4 font-bold">Отправьте ответ</h2>
                {/* <AssignmentSubmission/> */}
                {/* or (implement later) */}
                <SubmitAssignment/>
            </Card>
        </div>
    )
}


export default AssignmentPage