import { useDroppable } from '@dnd-kit/core';
import Question from '../types/types';

interface Props {
  isDropped: boolean;
  questionState: {
    question: Question | null;
    isNewQuestion: boolean;
    correctAnswerDropped: boolean;
    choiceDropped: string | null;
  };
}

const DroppableArea: React.FC<Props> = ({ isDropped, questionState }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'unique-id'
  });

  const style = {
    // borderColor: isOver ? 'pink' : 'blue',
    borderColor: questionState.correctAnswerDropped ? 'green' : 'red'
  };

  return (
    <div ref={setNodeRef} className="droppable-area" style={style}>
      {isDropped ? questionState.choiceDropped : 'Drop nswer here'}
    </div>
  );
};

export default DroppableArea;
