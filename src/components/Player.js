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

export function Follower({ position }) {
  const follower = useRef();
  const history = [];
  let collected = false;
  let reachLast = false;
  let startTrack = false;
  let followerIdx = null;

  useEffect(() => {
    // tracks.push(follower);
    // followerIdx = tracks.length - 1;
  }, []);

  useFrame((state, delta) => {
    const followerPos = follower.current.position;
    if (!collected && tracks[0]) {
      const playerPos = tracks[0].current.position.clone();
      const distance = followerPos.distanceTo(playerPos);
      if (distance < 0.5) {
        collected = true;
        tracks.push(follower);
        followerIdx = tracks.length - 1;
        console.log('collected!', tracks);
      }
    } else {
      const target = tracks[followerIdx - 1];
      // if (followerIdx !== null && target) {
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
          const distance = followerPos.distanceTo(targetPos);
          if (distance > 1) {
            startTrack = true;
            console.log('start tracking!');
          }
        } else {
          const historyPos = history.shift();
          follower.current.lookAt(historyPos);
          follower.current.position.set(
            historyPos.x,
            historyPos.y,
            historyPos.z
          );
        }
      }
      // }
    }
  });

  return (
    <mesh castShadow position={position} ref={follower}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}
