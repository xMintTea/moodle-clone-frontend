import AssignmentFeedback from "../AssignmentFeedback/AssignmentFeedback";
import AssignmentGrade from "../AssignmentGrade/AssignmentGrade";


export default function SubmittedContent( {assignment, submittion} ) {
    return (
        <>
            <div className="alert alert-success">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span>✓</span>
                        <strong>Submitted successfully</strong>
                    </div>
                    <p style={{ fontSize: '14px' }}>
                    Your assignment has been submitted and is being reviewed.
                    </p>
            </div>

            {submittion.points !== 0 && (
                <div style={{ marginTop: '20px' }}>
                    <AssignmentGrade assignment={assignment} submittion={submittion}/>
                    <AssignmentFeedback submittion={submittion} />
                    
                </div>
            )}
        </>
    )
}