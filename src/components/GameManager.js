import React from 'react';

const gameState = {
  snake: [],
  boxes: [
    { id: 1, position: [1, 0, 3] },
    { id: 2, position: [5, 0, 1] },
  ],
  // addBox() {
  //   this.boxes.push({
  //     id: this.boxes.length + 1,
  //     position: [
  //       Math.floor(Math.random() * 10),
  //       0,
  //       Math.floor(Math.random() * 10),
  //     ],
  //   });
  // },
};

export const GameContext = React.createContext(gameState);

export default function GameManager() {
  return <div></div>;
}
