import "./AssignmentGrade.css"

export default function AssignmentGrade( {submittion, assignment} ) {
    return (
        <div className="grade-wrapper">
            <h3>Grade</h3>
            <p>{submittion.points}/{assignment.max_points}</p>
        </div>
    )
}