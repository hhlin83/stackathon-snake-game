// Import modules
import React, { useRef, useEffect, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

// Import components & custom hooks
import { GameContext } from './GameManager';
import useControls from '../hooks/useControls';

export default function Player({ position, args, color }) {
  const { addToSnake, addNewBox } = useContext(GameContext);
  const player = useRef();
  const { moveLeft, moveRight } = useControls();
  const moveSpeed = 2;
  const turnSpeed = 5;

  useEffect(() => {
    console.log('add player');
    addToSnake(player);
    console.log('add first box');
    addNewBox();
  }, []);

  useFrame((state, delta) => {
    const direction = (moveLeft ? 1 : 0) + (moveRight ? -1 : 0);
    player.current.rotation.y += turnSpeed * direction * delta;
    player.current.translateOnAxis(new Vector3(0, 0, 1), moveSpeed * delta);
  });

  return (
    <mesh castShadow position={position} ref={player}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
