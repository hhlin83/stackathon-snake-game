import { useState, useEffect } from 'react';

export default function useGameControls() {
  const [gameState, setGameState] = useState({
    gameStarted: false,
  });

  useEffect(() => {
    const handleStart = (e) => {
      startUI.style.display = 'none';
      setGameState({ gameStarted: true });
    };

    const handleRestart = (e) => {
      window.location.reload();
    };

    const startButton = document.querySelector('#start-button');
    const startUI = document.querySelector('#game-start-ui');
    const restartButton = document.querySelector('#restart-button');

    startButton.addEventListener('click', handleStart);
    restartButton.addEventListener('click', handleRestart);

    return () => {
      startButton.removeEventListener('click', handleStart);
      restartButton.removeEventListener('click', handleRestart);
    };
  });

  return gameState;
}
