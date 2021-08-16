// Import modules & custom hooks
import React, { useState } from 'react';
import useGameControls from '../hooks/useGameControls';

export const GameContext = React.createContext();

const initialGameState = {
  floorSize: 20,
  gameSpeed: 2,
  snake: [],
  boxes: [],
  gameOver: false,
};

export default function GameManager({ children }) {
  const [gameState, setGameState] = useState(initialGameState);
  const gameControls = useGameControls();

  function addToSnake(box) {
    gameState.snake.push(box);
  }

  function addNewBox() {
    const range = gameState.floorSize / 2 - 1;
    const newBox = {
      id: gameState.boxes.length + 1,
      position: [
        Math.floor(Math.random() * range) * 2 - range,
        0,
        Math.floor(Math.random() * range) * 2 - range,
      ],
    };
    setGameState({ ...gameState, boxes: [...gameState.boxes, newBox] });
  }

  function endGame() {
    setGameState({ ...gameState, gameOver: true });
  }

  function resetGame() {
    setGameState({
      floorSize: 50,
      gameSpeed: 2,
      snake: [],
      boxes: [],
    });
  }

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        ...gameControls,
        addToSnake,
        addNewBox,
        endGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
