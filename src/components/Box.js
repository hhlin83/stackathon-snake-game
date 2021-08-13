import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Box({ position, args, color }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log('rendered');
  }, []);

  useFrame(({ clock }) => {
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime());
    mesh.current.position.x += 0.01 * clock.getElapsedTime();
  });

  console.log(mesh.current);
  // document.addEventListener('keydown', (e) => {
  //   e.stopImmediatePropagation();
  //   switch (e.key) {
  //     case 'ArrowRight':
  //       console.log('arrow right');
  //       console.log(mesh.current);
  //       // mesh.current.position.x += 1;
  //       break;

  //     default:
  //       break;
  //   }
  // });

  return (
    <mesh
      castShadow
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color={hovered ? 'pink' : color} />
    </mesh>
  );
}
