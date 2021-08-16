// Import modules
import React, { useRef, useContext, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// Import components
import { GameContext } from './GameManager';

export default function Follower({ position }) {
  const {
    snake,
    addToSnake,
    addNewBox,
    addGameSpeed,
    gameOver,
    floorSize,
    endGame,
  } = useContext(GameContext);
  const follower = useRef();
  const [targetHistory] = useState([]);
  const [collected, setCollected] = useState(false);
  const [reachedLast, setReachLast] = useState(false);
  const [startFollow, setStartFollow] = useState(false);
  const [boxIdx, setBoxIdx] = useState(null);
  const [boxColor, setBoxColor] = useState('pink');

  useFrame(() => {
    const followerPos = follower.current.position;

    // wait for player to collect
    if (!collected && snake[0]) {
      const playerPos = snake[0].current.position.clone();
      const distance = followerPos.distanceTo(playerPos);
      follower.current.lookAt(playerPos);
      if (distance < 0.5) {
        addToSnake(follower);
        addNewBox();
        setBoxIdx(snake.length - 1);
        setCollected(true);
        setBoxColor('lightblue');
      }
    } else {
      // wait till end of snake after collected
      const target = snake[boxIdx - 1];
      const targetPos = target.current.position.clone();
      follower.current.lookAt(targetPos);
      if (!reachedLast) {
        const distance = followerPos.distanceTo(targetPos);
        if (distance < 0.5) {
          setReachLast(true);
          addGameSpeed();
        }
      } else {
        // join line at certain distance from end of snake
        targetHistory.push(targetPos);
        if (!startFollow) {
          follower.current.lookAt(targetPos);
          const distance = followerPos.distanceTo(targetPos);
          if (distance > 1) {
            setStartFollow(true);
          }
        } else {
          // start following snake path
          const historyPos = targetHistory.shift();

          // game over if player touches box again
          const playerPos = snake[0].current.position.clone();
          const playerDistance = followerPos.distanceTo(playerPos);
          if (!gameOver && playerDistance < 0.5) {
            endGame();
          }

          // check if box is out of floor range
          const followerX = Math.abs(follower.current.position.x);
          const followerZ = Math.abs(follower.current.position.z);
          const range = floorSize / 2;
          if (
            !gameOver ||
            (gameOver && followerX < range && followerZ < range)
          ) {
            // keep following snake path
            follower.current.lookAt(historyPos);
            followerPos.copy(historyPos);
          } else {
            // fall with the player when box out of floor range
            follower.current.rotation.copy(target.current.rotation.clone());
            followerPos.copy(historyPos);
          }
        }
      }
    }
  });

  return (
    <mesh castShadow position={position} ref={follower}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={boxColor} />
    </mesh>
  );
}
