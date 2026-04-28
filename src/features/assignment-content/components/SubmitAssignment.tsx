

function SubmitAssignment() {
    return (
    <div>
        <div className="mb-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer transition hover:border-blue-700 hover:bg-gray-50">
                <span className="text-3xl mb-3 block">📤</span>
                <input type="file" id="file-upload" className="hidden" />
                <label htmlFor="file-upload" className="text-blue-700 cursor-pointer">
                    Click to upload
                </label>
                <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                <p className="text-sm text-gray-500 mt-3">Выбран: Имя файла</p>
            </div>
        </div>
        
        <div className="mb-4">
        <label htmlFor="assignment-comment" className="block mb-1 font-medium">
            Комментарий к работе
        </label>
        <textarea
            id="assignment-comment"
            rows={4}
            className="w-full border rounded p-2"
            placeholder="Напишите что-нибудь..."
        />
        </div>

        <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Отправить</button>
            <button className="px-4 py-2 bg-gray-300 rounded">Сохранить драфт</button>
        </div>
    </div>
    )

}


export default SubmitAssignment