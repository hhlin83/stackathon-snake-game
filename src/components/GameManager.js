// Import modules
import React, { useState } from 'react';

export const GameContext = React.createContext();

const initialGameState = {
  floorSize: 20,
  gameSpeed: 2,
  gameStarted: false,
  gameEnded: false,
  snake: [],
  boxes: [],
};

export default function GameManager({ children }) {
  const [gameState, setGameState] = useState(initialGameState);

  function startGame() {
    setGameState({ ...gameState, gameStarted: true });
  }

  function endGame() {
    setGameState({ ...gameState, gameEnded: true });
  }

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

  function resetGame() {
    setGameState({
      floorSize: 50,
      gameStart: false,
      gameEnd: false,
      snake: [],
      boxes: [],
    });
  }

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        startGame,
        endGame,
        addToSnake,
        addNewBox,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
