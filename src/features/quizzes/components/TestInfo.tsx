import Card from "#/components/Card";


function TestInfo() {
    return (
        <Card className="p-4">
            <h1 className="text-3xl">Тест</h1>
            <p>Описание теста</p>

            <div className="flex gap-3 justify-around mt-14 text-center">
                <div>
                    <p>Количество вопросов</p>
                    <p>10</p>
                </div>
                <div>
                    <p>Время на выполнение</p>
                    <p>30 минут</p>
                </div>
                <div>
                    <p>Количество попыток</p>
                    <p>1/1</p>
                </div>
                <div>
                    <p>Пройти до</p>
                    <p>11.11.2111</p>
                </div>
            </div>

        </Card>
    )
}


export default TestInfo;