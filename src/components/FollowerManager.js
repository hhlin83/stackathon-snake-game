import React, { /* useState, useEffect, */ useContext } from 'react';
// import { useFrame } from '@react-three/fiber';
import { GameContext } from './GameManager';
import Follower from './Follower';

export default function FollowerManager() {
  // const [followers, setFollowers] = useState([]);
  const { boxes } = useContext(GameContext);

  // useEffect(() => {
  //   setInterval(() => {
  //     setFollowers(followers.concat[])
  //   }, 5000);
  // }, []);

  return (
    <group>
      {boxes.map((box) => (
        <Follower key={box.id} position={box.position} />
      ))}
    </group>
  );
}
