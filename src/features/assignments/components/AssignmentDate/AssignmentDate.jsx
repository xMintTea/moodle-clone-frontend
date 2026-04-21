import LabeledText from "../../../../components/UI/LabeledText/LabeledText"
import "./AssignmentDate.css"


export default function AssignmentDate( {assignment, isOverdue, daysUntilDue} ) {
    return (
        <div className="assignment-date">
            <span>📅</span>
            <div>
                <LabeledText
                    label="Due Date"
                    value={new Date(assignment.due_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                />

                {!assignment.submitted && !isOverdue && (
                    <p className="deadline-text">{daysUntilDue} days remaining</p>
                )}
            </div>
        </div>
    )
}