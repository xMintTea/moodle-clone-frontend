import AssignmentFeedback from "../../../features/assignments/components/AssignmentFeedback/AssignmentFeedback";
import AssignmentGrade from "../../../features/assignments/components/AssignmentGrade/AssignmentGrade";
import "./SubmittedContent.css"

export default function SubmittedContent( {assignment, submittion} ) {
    return (
        <>
            <div className="alert alert-success">
                    <div className="submission-success-message">
                        <span>✓</span>
                        <strong>Submitted successfully</strong>
                    </div>
                    <p className="submission-success-text">
                    Your assignment has been submitted and is being reviewed.
                    </p>
            </div>

            {submittion.points !== 0 && (
                <div className="submission-grade-section">
                    <AssignmentGrade assignment={assignment} submittion={submittion}/>
                    <AssignmentFeedback submittion={submittion} />
                    
                </div>
            )}
        </>
    )
}