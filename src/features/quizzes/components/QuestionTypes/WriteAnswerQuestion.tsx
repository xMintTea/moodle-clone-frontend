import Card from "#/components/Card"
import TextareaAutosize from 'react-textarea-autosize';




function WriteAnswerQuestion() {
    return (
        <Card className="p-4 text-lg">
            <h1>Вопрос №1</h1>
            <p>Текст вопроса</p>
            <TextareaAutosize
                className="w-full mt-3 rounded-sm bg-stone-100 inset-shadow-sm  border-1 border-stone-400"
                minRows={1}
                maxRows={10}
            />
        </Card> 
    )
}


export default WriteAnswerQuestion