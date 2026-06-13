import { useState } from "react";
import Card from "#/components/Card";
import TextareaAutosize from 'react-textarea-autosize';

function WriteAnswerQuestion({ qNumber, questionText, onAnswerChange }) {
  const [answer, setAnswer] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setAnswer(value);
    onAnswerChange?.(qNumber, value);
  };

  return (
    <Card className="p-4 text-lg">
      <h1 className="mb-2 font-bold">Вопрос №{qNumber}</h1>
      <p>{questionText}</p>
      <TextareaAutosize
        className="w-full mt-3 rounded-sm bg-stone-100 inset-shadow-sm border-1 border-stone-400"
        minRows={1}
        maxRows={10}
        value={answer}
        onChange={handleChange}
      />
    </Card>
  );
}

export default WriteAnswerQuestion;