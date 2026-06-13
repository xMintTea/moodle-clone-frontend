import AttempQuestionBlock from "#/features/tests/components/AttempQuestionsBlock"
import AttemptBlocked from "#/features/tests/components/AttemptBlocked"
import { AttempsQueryOptions, TestQueryOptions } from "#/features/tests/queries/testQueries"
import { Route } from "#/routes/_app/course/test/$testId/attempt"
import { useUserStore } from "#/stores/userStore"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"


function TestAttemptPage() {
    const {testId} = Route.useParams()
    const userId = useUserStore((state) => state.userId);

    const {data: test} = useSuspenseQuery(TestQueryOptions(testId))
    const { data: attempts } = useQuery({
        ...AttempsQueryOptions(testId, String(userId)),
        enabled: userId > 0,
    });


    return (
        <div>
            {attempts?.length >= test.max_attempts ? 
            <AttemptBlocked/> :
            <AttempQuestionBlock questions={test.content}/>
            }
            
        </div>
    )
}


export default TestAttemptPage