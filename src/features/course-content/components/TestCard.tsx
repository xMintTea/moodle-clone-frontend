

function TestCard( {test} ) {
    return (
        <div>
            <div className="flex align-center gap-3 px-3 py-5">
                <span>○</span>
                <div className="flex align-center gap-3">
                    <span className="font-medium">{ test.title }</span>
                    <span>Задание</span>
                </div>
                <p className="text-sm mt-1">
                    До: {test.due_date? test.due_date : "Бессрочно"}
                </p>
            </div>

        </div>
    )
}


export default TestCard