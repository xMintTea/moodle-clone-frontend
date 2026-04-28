

function AssignmentCard( {assignment} ) {
    return (
        <div>
            <div className="flex align-center gap-3 px-3 py-5">
                <span>○</span>
                <div className="flex align-center gap-3">
                    <span>Иконка</span>
                    <span className="font-medium">{ assignment.title }</span>
                    <span>Тип активности</span>
                </div>
                <p className="text-sm mt-1">
                    До: {assignment.due_date}
                </p>
                <p className="text-sm mt-1">Оценка: 6/ {assignment.max_points}</p>
            </div>

        </div>
    )
}


export default AssignmentCard