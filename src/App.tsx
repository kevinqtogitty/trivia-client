import { useEffect, useState } from 'react';
import Question from './types/types';
import formatQuestion from './utils/formatQuestion';

const baseUrl = 'http://localhost:3001/question';

function App() {
  const [question, setQuestion] = useState<Question>();
  const [categories, setCategories] = useState<string[]>();
  console.log(question);

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
    <div style={{ margin: '0rem' }}>
      <p>{question?.question.text}</p>
      <ul>
        {question?.possibleAnswers.map((choice) => (
          <li style={{ listStyle: 'square' }}>{choice.text}</li>
        ))}
      </ul>
      hello
    </div>
  );
}

export default App;
