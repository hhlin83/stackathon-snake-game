// Import modules
import React, { useState } from 'react';

export const GameContext = React.createContext();

const initialGameState = {
  floorSize: 50,
  snake: [],
  boxes: [],
};

export default function GameManager({ children }) {
  const [gameState, setGameState] = useState(initialGameState);

  function addToSnake(box) {
    gameState.snake.push(box);
  }

  function addNewBox() {
    const range = gameState.floorSize / 2;
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

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        addToSnake,
        addNewBox,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
