import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Follower({ target }) {
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
    history.push(target.current.position.clone());
    if (delay > 2) {
      // console.log('follow position', history.shift());
      // follower.current.position.set(history.shift());
      // const followerPos = follower.current.position;
      // const followDir = history.shift().sub(followerPos).normalize();
      // follower.current.translateOnAxis(followDir, 2 * delta);
      // console.log(history.shift());
      const historyPos = history.shift();
      follower.current.position.set(historyPos.x, historyPos.y, historyPos.z);

      // follower.current.lookAt(targetPos);
      // follower.current.rotation.y += turnSpeed * direction * delta;
    }
  });

  return (
    <mesh castShadow position={[-1, 0, 0]} ref={follower}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}
