import { useState } from "react";
import Card from "#/components/Card";

function SelectOneQuestion({ qNumber, options = [], questionText = "Текст вопроса", onAnswerChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    onAnswerChange?.(qNumber, value);
  };

  if (!Array.isArray(options)) return null;

  return (
    <Card className="p-4 text-lg">
      <h1 className="mb-2 font-bold">Вопрос №{qNumber}</h1>
      <p className="mb-4">{questionText}</p>
      <div className="flex flex-col mt-4 gap-2">
        {options.map((option, idx) => {
          const optionId = `q${qNumber}_opt${idx}`;
          return (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="radio"
                name={`question_${qNumber}`}
                id={optionId}
                value={option}
                checked={selectedValue === option}
                onChange={() => handleChange(option)}
                className="w-4 h-4"
              />
              <label htmlFor={optionId}>{option}</label>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default SelectOneQuestion;