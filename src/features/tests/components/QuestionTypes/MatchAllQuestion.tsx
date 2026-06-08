import Card from "#/components/Card"


function MatchAllQuestion({qNumber, left, right}) {
    return (
        <Card className="p-4 text-lg">
            <h1>Вопрос №{qNumber}</h1>
            <p>Текст вопроса</p>
            <div className="flex">
                <p>Вариант ответа</p>
                <select name="имя_списка">
                    <option disabled selected value="">Выберите...</option>
                    <option value="1">Вариант 1</option>
                    <option value="2">Вариант 2</option>
                    <option value="3">Вариант 3</option>
                    <option value="4">Вариант 4</option>
                </select>
            </div>

        </Card>
    )
}

export default MatchAllQuestion