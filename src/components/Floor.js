// Import modules
import React, { useContext } from 'react';

// Import components
import { GameContext } from './GameManager';

export default function Floor({ position }) {
  const { floorSize } = useContext(GameContext);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} receiveShadow>
      <planeBufferGeometry args={[floorSize, floorSize]} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}
