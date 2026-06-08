import Card from "#/components/Card"
import { Link } from "@tanstack/react-router"


function AttemptBlocked() {
    return (
        <Card className="text-center">
            <h1>У Вас закончились попытки</h1>
            <Link to="..">Вернуться назад</Link>
        </Card>
    )

}


export default AttemptBlocked