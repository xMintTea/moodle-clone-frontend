import Card from "#/components/Card"


function ProfilePage() {
    return (
        <div>
            <Card className="flex">
                <img className="w-52 rounded-lg" src="https://static.wikia.nocookie.net/majo-no-tabitabi/images/2/2c/Elaina.png/revision/latest?cb=20260317225050"></img>
                <div className="ml-1.5">
                    <h1 className="text-2xl font-semibold">Имя фамилия</h1>
                    <p className="text-xl font-medium">Группа</p>
                    <p className="text-xl font-medium">Почта</p>
                </div>
                <p className="mt-1 mr-3 ml-auto">Редактировать</p>
            </Card>
        </div>
    )
}


export default ProfilePage