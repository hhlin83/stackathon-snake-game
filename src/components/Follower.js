import React, { useRef, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { GameContext } from './GameManager';

export default function Follower({ position }) {
  const follower = useRef();
  const { snake } = useContext(GameContext);
  const targetHistory = [];
  let collected = false;
  let reachedLast = false;
  let startFollow = false;
  let snakeIdx = null;

  useFrame(() => {
    const followerPos = follower.current.position;
    if (!collected && snake[0]) {
      const playerPos = snake[0].current.position.clone();
      const distance = followerPos.distanceTo(playerPos);
      if (distance < 0.5) {
        collected = true;
        snake.push(follower);
        snakeIdx = snake.length - 1;
        console.log('collected!', snake);
      }
    } else {
      const target = snake[snakeIdx - 1];
      const targetPos = target.current.position.clone();

      if (!reachedLast) {
        const distance = followerPos.distanceTo(targetPos);
        if (distance < 0.5) {
          reachedLast = true;
          console.log('reach last!');
        }
      } else {
        targetHistory.push(targetPos);
        if (!startFollow) {
          follower.current.lookAt(targetPos);
          const distance = followerPos.distanceTo(targetPos);
          if (distance > 1) {
            startFollow = true;
            console.log('start tracking!');
          }
        } else {
          const historyPos = targetHistory.shift();
          follower.current.lookAt(historyPos);
          followerPos.copy(historyPos);
        }
      }
    }
  });

  return (
    <mesh castShadow position={position} ref={follower}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}
