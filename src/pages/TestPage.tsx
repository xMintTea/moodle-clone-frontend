import Card from "#/components/Card";
import TestInfo from "#/features/quizzes/components/TestInfo";
import TestResults from "#/features/quizzes/components/TestResults";
import { Route } from "#/routes/_app/course/test/$testId";
import { Link } from "@tanstack/react-router";


function TestPage() {

    const {testId} = Route.useParams()

    return (
        <div>
            <TestInfo></TestInfo>
            <Card>
                <div className="text-center h-15 flex justify-center items-center">
                    <Link to="/course/test/$testId/attempt" params={{testId: testId}}>
                    <p className="text-xl">К тесту</p>
                    </Link>
                </div>
            </Card>
            <TestResults></TestResults>
        </div>
    )
}


export default TestPage;