import shuffle from './shuffle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatQuestion = (question: any) => {
  const { incorrectAnswers, correctAnswer, ...rest } = question;
  const possibleAnswers = [correctAnswer, ...incorrectAnswers].map((x, i) => {
    return { text: x, isCorrect: i === 0 ? true : false };
  });

  return { ...rest, possibleAnswers: [...shuffle(possibleAnswers)] };
};

export default formatQuestion;
