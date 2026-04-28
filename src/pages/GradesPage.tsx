import Card from "#/components/Card"


function GradesPage() {
    return (
        <div>
            <div className="flex flex-col gap-5">
                <Card>
                    <div className="flex justify-around">
                        <p>Название задания</p>
                        <p>Курс</p>
                        <p>Проверил</p>
                        <p>Дата проверки</p>
                        <p>Дата сдачи</p>
                        <p>Оценка</p>
                    </div>
                    <div className="flex flex-col grow mt-10 min-h-20">
                        <p className="text-center">Ответ от учителя</p>
                        <div className="grow bg-zinc-300 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] p-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, a! Porro culpa nobis eos omnis similique! Porro enim cumque, in veniam recusandae dolorem quis atque nam ea! Vero, quasi quod.
                        </div>
                    </div>

                </Card>
            </div>

            
        </div>
    )
}

export default GradesPage