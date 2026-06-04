import Card from "#/components/Card";
import AttempResultsCard from "./AttemptResultsCard";


function TestResults() {
    return (
        <Card>
            <div className="m-3 flex flex-col gap-1">
                <AttempResultsCard></AttempResultsCard>
                <AttempResultsCard></AttempResultsCard>
                <AttempResultsCard></AttempResultsCard>
                <AttempResultsCard></AttempResultsCard>
                <AttempResultsCard></AttempResultsCard>
                <AttempResultsCard></AttempResultsCard>
                <AttempResultsCard></AttempResultsCard>
            </div>
        </Card>
    )
}


export default TestResults