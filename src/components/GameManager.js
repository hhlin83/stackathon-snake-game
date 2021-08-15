import React from 'react';

const gameState = {
  snake: [],
};

export const GameContext = React.createContext(gameState);

export default function GameManager() {
  return <div></div>;
}
