import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useControls from '../hooks/useControls';
// import Follower from './Follower';

const tracks = [];

export function Player({ position, args, color }) {
  const player = useRef();
  const { moveLeft, moveRight } = useControls();
  const moveSpeed = 2;
  const turnSpeed = 5;
  // const [previousPos, setPreviousPos] = useState();

  useEffect(() => {
    tracks.push(player);
  }, []);

  useFrame((state, delta) => {
    // setPreviousPos(player.current.position.clone());
    // console.log(previousPos);
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

export function Follower() {
  const follower = useRef();
  const history = [];
  let delay = 0;
  // const [history, setHistory] = useState([]);

  useEffect(() => {
    setInterval(() => {
      if (delay <= 2) delay++;
    }, 1000);
  }, []);

  useFrame((state, delta) => {
    const target = tracks[0];
    if (target) {
      const targetPos = target.current.position.clone();
      const followerPos = follower.current.position;
      history.push(targetPos);
      const distance = followerPos.distanceTo(targetPos);

      if (delay > 2) {
        // const followerPos = follower.current.position;
        // const followDir = history.shift().sub(followerPos).normalize();
        // follower.current.translateOnAxis(followDir, 2 * delta);

        const historyPos = history.shift();
        follower.current.lookAt(historyPos);
        follower.current.position.set(historyPos.x, historyPos.y, historyPos.z);

        // follower.current.rotation.y += turnSpeed * direction * delta;
      }
    }
  });

  return (
    <mesh castShadow position={[0, 0, 0]} ref={follower}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}
