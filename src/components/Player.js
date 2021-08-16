// Import modules
import React, { useRef, useEffect, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

// Import components & custom hooks
import { GameContext } from './GameManager';
import usePlayerControls from '../hooks/usePlayerControls';

export default function Player({ position, args, color }) {
  const {
    gameStarted,
    gameSpeed,
    addToSnake,
    addNewBox,
    floorSize,
    gameOver,
    endGame,
  } = useContext(GameContext);
  const player = useRef();
  const { moveLeft, moveRight } = usePlayerControls();
  const turnSpeed = 5;

  useEffect(() => {
    if (gameStarted) {
      console.log('add player');
      addToSnake(player);
      console.log('add first box');
      addNewBox();
    }
  }, [gameStarted]);

  useFrame((state, delta) => {
    if (gameStarted && !gameOver) {
      const direction = (moveLeft ? 1 : 0) + (moveRight ? -1 : 0);
      player.current.rotation.y += turnSpeed * direction * delta;
      player.current.translateOnAxis(new Vector3(0, 0, 1), gameSpeed * delta);

      // check if player is out of floor range
      const playerX = Math.abs(player.current.position.x);
      const playerZ = Math.abs(player.current.position.z);
      const range = floorSize / 2;
      if (playerX > range || playerZ > range) {
        console.log('game over!');
        endGame();
      }
    } else if (gameOver) {
      player.current.rotateOnAxis(new Vector3(1, 0, 0), 10 * delta);
      player.current.position.y -= gameSpeed * delta;
    }
  });

  if (!gameStarted) return null;

  return (
    <mesh castShadow position={position} ref={player}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
