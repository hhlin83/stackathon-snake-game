// Import modules
import React, { useContext } from 'react';

// Import components
import { GameContext } from './GameManager';
import Follower from './Follower';

export default function Followers() {
  const { boxes } = useContext(GameContext);

  return (
    <group>
      {boxes.map((box) => (
        <Follower key={box.id} position={box.position} />
      ))}
    </group>
  );
}
