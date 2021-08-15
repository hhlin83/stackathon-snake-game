import React, { useRef, useEffect, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { GameContext } from './GameManager';

export default function Follower({ position }) {
  const follower = useRef();
  const history = [];
  let collected = false;
  let reachLast = false;
  let startTrack = false;
  let followerIdx = null;
  const { snake } = useContext(GameContext);

  useEffect(() => {
    console.log(snake);
  }, []);

  useFrame((state, delta) => {
    const followerPos = follower.current.position;
    if (!collected && snake[0]) {
      const playerPos = snake[0].current.position.clone();
      const distance = followerPos.distanceTo(playerPos);
      if (distance < 0.5) {
        collected = true;
        snake.push(follower);
        followerIdx = snake.length - 1;
        console.log('collected!', snake);
      }
    } else {
      const target = snake[followerIdx - 1];
      const targetPos = target.current.position.clone();

      if (!reachLast) {
        const distance = followerPos.distanceTo(targetPos);
        if (distance < 0.5) {
          reachLast = true;
          console.log('reach last!');
        }
      } else {
        history.push(targetPos);
        if (!startTrack) {
          follower.current.lookAt(targetPos);
          const distance = followerPos.distanceTo(targetPos);
          if (distance > 1) {
            startTrack = true;
            console.log('start tracking!');
          }
        } else {
          const historyPos = history.shift();
          follower.current.lookAt(historyPos);
          follower.current.position.copy(historyPos);
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
