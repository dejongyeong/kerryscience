'use client';

import { Button, Radio } from 'antd';
import { useMemo, useState } from 'react';
import seedrandom from 'seedrandom';

import questions from '../lib/questions.json';

interface Question {
  question: string;
  answerOptions: { answer: string; isCorrect?: boolean }[];
}

// Fisher-Yates shuffle algorithm, also known as Knuth shuffle
// O(n) time complexity, O(n) space complexity
function seededShuffle<T>(array: T[], rng: seedrandom.PRNG): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;

  while (currentIndex > 0) {
    const randomIndex = Math.floor(rng() * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
}

function selectQuestionsForDay(questions: Question[], date: Date): Question[] {
  const dayOfYear = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();

  const rng = seedrandom(`${dayOfYear}`);
  const shuffled = seededShuffle(questions, rng);

  return shuffled.slice(0, 3);
}

export function Questions({ setScore, setShowScore }: any) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected]: any = useState([]);

  const selectedQs = useMemo(
    () => selectQuestionsForDay(questions, new Date()),
    []
  );

  const handlePrevious = () => {
    const prevQ = currentQ - 1;
    prevQ >= 0 && setCurrentQ(prevQ);
  };

  const handleNext = () => {
    const nextQ = currentQ + 1;
    nextQ < selectedQs.length && setCurrentQ(nextQ);
  };

  const handleOptions = (event: any) => {
    const { value } = event.target;
    setSelected([(selected[currentQ] = { answerByUser: value })]);
    setSelected([...selected]);
  };

  const handleSubmit = () => {
    const newScore = selectedQs.reduce((score, question, index): any => {
      const selectedAnswer = selected[index]?.answerByUser;
      const isCorrect = question.answerOptions.some(
        (answer) => answer.isCorrect && answer.answer === selectedAnswer
      );
      return score + (isCorrect ? 1 : 0);
    }, 0);

    setScore(newScore);
    setShowScore(true);
  };

  return (
    <>
      <div className="mb-3 text-neutral-700 text-sm">
        Question {currentQ + 1} of {selectedQs.length}
      </div>
      <div className="flex flex-col gap-y-5 bg-white p-6 shadow-xl rounded-md">
        <div>
          <h1 className="text-xl font-semibold">
            {selectedQs[currentQ].question}
          </h1>
        </div>
        <Radio.Group
          className="w-full grid grid-cols-2 max-[480px]:grid-cols-1 gap-3"
          value={selected[currentQ]?.answerByUser || undefined}
          onChange={handleOptions}
        >
          {selectedQs[currentQ].answerOptions.map((answer, index) => (
            <Radio key={index} name={answer.answer} value={answer.answer}>
              {answer.answer}
            </Radio>
          ))}
        </Radio.Group>
        <div className="flex flex-row gap-3 mt-4 max-[425px]:flex-col">
          <Button
            type="primary"
            onClick={handlePrevious}
            disabled={currentQ === 0 ? true : false}
            className="w-full bg-custom-color hover:bg-hover-color"
          >
            Previous
          </Button>
          <Button
            type="primary"
            disabled={currentQ + 1 < selectedQs.length ? false : true}
            onClick={handleNext}
            className="w-full bg-custom-color hover:bg-hover-color"
          >
            Next
          </Button>
          {selected.length === selectedQs.length ? (
            <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full bg-custom-color hover:bg-hover-color max-[425px]:mt-4"
            >
              Submit
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}
