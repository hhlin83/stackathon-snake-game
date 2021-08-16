import { useState, useEffect } from 'react';

export default function useGameControls() {
  const [gameState, setGameState] = useState({
    gameStarted: false,
    gameEnded: false,
  });

  useEffect(() => {
    const handleStart = (e) => {
      startButton.style.display = 'none';
      setGameState({ gameStarted: true });
    };

    // const handleEnd = (e) => {
    //   setGameState({ gameStarted: true });
    // };

    const startButton = document.querySelector('#start-button');
    // const endButton = document.querySelector('#end-button');

    startButton.addEventListener('click', handleStart);
    // endButton.addEventListener('click', handleEnd);

    return () => {
      startButton.removeEventListener('click', handleStart);
      // endButton.removeEventListener('click', handleEnd);
    };
  });

  return gameState;
}
