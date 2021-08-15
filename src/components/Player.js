import React, { useRef, useEffect, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useControls from '../hooks/useControls';
import { GameContext } from './GameManager';

export default function Player({ position, args, color }) {
  const player = useRef();
  const { moveLeft, moveRight } = useControls();
  const moveSpeed = 2;
  const turnSpeed = 5;
  const { addToSnake } = useContext(GameContext);

  useEffect(() => {
    addToSnake(player);
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
