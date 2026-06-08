import Card from "#/components/Card";


function TestInfo({test, attempsAmount}) {

    return (
        <Card className="p-4">
            <h1 className="text-3xl">{test.title}</h1>
            <p>{test.description}</p>

            <div className="flex gap-3 justify-around mt-14 text-center">
                <div>
                    <p>Количество вопросов</p>
                    <p>{test.content.length}</p>
                </div>
                <div>
                    <p>Время на выполнение</p>
                    <p>30 минут</p>
                </div>
                <div>
                    <p>Количество попыток</p>
                    <p>{test.max_attempts-attempsAmount}/{test.max_attempts}</p>
                </div>
                <div>
                    <p>Пройти до</p>
                    <p>{test.due_date ? test.due_date : "Бессрочно"}</p>
                </div>
            </div>

        </Card>
    )
}


export default TestInfo;