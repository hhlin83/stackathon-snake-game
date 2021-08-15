// Import modules
import React, { useState } from 'react';

export const GameContext = React.createContext();

const initialGameState = {
  snake: [],
  boxes: [{ id: 1, position: [1, 0, 3] }],
};

export default function GameManager({ children }) {
  const [gameState, setGameState] = useState(initialGameState);

  function addToSnake(box) {
    gameState.snake.push(box);
  }

  function addNewBox() {
    const newBox = {
      id: gameState.boxes.length + 1,
      position: [
        Math.floor(Math.random() * 10),
        0,
        Math.floor(Math.random() * 10),
      ],
    };
    setGameState({ ...gameState, boxes: [...gameState.boxes, newBox] });
  }

  return (
    <GameContext.Provider
      value={{
        snake: gameState.snake,
        boxes: gameState.boxes,
        addToSnake,
        addNewBox,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
