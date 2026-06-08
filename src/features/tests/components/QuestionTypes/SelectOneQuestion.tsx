import Card from "#/components/Card"


function SelectOneQuestion({qNumber}) {
    return (
        <Card className="p-4 text-lg">
            <h1>Вопрос №{qNumber}</h1>
            <p>Текст вопроса</p>
            <div className="flex flex-col mt-4 gap-1">
                <div className="">
                    <input
                        type="radio"
                        name="question1"
                        id="option1"
                        value="option1"
                    />
                    <label htmlFor="option1">Текст варианта ответа</label>
                </div>
            </div>
        </Card>
    )
}


export default SelectOneQuestion