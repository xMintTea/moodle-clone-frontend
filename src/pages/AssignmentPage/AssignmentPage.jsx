import { useParams, Link } from "react-router-dom"
import "./AssignmentPage.css"
import NotFoundBlock from "../../components/UI/NotFoundBlock/NotFoundBlock.jsx"
import AssignmentSubmit from "../../features/assignments/components/AssignmentSubmit/AssignmentSubmit.jsx";
import AssignmentInfo from "../../features/assignments/components/AssignmentInfo/AssignmentInfo.jsx";
import SubmittedContent from "../../components/UI/SubmittedContent/SubmittedContent";
import { useAssignmentDates } from "../../hooks/useAssignmentDates.jsx";
import { useCallback, useEffect, useState } from "react";
import api from "../../api.js";
import Card from "../../components/UI/Card/Card.jsx";

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


            <Card className="assignment-description">
                <h2>Assignment Description</h2>
                <p>{assignment?.comment}</p>
            </Card>

            <Card className="assignment-submittion-wrapper">
                <h2>{submittion?.submitted ? "Your Submission" : "Submit Assignment"}</h2>
            

            {submittion?.submitted &&
                <SubmittedContent assignment={assignment} submittion={submittion} />
            }
            {!submittion?.submitted &&
                <AssignmentSubmit
                    isOverdue={isOverdue}
                    pageId={assignment?.id}
                    setSubmittion={setSubmittion}
                />
            }

            </Card>

        </div>
    )
}