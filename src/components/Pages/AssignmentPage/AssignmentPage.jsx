import { useParams, Link } from "react-router-dom"
import "./AssignmentPage.css"
import NotFoundBlock from "../../UI/NotFoundBlock/NotFoundBlock";
import AssignmentSubmit from "../../UI/AssignmentSubmit/AssignmentSubmit";
import AssignmentUploaderWrapper from "../../UI/AssignmentUploaderWrapper/AssignmentUploaderWrapper";
import AssignmentInfo from "../../UI/AssignmentInfo/AssignmentInfo";
import AssignmentDescription from "../../UI/AssignmentDescription/AssignmentDescription";
import SubmittedContent from "../../UI/SubmittedContent/SubmittedContent";
import { useAssignmentDates } from "../../../hooks/useAssignmentDates";
import { useCallback, useEffect, useState } from "react";
import api from "../../../api.js"

export default function AssignmentPage() {

    const {course_id, assignment_id} = useParams()
    const [assignment, setAssignment] = useState()
    const [submittion, setSubmittion] = useState()


    const fetchAssignment = useCallback(async () => {
        try {
            const response = await api.get(`/pages/${assignment_id}`)
            setAssignment(response.data)
        } catch(e) {
            console.error(e)
        }
    }, [assignment_id])

    const fetchSubmittion = useCallback(async () => {
        try {
            const response = await api.get(`/pages/${assignment_id}/submittions/?user_id=1`)
            setSubmittion(response.data[0])
        } catch(e) {
            console.error(e)
        }
    }, [assignment_id])


    useEffect(() => {
        fetchAssignment()
        fetchSubmittion()
    },[])

    const {isOverdue, daysUntilDue} = useAssignmentDates(assignment?.dueDate)

    if (!assignment) {
        return (
            <NotFoundBlock
                header="Assignment not found"
                body="Return to Dashboard"
                to="/"/>
        );
    }



    return (
        <div className="assignment-page">
            <Link to={`/course/${course_id}`} className="back-link">
                <span>←</span>
                <span>Back to course</span>
            </Link>
            <AssignmentInfo
                assignment={assignment}
                submittion={submittion}
                course={assignment.course}
                isOverdue={isOverdue}
                daysUntilDue={daysUntilDue}
            />

            <AssignmentDescription description={assignment.comment}/>

            {submittion?.submitted &&
            <AssignmentUploaderWrapper header="Your Submission">
                <SubmittedContent assignment={assignment} submittion={submittion} />
            </AssignmentUploaderWrapper> }
        
            {!submittion?.submitted &&
            <AssignmentSubmit isOverdue={isOverdue} pageId={assignment?.id} setSubmittion={setSubmittion}></AssignmentSubmit>
            }

        </div>
    )
}