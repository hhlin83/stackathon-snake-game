// Import modules
import React, { useRef, useContext, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// Import components
import { GameContext } from './GameManager';

export default function Follower({ position }) {
  const { snake, addToSnake, addNewBox } = useContext(GameContext);
  const follower = useRef();
  const [targetHistory, setTargetHistory] = useState([]);
  const [collected, setCollected] = useState(false);
  const [reachedLast, setReachLast] = useState(false);
  const [startFollow, setStartFollow] = useState(false);
  const [boxIdx, setBoxIdx] = useState(null);

  if (boxIdx === 1) {
    console.log('rendered!');
  }

  useFrame(() => {
    const followerPos = follower.current.position;
    if (!collected && snake[0]) {
      const playerPos = snake[0].current.position.clone();
      const distance = followerPos.distanceTo(playerPos);
      follower.current.lookAt(playerPos);
      if (distance < 0.5) {
        addToSnake(follower);
        console.log('add to snake!', snake);
        addNewBox();
        console.log('add new box!', snake);
        setBoxIdx(snake.length - 1);
        setCollected(true);
        console.log('collected!', snake);
      }
    } else {
      const target = snake[boxIdx - 1];
      const targetPos = target.current.position.clone();
      follower.current.lookAt(targetPos);
      if (!reachedLast) {
        const distance = followerPos.distanceTo(targetPos);
        if (distance < 0.5) {
          setReachLast(true);
          console.log('reach last!');
        }
      } else {
        targetHistory.push(targetPos);
        if (!startFollow) {
          follower.current.lookAt(targetPos);
          const distance = followerPos.distanceTo(targetPos);
          if (distance > 1) {
            console.log('start tracking!', targetHistory);
            setStartFollow(true);
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
