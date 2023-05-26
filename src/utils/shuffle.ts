// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = (arr: { text: string; isCorrect: boolean }[]) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

export default shuffle;
