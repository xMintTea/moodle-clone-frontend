import AssignmentDate from "../AssignmentDate/AssignmentDate"

import Card from "../../../../components/UI/Card/Card"
import "./AssignmentInfo.css"
import LabeledText from "../../../../components/UI/LabeledText/LabeledText"
import Badge from "../../../../components/UI/Badge/Badge"



export default function AssignmentInfo( {assignment, isOverdue, daysUntilDue, submittion} ) {
    return (
        <Card className="assignment-info">

            <div className="assignment-info-header">
                <div className="assignment-name-info">
                    <h1>{assignment.title}</h1>
                    <p>{assignment?.description}</p>
                </div>
                {submittion?.submitted && (
                    <Badge variant="success">✓ Submitted</Badge>
                )}
                
                {!submittion?.submitted && 
                (
                    <Badge variant={`badge ${isOverdue ? 'badge-error' : 'badge-warning'}`}>
                        {isOverdue ? 'Overdue' : 'Not Submitted'}
                    </Badge>
                )}
            </div>

            <div className="assignment-info-footer">
                <AssignmentDate
                    assignment={assignment}
                    isOverdue={isOverdue}
                    daysUntilDue={daysUntilDue}
                />

                <div className="assignment-header-section">
                    <span>📊</span>
                    <div>
                        <LabeledText
                            label="Points"
                            value={`${assignment?.max_points} points`}
                        />
                    </div>
                </div>

                {submittion?.points !== 0 && (
                <div className="assignment-header-section">
                    <span>✓</span>
                    <div>
                        <LabeledText
                            label="Your Grade"
                        >
                            <span className="grade-value">
                                {submittion?.points}/{assignment?.max_points} ({Math.round((submittion?.points / assignment.max_points) * 100)}%)
                            </span>
                        </LabeledText>
                    </div>
                </div>
            )}
            </div>
        </Card>
    )
}