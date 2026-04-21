import "./AssignmentFeedback.css"

export default function AssignmentFeedback( {submittion} ) {
    return (
        <div>
            <h3 className="assignment-feedback-title">Feedback</h3>
            <div className="feedback-comment-wrapper">
                <p className="feedback-comment">{submittion.feedback}</p>
            </div>
        </div>
    )
}