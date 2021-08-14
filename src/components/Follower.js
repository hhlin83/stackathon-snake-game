import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
// import { Vector3 } from 'three';
// import useControls from '../hooks/useControls';

export default function Follower({ player }) {
  const follower = useRef();
  // const { moveLeft, moveRight } = useControls();
  // const moveSpeed = 2;
  // const turnSpeed = 5;

  useFrame((state, delta) => {
    const playerPos = player.current.position;
    const followerPos = follower.current.position;
    // console.log(playerPos);
    // console.log(followerPos);
    const followDir = playerPos.clone().sub(followerPos).normalize();
    // console.log(followDir);

    follower.current.lookAt(playerPos.clone());
    // follower.current.rotation.y += turnSpeed * direction * delta;
    follower.current.translateOnAxis(followDir, 1 * delta);
  });

  return (
    <mesh castShadow position={[-1, 0, 0]} ref={follower}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}
