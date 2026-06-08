import AttempQuestionBlock from "#/features/tests/components/AttempQuestionsBlock"
import AttemptBlocked from "#/features/tests/components/AttemptBlocked"
import { AttempsQueryOptions, TestQueryOptions } from "#/features/tests/queries/testQueries"
import { Route } from "#/routes/_app/course/test/$testId/attempt"
import { useSuspenseQuery } from "@tanstack/react-query"


function TestAttemptPage() {
    const {testId} = Route.useParams()
    const {data: test} = useSuspenseQuery(TestQueryOptions(testId))
    const {data: attemps} = useSuspenseQuery(AttempsQueryOptions(testId, "1"))


    return (
        <div>
            {attemps.length == test.max_attempts && 
            <AttemptBlocked/>}

            <AttempQuestionBlock questions={test.content}></AttempQuestionBlock>
        </div>
    )
}


export default TestAttemptPage