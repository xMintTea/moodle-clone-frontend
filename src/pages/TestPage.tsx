import Card from "#/components/Card";
import TestInfo from "#/features/tests/components/TestInfo";
import TestResults from "#/features/tests/components/TestResults";
import { TestQueryOptions, AttempsQueryOptions } from "#/features/tests/queries/testQueries";
import { Route } from "#/routes/_app/course/test/$testId";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";


function TestPage() {
    const {testId} = Route.useParams()
    const {data: test} = useSuspenseQuery(TestQueryOptions(testId))
    const {data: attemps} = useSuspenseQuery(AttempsQueryOptions(testId, "1"))

    return (
        <div>
            <TestInfo test={test} attempsAmount={attemps.length}></TestInfo>
            <Link to="/course/test/$testId/attempt" params={{testId: testId}}>
                <Card  className="text-center h-15 flex justify-center items-center">
                    <p className="text-xl">К тесту</p>
                </Card>
            </Link>
            <TestResults attempts={attemps}></TestResults>
        </div>
    )
}


export default TestPage;