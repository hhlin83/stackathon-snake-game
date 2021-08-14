import { useState, useEffect } from 'react';

function keyActions(key) {
  const keys = {
    ArrowLeft: 'moveLeft',
    KeyA: 'moveLeft',
    ArrowRight: 'moveRight',
    KeyD: 'moveRight',
  };
  return keys[key];
}

export default function useControls() {
  const [movement, setMovement] = useState({
    moveLeft: false,
    moveRight: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keyActions(e.code)) {
        setMovement({
          ...movement,
          [keyActions(e.code)]: true,
        });
      }
    };

    const handleKeyUp = (e) => {
      if (keyActions(e.code)) {
        setMovement({
          ...movement,
          [keyActions(e.code)]: false,
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  return movement;
}
