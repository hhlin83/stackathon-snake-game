import React from 'react';

export default function Floor({ position }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} receiveShadow>
      <planeBufferGeometry args={[200, 200]} />
      <meshStandardMaterial /* opacity={0.3} */ color="yellow" />
    </mesh>
  );
}
