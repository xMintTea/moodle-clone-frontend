import Badge from "#/components/Badge"
import Card from "#/components/Card"


function AssignmentInfo( {assignment} ) {
    return <Card className="p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
                <h1 className="text-3xl mb-2">{assignment.title}</h1>
                <p className="text-gray-600">{assignment.description}</p>
            </div>
            <Badge variant="success">✓ Submitted</Badge>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
                <span className="text-[20px]">📅</span>
                <div>
                    {assignment.due_date}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-[20px]">📊</span>
                <div>
                    Баллы {assignment.max_points}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-[20px]">✓</span>
                <div>
                    Оценка 67/100
                </div>
            </div>
        </div>
    </Card>
}


export default AssignmentInfo