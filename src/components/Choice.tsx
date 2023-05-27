import React from 'react';
import { useSpring, a } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useDraggable } from '@dnd-kit/core';

interface Props {
  text: string;
  isCorrect: boolean;
  choiceId: number;
}

const Choice: React.FC<Props> = ({ text, isCorrect, choiceId }) => {
  // const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: choiceId,
    data: {
      isCorrect,
      text
    }
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  // Set the drag hook and define component movement based on gesture data
  // const bind = useDrag(({ down, movement: [mx, my] }) => {
  //   api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
  // });

  return (
    <a.li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="choice"
      style={style}
      // {...bind()}
      // style={{ x, y, touchAction: 'none' }}
    >
      {text}
    </a.li>
  );
};

export default Choice;
