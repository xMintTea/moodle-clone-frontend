import {AssignmentInfoHeaderBlock, AssignmentNameInfoBlock} from "./AssignmentInfo.styled"

export default function AssignmentInfoHeader({assignment, submittion, isOverdue} ) {
    return (
        <AssignmentInfoHeaderBlock>
            <AssignmentNameInfoBlock>
                <h1>{assignment.title}</h1>
                <p>{assignment.description}</p>
            </AssignmentNameInfoBlock>
            {submittion?.submitted ? (
                <span className="badge badge-success" >✓ Submitted</span>
            ) : (
                <span className={`badge ${isOverdue ? 'badge-error' : 'badge-warning'}`}>
                    {isOverdue ? 'Overdue' : 'Not Submitted'}
                </span>
            )}
        </AssignmentInfoHeaderBlock>
    )
}