import Card from "#/components/Card";


function SelectMultipleQuestion({qNumber}) {
    return (
        <Card className="p-4 text-lg">
            <h1>Вопрос №{qNumber}</h1>
            <p>Текст вопроса</p>
            <div className="flex flex-col mt-4 gap-1">
                <div>
                    <input type="checkbox" name="option1"/>
                    <label htmlFor="option1">Вариант 1</label>
                </div>
                <div>
                    <input type="checkbox" name="option1"/>
                    <label htmlFor="option1">Вариант 2</label>
                </div>
                <div>
                    <input type="checkbox" name="option1"/>
                    <label htmlFor="option1">Вариант 3</label>
                </div>

            </div>

        </Card>
    )
}


export default SelectMultipleQuestion