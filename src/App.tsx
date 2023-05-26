import { useEffect, useState } from 'react';
import Question from './types/types';
import formatQuestion from './utils/formatQuestion';
import DarkLightModeToggle from './components/DarkLightModeToggle';
import Choice from './components/Choice';

const baseUrl = 'http://localhost:3001/question';

function App() {
  const [question, setQuestion] = useState<Question>();
  const [categories, setCategories] = useState<string[]>();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDropped, setIsDropped] = useState(false);

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const fetchRandomQuestion = async () => {
    const data = await fetch(baseUrl);
    if (data) {
      const question = await data.json();
      const formattedQuestion = formatQuestion(question[0]);
      setQuestion(formattedQuestion);
    }
  };

  return (
    <>
      <DarkLightModeToggle
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <div className={`main-container ${isDarkMode ? '' : 'light-mode'}`}>
        <h2 className="question">{question?.question.text}</h2>

        <ul className="choice-container">
          {question?.possibleAnswers.map((choice) => (
            <Choice text={choice.text} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
