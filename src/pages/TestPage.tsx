import Card from "#/components/Card";
import TestInfo from "#/features/tests/components/TestInfo";
import TestResults from "#/features/tests/components/TestResults";
import { TestQueryOptions, AttempsQueryOptions } from "#/features/tests/queries/testQueries";
import { Route } from "#/routes/_app/course/$courseId/test/$testId";

import { useUserStore } from "#/stores/userStore";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";


function TestPage() {
    const {testId} = Route.useParams()
    const userId = useUserStore((state) => state.userId);

    const {data: test} = useSuspenseQuery(TestQueryOptions(testId))
    const { data: attempts, isLoading: isLoadingAttempts } = useQuery({
        ...AttempsQueryOptions(testId, String(userId)),
        enabled: userId > 0,
    });


    if (userId === 0) {
        return <div>Загрузка данных пользователя...</div>;
    }

    if (isLoadingAttempts) {
        return <div>Загрузка попыток...</div>;
    }

    return (
        <div>
            <TestInfo test={test} attempsAmount={attempts.length}></TestInfo>
            <Link to="/course/test/$testId/attempt" params={{testId: testId}}>
                <Card  className="text-center h-15 flex justify-center items-center">
                    <p className="text-xl">К тесту</p>
                </Card>
            </Link>
            <TestResults attempts={attempts}></TestResults>
        </div>
    )
}


export default TestPage;