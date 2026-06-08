import Card from "#/components/Card"
import MatchAllQuestion from "./QuestionTypes/MatchAllQuestion"
import SelectMultipleQuestion from "./QuestionTypes/SelectMultipleQuestion"
import SelectOneQuestion from "./QuestionTypes/SelectOneQuestion"
import WriteAnswerQuestion from "./QuestionTypes/WriteAnswerQuestion"


function AttempQuestionBlock({questions}) {
    return (
        <Card className="flex flex-col gap-1">
            {questions.map((question, index)  => {
                if (question.type === "match_answers") {
                    return <MatchAllQuestion
                    qNumber={index+1}
                    right={question.right_column}
                    left={question.left_column}
                    />
                } else if (question.type === "select_one") {
                    return <SelectOneQuestion
                    qNumber={index+1}
                    />
                } else if (question.type === "select_multiple") {
                    return <SelectMultipleQuestion
                    qNumber={index+1}
                    />
                } else if (question.type === "write_answer") {
                    return <WriteAnswerQuestion/>
                }
            }
            )}
            
            
            
        </Card>
    )
}


export default AttempQuestionBlock