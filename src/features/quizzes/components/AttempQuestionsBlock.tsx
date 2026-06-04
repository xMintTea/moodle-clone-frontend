import Card from "#/components/Card"
import MatchAllQuestion from "./QuestionTypes/MatchAllQuestion"
import SelectMultipleQuestion from "./QuestionTypes/SelectMultipleQuestion"
import SelectOneQuestion from "./QuestionTypes/SelectOneQuestion"
import WriteAnswerQuestion from "./QuestionTypes/WriteAnswerQuestion"


function AttempQuestionBlock() {
    return (
        <Card className="flex flex-col gap-1">
            <MatchAllQuestion></MatchAllQuestion>
            <SelectMultipleQuestion></SelectMultipleQuestion>
            <SelectOneQuestion></SelectOneQuestion>
            <WriteAnswerQuestion></WriteAnswerQuestion>
        </Card>
    )
}


export default AttempQuestionBlock