import { useState } from "react";
import Card from "#/components/Card";

function SelectMultipleQuestion({ qNumber, options = [], questionText = "Текст вопроса", onAnswerChange }) {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (option, isChecked) => {
    let newSelection;
    if (isChecked) {
      newSelection = [...selectedValues, option];
    } else {
      newSelection = selectedValues.filter((val) => val !== option);
    }
    setSelectedValues(newSelection);
    onAnswerChange?.(qNumber, newSelection);
  };

  if (!Array.isArray(options)) return null;

  return (
    <Card className="p-4 text-lg">
      <h1 className="mb-2 font-bold">Вопрос №{qNumber}</h1>
      <p className="mb-4">{questionText}</p>
      <div className="flex flex-col mt-4 gap-2">
        {options.map((option, idx) => {
          const optionId = `q${qNumber}_chk${idx}`;
          const isChecked = selectedValues.includes(option);
          return (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={`question_${qNumber}_${idx}`}
                id={optionId}
                value={option}
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
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

export default SelectMultipleQuestion;