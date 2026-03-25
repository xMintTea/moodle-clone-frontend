import AssignmentDateBlock from "./AssignmentDateBlock"
import AssignmentInfoHeader from "./AssignmentInfoHeader"

import {AssignmentInfoFooterBlock, AssignmentInfoBlock, AssignmentGradeBlock, UpTextField, MidTextField, GradeTextField} from "./AssignmentInfo.styled"



export default function AssignmentInfo( {assignment, isOverdue, daysUntilDue, submittion} ) {
    return (
        <AssignmentInfoBlock>

            <AssignmentInfoHeader
                assignment={assignment}
                submittion={submittion}
                isOverdue={isOverdue}
            />

            <AssignmentInfoFooterBlock>

                <AssignmentDateBlock
                    assignment={assignment}
                    isOverdue={isOverdue}
                    daysUntilDue={daysUntilDue}
                />

                <AssignmentGradeBlock>
                    <span>📊</span>
                    <div>
                        <UpTextField>Points</UpTextField>
                        <MidTextField>{assignment?.max_points} points</MidTextField>
                    </div>
                </AssignmentGradeBlock>

                {submittion?.points !== 0 && (
                <AssignmentGradeBlock>
                    <span>✓</span>
                    <div>
                        <GradeTextField>Your Grade</GradeTextField>
                        <MidTextField style={{color: '#4caf50' }}>
                        {submittion?.points}/{assignment?.max_points} ({Math.round((submittion?.points / assignment.max_points) * 100)}%)
                        </MidTextField>
                    </div>
                </AssignmentGradeBlock>
            )}
            </AssignmentInfoFooterBlock>
        </AssignmentInfoBlock>
    )
}