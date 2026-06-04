import AttempQuestionBlock from "#/features/quizzes/components/AttempQuestionsBlock"
import AttemptBlocked from "#/features/quizzes/components/AttemptBlocked"
import { Route } from "#/routes/_app/course/test/$testId/attempt"


function TestAttemptPage() {

    const {testId} = Route.useParams()

    return (
        <div>
            <AttemptBlocked></AttemptBlocked>
            <AttempQuestionBlock></AttempQuestionBlock>
        </div>
    )
}


export default TestAttemptPage