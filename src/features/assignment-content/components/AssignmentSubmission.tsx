import Alert from "#/components/Alert"


function AssignmentSubmission() {
    return (
    <div>
        <Alert>
            <div className="flex items-center gap-2 mb-2">
                <span>✓</span>
                <strong>Submitted successfully</strong>
            </div>
            <p className="text-sm">
                Your assignment has been submitted and is being reviewed.
            </p>
        </Alert>

        <div className="mb-4">
            <div className="mt-4">
                <h3 className="mb-2 font-semibold">Оценка</h3>
                <p className="text-2xl font-semibold text-[#4caf50]">67/100</p>
            </div>
            <div>
                <h3 className="mb-2">Ответ от учителя</h3>
                <div className="bg-[#f9f9f9] p-4 rounded-md">
                    <p className="text-[#666]">Текст ответа</p>
                </div>
            </div>
        </div>
    </div>
    )
}


export default AssignmentSubmission