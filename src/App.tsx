import { useEffect, useState } from 'react';
import Question from './types/types';
import formatQuestion from './utils/formatQuestion';
import DarkLightModeToggle from './components/DarkLightModeToggle';
import Choice from './components/Choice';
import DroppableArea from './components/DroppableArea';
import { DndContext, DragEndEvent, Over } from '@dnd-kit/core';

const baseUrl = 'http://localhost:3001/question';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDropped, setIsDropped] = useState(false);
  const [questionState, setQuestionState] = useState<{
    question: Question | null;
    isNewQuestion: boolean;
    correctAnswerDropped: boolean;
    choiceDropped: string | null;
  }>({
    question: null,
    isNewQuestion: true,
    correctAnswerDropped: false,
    choiceDropped: null
  });

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const fetchRandomQuestion = async () => {
    const data = await fetch(baseUrl);
    if (data) {
      const question = await data.json();
      const formattedQuestion = formatQuestion(question[0]);
      setQuestionState((state) => {
        return { ...state, question: formattedQuestion };
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {
      active: {
        data: { current }
      },
      over
    } = event;

    if (over) {
      setIsDropped(true);
      if (current?.isCorrect) {
        setQuestionState((state) => {
          return {
            ...state,
            correctAnswerDropped: true,
            choiceDropped: current?.text
          };
        });
        // border green
      } else {
        setQuestionState((state) => {
          return {
            ...state,
            correctAnswerDropped: false,
            choiceDropped: current?.text
          };
        });
        // border red
      }
    }
  };

  return (
    <>
      <DarkLightModeToggle
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <DndContext onDragEnd={handleDragEnd}>
        <div className={`main-container ${isDarkMode ? '' : 'light-mode'}`}>
          <h2 className="question">{questionState.question?.question.text}</h2>
          <DroppableArea isDropped={isDropped} questionState={questionState} />
          <ul className="choice-container">
            {questionState.question?.possibleAnswers?.map((choice, i) => (
              <Choice
                key={i}
                text={choice.text}
                isCorrect={choice.isCorrect}
                choiceId={i}
              />
            ))}
          </ul>
        </div>
      </DndContext>
    </>
  );
}

export default App;
