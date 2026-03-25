import {AssignmentInfoFooterDateBlock, UpTextField, MidTextField, DeadlineTextField} from "./AssignmentInfo.styled"



export default function AssignmentDateBlock( {assignment, isOverdue, daysUntilDue} ) {
    return (
        <AssignmentInfoFooterDateBlock>
            <span>📅</span>
            <div>
                <UpTextField>Due Date</UpTextField>
                <MidTextField>
                    {new Date(assignment.due_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </MidTextField>
                {!assignment.submitted && !isOverdue && (
                    <DeadlineTextField>{daysUntilDue} days remaining</DeadlineTextField>
                )}
            </div>
        </AssignmentInfoFooterDateBlock>
    )
}