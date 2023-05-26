import React from 'react';
import { useSpring, a } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface Props {
  text: string;
}

const Choice: React.FC<Props> = ({ text }) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
  });

  return (
    <a.li className="choice" {...bind()} style={{ x, y, touchAction: 'none' }}>
      {text}
    </a.li>
  );
};

export default Choice;
