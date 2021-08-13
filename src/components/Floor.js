import React from 'react';

export default function Floor({ position }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} receiveShadow>
      <planeBufferGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.5} />
    </mesh>
  );
}
