import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useControls from '../hooks/useControls';

export default function Box({ position, args, color }) {
  const player = useRef();
  const moveSpeed = 2;
  const turnSpeed = 5;
  const { moveLeft, moveRight } = useControls();

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
