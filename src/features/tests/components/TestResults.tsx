import Card from "#/components/Card";
import AttempResultsCard from "./AttemptResultsCard";


function TestResults({attempts}) {
    return (
        <Card>
            <div className="m-3 flex flex-col gap-1">
                {attempts.length == 0 &&
                <p className="text-center text-xl">Вы ещё не проходили тест</p>}
                {attempts.map(attempt => (
                    <AttempResultsCard></AttempResultsCard>
                ))}
            </div>
        </Card>
    )
}


export default TestResults