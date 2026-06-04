import Card from "#/components/Card";


function AttempResultsCard() {
    return (
        <Card className="p-4">
            <p>Попытка №1</p>
            <p>Оценка: 5</p>
            <p>Время прохождения</p>
            <p>Дата завершения</p>
            <div className="flex justify-between text-center mt-3 p-2">
                <div>
                    <p>Баллы</p>
                    <p>67/69</p>
                </div>
                <div>
                    <p>Тип проверки</p>
                    <p>Автоматическая</p>
                </div>
                <div>
                    <p>Статус проверки</p>
                    <p>Завершена</p>
                </div>
                <div>
                    <p>Дата проверки</p>
                    <p>12.12.2012</p>
                </div>
            </div>
        </Card>
    )
}


export default AttempResultsCard