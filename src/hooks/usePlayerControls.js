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

export default function usePlayerControls() {
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

    const handleJoystickRightDown = (e) => {
      setMovement({
        ...movement,
        moveRight: true,
      });
    };

    const handleJoystickLeftDown = (e) => {
      setMovement({
        ...movement,
        moveLeft: true,
      });
    };

    const handleJoystickRightUp = (e) => {
      setMovement({
        ...movement,
        moveRight: false,
      });
    };

    const handleJoystickLeftUp = (e) => {
      setMovement({
        ...movement,
        moveLeft: false,
      });
    };

    // PC controls
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // mobile controls
    const rightJoystick = document.querySelector('#mobile-joystick-right');
    const leftJoystick = document.querySelector('#mobile-joystick-left');
    if (rightJoystick && leftJoystick) {
      rightJoystick.addEventListener('pointerdown', handleJoystickRightDown);
      rightJoystick.addEventListener('pointerup', handleJoystickRightUp);
      leftJoystick.addEventListener('pointerdown', handleJoystickLeftDown);
      leftJoystick.addEventListener('pointerup', handleJoystickLeftUp);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);

      if (rightJoystick && leftJoystick) {
        rightJoystick.removeEventListener(
          'pointerdown',
          handleJoystickRightDown
        );
        rightJoystick.removeEventListener('pointerup', handleJoystickRightUp);
        leftJoystick.removeEventListener('pointerdown', handleJoystickLeftDown);
        leftJoystick.removeEventListener('pointerup', handleJoystickLeftUp);
      }
    };
  });

  return movement;
}
