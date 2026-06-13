import { useState } from "react";
import Card from "#/components/Card";

function MatchAllQuestion({ qNumber, left = [], right = [], questionText = "Текст вопроса", onAnswerChange }) {
  const [selections, setSelections] = useState(Array(left.length).fill(""));

  const handleSelectChange = (index, value) => {
    const newSelections = [...selections];
    newSelections[index] = value;
    setSelections(newSelections);
    

    const answerObject = {};
    left.forEach((item, idx) => {
      if (newSelections[idx]) {
        answerObject[item] = newSelections[idx];
      }
    });
    onAnswerChange?.(qNumber, answerObject);
  };

  if (!Array.isArray(left) || !Array.isArray(right)) return null;

  return (
    <Card className="p-4 text-lg">
      <h1 className="mb-2 font-bold">Вопрос №{qNumber}</h1>
      <p className="mb-4">{questionText}</p>
      <div className="flex flex-col gap-4">
        {left.map((leftItem, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span className="flex-1">{leftItem}</span>
            <select
              className="px-3 py-2 border rounded-md bg-white"
              value={selections[idx]}
              onChange={(e) => handleSelectChange(idx, e.target.value)}
            >
              <option disabled value="">Выберите...</option>
              {right.map((rightOption, optIdx) => (
                <option key={optIdx} value={rightOption}>
                  {rightOption}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default MatchAllQuestion;