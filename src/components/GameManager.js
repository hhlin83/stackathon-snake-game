import React, { useReducer, useState } from 'react';

export const GameContext = React.createContext();

const initialGameState = {
  snake: [],
  boxes: [{ id: 1, position: [1, 0, 3] }],
};

// const ADD_TO_SNAKE = 'ADD_TO_SNAKE';
// const ADD_NEW_BOX = 'ADD_NEW_BOX';
// const RESET = 'RESET';

// function gameReducer(gameState, action) {
//   switch (action.type) {
//     case ADD_TO_SNAKE:
//       const newSnake = gameState.snake.concat(action.box);
//       return { ...gameState, snake: newSnake };

//     case ADD_NEW_BOX:
//       const newBox = {
//         id: gameState.boxes.length + 1,
//         position: [
//           Math.floor(Math.random() * 10),
//           0,
//           Math.floor(Math.random() * 10),
//         ],
//       };
//       const newBoxes = gameState.boxes.concat(newBox);
//       return { ...gameState, boxes: newBoxes };

//     case RESET:
//       return {
//         snake: [],
//         boxes: [],
//       };

//     default:
//       throw new Error();
//   }
// }

export default function GameManager({ children }) {
  // const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  // function addToSnake(box) {
  //   dispatch({ type: ADD_TO_SNAKE, box });
  // }

  // function addNewBox() {
  //   dispatch({ type: ADD_NEW_BOX });
  // }

  const [gameState, setGameState] = useState(initialGameState);

  function addToSnake(box) {
    const newSnake = gameState.snake.concat(box);
    setGameState({ ...gameState, snake: newSnake });
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
    const newBoxes = gameState.boxes.concat(newBox);
    console.log('same boxes...?', gameState.boxes[0] === newBoxes[0]);
    setGameState({ ...gameState, boxes: newBoxes });
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
