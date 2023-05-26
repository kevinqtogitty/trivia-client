interface Question {
  category: string;
  id: string;
  possibleAnswers: { text: string; isCorrect: boolean }[];
  question: { text: string };
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
}

export default Question;
